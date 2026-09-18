"""Regenerate catalogue thumbnails from their current full-size image."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
CATALOGUE = ROOT / "dist" / "catalogue.js"


def main() -> None:
    with CATALOGUE.open("r", encoding="utf-8", newline="") as handle:
        text = handle.read()
    changed = 0
    pattern = re.compile(r'("image": ")([^"]+)(",\s*"thumb": ")[^"]+')

    def replace(match: re.Match[str]) -> str:
        nonlocal changed
        image_name = match.group(2)
        changed += 1
        return f'{match.group(1)}{image_name}{match.group(3)}{image_name}'

    rewritten = pattern.sub(replace, text)
    with CATALOGUE.open("w", encoding="utf-8", newline="") as handle:
        handle.write(rewritten)
    print(f"Sincronizadas {changed} referencias de miniatura con su imagen principal.")


if __name__ == "__main__":
    main()
