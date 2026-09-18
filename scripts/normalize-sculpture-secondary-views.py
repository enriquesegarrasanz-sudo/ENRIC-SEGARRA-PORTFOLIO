"""Create non-destructive 3:2 presentation files for every secondary sculpture view.

The archive originals remain untouched.  A retained sharp photograph sits over an
edge-derived, softly extended context so portrait and square source photographs
can occupy the same horizontal presentation frame without losing any part of
the work.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parent.parent
CATALOGUE_PATH = ROOT / "dist" / "catalogue.js"
ASSETS = ROOT / "dist" / "assets"
PROVENANCE_PATH = ROOT / "docs" / "procedencia-imagenes.json"
FULL_SIZE = (1536, 1024)
THUMB_SIZE = (768, 512)


def presentation_frame(source: Image.Image, size: tuple[int, int]) -> Image.Image:
    """Keep the archival frame whole while extending its edge environment."""
    source = ImageOps.exif_transpose(source).convert("RGB")
    # The background deliberately reuses only the photograph itself.  This is
    # preferable to reconstructing parts of an artwork that are undocumented.
    backdrop = ImageOps.fit(source, size, Image.Resampling.LANCZOS)
    backdrop = backdrop.filter(ImageFilter.GaussianBlur(42))
    backdrop = ImageEnhance.Color(backdrop).enhance(0.72)
    backdrop = ImageEnhance.Brightness(backdrop).enhance(1.04)

    foreground = ImageOps.contain(
        source,
        (int(size[0] * 0.92), int(size[1] * 0.92)),
        Image.Resampling.LANCZOS,
    )
    # A feathered transition prevents a visible portrait-shaped frame while
    # retaining every original pixel of the documented view in the center.
    mask = Image.new("L", foreground.size, 255)
    feather = max(5, min(foreground.size) // 70)
    mask = mask.filter(ImageFilter.GaussianBlur(feather))
    x = (size[0] - foreground.width) // 2
    y = (size[1] - foreground.height) // 2
    backdrop.paste(foreground, (x, y), mask)
    return backdrop


def asset_names(reference: str, position: int) -> tuple[str, str]:
    number = reference.removeprefix("ESC-")
    stem = f"gallery-esc-{number}-view-{position}-horizontal"
    return stem, f"thumb-{stem}"


def gallery_items(gallery_source: str) -> list[re.Match[str]]:
    return list(
        re.finditer(
            r'(\{\s*"image": ")(?P<image>[^"]+)(",\s*"thumb": ")(?P<thumb>[^"]+)(")',
            gallery_source,
        )
    )


def main() -> None:
    catalogue = CATALOGUE_PATH.read_text(encoding="utf-8")
    provenance = json.loads(PROVENANCE_PATH.read_text(encoding="utf-8"))
    provenance_by_asset = {item["asset"]: item for item in provenance}
    generated: list[tuple[str, str, str, str]] = []

    blocks = re.split(r"(?=\n  \{\n    \"id\": )", catalogue)
    rewritten: list[str] = []
    for block in blocks:
        if '"category": "escultura"' not in block or '"gallery": [' not in block:
            rewritten.append(block)
            continue
        reference_match = re.search(r'"reference": "(ESC-\d+)"', block)
        if not reference_match:
            rewritten.append(block)
            continue
        reference = reference_match.group(1)
        before, gallery_and_after = block.split('"gallery": [', 1)
        gallery, after = gallery_and_after.split('\n    ]', 1)
        items = gallery_items(gallery)
        replacements: list[tuple[int, int, str]] = []
        for position, item in enumerate(items, start=1):
            # Position one is the already reviewed cover. All subsequent views
            # receive their own presentation derivative.
            if position == 1:
                continue
            original_image = item.group("image")
            if original_image.endswith("-horizontal"):
                continue
            full_name, thumb_name = asset_names(reference, position)
            source_path = ASSETS / f"{original_image}.webp"
            if not source_path.exists():
                raise FileNotFoundError(source_path)
            full_path = ASSETS / f"{full_name}.webp"
            thumb_path = ASSETS / f"{thumb_name}.webp"
            with Image.open(source_path) as image:
                presentation_frame(image, FULL_SIZE).save(
                    full_path, "WEBP", quality=92, method=6
                )
                presentation_frame(image, THUMB_SIZE).save(
                    thumb_path, "WEBP", quality=86, method=6
                )
            replacements.append(
                (
                    item.start(),
                    item.end(),
                    f'{item.group(1)}{full_name}{item.group(3)}{thumb_name}{item.group(5)}',
                )
            )
            generated.append((reference, original_image, full_name, thumb_name))
        for start, end, replacement in reversed(replacements):
            gallery = gallery[:start] + replacement + gallery[end:]
        rewritten.append(before + '"gallery": [' + gallery + '\n    ]' + after)

    CATALOGUE_PATH.write_text("".join(rewritten), encoding="utf-8")
    for reference, original_image, full_name, thumb_name in generated:
        original = provenance_by_asset.get(f"assets/{original_image}.webp")
        if not original:
            raise KeyError(f"Missing provenance for {original_image}")
        for asset, width, height, transformation in (
            (
                f"assets/{full_name}.webp",
                *FULL_SIZE,
                "Versión horizontal de presentación derivada de la fotografía de archivo: encuadre 3:2, entorno extendido de forma no destructiva a partir de los bordes de la toma y obra completa preservada.",
            ),
            (
                f"assets/{thumb_name}.webp",
                *THUMB_SIZE,
                "Miniatura horizontal de la versión de presentación; obra y encuadre documental completos preservados.",
            ),
        ):
            if asset not in provenance_by_asset:
                provenance.append(
                    {
                        "asset": asset,
                        "archivo_id": original["archivo_id"],
                        "original": original["original"],
                        "transformacion": transformation,
                        "width": width,
                        "height": height,
                    }
                )
    PROVENANCE_PATH.write_text(
        json.dumps(provenance, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Normalizadas {len(generated)} vistas secundarias de Escultura.")


if __name__ == "__main__":
    main()
