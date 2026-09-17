"""Export a reviewed sculpture view and a proportional thumbnail for the web."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


THUMB_MAX = (768, 512)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("full", type=Path)
    parser.add_argument("thumb", type=Path)
    parser.add_argument("--size", required=True, help="Exact original width,height")
    args = parser.parse_args()

    width, height = map(int, args.size.split(","))
    if width < 1 or height < 1:
        parser.error("--size needs positive width,height values")

    args.full.parent.mkdir(parents=True, exist_ok=True)
    args.thumb.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(args.source) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        # The selected reviewed versions keep the source aspect ratio. Resizing
        # to the original pixel dimensions preserves the page layout exactly.
        full = image.resize((width, height), Image.Resampling.LANCZOS)
        full.save(args.full, "WEBP", quality=92, method=6)
        thumb = ImageOps.contain(full, THUMB_MAX, Image.Resampling.LANCZOS)
        thumb.save(args.thumb, "WEBP", quality=86, method=6)


if __name__ == "__main__":
    main()
