#!/usr/bin/env python3
"""
Generate unbranded, scientific amino acid SVGs and high-resolution WebP background assets
for AminoAcidSupplements.co.
Visual palette: Bio-Indigo (#4338ca), Molten Copper (#c2410c), Plum (#6d28d9), Zinc (#18181b), Alabaster (#fafafa).
"""

import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ASSETS_DIR = Path("Sites/aminoacidsupplements/public/images")
BG_DIR = ASSETS_DIR / "backgrounds"
HERO_DIR = ASSETS_DIR / "hero"
POSTS_DIR = ASSETS_DIR / "posts"

BG_DIR.mkdir(parents=True, exist_ok=True)
HERO_DIR.mkdir(parents=True, exist_ok=True)
POSTS_DIR.mkdir(parents=True, exist_ok=True)

# -------------------------------------------------------------
# 1. PURE VECTOR SVGs (Infinite resolution, CSS backdrops)
# -------------------------------------------------------------

def generate_svg_amino_backbone():
    """Generates an SVG showing the fundamental repeating peptide backbone:
       -N-C(alpha)-C(=O)- with side chains and stereochemical wedges."""
    svg = """<svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4338ca" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c2410c" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <!-- Backbone zig-zag bonds -->
  <path d="M 20,100 L 60,70 L 100,100 L 140,70 L 180,100 L 220,70 L 260,100 L 300,70 L 340,100 L 380,70" 
        fill="none" stroke="#4338ca" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>
  <!-- Carbonyl double bonds C=O -->
  <line x1="60" y1="70" x2="60" y2="35" stroke="#c2410c" stroke-width="2" opacity="0.35"/>
  <line x1="64" y1="70" x2="64" y2="35" stroke="#c2410c" stroke-width="2" opacity="0.35"/>
  <text x="56" y="28" font-family="JetBrains Mono, monospace" font-size="12" fill="#c2410c" opacity="0.45" font-weight="bold">O</text>
  
  <line x1="180" y1="100" x2="180" y2="135" stroke="#c2410c" stroke-width="2" opacity="0.35"/>
  <line x1="184" y1="100" x2="184" y2="135" stroke="#c2410c" stroke-width="2" opacity="0.35"/>
  <text x="176" y="150" font-family="JetBrains Mono, monospace" font-size="12" fill="#c2410c" opacity="0.45" font-weight="bold">O</text>

  <line x1="300" y1="70" x2="300" y2="35" stroke="#c2410c" stroke-width="2" opacity="0.35"/>
  <line x1="304" y1="70" x2="304" y2="35" stroke="#c2410c" stroke-width="2" opacity="0.35"/>
  <text x="296" y="28" font-family="JetBrains Mono, monospace" font-size="12" fill="#c2410c" opacity="0.45" font-weight="bold">O</text>

  <!-- Amine N-H bonds -->
  <line x1="100" y1="100" x2="100" y2="135" stroke="#4338ca" stroke-width="1.8" opacity="0.3"/>
  <text x="94" y="150" font-family="JetBrains Mono, monospace" font-size="11" fill="#4338ca" opacity="0.4" font-weight="bold">NH</text>

  <line x1="220" y1="70" x2="220" y2="35" stroke="#4338ca" stroke-width="1.8" opacity="0.3"/>
  <text x="214" y="28" font-family="JetBrains Mono, monospace" font-size="11" fill="#4338ca" opacity="0.4" font-weight="bold">NH</text>

  <line x1="340" y1="100" x2="340" y2="135" stroke="#4338ca" stroke-width="1.8" opacity="0.3"/>
  <text x="334" y="150" font-family="JetBrains Mono, monospace" font-size="11" fill="#4338ca" opacity="0.4" font-weight="bold">NH</text>

  <!-- Alpha Carbon Side-Chain R Groups (Wedges) -->
  <polygon points="140,70 134,25 146,25" fill="#6d28d9" opacity="0.25"/>
  <text x="135" y="18" font-family="JetBrains Mono, monospace" font-size="12" fill="#6d28d9" opacity="0.45" font-weight="bold">R₁</text>

  <polygon points="260,100 254,145 266,145" fill="#6d28d9" opacity="0.25"/>
  <text x="255" y="160" font-family="JetBrains Mono, monospace" font-size="12" fill="#6d28d9" opacity="0.45" font-weight="bold">R₂</text>

  <!-- Atomic Nodes -->
  <circle cx="20" cy="100" r="4" fill="#4338ca" opacity="0.5"/>
  <circle cx="60" cy="70" r="4" fill="#18181b" opacity="0.3"/>
  <circle cx="100" cy="100" r="4.5" fill="#4338ca" opacity="0.5"/>
  <circle cx="140" cy="70" r="4" fill="#6d28d9" opacity="0.5"/>
  <circle cx="180" cy="100" r="4" fill="#18181b" opacity="0.3"/>
  <circle cx="220" cy="70" r="4.5" fill="#4338ca" opacity="0.5"/>
  <circle cx="260" cy="100" r="4" fill="#6d28d9" opacity="0.5"/>
  <circle cx="300" cy="70" r="4" fill="#18181b" opacity="0.3"/>
  <circle cx="340" cy="100" r="4.5" fill="#4338ca" opacity="0.5"/>
  <circle cx="380" cy="70" r="4" fill="#18181b" opacity="0.3"/>
</svg>"""
    (BG_DIR / "amino-backbone.svg").write_text(svg, encoding="utf-8")
    print("Wrote amino-backbone.svg")

def generate_svg_formula_lattice():
    """Generates an expansive hexagonal + aromatic amino acid lattice SVG with formula annotations."""
    svg = """<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="aminoGrid" width="150" height="130" patternUnits="userSpaceOnUse">
      <path d="M 37.5 5 L 75 25 L 75 65 L 37.5 85 L 0 65 L 0 25 Z" fill="none" stroke="#4338ca" stroke-width="1.2" stroke-opacity="0.14" stroke-dasharray="3,3"/>
      <path d="M 112.5 5 L 150 25 L 150 65 L 112.5 85 L 75 65 L 75 25 Z" fill="none" stroke="#c2410c" stroke-width="1.2" stroke-opacity="0.12"/>
      <circle cx="75" cy="25" r="3" fill="#4338ca" fill-opacity="0.22"/>
      <circle cx="37.5" cy="85" r="2.5" fill="#6d28d9" fill-opacity="0.22"/>
      <circle cx="112.5" cy="85" r="2.5" fill="#c2410c" fill-opacity="0.22"/>
      <text x="30" y="48" font-family="JetBrains Mono, monospace" font-size="8" fill="#4338ca" opacity="0.25">Cα</text>
      <text x="100" y="48" font-family="JetBrains Mono, monospace" font-size="8" fill="#c2410c" opacity="0.25">NH₂</text>
    </pattern>
  </defs>
  <rect width="600" height="400" fill="url(#aminoGrid)"/>
</svg>"""
    (BG_DIR / "amino-formula-lattice.svg").write_text(svg, encoding="utf-8")
    print("Wrote amino-formula-lattice.svg")

def generate_svg_chromatography_trace():
    """Generates HPLC UV detection chromatogram wave SVG (analytical purity 99%+ trace)."""
    svg = """<svg width="800" height="260" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4338ca" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#6d28d9" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#4338ca" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <!-- Baseline grid -->
  <line x1="50" y1="220" x2="750" y2="220" stroke="#71717a" stroke-width="1.5" stroke-opacity="0.3"/>
  <line x1="50" y1="30" x2="50" y2="220" stroke="#71717a" stroke-width="1.5" stroke-opacity="0.3"/>
  <!-- Chromatographic Peak Area -->
  <path d="M 50,220 L 220,220 C 260,220 280,215 300,190 C 330,150 345,40 355,40 C 365,40 380,150 410,190 C 430,215 450,220 490,220 L 530,220 C 540,220 545,210 550,210 C 555,210 560,220 570,220 L 750,220" 
        fill="url(#peakGrad)"/>
  <!-- Chromatographic Curve Line -->
  <path d="M 50,220 L 220,220 C 260,220 280,215 300,190 C 330,150 345,40 355,40 C 365,40 380,150 410,190 C 430,215 450,220 490,220 L 530,220 C 540,220 545,210 550,210 C 555,210 560,220 570,220 L 750,220" 
        fill="none" stroke="#4338ca" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Annotation on major peak -->
  <circle cx="355" cy="40" r="4.5" fill="#c2410c"/>
  <text x="365" y="44" font-family="JetBrains Mono, monospace" font-size="12" font-weight="bold" fill="#312e81">99.4% Purity Main Peak (Rt: 8.42 min)</text>
  <text x="60" y="240" font-family="JetBrains Mono, monospace" font-size="10" fill="#71717a">0.0 min</text>
  <text x="345" y="240" font-family="JetBrains Mono, monospace" font-size="10" fill="#71717a">8.42 min</text>
  <text x="710" y="240" font-family="JetBrains Mono, monospace" font-size="10" fill="#71717a">18.0 min</text>
</svg>"""
    (BG_DIR / "chromatography-trace.svg").write_text(svg, encoding="utf-8")
    print("Wrote chromatography-trace.svg")

# -------------------------------------------------------------
# 2. HIGH-RESOLUTION WEBP ASSETS (Pillow)
# -------------------------------------------------------------

def generate_hero_spectrum_webp():
    """Generates a modern, clean, clinical 1920x1080 WebP hero background featuring
       a subtle spectrum gradient from alabaster to deep bio-indigo and warm copper."""
    w, h = 1920, 1080
    im = Image.new("RGBA", (w, h), (250, 250, 252, 255))
    draw = ImageDraw.Draw(im)

    # Ambient radial washes
    # Top-right: subtle bio-indigo wash
    for r in range(700, 0, -20):
        alpha = int(18 * (1 - r / 700))
        draw.ellipse([w - r, -r // 2, w + r, r * 1.5], fill=(67, 56, 202, alpha))

    # Bottom-left: subtle molten copper wash
    for r in range(600, 0, -20):
        alpha = int(16 * (1 - r / 600))
        draw.ellipse([-r // 2, h - r, r * 1.5, h + r // 2], fill=(194, 65, 12, alpha))

    # Center-right: subtle plum node field
    for r in range(500, 0, -25):
        alpha = int(14 * (1 - r / 500))
        draw.ellipse([w // 2 - r // 2, h // 3 - r // 2, w // 2 + r * 1.2, h // 3 + r], fill=(109, 40, 217, alpha))

    # Molecular constellation lines & nodes on the right half
    nodes = [
        (1100, 240), (1280, 180), (1450, 260), (1620, 190), (1750, 310),
        (1200, 420), (1380, 390), (1560, 470), (1700, 410),
        (1120, 600), (1300, 580), (1480, 660), (1660, 610), (1800, 720),
        (1240, 780), (1420, 810), (1600, 850), (1740, 890)
    ]
    # Draw interconnecting bonds
    for i, (x1, y1) in enumerate(nodes):
        for j, (x2, y2) in enumerate(nodes[i+1:], i+1):
            dist = math.hypot(x2 - x1, y2 - y1)
            if dist < 240:
                alpha = int(35 * (1 - dist / 240))
                stroke_color = (67, 56, 202, alpha) if i % 2 == 0 else (194, 65, 12, alpha)
                draw.line([(x1, y1), (x2, y2)], fill=stroke_color, width=2)

    # Draw nodes
    for i, (x, y) in enumerate(nodes):
        if i % 3 == 0:
            fill_c = (194, 65, 12, 110)
            rad = 7
        elif i % 3 == 1:
            fill_c = (67, 56, 202, 120)
            rad = 8
        else:
            fill_c = (109, 40, 217, 100)
            rad = 6
        draw.ellipse([x - rad, y - rad, x + rad, y + rad], fill=fill_c)
        draw.ellipse([x - rad - 3, y - rad - 3, x + rad + 3, y + rad + 3], outline=(67, 56, 202, 40), width=1)

    # Save as WebP
    im.convert("RGB").save(HERO_DIR / "hero-spectrum.webp", "WEBP", quality=88)
    print("Wrote hero-spectrum.webp")

def generate_washout_bg_webp():
    """Generates a seamless 1200x800 subtle washout background for content sections."""
    w, h = 1200, 800
    im = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(im)

    # Subtle molecular ring watermarks
    for cx, cy in [(200, 200), (600, 150), (1000, 250), (350, 600), (850, 650)]:
        # Draw 6-sided benzene rings
        pts = []
        for a in range(6):
            rad = 55
            ang = math.radians(a * 60 + 30)
            pts.append((cx + rad * math.cos(ang), cy + rad * math.sin(ang)))
        draw.polygon(pts, outline=(67, 56, 202, 20), width=1)
        draw.ellipse([cx - 30, cy - 30, cx + 30, cy + 30], outline=(194, 65, 12, 18), width=1)

    im.convert("RGB").save(BG_DIR / "washout-formula-bg.webp", "WEBP", quality=85)
    print("Wrote washout-formula-bg.webp")

def generate_blog_post_heroes():
    """Generates two 1200x675 (16:9) WebP hero images for the initial blog posts."""
    for slug, title, primary_color in [
        ("bpc-157-stability-protocols", "BPC-157 Stability Analysis", (67, 56, 202)),
        ("tb-500-reconstitution-guidelines", "TB-500 Laboratory Standards", (194, 65, 12)),
    ]:
        w, h = 1200, 675
        im = Image.new("RGBA", (w, h), (248, 248, 250, 255))
        draw = ImageDraw.Draw(im)

        # Gradient band
        for y in range(h):
            ratio = y / h
            r = int(245 - 20 * ratio)
            g = int(246 - 15 * ratio)
            b = int(250 - 10 * ratio)
            draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

        # Scientific geometric accents
        draw.rounded_rectangle([60, 60, w - 60, h - 60], radius=24, outline=(*primary_color, 45), width=2)
        draw.ellipse([w - 400, -50, w + 100, 450], fill=(*primary_color, 20))
        draw.ellipse([-50, h - 350, 350, h + 50], fill=(109, 40, 217, 15))

        # Central analytical graphic (reagent vial and molecular lattice motif)
        cx, cy = w // 2, h // 2
        # Hexagonal shield
        hex_pts = []
        for i in range(6):
            ang = math.radians(i * 60 - 30)
            hex_pts.append((cx + 120 * math.cos(ang), cy + 120 * math.sin(ang)))
        draw.polygon(hex_pts, outline=(*primary_color, 120), width=3)
        draw.ellipse([cx - 60, cy - 60, cx + 60, cy + 60], outline=(109, 40, 217, 100), width=2)

        # Draw crosshairs
        draw.line([(cx - 150, cy), (cx + 150, cy)], fill=(*primary_color, 40), width=1)
        draw.line([(cx, cy - 150), (cx, cy + 150)], fill=(*primary_color, 40), width=1)

        im.convert("RGB").save(POSTS_DIR / f"{slug}.webp", "WEBP", quality=90)
        print(f"Wrote {slug}.webp")

if __name__ == "__main__":
    generate_svg_amino_backbone()
    generate_svg_formula_lattice()
    generate_svg_chromatography_trace()
    generate_hero_spectrum_webp()
    generate_washout_bg_webp()
    generate_blog_post_heroes()
    print("All scientific imagery and SVG assets generated successfully.")
