"""Normalize generated sculpture covers for the website without cropping them."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


FULL_SIZE = (1536, 1024)
THUMB_SIZE = (768, 512)
BACKGROUND = (250, 250, 248)


def render(source: Path, size: tuple[int, int]) -> Image.Image:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        fitted = ImageOps.contain(image, size, Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", size, BACKGROUND)
    offset = ((size[0] - fitted.width) // 2, (size[1] - fitted.height) // 2)
    canvas.paste(fitted, offset)
    return canvas


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("stem")
    parser.add_argument("--output-dir", type=Path, default=Path("dist/assets"))
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)
    render(args.source, FULL_SIZE).save(
        args.output_dir / f"{args.stem}.webp", "WEBP", quality=92, method=6
    )
    render(args.source, THUMB_SIZE).save(
        args.output_dir / f"thumb-{args.stem}.webp", "WEBP", quality=86, method=6
    )


if __name__ == "__main__":
    main()
