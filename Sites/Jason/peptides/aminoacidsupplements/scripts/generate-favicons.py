#!/usr/bin/env python3
"""
Generate bespoke favicons, app icons, and manifest for AminoAcidSupplements.co
"""

from pathlib import Path
from PIL import Image, ImageDraw

PUB_DIR = Path("Sites/aminoacidsupplements/public")
PUB_DIR.mkdir(parents=True, exist_ok=True)

# 1. SVG Brand Icon
svg_icon = """<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="60%" stop-color="#4338ca"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#c2410c"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)"/>
  <rect x="24" y="24" width="464" height="464" rx="104" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="4"/>
  
  <!-- Peptide Bond Links -->
  <line x1="160" y1="352" x2="256" y2="176" stroke="rgba(255,255,255,0.4)" stroke-width="24" stroke-linecap="round"/>
  <line x1="256" y1="176" x2="352" y2="352" stroke="rgba(255,255,255,0.4)" stroke-width="24" stroke-linecap="round"/>
  <line x1="160" y1="352" x2="352" y2="352" stroke="rgba(255,255,255,0.2)" stroke-width="16" stroke-dasharray="12,12"/>

  <!-- Molecular Nodes -->
  <!-- N-terminus node -->
  <circle cx="160" cy="352" r="48" fill="#e0e7ff"/>
  <circle cx="160" cy="352" r="32" fill="#4338ca"/>

  <!-- Central Alpha Carbon / R-group -->
  <circle cx="256" cy="176" r="56" fill="url(#copperGrad)"/>
  <circle cx="256" cy="176" r="28" fill="#ffedd5"/>

  <!-- C-terminus node -->
  <circle cx="352" cy="352" r="48" fill="#e0e7ff"/>
  <circle cx="352" cy="352" r="32" fill="#6d28d9"/>
</svg>"""

(PUB_DIR / "icon.svg").write_text(svg_icon, encoding="utf-8")
print("Wrote icon.svg")

# 2. Raster Icons with Pillow
def generate_png_icons():
    # Base 512x512
    im = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)

    # Rounded rectangle background
    draw.rounded_rectangle([16, 16, 496, 496], radius=110, fill=(49, 46, 129, 255))
    draw.rounded_rectangle([16, 16, 496, 496], radius=110, outline=(255, 255, 255, 40), width=4)

    # Bonds
    draw.line([(160, 352), (256, 176)], fill=(255, 255, 255, 120), width=22)
    draw.line([(256, 176), (352, 352)], fill=(255, 255, 255, 120), width=22)

    # Left node (Bio-Indigo)
    draw.ellipse([160 - 46, 352 - 46, 160 + 46, 352 + 46], fill=(224, 231, 255, 255))
    draw.ellipse([160 - 30, 352 - 30, 160 + 30, 352 + 30], fill=(67, 56, 202, 255))

    # Top node (Molten Copper)
    draw.ellipse([256 - 54, 176 - 54, 256 + 54, 176 + 54], fill=(194, 65, 12, 255))
    draw.ellipse([256 - 28, 176 - 28, 256 + 28, 176 + 28], fill=(255, 237, 213, 255))

    # Right node (Plum)
    draw.ellipse([352 - 46, 352 - 46, 352 + 46, 352 + 46], fill=(224, 231, 255, 255))
    draw.ellipse([352 - 30, 352 - 30, 352 + 30, 352 + 30], fill=(109, 40, 217, 255))

    im.save(PUB_DIR / "icon-512x512.png", "PNG")
    im.resize((192, 192), Image.Resampling.LANCZOS).save(PUB_DIR / "icon-192x192.png", "PNG")
    im.resize((180, 180), Image.Resampling.LANCZOS).save(PUB_DIR / "apple-touch-icon.png", "PNG")
    im.resize((32, 32), Image.Resampling.LANCZOS).save(PUB_DIR / "favicon-32x32.png", "PNG")
    im.resize((16, 16), Image.Resampling.LANCZOS).save(PUB_DIR / "favicon-16x16.png", "PNG")
    im.resize((48, 48), Image.Resampling.LANCZOS).save(PUB_DIR / "favicon.ico", "ICO")
    print("Wrote icon-512x512.png, icon-192x192.png, apple-touch-icon.png, favicons")

manifest = """{
  "name": "AminoAcidSupplements",
  "short_name": "AminoAcidSupplements",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#4338ca",
  "background_color": "#fafafa",
  "display": "standalone"
}"""

(PUB_DIR / "site.webmanifest").write_text(manifest, encoding="utf-8")
print("Wrote site.webmanifest")

if __name__ == "__main__":
    generate_png_icons()
