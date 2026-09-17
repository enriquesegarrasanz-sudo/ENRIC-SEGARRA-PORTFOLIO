#!/usr/bin/env python3
"""Prepare faithful painting photographs on the shared warm studio background.

The artwork pixels are copied from the original catalogue asset. Only backdrop
pixels confidently connected to the photograph edge are replaced. This avoids
turning pale paint, open shapes, or fine contours into background. Originals
and the first studio version are never overwritten.
"""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "dist" / "assets"
DEFAULT_BACKGROUND = ASSETS / "painting-studio-background-v2.png"
OUTPUT_VERSION = "studio-v2"

# These photographs were captured with the camera in landscape orientation even
# though the works themselves are vertical. Values use PIL's clockwise degrees.
# The list was reviewed visually against faces, horns, lettering, and signatures.
ORIENTATIONS: dict[str, int] = {
    "arc-015123": 90,
    "arc-015124": 90,
    "arc-015126": 90,
    "arc-015127": 90,
    "arc-015128": 90,
    "arc-015129": 90,
    "arc-015130": 270,
    "arc-015136": 270,
    "arc-015148": 90,
    "arc-015149": 270,
    "arc-015167": 90,
}

ELLIPTICAL_ASSETS = {
    "arc-008492",
    "arc-015106",
    "arc-015107",
    "arc-015108",
    "arc-015109",
    "arc-015110",
    "arc-015111",
    "arc-015112",
    "arc-015113",
    "arc-015114",
    "arc-015115",
    "arc-015118",
    "arc-015119",
    "arc-015202",
    "arc-015218",
    "arc-015221",
    "arc-015223",
    "arc-015240",
}

IRREGULAR_ASSETS = {
    "arc-015120",
    "arc-015128",
    "arc-015129",
    "arc-015130",
    "arc-015131",
    "arc-015132",
    "arc-015169",
    "arc-015204",
    "arc-015206",
    "arc-015234",
}

# Normalized outlines for photographs whose textured wall or pale frame cannot
# be separated reliably by colour alone. These follow the visible outer edge of
# the physical work and deliberately exclude the old wall and cast shadow.
MANUAL_MASKS: dict[str, tuple[str, list[tuple[float, float]]]] = {
    "arc-015122": ("polygon", [(0.232, 0.052), (0.826, 0.052), (0.814, 0.921), (0.251, 0.921)]),
    "arc-015138": ("polygon", [(0.030, 0.366), (0.957, 0.378), (0.949, 0.659), (0.037, 0.651)]),
    "arc-015139": ("polygon", [(0.190, 0.011), (0.951, 0.011), (0.942, 0.960), (0.249, 0.960)]),
    "arc-015141": ("polygon", [(0.043, 0.174), (0.887, 0.160), (0.855, 0.832), (0.075, 0.807)]),
    "arc-015142": ("polygon", [(0.166, 0.023), (0.787, 0.028), (0.769, 0.949), (0.196, 0.940)]),
    "arc-015143": ("polygon", [(0.030, 0.142), (0.992, 0.148), (0.952, 0.904), (0.023, 0.885)]),
    "arc-015145": ("polygon", [(0.291, 0.038), (0.808, 0.052), (0.797, 0.904), (0.306, 0.894)]),
    "arc-015146": ("polygon", [(0.011, 0.124), (0.944, 0.119), (0.911, 0.879), (0.034, 0.872)]),
    "arc-015147": ("polygon", [(0.054, 0.155), (0.899, 0.164), (0.865, 0.836), (0.043, 0.826)]),
    "arc-015168": ("polygon", [(0.047, 0.116), (0.812, 0.123), (0.897, 0.913), (0.087, 0.938)]),
    "arc-015199": ("polygon", [(0.044, 0.329), (0.924, 0.348), (0.920, 0.604), (0.052, 0.574)]),
    "arc-015200": ("polygon", [(0.236, 0.029), (0.744, 0.031), (0.733, 0.916), (0.255, 0.916)]),
    "arc-015202": ("ellipse", [(0.250, 0.016), (0.758, 0.943)]),
    "arc-015204": ("polygon", [(0.377, 0.039), (0.584, 0.039), (0.773, 0.286), (0.773, 0.691), (0.583, 0.948), (0.382, 0.948), (0.187, 0.693), (0.187, 0.283)]),
    "arc-015213": ("polygon", [(0.138, 0.225), (0.788, 0.224), (0.793, 0.785), (0.142, 0.787)]),
    "arc-015251": ("polygon", [(0.043, 0.096), (0.944, 0.105), (0.923, 0.901), (0.049, 0.898)]),
}


def painting_assets() -> list[str]:
    script = (
        "import('./dist/catalogue.js').then(({catalogue})=>"
        "console.log(JSON.stringify(catalogue.filter(x=>x.category==='pintura')"
        ".map(x=>x.image))))"
    )
    result = subprocess.run(
        ["node", "--input-type=module", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return [
        name.removesuffix("-studio-v2").removesuffix("-studio")
        for name in json.loads(result.stdout)
    ]


def _border_samples(lab: np.ndarray, width: int) -> np.ndarray:
    return np.concatenate(
        [
            lab[:width, :, :].reshape(-1, 3),
            lab[-width:, :, :].reshape(-1, 3),
            lab[:, :width, :].reshape(-1, 3),
            lab[:, -width:, :].reshape(-1, 3),
        ],
        axis=0,
    ).astype(np.float32)


def _manual_mask(asset: str, size: tuple[int, int]) -> Image.Image | None:
    specification = MANUAL_MASKS.get(asset)
    if specification is None:
        return None
    shape, normalized = specification
    width, height = size
    points = np.array(
        [[round(x * width), round(y * height)] for x, y in normalized], dtype=np.int32
    )
    mask = np.zeros((height, width), dtype=np.uint8)
    if shape == "ellipse":
        (x0, y0), (x1, y1) = points
        cv2.ellipse(
            mask,
            ((x0 + x1) // 2, (y0 + y1) // 2),
            (abs(x1 - x0) // 2, abs(y1 - y0) // 2),
            0,
            0,
            360,
            255,
            thickness=cv2.FILLED,
        )
    else:
        cv2.fillPoly(mask, [points], 255)
    return Image.fromarray(mask, mode="L").filter(ImageFilter.GaussianBlur(radius=0.85))


def artwork_mask(image: Image.Image, asset: str) -> Image.Image:
    """Return a conservative antialiased mask for pixels that must be preserved."""
    manual = _manual_mask(asset, image.size)
    if manual is not None:
        return manual
    rgb = np.asarray(image.convert("RGB"))
    height, width = rgb.shape[:2]
    lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB).astype(np.float32)
    border_width = max(8, int(min(width, height) * 0.018))
    samples = _border_samples(lab, border_width)

    # A few colour centres model only the photographed wall/background. The
    # threshold is deliberately strict: uncertain pixels always remain original.
    sample_step = max(1, len(samples) // 18000)
    compact = samples[::sample_step]
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 80, 0.25)
    _score, _labels, centres = cv2.kmeans(
        compact,
        4,
        None,
        criteria,
        5,
        cv2.KMEANS_PP_CENTERS,
    )
    distances = np.min(
        np.linalg.norm(lab[:, :, None, :] - centres[None, None, :, :], axis=3),
        axis=2,
    )

    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    gradient_x = cv2.Sobel(gray, cv2.CV_32F, 1, 0, ksize=3)
    gradient_y = cv2.Sobel(gray, cv2.CV_32F, 0, 1, ksize=3)
    gradient = cv2.magnitude(gradient_x, gradient_y)

    # Only smooth pixels very close to a sampled border colour can be removed,
    # and only when connected to an outer edge. No contour simplification,
    # closing, convex hull, or inferred fill is allowed.
    candidate = ((distances < 18.0) & (gradient < 38.0)).astype(np.uint8)
    _count, labels = cv2.connectedComponents(candidate, connectivity=8)
    edge_labels = np.unique(
        np.concatenate(
            [labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]]
        )
    )
    edge_labels = edge_labels[edge_labels != 0]
    background = np.isin(labels, edge_labels).astype(np.uint8) * 255
    foreground = 255 - background

    # For conventional canvases and panels, preserve the complete physical
    # surface inside its outer edge. This prevents pale painted regions from
    # being mistaken for wall. Irregular silhouettes keep the conservative
    # pixel mask above and are never forced into a geometric outline.
    if asset not in IRREGULAR_ASSETS:
        cleaned = cv2.morphologyEx(
            (foreground > 0).astype(np.uint8),
            cv2.MORPH_OPEN,
            cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)),
        )
        count, component_labels, stats, _centroids = cv2.connectedComponentsWithStats(
            cleaned, connectivity=8
        )
        if count > 1:
            candidates = [
                index
                for index in range(1, count)
                if stats[index, cv2.CC_STAT_AREA] > width * height * 0.025
            ]
            if candidates:
                largest = max(candidates, key=lambda index: stats[index, cv2.CC_STAT_AREA])
                component = (component_labels == largest).astype(np.uint8)
                contours, _hierarchy = cv2.findContours(
                    component, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
                )
                contour = max(contours, key=cv2.contourArea)
                geometric = np.zeros_like(foreground)
                if asset in ELLIPTICAL_ASSETS and len(contour) >= 5:
                    ellipse = cv2.fitEllipse(contour)
                    cv2.ellipse(geometric, ellipse, 255, thickness=cv2.FILLED)
                else:
                    rectangle = cv2.minAreaRect(contour)
                    (cx, cy), (rw, rh), angle = rectangle
                    expanded = ((cx, cy), (rw + 5, rh + 5), angle)
                    box = np.int32(np.round(cv2.boxPoints(expanded)))
                    cv2.fillPoly(geometric, [box], 255)
                foreground = geometric

    mask = Image.fromarray(foreground, mode="L").filter(ImageFilter.GaussianBlur(radius=0.75))
    return mask


def orient_original(original: Image.Image, asset: str) -> Image.Image:
    degrees = ORIENTATIONS.get(asset, 0)
    if degrees == 90:
        return original.transpose(Image.Transpose.ROTATE_270)
    if degrees == 270:
        return original.transpose(Image.Transpose.ROTATE_90)
    return original


def fit_background(background: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_width, target_height = size
    source_ratio = background.width / background.height
    target_ratio = target_width / target_height
    if source_ratio > target_ratio:
        crop_width = int(background.height * target_ratio)
        left = (background.width - crop_width) // 2
        background = background.crop((left, 0, left + crop_width, background.height))
    else:
        crop_height = int(background.width / target_ratio)
        top = (background.height - crop_height) // 2
        background = background.crop((0, top, background.width, top + crop_height))
    return background.resize(size, Image.Resampling.LANCZOS)


def render(
    source: Path,
    background: Image.Image,
    destination: Path,
    mask_path: Path | None,
    thumb_path: Path | None = None,
) -> None:
    original = orient_original(Image.open(source).convert("RGB"), source.stem)
    mask = artwork_mask(original, source.stem)
    canvas = fit_background(background, original.size)

    result = Image.composite(original, canvas, mask)
    destination.parent.mkdir(parents=True, exist_ok=True)
    result.save(destination, "WEBP", quality=91, method=6)
    if thumb_path is not None:
        thumb = ImageOps.contain(result, (560, 560), Image.Resampling.LANCZOS)
        thumb.save(thumb_path, "WEBP", quality=86, method=6)
    if mask_path is not None:
        mask_path.parent.mkdir(parents=True, exist_ok=True)
        mask.save(mask_path, "PNG")


def activate_assets(assets: list[str]) -> None:
    catalogue_path = ROOT / "dist" / "catalogue.js"
    catalogue = catalogue_path.read_text(encoding="utf-8")
    for asset in assets:
        suffix = asset.removeprefix("arc-")
        catalogue = catalogue.replace(f'"{asset}-studio"', f'"{asset}-{OUTPUT_VERSION}"')
        catalogue = catalogue.replace(
            f'"thumb-{suffix}-studio"', f'"thumb-{suffix}-{OUTPUT_VERSION}"'
        )
    catalogue_path.write_text(catalogue, encoding="utf-8", newline="\n")

    provenance_path = ROOT / "docs" / "procedencia-imagenes.json"
    provenance = json.loads(provenance_path.read_text(encoding="utf-8"))
    indexed = {entry["asset"]: entry for entry in provenance}
    additions: list[dict[str, object]] = []
    for asset in assets:
        suffix = asset.removeprefix("arc-")
        source_key = f"assets/{asset}.webp"
        base = indexed[source_key]
        with Image.open(ASSETS / f"{asset}-{OUTPUT_VERSION}.webp") as full:
            full_size = full.size
        with Image.open(ASSETS / f"thumb-{suffix}-{OUTPUT_VERSION}.webp") as thumb:
            thumb_size = thumb.size
        additions.extend(
            [
                {
                    "asset": f"assets/{asset}-{OUTPUT_VERSION}.webp",
                    "archivo_id": base["archivo_id"],
                    "original": base["original"],
                    "transformacion": "Fotografía original conservada sin reinterpretación generativa; orientación revisada manualmente cuando corresponde; sustitución exclusiva de píxeles de fondo confirmados y conectados al borde por fondo de estudio blanco cálido generado con IA; sin simplificar, rellenar ni reconstruir el contorno; original y primera versión intactos",
                    "width": full_size[0],
                    "height": full_size[1],
                },
                {
                    "asset": f"assets/thumb-{suffix}-{OUTPUT_VERSION}.webp",
                    "archivo_id": base["archivo_id"],
                    "original": base["original"],
                    "transformacion": "Miniatura proporcional de la segunda versión de estudio; orientación, obra, marco y proporciones conservados; original intacto",
                    "width": thumb_size[0],
                    "height": thumb_size[1],
                },
            ]
        )

    background_key = "assets/painting-studio-background-v2.png"
    if background_key not in indexed:
        additions.append(
            {
                "asset": background_key,
                "archivo_id": "GENERATED-PAINTING-BACKGROUND-002",
                "original": "Referencia visual facilitada para este encargo: escultura sobre fondo de estudio",
                "transformacion": "Segunda versión del fondo maestro vacío generada con IA: blanco cálido, gradación radial suave y superficie limpia sin textura visible",
                "width": 1536,
                "height": 1024,
            }
        )
    existing_assets = set(indexed)
    provenance.extend(entry for entry in additions if entry["asset"] not in existing_assets)
    provenance_path.write_text(
        json.dumps(provenance, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--background", type=Path, default=DEFAULT_BACKGROUND)
    parser.add_argument("--output-dir", type=Path, default=ROOT / "tmp" / "painting-preview")
    parser.add_argument("--mask-dir", type=Path)
    parser.add_argument("--ids", nargs="*")
    parser.add_argument("--final", action="store_true")
    parser.add_argument("--activate", action="store_true")
    args = parser.parse_args()

    if not args.background.is_absolute():
        args.background = ROOT / args.background
    if not args.output_dir.is_absolute():
        args.output_dir = ROOT / args.output_dir
    if args.mask_dir is not None and not args.mask_dir.is_absolute():
        args.mask_dir = ROOT / args.mask_dir

    background = Image.open(args.background).convert("RGB")
    selected = args.ids or painting_assets()
    if args.final:
        args.output_dir = ASSETS
    for asset in selected:
        source = ASSETS / f"{asset}.webp"
        destination = args.output_dir / f"{asset}-{OUTPUT_VERSION}.webp"
        thumb_path = None
        if args.final:
            suffix = asset.removeprefix("arc-")
            thumb_path = ASSETS / f"thumb-{suffix}-{OUTPUT_VERSION}.webp"
        mask_path = args.mask_dir / f"{asset}-mask.png" if args.mask_dir else None
        render(source, background, destination, mask_path, thumb_path)
        print(destination.relative_to(ROOT))
    if args.activate:
        if not args.final:
            raise SystemExit("--activate requiere --final")
        activate_assets(selected)
        print("Catálogo y procedencia actualizados")


if __name__ == "__main__":
    main()
