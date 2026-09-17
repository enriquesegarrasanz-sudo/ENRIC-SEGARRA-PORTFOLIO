"""Prepare the consolidated Sala d'Exposicions de les Belles Arts archive.

The source folders remain untouched. This script only creates proportional WebP
derivatives, registers their provenance, and writes the static browser data.
"""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageOps


REPO = Path(__file__).resolve().parents[1]
PHOTOS = REPO.parent
ASSETS = REPO / "dist" / "assets"
MANIFEST = REPO / "docs" / "procedencia-imagenes.json"
OUTPUT = REPO / "dist" / "bellas-arts.js"
INVENTORY = PHOTOS / "PROPUESTA_PORTFOLIO" / "inventario_archivos.json"
FULL_SIZE = (1800, 1350)
THUMB_SIZE = (720, 540)

KIDS = (
    PHOTOS
    / "ARTE INFATIL Y PASADO"
    / "EXPOSICIÓN  ARTE INFANTIL Sala de Exposicions de les Belles Arts"
)
COLLECTIVE = (
    PHOTOS
    / "ARTE INFATIL Y PASADO"
    / "ENRIC SEGARRA OBRA"
    / "EXPO GALERÍA D´ART DE LES BELLES ARTS"
)
EVOLUTION = (
    PHOTOS
    / "ARTE INFATIL Y PASADO"
    / "FOTOS SALA D´EXPOSICIONS"
    / "dibuixos i pintures enric segarra"
)

EVOLUTION_RESTORED = {
    "ARC-013392": ("evolucion-013392-restored", "thumb-evolucion-013392-restored"),
    "ARC-013393": ("evolucion-013393-restored", "thumb-evolucion-013393-restored"),
    "ARC-013394": ("evolucion-013394-restored", "thumb-evolucion-013394-restored"),
    "ARC-013395": ("evolucion-013395-restored", "thumb-evolucion-013395-restored"),
    "ARC-013396": ("evolucion-013396-restored", "thumb-evolucion-013396-restored"),
    "ARC-013397": ("evolucion-013397-restored", "thumb-evolucion-013397-restored"),
    "ARC-013399": ("evolucion-013399-restored", "thumb-evolucion-013399-restored"),
    "ARC-013400": ("evolucion-013400-restored", "thumb-evolucion-013400-restored"),
    "ARC-013401": ("evolucion-013401-restored", "thumb-evolucion-013401-restored"),
    "ARC-013402": ("evolucion-013402-restored", "thumb-evolucion-013402-restored"),
    "ARC-013403": ("evolucion-013403-restored", "thumb-evolucion-013403-restored"),
    "ARC-013404": ("evolucion-013404-restored", "thumb-evolucion-013404-restored"),
    "ARC-013405": ("evolucion-013405-restored", "thumb-evolucion-013405-restored"),
    "ARC-013406": ("evolucion-013406-restored", "thumb-evolucion-013406-restored"),
    "ARC-013419": ("evolucion-013419-restored", "thumb-evolucion-013419-restored"),
    "ARC-013413": ("evolucion-013413-restored", "thumb-evolucion-013413-restored"),
}


def source_files(folder: Path) -> list[Path]:
    return sorted(
        (p for p in folder.rglob("*") if p.suffix.lower() in {".jpg", ".jpeg"}),
        key=lambda p: (str(p.parent).lower(), p.name.lower()),
    )


def output_names(archive_id: str) -> tuple[str, str]:
    stem = f"bellas-{archive_id.lower()}"
    return stem, f"thumb-{stem}"


def save_scaled(source: Path, name: str, size: tuple[int, int], quality: int) -> tuple[int, int]:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        source_size = image.size
        image.thumbnail(size, Image.Resampling.LANCZOS)
        image.save(ASSETS / f"{name}.webp", "WEBP", quality=quality, method=6)
    return source_size


def main() -> None:
    inventory = json.loads(INVENTORY.read_text(encoding="utf-8"))
    by_path = {entry["ruta"].replace("/", "\\"): entry["id"] for entry in inventory}
    records: list[dict[str, str]] = []
    room_only = {
        "ARC-013398",
        "ARC-013408",
        "ARC-013409",
        "ARC-013410",
        "ARC-013411",
        "ARC-013412",
    }

    groups = [
        (
            "Arte infantil · obras de participantes",
            "Las obras corresponden a participantes de la actividad educativa desarrollada por Enric.",
            KIDS,
        ),
        (
            "Muestra colectiva · contexto documental",
            "Las pinturas y esculturas de esta muestra colectiva se conservan como contexto documental; no se atribuyen a Enric.",
            COLLECTIVE,
        ),
        (
            "Evolución 1984–2004 · obra de Enric",
            "Vistas de la exposición de Enric Segarra celebrada en 2005.",
            EVOLUTION,
        ),
    ]
    for group, attribution, folder in groups:
        for source in source_files(folder):
            relative = str(source.relative_to(PHOTOS)).replace("/", "\\")
            archive_id = by_path[relative]
            if (
                folder == EVOLUTION
                and archive_id not in EVOLUTION_RESTORED
                and archive_id not in room_only
            ):
                continue
            image, thumb = EVOLUTION_RESTORED.get(archive_id, output_names(archive_id))
            if archive_id not in EVOLUTION_RESTORED:
                source_size = save_scaled(source, image, FULL_SIZE, 91)
                save_scaled(source, thumb, THUMB_SIZE, 85)
            else:
                with Image.open(source) as original:
                    source_size = ImageOps.exif_transpose(original).size
            records.append(
                {
                    "image": image,
                    "thumb": thumb,
                    "archiveId": archive_id,
                    "alt": f"Sala d’Exposicions de les Belles Arts · {group} · {source.name}",
                    "sourceName": source.name,
                    "contentKey": archive_id,
                    "galleryGroup": group,
                    "attribution": attribution,
                    "original": relative,
                    "width": source_size[0],
                    "height": source_size[1],
                }
            )

    public = [
        {
            key: record[key]
            for key in ("image", "thumb", "archiveId", "alt", "sourceName", "contentKey", "galleryGroup", "attribution")
        }
        for record in records
    ]
    OUTPUT.write_text(
        "// Generado por scripts/prepare-bellas-arts-archive.py. No editar a mano.\n"
        + "export const bellasArtsGallery = "
        + json.dumps(public, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    present = {entry["asset"] for entry in manifest}
    for record in records:
        if record["archiveId"] in EVOLUTION_RESTORED:
            continue
        for asset, role in ((record["image"], "vista"), (record["thumb"], "miniatura")):
            key = f"assets/{asset}.webp"
            if key not in present:
                manifest.append(
                    {
                        "asset": key,
                        "original": record["original"],
                        "width": record["width"],
                        "height": record["height"],
                        "transformation": f"Orientación EXIF aplicada y reducción proporcional para {role}; sin recorte ni retoque creativo.",
                    }
                )
                present.add(key)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(public)} fotografías de la Sala de Bellas Artes preparadas.")


if __name__ == "__main__":
    main()
