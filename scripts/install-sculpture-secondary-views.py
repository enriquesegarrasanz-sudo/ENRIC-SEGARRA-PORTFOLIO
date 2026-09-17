"""Install reviewed secondary sculpture views without replacing their sources."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from PIL import Image, ImageOps


ASSETS = Path("dist/assets")
CATALOGUE = Path("dist/catalogue.js")
PROVENANCE = Path("docs/procedencia-imagenes.json")
THUMB_MAX = (768, 512)


def parse_edit(value: str) -> tuple[str, str, Path]:
    try:
        reference, archive_id, rendered = value.split("|", 2)
    except ValueError as error:
        raise argparse.ArgumentTypeError(
            "Each --edit needs ESC-000|ARC-000000|path-to-reviewed-image"
        ) from error
    return reference, archive_id, Path(rendered)


def install_view(
    source: str,
    reference: str,
    archive_id: str,
    rendered: Path,
    provenance: list[dict[str, object]],
) -> str:
    reference_marker = f'"reference": "{reference}"'
    start = source.find(reference_marker)
    if start < 0:
        raise ValueError(f"No se encuentra {reference}")
    end = source.find('\n  {\n    "id":', start)
    if end < 0:
        end = source.find("\n];", start)
    archive_marker = f'"archiveId": "{archive_id}"'
    archive = source.find(archive_marker, start, end)
    if archive < 0:
        raise ValueError(f"No se encuentra {archive_id} en {reference}")

    view_start = source.rfind("      {", start, archive)
    view_end = source.find("\n      }", archive, end) + len("\n      }")
    gallery_start = source.rfind('"gallery": [', start, archive)
    view_number = source[gallery_start:archive].count('"archiveId": ') + 1
    work_number = reference.removeprefix("ESC-")
    asset_stem = f"gallery-esc-{work_number}-view-{view_number}"
    thumb_stem = f"thumb-{asset_stem}"

    source_asset = f"assets/arc-{archive_id.removeprefix('ARC-')}.webp"
    provenance_by_asset = {item["asset"]: item for item in provenance}
    original = provenance_by_asset.get(source_asset)
    if original is None:
        raise ValueError(f"No hay procedencia para {source_asset}")

    original_path = ASSETS / Path(source_asset).name
    with Image.open(original_path) as original_image, Image.open(rendered) as reviewed:
        width, height = original_image.size
        reviewed = ImageOps.exif_transpose(reviewed).convert("RGB")
        expected_ratio = width / height
        reviewed_ratio = reviewed.width / reviewed.height
        if abs(expected_ratio - reviewed_ratio) > 0.015:
            raise ValueError(
                f"La proporción revisada de {archive_id} no conserva el encuadre "
                f"({reviewed_ratio:.3f} frente a {expected_ratio:.3f})"
            )
        full = reviewed.resize((width, height), Image.Resampling.LANCZOS)
        full_path = ASSETS / f"{asset_stem}.webp"
        full.save(full_path, "WEBP", quality=92, method=6)
        thumbnail = ImageOps.contain(full, THUMB_MAX, Image.Resampling.LANCZOS)
        thumb_path = ASSETS / f"{thumb_stem}.webp"
        thumbnail.save(thumb_path, "WEBP", quality=86, method=6)

    view = source[view_start:view_end]
    view = re.sub(r'("image": ")[^"]+(")', rf'\g<1>{asset_stem}\g<2>', view, count=1)
    view = re.sub(r'("thumb": ")[^"]+(")', rf'\g<1>{thumb_stem}\g<2>', view, count=1)
    source = source[:view_start] + view + source[view_end:]

    full_asset = f"assets/{asset_stem}.webp"
    thumb_asset = f"assets/{thumb_stem}.webp"
    if full_asset not in provenance_by_asset:
        provenance.append(
            {
                "asset": full_asset,
                "archivo_id": archive_id,
                "original": original["original"],
                "transformacion": (
                    "Versión editorial derivada de la fotografía fuente mediante "
                    "edición generativa conservadora de fondo e iluminación; escultura, "
                    "perspectiva, encuadre y proporciones preservados; fondo blanco "
                    "cálido-neutro; dimensiones originales conservadas."
                ),
                "width": width,
                "height": height,
            }
        )
    if thumb_asset not in provenance_by_asset:
        provenance.append(
            {
                "asset": thumb_asset,
                "archivo_id": archive_id,
                "original": original["original"],
                "transformacion": (
                    "Miniatura proporcional de la versión editorial; original y versión "
                    "sin retoque conservados."
                ),
                "width": thumbnail.width,
                "height": thumbnail.height,
            }
        )
    return source


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--edit", action="append", type=parse_edit, required=True)
    args = parser.parse_args()

    catalogue_bytes = CATALOGUE.read_bytes()
    provenance_bytes = PROVENANCE.read_bytes()
    newline = "\r\n" if b"\r\n" in catalogue_bytes else "\n"
    catalogue = catalogue_bytes.decode("utf-8")
    provenance = json.loads(provenance_bytes.decode("utf-8"))
    for reference, archive_id, rendered in args.edit:
        catalogue = install_view(catalogue, reference, archive_id, rendered, provenance)
    CATALOGUE.write_text(catalogue, encoding="utf-8", newline="")
    provenance_text = f"{json.dumps(provenance, ensure_ascii=False, indent=2)}\n"
    PROVENANCE.write_text(
        provenance_text.replace("\n", newline), encoding="utf-8", newline=""
    )


if __name__ == "__main__":
    main()
