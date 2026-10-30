# AC Repair — page qualification decisions

## Hub: AC Repair in Maricopa County, AZ & Nearby

- **Search intent**: county/metro-level service discovery for AC repair.
- **Demand evidence**: real, from `ReVerified Niches/20 AC Repair` — combined GKP volume 11,100,
  combined Ahrefs volume (floor estimate) 2,000 across the hub's 16 member cities.
- **Existing-page overlap**: none — this is the first page built for this niche/hub.
- **Anti-commodity test**: PASS, with a caveat. Strip the location name and most of the trade
  content (symptoms, causes, repair-vs-replace) would still read as a generic, useful guide — the
  genuinely location-specific value is concentrated in the real per-city differentiation (Gilbert's
  commercial-intent data, Mesa/Scottsdale/Yuma's emergency-intent data, the real coverage table,
  the real climate citation), not the page's bulk word count. Recorded honestly rather than claimed
  as uniformly location-driven throughout.
- **Decision: CREATE.**
- **Reasoning**: real demand, no overlap, genuine (if partial) location-specific differentiation,
  passes the uniqueness gate against its own spoke page (`check_uniqueness.py`: Jaccard 0.066,
  containment 0.092/0.184 — well under both flag thresholds).

## Spoke: Emergency AC Repair in Mesa, AZ

- **Search intent**: emergency/same-day AC repair, Mesa specifically.
- **Demand evidence**: real, Ahrefs-matched query `"emergency ac repair mesa"`, confirmed via the
  Ahrefs-prevails verdict path (`<100` Ahrefs volume bucket, KD=N/A, Real GKP volume 500) —
  per `MONEY_PAGE_PLAYBOOK.md` section 2.1's volume-justified sub-service gate.
- **Existing-page overlap**: checked against the hub page — different primary intent (narrow,
  urgent, Mesa-specific vs. broad, county-wide), confirmed structurally distinct by the uniqueness
  script, not just asserted.
- **Anti-commodity test**: PASS — the page's reason to exist (Mesa's specific emergency-intent
  search pattern, distinct from most other member cities) survives with the city name removed in
  spirit, since the point of the page is precisely that Mesa's demand pattern differs from its
  neighbors, not a generic emergency-AC-repair guide.
- **Decision: CREATE.**
- **Reasoning**: real, independently confirmed sub-intent; distinct from the hub; passes the
  uniqueness gate.

## Built in a second pass (2026-10-23) — all three now CREATE

| Page | Real demand evidence | Decision | Notes |
|---|---|---|---|
| Emergency AC Repair — Scottsdale, AZ | "emergency ac repair scottsdale" (real Ahrefs match) | **CREATE** | Built. Geography: Scottsdale correctly in Maricopa County. Permit dept sourced (PARTIALLY_SUPPORTED). |
| Emergency AC Repair — Yuma, AZ | "emergency ac repair yuma" (real Ahrefs match) | **CREATE** | Built. Geography: Yuma is in Yuma County, NOT Maricopa — page explicitly states this (including in its own FAQ) rather than letting the hub's branding imply otherwise. Uses its own Yuma-specific climate citation (hottest summer on record since 1878) instead of reusing the Phoenix-metro NWS figure used by the Maricopa County pages, since Yuma is not part of that metro — reusing it would have been the same class of geographic overreach as AC-01. |
| Commercial AC Repair — Gilbert, AZ | "commercial ac repair gilbert" (real Ahrefs match) | **CREATE** | Built. Deliberately does NOT reuse the residential HomeAdvisor/Angi cost citation used on the emergency pages — that source's data is residential AC repair, a different claim type than commercial HVAC (rooftop package units, different cost structure). No commercial-specific cost source was found and verified this session, so the cost section is omitted rather than misapplying the wrong number. |

**Real defect found and fixed during this build, not before publishing**: the first draft of the
Scottsdale and Mesa pages scored a raw Jaccard of 0.611 against each other — above this project's
own 0.50 near-duplicate flag threshold — despite each having genuine per-city data. Large sections
(the "why this page" framing, the call process, the FAQ) were near-identical sentence templates
with only the city name different. Found by `check_uniqueness.py` after a bug in that same script
(a document-frequency boilerplate strip that misclassified within-template duplication as harmless
because 3 of the 5 pages shared a template) was itself found and fixed first — the clean "all PASS,
0.000 Jaccard" result looked too good to trust, so it was independently recomputed on raw shingles,
which is what surfaced the real number. Both pages were then rewritten with genuinely different
sentence structure (same real facts, different framing/phrasing/order) and re-measured at 0.140.
Full detail in `ac-repair-issue-register.md` (AC-11, AC-12) and `test-results.md`.

No page was created or rejected without a stated reason. No candidate was force-created just to
fill out the matrix, and no page was shipped on the strength of an uniqueness-check result that
hadn't actually been verified to mean what it claimed.

## Re-run through the generalized core (2026-10-23) — a more conservative, more honest result

Once `scripts/qualify_page.py` existed as real, niche-agnostic executable code (not just prose
reasoning), all 5 pages were re-qualified through it honestly — see
`research/ac-repair-qualify-rerun.json` for the exact inputs and `qualify_page.py`'s own output.

**Result: 1 CREATE (the hub), 4 HOLD (Mesa, Scottsdale, Yuma, Gilbert) — not 5 CREATE as this
document previously concluded.**

The reason: the hub's claim (general AC repair service happens via real network partners) is a
confirmed general business capability. Each spoke's claim (emergency/same-day service specifically
in that city, or commercial service specifically in Gilbert) is backed by real search DEMAND but
not by any independently confirmed CAPABILITY — exactly the AC-04/DEF-04 distinction this project
found and fixed in the pages' wording, but had not yet applied as a formal qualification gate.
Earlier passes treated "the content is honestly hedged (`call to check availability`)" as
sufficient to justify CREATE. Run through the stricter generalized core, it isn't — the core
currently treats `capability_confirmed: false` as an unconditional HOLD, with no allowance for "but
the page never overclaims, so it can still publish."

**This is a genuine, disclosed limitation of `qualify_page.py`'s current model, not a resolved
question**: should a page be allowed to ship in HOLD-adjacent form specifically because its content
honestly reflects the unconfirmed state (never asserting the capability as fact), or should
publication always wait for actual capability confirmation regardless of how careful the wording
is? The four spoke pages currently exist, are schema-valid, pass every other gate, and use
honest framing throughout — but per this stricter qualification pass, they are formally HOLD, not
CREATE, until the underlying same-day/commercial capacity is actually confirmed with the business.
That confirmation (or an explicit decision to allow honestly-hedged HOLD pages to publish) is an
owner decision, not one this skill makes unilaterally.
