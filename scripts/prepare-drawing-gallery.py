"""Create non-destructive catalogue versions of the drawing photographs.

The source WebP files are retained untouched.  Each derivative uses the same
3:2 catalogue canvas, a calibrated cool-neutral background and conservative
photographic corrections only.  It never redraws, fills or otherwise alters
the marks of a drawing.
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageOps


FULL_SIZE = (1536, 1024)
THUMB_SIZE = (768, 512)
BACKGROUND = (245, 246, 247)  # Approved cool-neutral gallery white, #F5F6F7.
GENERATIVE_ASSISTED = {"015079", "015080", "015081", "015105"}
# ARC-015105 has a separate, hand-cleaned version.  It must not be replaced by
# a new crop from the camera original when the rest of the series is rebuilt.
PRESERVE_EXISTING = {"015105"}


@dataclass(frozen=True)
class Drawing:
    archive_id: str
    source: str
    crop: tuple[float, float, float, float]
    framed: bool = False


# Fractions are deliberately slightly generous: the edge of the paper or frame
# remains visible, but incidental walls, fingers and unequal room lighting do
# not.  The only generative exception (ARC-015105) is supplied separately after
# its hand was removed; every other result is this deterministic pipeline.
DRAWINGS = (
    # The earlier catalogue crop prioritised equal visual scale and cut too
    # close to several sheets and frames.  These bounds retain the complete
    # support, the signature and the edge of the frame whenever present.
    Drawing("015079", "arc-015079", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015080", "arc-015080", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015081", "arc-015081", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015082", "arc-015082", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015083", "arc-015083", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015084", "arc-015084", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015085", "arc-015085", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015086", "arc-015086", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015087", "arc-015087", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015088", "arc-015088", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015089", "arc-015089", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015090", "arc-015090", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015091", "arc-015091", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015092", "arc-015092", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015093", "arc-015093", (0.06, 0.10, 0.94, 0.90)),
    Drawing("015094", "arc-015094", (0.08, 0.06, 0.92, 0.95), True),
    Drawing("015095", "arc-015095", (0.08, 0.06, 0.92, 0.95), True),
    Drawing("015096", "arc-015096", (0.05, 0.06, 0.95, 0.94), True),
    Drawing("015098", "arc-015098", (0.05, 0.06, 0.95, 0.94), True),
    Drawing("015099", "arc-015099", (0.05, 0.06, 0.95, 0.94), True),
    Drawing("015102", "arc-015102", (0.05, 0.06, 0.95, 0.94), True),
    Drawing("015103", "arc-015103", (0.08, 0.06, 0.92, 0.95), True),
    Drawing("015105", "arc-015105", (0.05, 0.06, 0.95, 0.94), True),
    Drawing("015172", "arc-015172", (0.12, 0.18, 0.88, 0.82)),
    Drawing("015173", "arc-015173", (0.12, 0.18, 0.88, 0.82)),
    Drawing("015176", "arc-015176", (0.12, 0.18, 0.88, 0.82)),
    Drawing("015178", "arc-015178", (0.12, 0.18, 0.88, 0.82)),
    Drawing("015181", "arc-015181", (0.12, 0.18, 0.88, 0.82)),
    Drawing("015182", "arc-015182", (0.12, 0.18, 0.88, 0.82)),
    Drawing("015183", "arc-015183", (0.12, 0.18, 0.88, 0.82)),
    Drawing("015185", "arc-015185", (0.08, 0.06, 0.92, 0.95), True),
    Drawing("015186", "arc-015186", (0.08, 0.06, 0.92, 0.95), True),
    Drawing("015187", "arc-015187", (0.10, 0.12, 0.90, 0.88), True),
    Drawing("008527", "arc-008527", (0.02, 0.02, 0.98, 0.98)),
    Drawing("008528", "arc-008528", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013422", "arc-013422", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013423", "arc-013423", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013426", "arc-013426", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013427", "arc-013427", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013430", "arc-013430", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013431", "arc-013431", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013434", "arc-013434", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013435", "arc-013435", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013436", "arc-013436", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013439", "arc-013439", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013440", "arc-013440", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013441", "arc-013441", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013443", "arc-013443", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013447", "arc-013447", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013448", "arc-013448", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013449", "arc-013449", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013452", "arc-013452", (0.02, 0.02, 0.98, 0.98)),
    Drawing("013453", "arc-013453", (0.02, 0.02, 0.98, 0.98)),
)


def crop(image: Image.Image, fractions: tuple[float, float, float, float]) -> Image.Image:
    left, top, right, bottom = fractions
    width, height = image.size
    return image.crop(
        (round(width * left), round(height * top), round(width * right), round(height * bottom))
    )


def correct_photo(image: Image.Image) -> Image.Image:
    """Apply only global white balance and a restrained tonal correction."""
    source = np.asarray(image.convert("RGB"), dtype=np.uint8)
    lab = cv2.cvtColor(source, cv2.COLOR_RGB2LAB)
    lightness = lab[:, :, 0]
    saturation = cv2.cvtColor(source, cv2.COLOR_RGB2HSV)[:, :, 1]

    # Use neutral bright areas (paper, mount or frame) as the exposure reference.
    mask = (lightness >= np.percentile(lightness, 72)) & (saturation <= np.percentile(saturation, 65))
    sample = source[mask]
    if sample.size:
        median = np.median(sample, axis=0)
        gain = np.clip(np.array(BACKGROUND) / np.maximum(median, 1), 0.88, 1.16)
        source = np.clip(source.astype(np.float32) * gain, 0, 255).astype(np.uint8)

    lab = cv2.cvtColor(source, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(lab)
    low, high = np.percentile(l, (0.5, 99.5))
    if high - low > 32:
        l = np.clip((l.astype(np.float32) - low) * 247 / (high - low) + 4, 0, 255).astype(np.uint8)
        l = cv2.LUT(l, np.array([255 * (x / 255) ** 0.97 for x in range(256)], dtype=np.uint8))
    return Image.fromarray(cv2.cvtColor(cv2.merge((l, a, b)), cv2.COLOR_LAB2RGB))


def render(image: Image.Image, framed: bool, size: tuple[int, int]) -> Image.Image:
    image = correct_photo(image)
    margin = (int(size[0] * 0.085), int(size[1] * 0.10))
    fitted = ImageOps.contain(
        image,
        (size[0] - margin[0] * 2, size[1] - margin[1] * 2),
        Image.Resampling.LANCZOS,
    )
    canvas = Image.new("RGB", size, BACKGROUND)
    offset = ((size[0] - fitted.width) // 2, (size[1] - fitted.height) // 2)

    # A very soft contact shadow distinguishes a framed or mounted original from
    # the background without imitating a digitally composited cut-out.
    if framed:
        alpha = Image.new("L", size, 0)
        alpha.paste(45, (offset[0] + 3, offset[1] + 6, offset[0] + fitted.width + 3, offset[1] + fitted.height + 6))
        alpha = alpha.filter(ImageFilter.GaussianBlur(max(5, size[0] // 150)))
        canvas.paste(Image.new("RGB", size, (212, 214, 216)), (0, 0), alpha)
    canvas.paste(fitted, offset)
    return canvas


def save(image: Image.Image, path: Path, quality: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "WEBP", quality=quality, method=6)


def register_provenance(assets: Path, drawings: list[Drawing]) -> None:
    """Add or refresh the traceable records for these derived assets."""
    provenance_path = Path("docs/procedencia-imagenes.json")
    records = json.loads(provenance_path.read_text(encoding="utf-8"))
    originals = {
        record["archivo_id"]: record["original"]
        for record in records
        if record.get("asset", "").startswith("assets/arc-")
    }
    generated_assets = {
        f"assets/drawing-{drawing.archive_id}-catalogue.webp"
        for drawing in drawings
    } | {
        f"assets/thumb-drawing-{drawing.archive_id}-catalogue.webp"
        for drawing in drawings
    }
    records = [record for record in records if record.get("asset") not in generated_assets]

    for drawing in drawings:
        original = originals.get(f"ARC-{drawing.archive_id}")
        if not original:
            raise ValueError(f"No se encontró la procedencia original de ARC-{drawing.archive_id}")
        asset = f"drawing-{drawing.archive_id}-catalogue"
        method = (
            "Versión de catálogo asistida para reiluminación y limpieza del fondo: referencia "
            "calibrada a blanco frío-neutro #F5F6F7 y luz de galería; dibujo, firma, marco, "
            "textura y proporciones preservados; original intacto"
            if drawing.archive_id in GENERATIVE_ASSISTED
            else "Versión de catálogo no generativa: encuadre común 3:2, fondo de referencia "
            "calibrado a blanco frío-neutro #F5F6F7, balance de blancos y corrección tonal "
            "global; dibujo, firma, textura, desgaste y proporciones preservados; original intacto"
        )
        records.append(
            {
                "asset": f"assets/{asset}.webp",
                "archivo_id": f"ARC-{drawing.archive_id}",
                "original": original,
                "transformacion": method,
                "width": FULL_SIZE[0],
                "height": FULL_SIZE[1],
            }
        )
        records.append(
            {
                "asset": f"assets/thumb-{asset}.webp",
                "archivo_id": f"ARC-{drawing.archive_id}",
                "original": original,
                "transformacion": "Miniatura proporcional de la versión de catálogo; original y versión sin retoque conservados",
                "width": THUMB_SIZE[0],
                "height": THUMB_SIZE[1],
            }
        )
    with provenance_path.open("w", encoding="utf-8", newline="\n") as output:
        json.dump(records, output, ensure_ascii=False, indent=2)
        output.write("\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--assets", type=Path, default=Path("dist/assets"))
    parser.add_argument("--only", choices=[drawing.archive_id for drawing in DRAWINGS])
    parser.add_argument("--provenance", action="store_true")
    args = parser.parse_args()

    drawings = [drawing for drawing in DRAWINGS if not args.only or drawing.archive_id == args.only]
    for drawing in drawings:
        if drawing.archive_id in PRESERVE_EXISTING and not args.only:
            print(f"{drawing.archive_id} -> se conserva la versión ya corregida")
            continue
        source_path = args.assets / f"{drawing.source}.webp"
        with Image.open(source_path) as source:
            cropped = crop(ImageOps.exif_transpose(source).convert("RGB"), drawing.crop)
        full = render(cropped, drawing.framed, FULL_SIZE)
        stem = f"drawing-{drawing.archive_id}-catalogue"
        save(full, args.assets / f"{stem}.webp", 94)
        thumb = full.copy()
        thumb.thumbnail(THUMB_SIZE, Image.Resampling.LANCZOS)
        save(thumb, args.assets / f"thumb-{stem}.webp", 88)
        print(f"{drawing.archive_id} -> {stem}.webp ({full.width}x{full.height})")
    if args.provenance:
        register_provenance(args.assets, drawings)


if __name__ == "__main__":
    main()
