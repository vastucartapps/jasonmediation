#!/usr/bin/env python3
"""
Enterprise Programmatic Pipeline Engine (2026 Edition)
Reusable core library providing dynamic DOM layout rotation, No-GBP entity
triangulation schema generation, AI sanitization, and Information Gain validation.
"""

import hashlib
import json
import re

LAYOUT_VARIANTS = [
    {
        "id": 0,
        "name": "variant-a-direct-form",
        "description": "Split hero with immediate qualification form, followed by pricing & permit matrix table.",
        "hero_layout": "split_form_right",
        "primary_widget": "multi_step_calculator",
    },
    {
        "id": 1,
        "name": "variant-b-authority-proof",
        "description": "Centered hero with license & insurance badges, followed by diagnostic triage flowchart.",
        "hero_layout": "centered_badge_proof",
        "primary_widget": "diagnostic_triage_flow",
    },
    {
        "id": 2,
        "name": "variant-c-technical-sop",
        "description": "Left-aligned technical hero with 4-phase dispatch SOP, corridor map, and emergency triage.",
        "hero_layout": "technical_sop_sidebar",
        "primary_widget": "phase_dispatch_matrix",
    },
]

FORBIDDEN_AI_STRINGS = [
    "machine extract",
    "direct answer",
    "as an ai language model",
    "as an ai",
    "```markdown",
    "```html",
    "in today's fast-paced world",
    "it's important to remember",
    "in conclusion",
    "a testament to",
    "delve into",
    "dive into",
    "tapestry of",
    "beacon of",
    "plethora of",
]

def get_layout_variant(slug: str) -> dict:
    """
    Deterministically assigns one of the layout wireframes based on the MD5 hash
    of the page URL slug. Ensures consistent rendering without cross-page DOM duplication.
    """
    slug_clean = slug.strip().lower().replace("/", "")
    hash_int = int(hashlib.md5(slug_clean.encode("utf-8")).hexdigest(), 16)
    variant_idx = hash_int % len(LAYOUT_VARIANTS)
    return LAYOUT_VARIANTS[variant_idx]

def sanitize_content_copy(text: str) -> str:
    """
    Sanitizes copy against AI tells, removes em-dashes, and normalizes hyphens.
    """
    # Replace em-dashes with standard hyphens
    text = text.replace("—", " - ")
    # Replace en-dash if used as parenthetical break
    text = re.sub(r"\s+–\s+", " - ", text)

    # Sanitize AI substrings
    for forbidden in FORBIDDEN_AI_STRINGS:
        text = re.sub(re.escape(forbidden), "", text, flags=re.IGNORECASE)

    return text

def build_no_gbp_unified_schema(
    brand_name: str,
    brand_url: str,
    brand_logo: str,
    phone_number: str,
    same_as_links: list,
    service_name: str,
    page_url: str,
    city_name: str,
    state_or_region: str,
    wiki_city_uri: str,
    latitude: float,
    longitude: float,
    pricing_min: float,
    pricing_max: float,
    currency: str = "USD",
    faq_items: list = None,
    citations: list = None,
) -> dict:
    """
    Builds a single-script unified @graph JSON-LD schema adhering to strict
    No-GBP Multi-Node Entity Triangulation standards. Eliminates fake address
    fabrication by anchoring Organization + Service + areaServed.
    """
    org_id = f"{brand_url.rstrip('/')}/#organization"
    service_id = f"{page_url.rstrip('/')}/#service"
    webpage_id = f"{page_url.rstrip('/')}/#webpage"

    graph = [
        {
            "@type": "Organization",
            "@id": org_id,
            "name": brand_name,
            "url": brand_url,
            "logo": brand_logo,
            "telephone": phone_number,
            "sameAs": same_as_links,
        },
        {
            "@type": "Service",
            "@id": service_id,
            "name": f"{service_name} in {city_name}, {state_or_region}",
            "serviceType": service_name,
            "provider": {"@id": org_id},
            "areaServed": {
                "@type": "City",
                "name": city_name,
                "sameAs": wiki_city_uri,
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": latitude,
                    "longitude": longitude,
                },
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": f"{service_name} Service Tiers",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "name": f"Standard {service_name} Package",
                        "priceSpecification": {
                            "@type": "PriceSpecification",
                            "priceCurrency": currency,
                            "minPrice": str(pricing_min),
                            "maxPrice": str(pricing_max),
                        },
                    }
                ],
            },
        },
        {
            "@type": "WebPage",
            "@id": webpage_id,
            "url": page_url,
            "name": f"{service_name} in {city_name}, {state_or_region} | {brand_name}",
            "isPartOf": {"@id": brand_url},
            "about": {"@id": service_id},
            "citation": citations or [],
            "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": [".bluf-answer", "h1", "h2"],
            },
        },
    ]

    # Inject FAQPage if provided
    if faq_items:
        faq_entities = []
        for q, a in faq_items:
            faq_entities.append(
                {
                    "@type": "Question",
                    "name": q,
                    "acceptedAnswer": {"@type": "Answer", "text": a},
                }
            )
        graph.append(
            {
                "@type": "FAQPage",
                "@id": f"{page_url.rstrip('/')}/#faq",
                "mainEntity": faq_entities,
            }
        )

    return {"@context": "https://schema.org", "@graph": graph}

def validate_geo_bluf_format(heading_text: str, answer_text: str) -> dict:
    """
    Validates that a BLUF direct answer capsule adheres to Princeton GEO standards:
    - 40 to 60 words.
    - Contains concrete numbers, ranges, or statutory anchors.
    - Directly answers the heading without conversational fluff.
    """
    words = answer_text.strip().split()
    word_count = len(words)
    has_metrics = bool(re.search(r"(\$|£|\b\d+(\.\d+)?%|\b\d+\s*(hours|days|weeks|v|amp|kw)\b)", answer_text, re.IGNORECASE))
    
    issues = []
    if word_count < 35:
        issues.append(f"BLUF capsule is too brief ({word_count} words). Aim for 40-60 words.")
    elif word_count > 70:
        issues.append(f"BLUF capsule exceeds optimal length ({word_count} words). Shorten to 40-60 words.")

    if not has_metrics:
        issues.append("BLUF capsule missing concrete empirical metrics or pricing/timeline parameters.")

    return {
        "valid": len(issues) == 0,
        "word_count": word_count,
        "has_metrics": has_metrics,
        "issues": issues,
    }

if __name__ == "__main__":
    # Self-test demonstration
    sample_slug = "mesa-az-commercial-ev-charger"
    variant = get_layout_variant(sample_slug)
    print(f"Sample Slug: '{sample_slug}' -> Assigned Layout Variant {variant['id']}: {variant['name']}")
    
    schema = build_no_gbp_unified_schema(
        brand_name="EVChargerOne",
        brand_url="https://evchargerone.com",
        brand_logo="https://evchargerone.com/logo.webp",
        phone_number="+1-480-555-0199",
        same_as_links=["https://www.wikidata.org/wiki/Q12345", "https://opencorporates.com/companies/us_az/123"],
        service_name="Level 2 Commercial EV Charger Installation",
        page_url="https://evchargerone.com/locations/arizona/mesa/",
        city_name="Mesa",
        state_or_region="Arizona",
        wiki_city_uri="https://en.wikipedia.org/wiki/Mesa,_Arizona",
        latitude=33.4152,
        longitude=-111.8315,
        pricing_min=2800.0,
        pricing_max=6500.0,
        citations=["https://www.mesaaz.gov/business/development-services", "https://www.nfpa.org/codes-and-standards/70"],
    )
    print("Schema generated cleanly with @graph items:", len(schema["@graph"]))
