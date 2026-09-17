"""Create neutral-white, non-destructive versions of the mobile studio photos.

Only low-saturation, bright background pixels are lifted toward a common neutral
white. Colourful and dark pixels, which make up the works and their hardware,
are left untouched. The source assets always remain available alongside these
new versions.
"""

from __future__ import annotations

import colorsys
from pathlib import Path

from PIL import Image


ASSET_DIR = Path("dist/assets")
STEMS = (
    "014680", "014685", "014689", "014696", "014701", "014707", "014712",
    "014715", "014718", "014722", "014725", "014728", "014734", "014740",
    "014746", "014750", "014755", "014761", "014765", "014768", "014771",
)
TARGET_WHITE = (248, 249, 250)


def normalize(image: Image.Image) -> Image.Image:
    """Lift only bright, neutral background tones while retaining image detail."""
    image = image.convert("RGB")
    pixels = image.load()
    width, height = image.size

    for y in range(height):
        for x in range(width):
            red, green, blue = pixels[x, y]
            hue, saturation, value = colorsys.rgb_to_hsv(red / 255, green / 255, blue / 255)
            del hue

            # A feathered mask limits the correction to the neutral studio field.
            brightness = max(0.0, min(1.0, (value - 0.72) / 0.28))
            neutrality = max(0.0, min(1.0, (0.15 - saturation) / 0.15))
            amount = brightness * neutrality * 0.82
            if amount:
                pixels[x, y] = tuple(
                    round(channel + (target - channel) * amount)
                    for channel, target in zip((red, green, blue), TARGET_WHITE)
                )

    return image


def render(stem: str) -> None:
    for suffix in ("", "-thumb"):
        source = ASSET_DIR / f"gallery-{stem}{suffix}.webp"
        destination = ASSET_DIR / f"studio-neutral-{stem}{suffix}.webp"
        with Image.open(source) as source_image:
            normalized = normalize(source_image)
            normalized.save(destination, "WEBP", quality=92 if not suffix else 86, method=6)


def main() -> None:
    for stem in STEMS:
        render(stem)


if __name__ == "__main__":
    main()
