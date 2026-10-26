"""Pakistani skyline only in upper exterior glass — restore laptop/desk from original."""
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw
import numpy as np

base_path = r"c:\Users\badar\Desktop\Comtanix-webite\public\hero-home-v9.jpg"
sky_path = r"C:\Users\badar\.cursor\projects\c-Users-badar-Desktop-Comtanix-webite\assets\islamabad-faisal-mosque-skyline.jpg"
out_path = r"c:\Users\badar\Desktop\Comtanix-webite\public\hero-home-v10.jpg"

base = Image.open(base_path).convert("RGB")
sky_src = Image.open(sky_path).convert("RGB")
w, h = base.size

# Skyline fitted to upper window strip only
sky_band = sky_src.resize((w, int(h * 0.55)), Image.Resampling.LANCZOS)
sky = Image.new("RGB", (w, h), (0, 0, 0))
sky.paste(sky_band, (0, int(h * 0.0)))
sky = ImageEnhance.Brightness(sky).enhance(0.95)
sky = ImageEnhance.Color(sky).enhance(1.05)

arr = np.asarray(base).astype(np.float32)
sky_a = np.asarray(sky).astype(np.float32)
lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

# Window glass mask — upper area only
mask = np.zeros((h, w), dtype=np.float32)
mask[0 : int(h * 0.46), int(w * 0.24) : w] = 1.0
mask_img = Image.fromarray((mask * 255).astype(np.uint8), "L").filter(
    ImageFilter.GaussianBlur(12)
)
mask = np.asarray(mask_img).astype(np.float32) / 255.0

# Hard zero below mid — desk / chairs / most of laptop body
mask[int(h * 0.47) :, :] = 0.0

# Protect dark frames
mask *= 1.0 - np.clip((68 - lum) / 48, 0, 1) * 0.98

# Explicitly clear laptop + plant + mug zone (center foreground object cluster)
# Approximate bounding region covering reflective lid that sits mid-frame
clear = Image.new("L", (w, h), 0)
draw = ImageDraw.Draw(clear)
# Laptop lid / body ellipse-ish box
draw.ellipse(
    (int(w * 0.22), int(h * 0.28), int(w * 0.62), int(h * 0.82)),
    fill=255,
)
# Desk plant/mug right of laptop
draw.ellipse(
    (int(w * 0.52), int(h * 0.40), int(w * 0.78), int(h * 0.88)),
    fill=255,
)
clear = clear.filter(ImageFilter.GaussianBlur(18))
clear_a = np.asarray(clear).astype(np.float32) / 255.0
mask *= 1.0 - clear_a

mask = np.clip(mask, 0, 1)
mask3 = mask[:, :, None]
out = arr * (1 - mask3) + sky_a * mask3
out = np.clip(out, 0, 255).astype(np.uint8)
result = Image.fromarray(out)

# Final safety: paste original interior from a soft bottom+center matte
restore = Image.new("L", (w, h), 0)
rd = ImageDraw.Draw(restore)
rd.rectangle((0, int(h * 0.48), w, h), fill=255)
rd.ellipse((int(w * 0.18), int(h * 0.30), int(w * 0.70), int(h * 0.95)), fill=255)
restore = restore.filter(ImageFilter.GaussianBlur(10))
result = Image.composite(base, result, restore)

result.save(out_path, quality=93, optimize=True)
print("saved", out_path)
