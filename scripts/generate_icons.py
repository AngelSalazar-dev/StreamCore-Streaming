"""Generate all Stream Core PNG icons + favicon from one design.

Renders a rounded square with a vertical blue gradient and a white play
triangle. Regenerate after rebranding with: python scripts/generate_icons.py
"""

import json
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
FAVICON = os.path.join(ROOT, "src", "app", "favicon.ico")

SS = 2  # supersample factor for mask antialiasing
C_TOP = (0, 132, 255)  # #0084FF
C_BOTTOM = (0, 64, 170)  # #0040AA
DARK = (13, 12, 15)  # #0D0C0F, matches theme background
WHITE = (255, 255, 255)


def gradient(w, h):
    """Vertical gradient image without banding (interpolate on 1px column)."""
    col = Image.new("RGB", (1, h))
    px = col.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        px[0, y] = tuple(int(a + (b - a) * t) for a, b in zip(C_TOP, C_BOTTOM))
    return col.resize((w, h), Image.BILINEAR)


def rounded_mask(w, h, radius):
    m = Image.new("L", (w * SS, h * SS), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        [0, 0, w * SS - 1, h * SS - 1], radius=radius * SS, fill=255
    )
    return m.resize((w, h), Image.LANCZOS)


def triangle_mask(w, h):
    """White play triangle, optically centered, antialiased via supersample."""
    x1, x2 = 0.36 * w, 0.73 * w
    y1, y2 = 0.27 * h, 0.73 * h
    pts = [(x1, y1), (x1, y2), (x2, 0.5 * h)]
    bw, bh = x2 - x1, y2 - y1
    pad = 2
    m = Image.new("L", (int((bw + pad * 2) * SS), int((bh + pad * 2) * SS)), 0)
    ImageDraw.Draw(m).polygon(
        [((x - x1 + pad) * SS, (y - y1 + pad) * SS) for x, y in pts], fill=255
    )
    m = m.resize((int(bw + pad * 2), int(bh + pad * 2)), Image.LANCZOS)
    layer = Image.new("L", (w, h), 0)
    layer.paste(m, (int(x1 - pad), int(y1 - pad)))
    return layer


def icon(w, h, kind):
    if kind == "glyph_dark":  # altform-lightunplated: dark glyph, no plate
        img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        img.paste(Image.new("RGBA", (w, h), DARK + (255,)), triangle_mask(w, h))
        return img
    if kind == "glyph_white":  # altform-unplated: white glyph, no plate
        img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        img.paste(Image.new("RGBA", (w, h), WHITE + (255,)), triangle_mask(w, h))
        return img
    if kind == "splash":  # dark canvas with centered rounded logo
        size = int(min(w, h) * 0.55)
        logo = icon(size, size, "full")
        img = Image.new("RGBA", (w, h), DARK + (255,))
        img.paste(logo, ((w - size) // 2, (h - size) // 2), logo)
        return img

    radius = int(min(w, h) * 0.22)
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    img.paste(gradient(w, h), mask=rounded_mask(w, h, radius))
    img.paste(Image.new("RGBA", (w, h), WHITE + (255,)), triangle_mask(w, h))
    return img


def kind_for(filename):
    if "altform-lightunplated" in filename:
        return "glyph_dark"
    if "altform-unplated" in filename:
        return "glyph_white"
    if "SplashScreen" in filename:
        return "splash"
    return "full"


def main():
    manifest = json.load(open(os.path.join(PUBLIC, "manifest.json")))
    count = 0
    for entry in manifest["icons"]:
        w, h = (int(v) for v in entry["sizes"].split("x"))
        path = os.path.join(PUBLIC, *entry["src"].split("/"))
        os.makedirs(os.path.dirname(path), exist_ok=True)
        icon(w, h, kind_for(entry["src"])).save(path)
        count += 1

    base = icon(48, 48, "full")
    base.save(FAVICON, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"{count} manifest icons + favicon.ico written")


if __name__ == "__main__":
    main()
