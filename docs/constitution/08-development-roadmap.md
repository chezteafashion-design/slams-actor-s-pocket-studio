# 08 — Development Roadmap

One phase per build prompt (or a few prompts for large phases). A phase is done only when its acceptance criteria (09) pass. Page assignment per phase is in 02.

| Phase | Name | Delivers | Pages |
| --- | --- | --- | --- |
| 0 | Constitution | This folder, typed registry, sync tests, honest foundation page | — |
| 1 | Foundation | Design system and SLAMS components, AppShell + 5-tab BottomNav, Lovable Cloud, auth (email + Google), profiles, roles, settings, privacy/export/delete, About & Feature Status driven by the registry | 1, 2, 42–47 |
| 2 | Conservatory vertical slice | Curriculum model + validators, all eight school shells, Technique Matrix, one complete term (Stanislavski Y1 T1) from lesson to advancement, exercise attempts, text evidence | 4–13 |
| 3 | Baseline & Development Engine | Baseline parts and versioned scoring rules, pathway → enrollments, Passport, Evidence Locker, rule-earned milestones; Office shows real progress | 34–39 |
| 4 | Performance Lab & media | Recorder, private storage, takes, Take Review, Three Takes Three Tactics, Do the Damn Note, Bullsh*t Detector rubric; recording evidence in exercises | 17, 18 |
| 5 | Living Scene Engine | Scene model, seeded engine, Live Session phases, Unpredictable Director, Unpredictable Partner, Listening Trap, Rehearsal Lounge with invites | 14–16, 19 |
| 6 | Stuck Desk | Problem library, diagnosis rules, interventions, 60-Second Rescue, No Tears Required, Retake Result | 29–33 |
| 7 | Actor at Work | Auditions, Audition Prep, Character Lab, Scene Breakdown, Scripts + marking, Self-Tape Studio with Set From Hell, Projects & Journals, Portfolio | 20–28, 40 |
| 8 | Director's Chair & notifications | Coach review via shares, labelled AI feedback through server functions, review requests, notifications | 3, 41 |
| 9 | Curriculum completion | Remaining terms and years for all eight schools, practitioner review, content moves from beta to live | content |
| 10 | Release hardening | Accessibility audit, performance budgets, offline tolerance for sessions, PWA, Capacitor packaging readiness, store-rating review | all |

## Phase 1 status

Built: account tables with per-user access rules, email sign-in/sign-up, password reset, Welcome, Profile, Settings, Privacy & Data (export and delete), About & Feature Status, the five tabs. Pages are `beta` until sign-up is verified with a real account. Google sign-in waits on the backend provider being switched on. Profile photo moves to the Portfolio (Phase 7).

## Phase 1 original scope

1. Enable Lovable Cloud; auth with email and Google; `profiles`, `user_roles`, `user_settings` with RLS.
2. Design system: tokens, fonts, SLAMS components (`AppShell`, `TopBar`, `BottomNav`, `ActionTile`, `SystemShortcut`, `PaperCard`, `BrassFrame`, `StatusBadge`, `HonestEmpty`).
3. Office with honest empty states and the four actions; tabs not yet built show their registry status rather than fake content.
4. Welcome, Auth, Reset Password, Profile, Settings, Privacy & Data, About & Feature Status.
5. Tests: nav has 5 destinations; Office actions route correctly; About lists every registry feature with its real status.
