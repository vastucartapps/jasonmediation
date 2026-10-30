# AC Repair sample pages — baseline (pre-fix)

Recorded before the fixes documented in `ac-repair-issue-register.md`. Source: the two files in
`Money Page Playbook/Sample Pages/` as they existed at the start of this skill-build session.

| Item | Baseline value |
|---|---|
| Hub page title | "AC Repair in Maricopa County, AZ — Licensed Local Dispatch, 16 Cities" |
| Hub page H1 | "AC Repair in Maricopa County, AZ — Licensed Local Dispatch Across 16 Cities" |
| Hub canonical | `https://example.com/arizona/maricopa-county/ac-repair/` |
| Spoke page title | "Emergency AC Repair in Mesa, AZ — Same-Day Dispatch" |
| Spoke canonical | `https://example.com/arizona/maricopa-county/mesa/emergency-ac-repair/` |
| Schema node types (both pages) | WebPage, BreadcrumbList, Service, Organization, FAQPage (no LocalBusiness, no Review — already correct from an earlier pass this session) |
| Phone number (both pages) | `+1-800-555-0199` — a reserved/example number, not real |
| Visible internal production material | Hub page: clean at this point. Spoke page: a `status: PARTIALLY_SUPPORTED` sourcing note visible in body text, plus two `.gated` amber callout boxes visible by default |
| Geographic claim | Hub page claimed "16 Maricopa County cities" in title/H1/meta/TL;DR/AEO summary/dispatch bar/proof line |
| Business-capability framing | "Emergency service is available in Mesa, Scottsdale, and Yuma"; "commercial AC repair... is a core part of coverage" — both phrased as settled operational fact |
| Mobile/Core Web Vitals testing | Not run; no browser automation tool available in this environment (confirmed, not assumed) |
| Uniqueness check between the two pages | Not run as a formal script before this session; informally estimated by hand earlier in the conversation |
| Build/deploy status | Static demo files, not deployed; `NOT TESTED` for any live-URL check (status codes, indexing, Search Console) |

This baseline is preserved here, not edited in place, per the project's standing "never alter an
existing file without a recoverable record" rule — the corrected files are the same two files,
edited in place with git history as the record (see `CHANGELOG.md`); this document is the
pre-fix snapshot for comparison.
