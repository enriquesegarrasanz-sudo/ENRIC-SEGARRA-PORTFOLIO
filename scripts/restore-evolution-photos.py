"""Restore the Evolución 1984–2004 gallery photographs conservatively.

The pipeline is deliberately non-generative: it only adjusts photographic
properties and never synthesizes, removes, crops, or moves image content.
"""

from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


PHOTOS = {
    "100_0071.jpg": "013392",
    "100_0072.jpg": "013393",
    "100_0073.jpg": "013394",
    "100_0074.jpg": "013395",
    "100_0075.jpg": "013396",
    "100_0076.jpg": "013397",
    "100_0079.jpg": "013399",
    "100_0080.jpg": "013400",
    "100_0081.jpg": "013401",
    "100_0082.jpg": "013402",
    "100_0083.jpg": "013403",
    "100_0084.jpg": "013404",
    "100_0085.jpg": "013405",
    "100_0086.jpg": "013406",
    "100_0087.jpg": "013419",
    "100_0093.jpg": "013413",
}


def restore(source: Path) -> Image.Image:
    image = cv2.imdecode(np.fromfile(source, dtype=np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError(f"No se pudo abrir {source}")

    # Remove only the coarse colour noise typical of the compact camera.
    image = cv2.fastNlMeansDenoisingColored(image, None, 2, 2, 7, 21)

    # Estimate the colour cast from the brightest quarter of the gallery walls.
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB).astype(np.float32)
    luminance, channel_a, channel_b = cv2.split(lab)
    bright = luminance >= np.percentile(luminance, 74)
    mean_a = float(np.median(channel_a[bright]))
    mean_b = float(np.median(channel_b[bright]))
    light_weight = np.power(luminance / 255.0, 0.72)
    correction_strength = 0.72
    channel_a -= (mean_a - 128.0) * light_weight * correction_strength
    channel_b -= (mean_b - 132.0) * light_weight * correction_strength

    # Open shadows and control highlights without changing local geometry.
    luminance_u8 = np.clip(luminance, 0, 255).astype(np.uint8)
    clahe = cv2.createCLAHE(clipLimit=1.45, tileGridSize=(8, 8))
    equalized = clahe.apply(luminance_u8)
    luminance = cv2.addWeighted(luminance_u8, 0.42, equalized, 0.58, 0)
    curve = np.array(
        [255.0 * np.power(index / 255.0, 0.93) for index in range(256)],
        dtype=np.uint8,
    )
    luminance = cv2.LUT(luminance, curve)

    corrected_lab = cv2.merge(
        (
            luminance,
            np.clip(channel_a, 0, 255).astype(np.uint8),
            np.clip(channel_b, 0, 255).astype(np.uint8),
        )
    )
    corrected = cv2.cvtColor(corrected_lab, cv2.COLOR_LAB2BGR)

    # Two-times Lanczos enlargement: interpolated pixels only, no invented forms.
    corrected = cv2.resize(
        corrected,
        None,
        fx=2.0,
        fy=2.0,
        interpolation=cv2.INTER_LANCZOS4,
    )

    # Restrained edge sharpening, with a threshold to avoid sharpening grain.
    blurred = cv2.GaussianBlur(corrected, (0, 0), 1.05)
    detail = corrected.astype(np.int16) - blurred.astype(np.int16)
    detail[np.abs(detail) < 3] = 0
    sharpened = np.clip(corrected.astype(np.int16) + detail * 0.38, 0, 255)

    # Deterministic, monochrome fine grain to retain the archival photograph feel.
    seed = int.from_bytes(hashlib.sha256(source.name.encode()).digest()[:8], "big")
    rng = np.random.default_rng(seed)
    grain = rng.normal(0.0, 0.75, sharpened.shape[:2])[..., None]
    finished = np.clip(sharpened + grain, 0, 255).astype(np.uint8)
    return Image.fromarray(cv2.cvtColor(finished, cv2.COLOR_BGR2RGB))


def save_webp(image: Image.Image, path: Path, quality: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "WEBP", quality=quality, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source_dir", type=Path)
    parser.add_argument("output_dir", type=Path)
    parser.add_argument(
        "--only",
        choices=tuple(PHOTOS),
        help="Procesa solo una fotografía para revisar el revelado.",
    )
    args = parser.parse_args()

    selected = {args.only: PHOTOS[args.only]} if args.only else PHOTOS
    for filename, archive_number in selected.items():
        restored = restore(args.source_dir / filename)
        full_path = args.output_dir / f"evolucion-{archive_number}-restored.webp"
        thumb_path = args.output_dir / f"thumb-evolucion-{archive_number}-restored.webp"
        save_webp(restored, full_path, quality=94)
        thumbnail = restored.copy()
        thumbnail.thumbnail((800, 800), Image.Resampling.LANCZOS)
        save_webp(thumbnail, thumb_path, quality=88)
        print(f"{filename} -> {full_path.name} ({restored.width}x{restored.height})")


if __name__ == "__main__":
    main()
