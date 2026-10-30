# AC Repair sample pages — final independent audit

This audit is a separate pass from the drafting/fixing work recorded in
`ac-repair-issue-register.md` — its job is to check what that pass might have missed, not restate
its summary. It re-ran every script fresh rather than trusting the fixer's own claimed results.

## Re-run results (verbatim, not paraphrased)

```
$ python3 .claude/skills/money-page-maker/scripts/scan_public_output.py <hub> <spoke>
[PASS] ...az-maricopa-county-ac-repair.html -- 0 finding(s)
[PASS] ...az-mesa-emergency-ac-repair.html -- 0 finding(s)
exit: 0

$ python3 .claude/skills/money-page-maker/scripts/validate_schema.py <hub> <spoke>
[PASS] ...az-maricopa-county-ac-repair.html   (35 nodes incl. 16 City, 5 Q/A pairs)
[PASS] ...az-mesa-emergency-ac-repair.html    (17 nodes incl. 1 City, 3 Q/A pairs)
exit: 0

$ python3 .claude/skills/money-page-maker/scripts/check_geo_claims.py <claims.json>
16/16 claims PASS
exit: 0

$ python3 .claude/skills/money-page-maker/scripts/check_uniqueness.py <hub> <spoke>
Jaccard 0.066 (flag >= 0.50), containment 0.092 / 0.184 (flag >= 0.80)
NOTE: page-set size (2) below boilerplate-strip minimum (4) -- disclosed, not hidden
exit: 0
```

## Things checked beyond re-running the scripts

- **Read both files end to end**, not just the diffs from the fix pass. Confirmed no leftover
  `.gated`/`.unbuilt` CSS classes are referenced by any visible element (a few are defined in
  `shared.css` but unused after the fixes — dead CSS, not a customer-facing defect, left as-is
  rather than churned for a cosmetic cleanup that wasn't asked for).
- **Re-checked the "demand vs. capability" framing** (AC-04) sentence by sentence across both
  pages' visible text, FAQ accordions, and FAQ schema — found all three locations correctly
  reworded on both files (the schema text and visible accordion text must match, or the schema
  would describe content the page doesn't actually show — checked, they match verbatim).
- **Checked the shared HomeAdvisor/Angi and NWS citations are identical in wording across both
  pages** — they are, deliberately, which is why `check_uniqueness.py` flags 140 shared shingles;
  confirmed by hand that this is legitimate shared-citation repetition (the same real external
  fact, cited the same way), not disguised template cloning. This is exactly the kind of
  overlap-interpretation judgment call `release-gates.md` Gate E requires a reviewer to make
  rather than trusting the raw number alone.
- **Confirmed the interactive estimator's JavaScript degrades correctly**: both pages include a
  `<noscript>` fallback showing the same real cited figure, satisfying the "100% raw HTML parity"
  requirement without a browser to test it live.
- **Confirmed the phone number is flagged as a blocker in a way a future session will actually
  see** — present in both files' HTML comments and in the claim ledger and release decision, not
  only mentioned once in chat.

## Independent findings (new, not already in the issue register)

- **No new defects found.** The 10 issues in `ac-repair-issue-register.md` are, to this
  independent pass's knowledge, the complete set for these two files. This audit cannot prove a
  negative with certainty — only that nothing further was found by repeating every available
  automated check and a full manual re-read.
- **One limitation flagged for the record, not fixed here**: the uniqueness check's statistical
  power is weak with only 2 pages in the set (disclosed by the script itself). Once Scottsdale,
  Yuma, and Gilbert sub-service pages are actually drafted (currently HOLD, see
  `ac-repair-page-qualification.md`), re-run `check_uniqueness.py` across all 5 pages together —
  that result will be more statistically meaningful than this one.

## Final status

**BLOCKED** — see `ac-repair-release-decision.json` for the full gate-by-gate breakdown. The
specific, sole reasons: a real phone number has not been obtained/tested (Gate A), and no
browser-based accessibility/performance test could run in this environment (Gate G, `NOT_TESTED`).
Every other gate is a genuine PASS with attached evidence, not an assumption.
