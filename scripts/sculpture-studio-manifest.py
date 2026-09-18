"""List and mark secondary sculpture views that still need studio treatment."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CATALOGUE = ROOT / "dist" / "catalogue.js"
PROVENANCE = ROOT / "docs" / "procedencia-imagenes.json"
ASSETS = ROOT / "dist" / "assets"
STUDIO_NOTE = (
    "Versión horizontal de estudio derivada de la fotografía de archivo mediante "
    "edición generativa controlada: fondo neutro profesional, luz de estudio "
    "uniforme, encuadre 3:2 y obra completa preservada."
)


def load() -> tuple[str, list[dict]]:
    return CATALOGUE.read_text(encoding="utf-8"), json.loads(PROVENANCE.read_text(encoding="utf-8"))


def manifest() -> list[dict]:
    catalogue, provenance = load()
    by_asset = {item["asset"]: item for item in provenance}
    by_archive: dict[str, list[dict]] = {}
    for item in provenance:
        if item.get("archivo_id"):
            by_archive.setdefault(item["archivo_id"], []).append(item)

    result = []
    for block in re.split(r"\n  \{\n    \"id\": ", catalogue):
        if '"category": "escultura"' not in block or '"gallery": [' not in block:
            continue
        reference = re.search(r'"reference": "(ESC-\d+)"', block).group(1)
        gallery = block.split('"gallery": [', 1)[1].split('\n    ]', 1)[0]
        names = re.findall(r'"image": "([^"]+)"', gallery)
        for position, target in enumerate(names, start=1):
            if position == 1:
                continue
            record = by_asset[f"assets/{target}.webp"]
            if "generativa" in record.get("transformacion", ""):
                continue
            choices = [
                item for item in by_archive.get(record["archivo_id"], [])
                if item["asset"].endswith(".webp")
                and "-horizontal" not in item["asset"]
                and (ROOT / "dist" / item["asset"]).exists()
            ]
            choices.sort(key=lambda item: (not item["asset"].startswith("assets/arc-"), item["asset"]))
            if not choices:
                raise RuntimeError(f"No source for {target}")
            source = Path(choices[0]["asset"]).stem
            result.append({
                "reference": reference,
                "source": source,
                "cover": names[0],
                "target": target,
            })
    return result


def mark(targets: set[str]) -> None:
    _, provenance = load()
    for item in provenance:
        if Path(item["asset"]).stem in targets:
            item["transformacion"] = STUDIO_NOTE
    PROVENANCE.write_text(json.dumps(provenance, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mark", nargs="*", default=None)
    args = parser.parse_args()
    if args.mark is None:
        print(json.dumps(manifest(), ensure_ascii=False))
    else:
        mark(set(args.mark))
