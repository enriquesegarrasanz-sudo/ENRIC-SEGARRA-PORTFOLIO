"""Normalize generated sculpture covers for the website without cropping them."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


FULL_SIZE = (1536, 1024)
THUMB_SIZE = (768, 512)
BACKGROUND = (250, 250, 248)
GRAIN_STRENGTH = 0.012


def render(
    source: Path,
    size: tuple[int, int],
    crop_box: tuple[int, int, int, int] | None = None,
) -> Image.Image:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        if crop_box:
            image = image.crop(crop_box)
            object_area = (int(size[0] * 0.74), int(size[1] * 0.84))
            fitted = ImageOps.contain(image, object_area, Image.Resampling.LANCZOS)
        else:
            fitted = ImageOps.contain(image, size, Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", size, BACKGROUND)
    offset = ((size[0] - fitted.width) // 2, (size[1] - fitted.height) // 2)
    if crop_box:
        shadow = Image.new("L", size, 0)
        shadow.paste(
            45,
            (
                offset[0] + max(2, size[0] // 300),
                offset[1] + max(5, size[1] // 120),
                offset[0] + fitted.width + max(2, size[0] // 300),
                offset[1] + fitted.height + max(5, size[1] // 120),
            ),
        )
        shadow = shadow.filter(ImageFilter.GaussianBlur(max(6, size[0] // 100)))
        shadow_layer = Image.new("RGB", size, (215, 215, 212))
        canvas.paste(shadow_layer, (0, 0), shadow)
    canvas.paste(fitted, offset)
    # A restrained luminance grain avoids an over-smoothed generated finish
    # while keeping the sculpture's real scratches, patina and colour legible.
    grain = Image.effect_noise(size, 6).convert("RGB")
    return Image.blend(canvas, grain, GRAIN_STRENGTH)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("stem")
    parser.add_argument("--output-dir", type=Path, default=Path("dist/assets"))
    parser.add_argument(
        "--crop-box",
        help="Optional left,top,right,bottom box for a rectangular mural object.",
    )
    args = parser.parse_args()

    crop_box = tuple(map(int, args.crop_box.split(","))) if args.crop_box else None
    if crop_box and len(crop_box) != 4:
        parser.error("--crop-box needs four comma-separated integers")

    args.output_dir.mkdir(parents=True, exist_ok=True)
    render(args.source, FULL_SIZE, crop_box).save(
        args.output_dir / f"{args.stem}.webp", "WEBP", quality=92, method=6
    )
    render(args.source, THUMB_SIZE, crop_box).save(
        args.output_dir / f"thumb-{args.stem}.webp", "WEBP", quality=86, method=6
    )


if __name__ == "__main__":
    main()
