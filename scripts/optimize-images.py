#!/usr/bin/env python3
"""
Image optimization script for UK Family Mediation Multi-Brand Sites.
Resizes oversized assets, creates high-density lightweight WebP files, and purges unreferenced legacy JPEGs.
"""

import os
import glob
from PIL import Image

TARGET_DIRS = [
    "Sites/aldertonfamilymediation/public/images",
    "Sites/cavendishfamilymediation/public/images",
    "/tmp/child-repos/aldertonfamilymediation/public/images",
    "/tmp/child-repos/cavendishfamilymediation/public/images",
]

LOGO_NAMES = {
    "college-of-mediators.webp",
    "family-mediation-council.webp",
    "resolution.webp",
}

def optimize_directory(img_dir):
    if not os.path.exists(img_dir):
        return

    print(f"\nProcessing directory: {img_dir}")
    
    # 1. Remove unreferenced .jpg files
    jpg_files = glob.glob(os.path.join(img_dir, "*.jpg"))
    for jpg in jpg_files:
        os.remove(jpg)
        print(f"  Purged unused JPG: {os.path.basename(jpg)}")

    # 2. Optimize WebP files
    webp_files = glob.glob(os.path.join(img_dir, "*.webp"))
    for webp_path in webp_files:
        fname = os.path.basename(webp_path)
        original_size = os.path.getsize(webp_path)

        try:
            with Image.open(webp_path) as img:
                w, h = img.size
                format_orig = img.format

                # Logos: Max 200x200
                if fname in LOGO_NAMES:
                    if w > 200 or h > 200:
                        img.thumbnail((200, 200), Image.Resampling.LANCZOS)
                    img.save(webp_path, "WEBP", quality=85, method=6)
                
                # Hero and Large Photos: Max width 960px
                elif w > 960:
                    new_h = int(h * (960 / w))
                    img = img.resize((960, new_h), Image.Resampling.LANCZOS)
                    img.save(webp_path, "WEBP", quality=80, method=6)
                
                # All other images: Re-encode with high-efficiency method 6 if size can be reduced
                else:
                    tmp_out = webp_path + ".tmp"
                    img.save(tmp_out, "WEBP", quality=80, method=6)
                    if os.path.getsize(tmp_out) < original_size:
                        os.replace(tmp_out, webp_path)
                    else:
                        os.remove(tmp_out)

            new_size = os.path.getsize(webp_path)
            savings_pct = ((original_size - new_size) / original_size) * 100 if original_size > 0 else 0
            print(f"  Optimized {fname}: {original_size // 1024}KB -> {new_size // 1024}KB ({savings_pct:.1f}% reduction)")

        except Exception as e:
            print(f"  Error processing {fname}: {e}")

if __name__ == "__main__":
    for d in TARGET_DIRS:
        optimize_directory(d)
    print("\nImage optimization complete!")
