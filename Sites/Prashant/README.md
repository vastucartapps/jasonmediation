# Prashant Web Property Portfolio

> Dedicated portfolio directory for Prashant's high-value multi-niche web assets, lead-generation hubs, and programmatic SEO networks.

---

## 🏗️ Active & Upcoming Vertical Niches (Starting with 5)

1. [`hvac-heatpumps/`](./hvac-heatpumps/): Residential & Commercial HVAC, Heat Pump conversions, emergency cooling repair.
2. [`roofing-solar/`](./roofing-solar/): Commercial re-roofing, solar panel installation, storm damage insurance repair.
3. [`emergency-plumbing/`](./emergency-plumbing/): 24/7 emergency drain clearing, sewer line trenchless repair, commercial repiping.
4. [`water-damage-restoration/`](./water-damage-restoration/): IICRC-certified flood extraction, structural drying, basement restoration.
5. [`commercial-electrical/`](./commercial-electrical/): 480V 3-phase power, commercial EV charging, switchgear replacement.

---

## ⚡ Build Standards & Production Pipeline

Every site in this directory must be constructed strictly using the blueprints in:
👉 [`/handoff/`](../../handoff/)

Before any site here is considered ready for live launch, it must pass:
```bash
python3 handoff/scripts/gatekeeper.py --dir <site_directory>/out
python3 handoff/scripts/crawl-verifier.py --dir <site_directory>/out
```
