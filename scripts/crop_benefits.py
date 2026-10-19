"""Crop filled photo squares from Facilities & Benefits mockup circles."""
from pathlib import Path

from PIL import Image, ImageDraw

SRC = Path(
    r"C:\Users\badar\.cursor\projects\c-Users-badar-Desktop-Comtanix-webite\assets"
    r"\c__Users_badar_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"e65063f07d5c4800726c5a49b930006f_images_2576e3_image-cfbd949a-fc08-4be7-9116-6d3421fb0ae9.png"
)
OUT = Path(r"C:\Users\badar\Desktop\Comtanix-webite\public\careers\benefits")


def crop_square(im: Image.Image, cx: int, cy: int, half: int, name: str) -> None:
    box = (cx - half, cy - half, cx + half, cy + half)
    square = im.crop(box).convert("RGB").resize((400, 400), Image.Resampling.LANCZOS)
    square.save(OUT / f"{name}.jpg", quality=95)
    print(f"saved {name} @ ({cx},{cy}) half={half}")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    print("size", w, h)

    # Inset squares fully inside each photo circle (no white card / no icon).
    names = ["salary", "medical", "bonuses", "learning", "gym", "sports"]
    centers = [
        (0.122, 0.352),
        (0.422, 0.352),
        (0.722, 0.352),
        (0.122, 0.682),
        (0.422, 0.682),
        (0.722, 0.682),
    ]
    half = 36  # stay fully inside photo circle fill

    for name, (fx, fy) in zip(names, centers):
        crop_square(im, int(w * fx), int(h * fy), half, name)

    debug = im.copy()
    draw = ImageDraw.Draw(debug)
    for fx, fy in centers:
        cx, cy = int(w * fx), int(h * fy)
        draw.rectangle(
            (cx - half, cy - half, cx + half, cy + half),
            outline=(255, 0, 0, 255),
            width=2,
        )
    debug.convert("RGB").save(OUT / "_debug.jpg", quality=90)


if __name__ == "__main__":
    main()
