# AC Repair benchmark — defect register (round 2)

Format per the "Enterprise Money Page Engine" remediation spec: ID, file/location, observed
behavior, root cause, severity, why the previous workflow missed it, corrective action, automated
test, test result after remediation, remaining human confirmation. This register covers defects
found in the *second* remediation pass (phone/domain/sitemap/architecture/dev-controls/estimator);
the *first* pass's 12 defects are in `ac-repair-issue-register.md` and are not repeated here.

---

**DEF-01 — Reserved/fictional phone number shipped with no automated check**
- File/location: `+1-800-555-0199` / `(800) 555-0199` — visible tel: links, sticky CTAs, dispatch bars, and `servicePhone`/`telephone` JSON-LD fields on all 5 pages.
- Observed: a NANPA-reserved fictional number (555-0100–0199 range) presented identically to a real, working number — correctly formatted, clickable, schema-typed `ContactPoint`.
- Root cause: the number was adopted as a placeholder early in the build and never had a dedicated automated check; `scan_public_output.py`'s pattern list had no phone-number rule at all.
- Severity: Critical (Gate A — broken/fake primary conversion path).
- Why the previous workflow missed it: internal HTML comments correctly identified it as reserved/example, but no script enforced that identification into a release-blocking result — documentation existed, enforcement didn't.
- Corrective action: built `scripts/check_placeholder_config.py` with a NANPA 555-01XX regex; single source of truth (`config/site.json`) now carries `phone_verified_working: false` explicitly.
- Automated test: `tests/run_tests.py` — "real sample pages fail placeholder-config check."
- Test result after remediation: **FAIL (correctly)** — the number is still in place because no real number has been supplied; the check now makes that an enforced blocker instead of a silent gap.
- Human confirmation required: **Yes** — a real, owner-tested phone number must be supplied before any production release. Not fixable by this skill alone.

**DEF-02 — No single source of truth for domain/contact/brand**
- File/location: `example.com`, the phone number, and `"Maricopa County AC Repair Network"` hardcoded independently in each of the 5 HTML files' canonical tags, OG tags, and JSON-LD.
- Observed: the same values duplicated 5 times each with no shared config; a fix to one had no mechanism to propagate to the others (this is exactly how DEF-04's Yuma contradiction was able to exist for multiple rounds).
- Root cause: pages were built file-by-file without a config layer.
- Severity: High.
- Why the previous workflow missed it: no requirement existed yet for a config contract; each page was individually "correct" in isolation checks.
- Corrective action: created `config/site.example.json` as the documented single source of truth; `check_placeholder_config.py` reads from it rather than per-page values.
- Automated test: `tests/run_tests.py` — "clean contact page passes placeholder-config check against a clean config."
- Test result after remediation: **PASS** (on the clean fixture; real pages still reference the fixture config, correctly, since no real config exists yet).
- Human confirmation required: Owner supplies real `config/site.json` values; a follow-up pass should then generate pages FROM that config rather than hardcoding, which has not been done in this round (pages were hand-fixed, not regenerated from config — see "Known limitations" below).

**DEF-03 — Sitemap omitted 3 of 5 approved pages**
- File/location: `Money Page Playbook/Sample Pages/sitemap.xml`.
- Observed: listed only the hub and Mesa; Scottsdale, Yuma, and Gilbert (all CREATE-qualified) were absent.
- Root cause: the sitemap was written once, by hand, before the three additional pages existed, and nothing re-checked it after they were added.
- Severity: High (a page not in the sitemap and with no other discovery path can sit unindexed indefinitely).
- Why the previous workflow missed it: no automated reconciliation step existed between "pages that exist and are approved" and "pages listed in the sitemap."
- Corrective action: built `scripts/validate_sitemap.py`; regenerated `sitemap.xml` to include all 5 approved URLs, each matching its page's own canonical tag exactly.
- Automated test: `tests/run_tests.py` — "incomplete sitemap fails reconciliation" (fixture) and "real 5-page sitemap passes reconciliation after the fix."
- Test result after remediation: **PASS** — `validate_sitemap.py` confirms exact 1:1 match, no duplicates.
- Human confirmation required: No (mechanically verified).

**DEF-04 — Yuma's brand identity contradicted its own geography**
- File/location: Yuma page's dispatch bar and `Organization.name` ("...part of the Maricopa County AC Repair Network...") vs. its own canonical path (`/arizona/yuma-county/yuma/...`) and breadcrumb/FAQ correctly stating Yuma is in Yuma County.
- Observed: one page simultaneously asserted and denied that Yuma is part of "Maricopa County" branding, depending which element you read.
- Root cause: the shared Organization identity was named after the primary hub's county before a second, out-of-county spoke (Yuma) existed; renaming it was never revisited when Yuma was added.
- Severity: Critical (Gate A/Gate C — material geographic contradiction on a live page).
- Why the previous workflow missed it: earlier fixes treated this as a copy-editing issue (checked whether Yuma's OWN sentences were accurate) without checking whether the SHARED brand-level identity used across the network was itself geographically honest for every member.
- Corrective action: renamed the Organization identity from "Maricopa County AC Repair Network" to "Arizona AC Repair Network" (true for every page in the set, including Yuma) across all 5 files; the Maricopa hub's own page title/H1 keeps its specific, accurate "Maricopa County & Nearby" framing since that hub genuinely centers there — the fix separates network-level identity from hub-level scope rather than collapsing them into one name.
- Automated test: none fully automated (this is a judgment call about brand/geography coherence); spot-checked via `grep` across all 5 files post-fix.
- Test result after remediation: **PASS** (manually verified — "Maricopa County AC Repair Network" string no longer appears anywhere in the 5-page set; "Arizona AC Repair Network" is geographically true for all 5).
- Human confirmation required: Owner should confirm "Arizona AC Repair Network" (or an equivalent county-neutral identity) is the actual intended brand architecture — this was a reasonable but not owner-approved naming choice made to resolve a real contradiction.

**DEF-05 — Visible developer annotation toggle shipped in the public build**
- File/location: `.annotate-toggle` button + `data-block="..."` attributes on all 5 pages; corresponding CSS in `shared.css`.
- Observed: a clickable "⚙ dev labels" button, default-off, revealing internal section labels when clicked — present in the live page's actual DOM, not just documentation.
- Root cause: built as a convenience for the user's own review during earlier rounds, never removed once real review was done.
- Severity: Medium (not a factual/business risk, but a real "private QA feature shipped in public build" violation of the explicit public/private boundary policy).
- Why the previous workflow missed it: `scan_public_output.py`'s leak patterns check for TEXT content, not for the presence of a UI control itself; a default-off, non-text control was outside its detection scope.
- Corrective action: removed the toggle element, its `onclick` handler, and all `data-block` attributes from all 5 pages; removed the corresponding dead CSS rules from `shared.css`.
- Automated test: none dedicated (a "no dev-control elements present" check was not built this round — see Known limitations); verified via `grep -c "annotate-toggle\|data-block"` returning 0 across all files.
- Test result after remediation: **PASS** (manually verified, not yet a standing automated gate).
- Human confirmation required: No.

**DEF-05b — Inline HTML build-notes comments are not a sufficient privacy boundary either**
- File/location: `<!-- BUILD NOTES ... -->` blocks at the top of all 5 pages (now removed).
- Observed: detailed internal claim-status/sourcing documentation sitting in HTML comments — not rendered, but fully visible via "View Source" or a direct HTTP fetch, which is a public access path, not a private one.
- Root cause: HTML comments were treated as equivalent to a private research file; they are not — anything in the HTTP response body is public.
- Severity: Medium.
- Why the previous workflow missed it: the public/private boundary was defined in terms of "what renders," not "what's fetchable," missing this exact gap.
- Corrective action: removed all inline BUILD NOTES comment blocks from the 5 production pages; the same information already existed, and now exists ONLY, in `Money Page Playbook/Money Page Maker/research/` and `reports/`.
- Automated test: `scan_public_output.py`'s existing patterns would catch MOST of this content if reintroduced (claim-status words, keyword-volume language), but it does not currently scan HTML comments at all (deliberately, since comments were previously treated as safe) — this is now a known gap, not a false confidence. See Known limitations.
- Test result after remediation: PASS by removal; the underlying detection gap (comments not scanned) remains open.
- Human confirmation required: No.

**DEF-06 — `scan_public_output.py` never scanned `<script>` content, missing a runtime-injected leak**
- File/location: the hub page's (now-removed) estimator JS contained the string `"Emergency service is available same-day in Mesa, Scottsdale, and Yuma specifically"` — a capability-overclaim sentence that had already been fixed in every visible HTML location, but survived inside a JS string literal that wrote it into the DOM on dropdown change.
- Observed: the leak was real (a visitor who changed the dropdown would see it) but invisible to the scanner, which strips all `<script>` blocks before scanning.
- Root cause: the scanner's design assumed "not rendered" and "not scriptable" were the same category; they aren't — JS-injected text IS rendered, just not present in the static HTML.
- Severity: Critical (this is precisely the "automated check gives false confidence" failure mode the whole skill exists to prevent).
- Why the previous workflow missed it: no one had reason to suspect this gap until the estimator (which was itself being removed for an unrelated reason, DEF-07) was being read in full.
- Corrective action: `scan_public_output.py` now also extracts and scans all non-JSON-LD `<script>` body text with the same leak patterns, labeled distinctly so a finding there is understood as "may render into the DOM at runtime."
- Automated test: synthetic fixture (`/tmp/script_leak_test.html`, not committed — ad hoc verification) confirmed the fixed scanner catches a `GATED`/keyword-volume string hidden inside a `.innerHTML =` assignment.
- Test result after remediation: **PASS** (fix verified against the synthetic case; also re-ran against all 5 real pages post-fix: 0 findings).
- Human confirmation required: No.

**DEF-07 — Misleading estimator: symptom/urgency selectors changed surrounding text but never the price**
- File/location: `.estimator` interactive block on the hub, Mesa, Scottsdale, and Yuma pages (Gilbert never had one — correctly, per the first remediation round's claim-type reasoning).
- Observed: a visitor choosing "won't turn on at all" vs. "blowing warm air" saw different explanatory sentences but the exact same `$171–$662` figure every time — implying a personalized estimate that didn't exist.
- Root cause: the interactive UI was built to satisfy the Master Specification's "interactive estimator" wireframe requirement without first verifying there was defensible per-symptom data to actually vary — form was built before substance was confirmed available.
- Severity: High (a functioning-looking tool producing a non-functional result is itself a form of fabrication, even though the underlying number was real and cited).
- Why the previous workflow missed it: earlier review focused on whether the CITED number was real (it is) and whether it was honestly labeled as a national reference (it was) — it never asked whether the INTERACTIVITY itself was honest.
- Corrective action: removed the dropdown selectors and the JS that powered them entirely; replaced with a static "General Cost Reference" block — same real, cited figure, explicitly labeled as not varying by symptom/city, with its 2022 source date stated plainly as a limitation.
- Automated test: none fully automated (detecting "an interactive control whose output never actually changes" in general is a semantic check, not a deterministic one); manually verified by reading the replacement markup and confirming no `<select>`/estimator JS remains.
- Test result after remediation: **PASS** (manually verified on all 4 affected pages).
- Human confirmation required: No, unless the owner later wants a genuinely personalized estimator, which would need real per-symptom/per-system pricing data that doesn't currently exist.

---

## Reconciliation

7 defects logged this round (DEF-01 through DEF-07, with DEF-05 having a sub-item 05b). 5 fully
fixed and verified (DEF-02 fixture-verified, DEF-03, DEF-04, DEF-05/05b, DEF-06, DEF-07 — 6 of 7
distinct IDs). 1 remains an open hard blocker requiring owner action (DEF-01, the phone number).
Combined with the 12 defects from the first round (`ac-repair-issue-register.md`), this benchmark
has now had 19 total logged defects across two remediation passes.
