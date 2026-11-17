# 09 — Acceptance Criteria

## Global (every phase)

- G1 Bottom nav shows exactly OFFICE, SCHOOLS, REHEARSE, WORK, STUCK DESK (test-enforced).
- G2 No fabricated data: every number, percentage, badge, result and AI reply on screen traces to a stored record or a computed rule; new accounts show honest empty states.
- G3 Every visible control performs its action; unbuilt features are hidden or shown with their registry status, never as dead buttons.
- G4 Registry status is updated in `src/domain/constitution.ts` when a feature ships; generated docs regenerated; tests pass.
- G5 AI output is labelled "AI" everywhere it appears.
- G6 Mobile-first: usable at 360px, primary target 390–430px, no horizontal scroll; 44px touch targets.
- G7 Accessibility: keyboard and screen-reader operable; WCAG 2.2 AA contrast; reduced motion honoured; media has captions or transcripts where content is authored.
- G8 Security: RLS on every table; recordings private; standing-changing writes only via server functions.
- G9 Each route has unique head() metadata.
- G10 Automated tests cover each rule introduced in the phase.

## Per phase

**Phase 1 Foundation** — A new user can sign up, sign in (email, Google), reset password, edit profile, change settings, export data and delete the account; Office renders with real (empty) state; About lists all 47 pages and 10 experiences with their real status.

**Phase 2 Conservatory** — All eight schools listed in constitutional order; content validator rejects broken hierarchy (orphan IDs, duplicate IDs); one term can be completed end to end; assessment result never changes without the defined reviewer; advancement granted only when rules pass (tests for pass and fail).

**Phase 3 Baseline & Development** — Baseline scoring is versioned and deterministic (same answers → same result, test-enforced); results explain why a pathway is recommended; Passport numbers equal engine output; milestones only from rules.

**Phase 4 Performance Lab** — Takes record, upload, play and delete on iOS Safari, Android Chrome and desktop Chrome; Three Takes requires three distinct tactics; a note cannot be marked applied without a linked retake; truth rubric flags declared-tactic contradictions.

**Phase 5 Living Scene** — Engine is a pure state machine with tests per phase transition; same seed reproduces the same injections; Listening Trap scoring matches the planted change; partner invites expire and are revocable.

**Phase 6 Stuck Desk** — Diagnosis rules are table-driven and tested; the 60-Second Rescue timer is accurate to ±1s and survives backgrounding; before/after takes saved as evidence.

**Phase 7 Actor at Work** — Script upload/paste, marking and breakdown persist; self-tape download works; Set From Hell scenarios come from the bank and are logged as session events.

**Phase 8 Director's Chair** — Coaches see only shared takes; shares revocable; AI feedback stored with `reviewer_kind='ai'`; notifications only from real events.

**Phase 9 Curriculum** — Every school has authored, reviewed content for its declared years and terms; content status moves to live only after review.

**Phase 10 Release** — Lighthouse mobile performance ≥ 85 on key pages; accessibility audit passes; PWA installable; Capacitor build runs camera/mic capture.
