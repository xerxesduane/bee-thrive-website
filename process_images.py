"""One-off asset pipeline for the Bee Thrive website.

Builds optimized web assets from the source brand folder:
- logo-mark.png        transparent-background logo (black square flood-filled out)
- favicon-32.png       small favicon
- apple-touch.png      180px touch icon on honey background
- og-cover.jpg         1200x630 social preview from the cover banner
- hero-1..n.jpg        resized + compressed real photos
"""
from PIL import Image
from collections import deque
import os

SRC = r"C:\Users\Xerxes Duane\Documents\bee thrive cleaning services"
OUT = r"C:\Users\Xerxes Duane\Documents\bee-thrive-website\assets"
os.makedirs(OUT, exist_ok=True)


def flood_transparent(img, tol=60):
    """Make the contiguous near-black border transparent via corner flood fill."""
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size

    def is_black(p):
        return p[0] < tol and p[1] < tol and p[2] < tol

    seen = [[False] * w for _ in range(h)]
    q = deque()
    for cx, cy in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        if is_black(px[cx, cy]):
            q.append((cx, cy))
            seen[cy][cx] = True
    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx] and is_black(px[nx, ny]):
                seen[ny][nx] = True
                q.append((nx, ny))
    return img


def bbox_crop(img):
    """Crop to the non-transparent content with a little padding."""
    bbox = img.getbbox()
    if not bbox:
        return img
    l, t, r, b = bbox
    pad = int(min(img.size) * 0.02)
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(img.size[0], r + pad); b = min(img.size[1], b + pad)
    return img.crop((l, t, r, b))


# --- Logo: transparent mark ---
logo = Image.open(os.path.join(SRC, "logo.jpg"))
mark = bbox_crop(flood_transparent(logo))
mark.save(os.path.join(OUT, "logo-mark.png"))
print("logo-mark.png", mark.size)

# Square version sized for header use (max 400px)
m = mark.copy()
m.thumbnail((400, 400), Image.LANCZOS)
m.save(os.path.join(OUT, "logo-mark@400.png"))
print("logo-mark@400.png", m.size)

# --- Favicon + touch icon (gold rounded background so it reads on any tab) ---
from PIL import ImageDraw

def on_honey(size):
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(bg)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * 0.22),
                           fill=(244, 163, 0, 255))
    icon = mark.copy()
    pad = int(size * 0.1)
    icon.thumbnail((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
    ox = (size - icon.size[0]) // 2
    oy = (size - icon.size[1]) // 2
    bg.paste(icon, (ox, oy), icon)
    return bg

on_honey(32).save(os.path.join(OUT, "favicon-32.png"))
on_honey(180).save(os.path.join(OUT, "apple-touch.png"))
# .ico with a couple of sizes
on_honey(48).save(os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("favicons done")

# --- OG / social cover (1200x630) ---
cover = Image.open(os.path.join(SRC, "cover photo.jpg")).convert("RGB")
target = (1200, 630)
cr = cover.copy()
# cover is already wide; fit-cover into 1200x630
src_ratio = cr.width / cr.height
dst_ratio = target[0] / target[1]
if src_ratio > dst_ratio:
    new_w = int(cr.height * dst_ratio)
    left = (cr.width - new_w) // 2
    cr = cr.crop((left, 0, left + new_w, cr.height))
else:
    new_h = int(cr.width / dst_ratio)
    top = (cr.height - new_h) // 2
    cr = cr.crop((0, top, cr.width, top + new_h))
cr = cr.resize(target, Image.LANCZOS)
cr.save(os.path.join(OUT, "og-cover.jpg"), quality=85, optimize=True, progressive=True)
print("og-cover.jpg", cr.size)

# Also keep a full-res optimized cover for in-page use
cov2 = Image.open(os.path.join(SRC, "cover photo.jpg")).convert("RGB")
cov2.thumbnail((1600, 1600), Image.LANCZOS)
cov2.save(os.path.join(OUT, "cover.jpg"), quality=82, optimize=True, progressive=True)
print("cover.jpg", cov2.size)

# --- Real photos: resize + compress ---
photos = {
    "photo 1.jpg": "work-windows-1.jpg",
    "photo 2.jpg": "work-windows-2.jpg",
    "photo 3.jpg": "work-office.jpg",
    "photo 5.jpg": "work-restroom.jpg",
    "photo 4.jpg": "work-restroom-2.jpg",
}
for src, dst in photos.items():
    im = Image.open(os.path.join(SRC, src)).convert("RGB")
    im.thumbnail((1400, 1400), Image.LANCZOS)
    im.save(os.path.join(OUT, dst), quality=80, optimize=True, progressive=True)
    print(dst, im.size, os.path.getsize(os.path.join(OUT, dst)) // 1024, "KB")

print("DONE")
