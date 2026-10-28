"""Crop exact capability card images from user reference screenshots."""
from pathlib import Path
from PIL import Image

ASSETS = Path(
    r"C:\Users\badar\.cursor\projects\c-Users-badar-Desktop-Comtanix-webite\assets"
)
DEST = Path(r"C:\Users\badar\Desktop\Comtanix-webite\public\capabilities")

ROW1 = next(ASSETS.glob("*image-1b43109b*"))
ROW2 = next(ASSETS.glob("*image-201c7c9f*"))


def inspect(path: Path) -> Image.Image:
    im = Image.open(path).convert("RGB")
    print(f"{path.name[:50]}… {im.size}")
    return im


def crop_four_images(im: Image.Image, names: list[str], out_prefix: str) -> None:
    """
    Screenshot is a horizontal row of 4 cards on dark teal.
    Each card: rounded image on top + dark text panel below.
    We crop only the photo area of each card.
    """
    w, h = im.size
    # Empirically tune: cards fill most of width with small gutters
    # Sample pixels along midline of image area to detect gaps if needed.
    # Use even split with small side/gutter margins from visual layout.
    left_margin = int(w * 0.012)
    right_margin = int(w * 0.012)
    top = int(h * 0.04)
    # Image portion is roughly upper ~58% of each card (photo vs text)
    # Full card height is almost full screenshot height.
    # Text panel is roughly bottom 32–38% of card.
    img_bottom = int(h * 0.58)
    usable = w - left_margin - right_margin
    gap = int(w * 0.012)
    card_w = (usable - 3 * gap) // 4

    for i, name in enumerate(names):
        x0 = left_margin + i * (card_w + gap)
        x1 = x0 + card_w
        box = (x0, top, x1, img_bottom)
        crop = im.crop(box)
        # Slight inset to avoid rounded corner dark edges
        inset = max(4, card_w // 40)
        crop = crop.crop((inset, inset, crop.width - inset, crop.height - inset))
        out = DEST / name
        crop.save(out, "JPEG", quality=95, optimize=True)
        print(f"  saved {name} {crop.size} from box={box}")


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)
    row1 = inspect(ROW1)
    crop_four_images(
        row1,
        [
            "ai-automation-exact.jpg",
            "software-development-exact.jpg",
            "cybersecurity-exact.jpg",
            "cloud-exact.jpg",
        ],
        "row1",
    )
    row2 = inspect(ROW2)
    # Row2 has WhatsApp float on right — crop a bit more from right side
    w, h = row2.size
    # Trim floating buttons strip (~6% right)
    row2_trim = row2.crop((0, 0, int(w * 0.94), h))
    crop_four_images(
        row2_trim,
        [
            "ecommerce-exact.jpg",
            "finance-exact.jpg",
            "business-exact.jpg",
            "marketing-exact.jpg",
        ],
        "row2",
    )


if __name__ == "__main__":
    main()
