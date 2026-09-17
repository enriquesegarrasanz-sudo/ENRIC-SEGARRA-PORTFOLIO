#!/usr/bin/env python3
"""Create labelled review sheets for the prepared painting assets."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "painting-all"
OUTPUT = ROOT / "tmp" / "painting-contact-sheets"
FILES_PER_SHEET = 20
CELL = (360, 270)


def main() -> None:
    files = sorted(SOURCE.glob("*-studio.webp"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    font = ImageFont.load_default(size=16)
    for sheet_index, start in enumerate(range(0, len(files), FILES_PER_SHEET), start=1):
        sheet = Image.new("RGB", (CELL[0] * 4, CELL[1] * 5), "#dededb")
        for offset, path in enumerate(files[start : start + FILES_PER_SHEET]):
            image = Image.open(path).convert("RGB")
            preview = ImageOps.contain(image, (CELL[0] - 16, CELL[1] - 36), Image.Resampling.LANCZOS)
            x = (offset % 4) * CELL[0]
            y = (offset // 4) * CELL[1]
            px = x + (CELL[0] - preview.width) // 2
            py = y + 28 + (CELL[1] - 36 - preview.height) // 2
            sheet.paste(preview, (px, py))
            ImageDraw.Draw(sheet).text((x + 8, y + 6), path.stem, fill="#111111", font=font)
        destination = OUTPUT / f"painting-review-{sheet_index}.jpg"
        sheet.save(destination, "JPEG", quality=91)
        print(destination.relative_to(ROOT))


if __name__ == "__main__":
    main()
