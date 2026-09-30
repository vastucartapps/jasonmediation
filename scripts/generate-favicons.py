#!/usr/bin/env python3
"""
generate-favicons.py
Generates enterprise-grade, multi-resolution favicons and vector icon assets
for Alderton Family Mediation and Cavendish Family Mediation.

Outputs for each brand:
- public/icon.svg (Sharp vector SVG squircle with gold Scales of Justice)
- public/favicon.ico (Multi-resolution: 16x16, 32x32, 48x48)
- public/apple-touch-icon.png (180x180 high-DPI iOS touch icon)
- public/favicon-32x32.png (32x32 PNG)
- public/favicon-16x16.png (16x16 PNG)
- public/icon-192x192.png (192x192 PNG for PWA / Android)
- public/icon-512x512.png (512x512 PNG for high-res PWA)
- public/site.webmanifest (Web App Manifest)
- src/app/icon.svg (App Router auto-discovery icon)
"""

import os
from PIL import Image, ImageDraw

BRANDS = [
    {
        'id': 'alderton',
        'name': 'Alderton Family Mediation',
        'short_name': 'Alderton Mediation',
        'theme_color': '#0f172a',
        'bg_color': '#020617',
        'public_dir': 'Sites/aldertonfamilymediation/public',
        'app_dir': 'Sites/aldertonfamilymediation/src/app',
        'bg_gradient': [(15, 23, 42), (2, 6, 23)],     # slate-900 to slate-950
        'border_color': (30, 62, 98, 255),             # subtle deep blue/slate border
        'icon_color': (245, 158, 11, 255),             # Warm Gold / Amber-500
        'svg_bg_stops': ('#0f172a', '#020617'),
        'svg_border': '#1e3e62',
        'svg_icon_stops': ('#fbbf24', '#f59e0b'),
    },
    {
        'id': 'cavendish',
        'name': 'Cavendish Family Mediation',
        'short_name': 'Cavendish Mediation',
        'theme_color': '#022c22',
        'bg_color': '#020617',
        'public_dir': 'Sites/cavendishfamilymediation/public',
        'app_dir': 'Sites/cavendishfamilymediation/src/app',
        'bg_gradient': [(2, 44, 34), (2, 6, 23)],      # emerald-950 to slate-950
        'border_color': (6, 78, 59, 255),              # emerald-800 border
        'icon_color': (212, 175, 55, 255),             # Champagne Gold
        'svg_bg_stops': ('#022c22', '#020617'),
        'svg_border': '#064e3b',
        'svg_icon_stops': ('#fde047', '#d4af37'),
    }
]

def generate_svg(brand):
    """Generates a crisp, scalable vector SVG squircle with the Scales of Justice."""
    bg_start, bg_end = brand['svg_bg_stops']
    icon_start, icon_end = brand['svg_icon_stops']
    border = brand['svg_border']

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad_{brand['id']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{bg_start}" />
      <stop offset="100%" stop-color="{bg_end}" />
    </linearGradient>
    <linearGradient id="goldGrad_{brand['id']}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{icon_start}" />
      <stop offset="100%" stop-color="{icon_end}" />
    </linearGradient>
    <filter id="subtleGlow_{brand['id']}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Background Prestige Squircle -->
  <rect x="24" y="24" width="464" height="464" rx="104" fill="url(#bgGrad_{brand['id']})" stroke="{border}" stroke-width="12" />

  <!-- Scales of Justice Crest (FMC Accredited Authority Symbol) -->
  <g transform="translate(106, 106) scale(12.5)" stroke="url(#goldGrad_{brand['id']})" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" filter="url(#subtleGlow_{brand['id']})">
    <!-- Central Pillar -->
    <path d="M12 3v18" />
    <!-- Finial Ring / Balance Fulcrum -->
    <circle cx="12" cy="3" r="0.8" fill="url(#goldGrad_{brand['id']})" />
    <!-- Cross Beam -->
    <path d="M6 7l6-2 6 2" />
    <!-- Center Pivot Ring -->
    <circle cx="12" cy="5" r="0.6" fill="url(#goldGrad_{brand['id']})" />
    <!-- Left Balance Pan -->
    <path d="M3 13l3-6 3 6a3 3 0 0 1-6 0z" fill="url(#goldGrad_{brand['id']})" fill-opacity="0.18" />
    <!-- Right Balance Pan -->
    <path d="M15 13l3-6 3 6a3 3 0 0 1-6 0z" fill="url(#goldGrad_{brand['id']})" fill-opacity="0.18" />
    <!-- Base Pedestal -->
    <path d="M4 21h16" stroke-width="2.2" />
  </g>
</svg>
'''
    return svg_content

def generate_raster_master(brand):
    """Renders a super-sampled 1024x1024 master raster image using Pillow."""
    size = 1024
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    margin = 48
    radius = 224

    # Background gradient
    c1, c2 = brand['bg_gradient']
    for y in range(margin, size - margin):
        ratio = (y - margin) / float(size - 2 * margin)
        r = int(c1[0] * (1 - ratio) + c2[0] * ratio)
        g = int(c1[1] * (1 - ratio) + c2[1] * ratio)
        b = int(c1[2] * (1 - ratio) + c2[2] * ratio)
        draw.line([(margin, y), (size - margin, y)], fill=(r, g, b, 255))

    # Mask for squircle
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([margin, margin, size - margin, size - margin], radius=radius, fill=255)
    img.putalpha(mask)

    draw = ImageDraw.Draw(img)
    # Border
    draw.rounded_rectangle([margin, margin, size - margin, size - margin], radius=radius, outline=brand['border_color'], width=28)

    # Scales of Justice Geometry scaled to 1024x1024
    scale = 26.0
    ox = (size - 24 * scale) / 2.0
    oy = (size - 24 * scale) / 2.0

    def pt(x, y):
        return (ox + x * scale, oy + y * scale)

    col = brand['icon_color']
    sw = int(1.8 * scale)  # ~47px

    # 1. Central Pillar: (12, 3) to (12, 21)
    draw.line([pt(12, 3), pt(12, 21)], fill=col, width=sw)
    # Finial ball at top
    draw.ellipse([pt(11.0, 2.0), pt(13.0, 4.0)], fill=col)

    # 2. Horizontal Beam: (6, 7) to (12, 5) to (18, 7)
    draw.line([pt(6, 7), pt(12, 5)], fill=col, width=sw)
    draw.line([pt(12, 5), pt(18, 7)], fill=col, width=sw)
    # Beam center circle
    draw.ellipse([pt(11.2, 4.2), pt(12.8, 5.8)], fill=col)

    # 3. Left pan cords & bowl
    draw.line([pt(6, 7), pt(3, 13)], fill=col, width=int(sw * 0.75))
    draw.line([pt(6, 7), pt(9, 13)], fill=col, width=int(sw * 0.75))
    draw.arc([pt(3, 10), pt(9, 16)], start=0, end=180, fill=col, width=sw)
    draw.line([pt(3, 13), pt(9, 13)], fill=col, width=int(sw * 0.8))

    # 4. Right pan cords & bowl
    draw.line([pt(18, 7), pt(15, 13)], fill=col, width=int(sw * 0.75))
    draw.line([pt(18, 7), pt(21, 13)], fill=col, width=int(sw * 0.75))
    draw.arc([pt(15, 10), pt(21, 16)], start=0, end=180, fill=col, width=sw)
    draw.line([pt(15, 13), pt(21, 13)], fill=col, width=int(sw * 0.8))

    # 5. Base
    draw.line([pt(4, 21), pt(20, 21)], fill=col, width=int(sw * 1.15))

    return img

def generate_webmanifest(brand):
    """Generates the site.webmanifest JSON string."""
    manifest = f'''{{
  "name": "{brand['name']}",
  "short_name": "{brand['short_name']}",
  "icons": [
    {{
      "src": "/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    }},
    {{
      "src": "/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    }},
    {{
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }},
    {{
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }},
    {{
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }}
  ],
  "theme_color": "{brand['theme_color']}",
  "background_color": "{brand['bg_color']}",
  "display": "standalone"
}}
'''
    return manifest

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print(f"[Favicon Generator] Working in root: {root_dir}")

    for brand in BRANDS:
        brand_id = brand['id']
        pub_dir = os.path.join(root_dir, brand['public_dir'])
        app_dir = os.path.join(root_dir, brand['app_dir'])

        os.makedirs(pub_dir, exist_ok=True)
        os.makedirs(app_dir, exist_ok=True)

        print(f"\n--- Generating Favicon Ecosystem for {brand['name']} ({brand_id}) ---")

        # 1. Vector SVG icon
        svg_content = generate_svg(brand)
        svg_pub_path = os.path.join(pub_dir, 'icon.svg')
        svg_app_path = os.path.join(app_dir, 'icon.svg')

        with open(svg_pub_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        with open(svg_app_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"  ✓ Created {svg_pub_path} ({len(svg_content)} bytes)")
        print(f"  ✓ Created {svg_app_path} ({len(svg_content)} bytes)")

        # 2. Master Raster Image
        master = generate_raster_master(brand)

        # 3. Multi-resolution ICO: 16x16, 32x32, 48x48
        ico_pub_path = os.path.join(pub_dir, 'favicon.ico')
        master.save(ico_pub_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
        print(f"  ✓ Created {ico_pub_path} ({os.path.getsize(ico_pub_path)} bytes, multi-res 16/32/48)")

        # 4. Apple Touch Icon: 180x180
        apple_path = os.path.join(pub_dir, 'apple-touch-icon.png')
        apple_img = master.resize((180, 180), Image.Resampling.LANCZOS)
        apple_img.save(apple_path, format='PNG', optimize=True)
        print(f"  ✓ Created {apple_path} ({os.path.getsize(apple_path)} bytes)")

        # 5. Standard Favicon PNGs: 32x32 & 16x16
        fav32_path = os.path.join(pub_dir, 'favicon-32x32.png')
        fav32_img = master.resize((32, 32), Image.Resampling.LANCZOS)
        fav32_img.save(fav32_path, format='PNG', optimize=True)
        print(f"  ✓ Created {fav32_path} ({os.path.getsize(fav32_path)} bytes)")

        fav16_path = os.path.join(pub_dir, 'favicon-16x16.png')
        fav16_img = master.resize((16, 16), Image.Resampling.LANCZOS)
        fav16_img.save(fav16_path, format='PNG', optimize=True)
        print(f"  ✓ Created {fav16_path} ({os.path.getsize(fav16_path)} bytes)")

        # 6. PWA / Mobile PNGs: 192x192 & 512x512
        pwa192_path = os.path.join(pub_dir, 'icon-192x192.png')
        pwa192_img = master.resize((192, 192), Image.Resampling.LANCZOS)
        pwa192_img.save(pwa192_path, format='PNG', optimize=True)
        print(f"  ✓ Created {pwa192_path} ({os.path.getsize(pwa192_path)} bytes)")

        pwa512_path = os.path.join(pub_dir, 'icon-512x512.png')
        pwa512_img = master.resize((512, 512), Image.Resampling.LANCZOS)
        pwa512_img.save(pwa512_path, format='PNG', optimize=True)
        print(f"  ✓ Created {pwa512_path} ({os.path.getsize(pwa512_path)} bytes)")

        # 7. Web Manifest
        manifest_content = generate_webmanifest(brand)
        manifest_path = os.path.join(pub_dir, 'site.webmanifest')
        with open(manifest_path, 'w', encoding='utf-8') as f:
            f.write(manifest_content)
        print(f"  ✓ Created {manifest_path} ({len(manifest_content)} bytes)")

    print("\n[Favicon Generator] Completed successfully for all brands!")

if __name__ == '__main__':
    main()
