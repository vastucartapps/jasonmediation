# Test results — money-page-maker regression suite

Run: `python3 .claude/skills/money-page-maker/tests/run_tests.py`
Date: 2026-10-23
Result: **9/9 PASS**, exit code 0.

```
9/9 fixture cases matched their expected result.

[PASS] valid_page passes public-output scan (expected exit 0, got 0)
[PASS] exposed_internal_notes fails public-output scan (expected exit 1, got 1)
[PASS] valid_page passes schema validation (expected exit 0, got 0)
[PASS] prohibited_schema_types fails schema validation (LocalBusiness + Review) (expected exit 1, got 1)
[PASS] dangling_id fails schema validation (unresolved @id reference) (expected exit 1, got 1)
[PASS] near_duplicate pair fails uniqueness check (template clone, city swapped) (expected exit 1, got 1)
[PASS] real sample pages (hub + spoke) pass uniqueness check (expected exit 0, got 0)
[PASS] bad_geo_claims fails geographic check (Yuma is not Maricopa County) (expected exit 1, got 1)
[PASS] real hub page geo claims (corrected) pass geographic check (expected exit 0, got 0)
```

## Coverage

- 4 positive cases (should PASS): valid_page x2, real sample pages, real corrected geo claims.
- 5 negative cases (should FAIL): exposed internal notes, prohibited schema types, dangling @id,
  near-duplicate template-clone pair, bad geo claims. The suite does not pass by rejecting
  everything — both directions are tested, per Part I section 21.1's explicit requirement.
- All 4 scripts (`scan_public_output.py`, `validate_schema.py`, `check_uniqueness.py`,
  `check_geo_claims.py`) are exercised by at least one positive and one negative case each.

## Bugs this suite caught during its own construction (not fixed quietly — recorded here)

1. `run_tests.py` itself had a path-resolution bug (`SKILL_ROOT.parent.parent` instead of
   `.parent.parent.parent`) that pointed two tests at nonexistent files — caught by the suite
   producing `FileNotFoundError` tracebacks instead of false passes, then fixed and re-run.
2. `check_uniqueness.py`'s boilerplate-document-frequency step was degenerate below 4 pages,
   silently zeroing out all comparison content and reporting a meaningless `Jaccard 0.000` that
   looked like a strong pass but reflected no actual comparison. Caught by manually inspecting the
   script's own output against the real sample pages (not by this fixture suite, which was written
   after the fix) — added as an explicit guard, with the real 2-page result (0.066) now reported
   honestly alongside a disclosed limitation rather than a misleading zero.

## What this suite does NOT cover

- Real browser rendering, mobile layout, or Core Web Vitals -- no tool available in this
  environment (see `SKILL.md`'s "Known limitations"). Not simulated or faked here.
- Model-based judgment calls (is this overlap legitimate shared citation vs. disguised template
  cloning; does this page pass the anti-commodity test) -- deliberately left to human/model review
  per `references/page-qualification.md` and Gate E, not forced into a deterministic script that
  would either be too strict or too permissive for nuanced cases.
