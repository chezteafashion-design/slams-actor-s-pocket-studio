<!-- GENERATED from src/domain/constitution.ts by `bun scripts/generate-constitution-docs.ts`. Do not edit by hand. -->

# 02 — Route Registry

Every route SLAMS will ship. Paths use TanStack Router syntax (`$param`). `Tab` is the bottom-nav destination highlighted on that page. `Member` routes live under the authenticated layout.

## Permanent navigation

| Tab | Path |
| --- | --- |
| OFFICE | `/` |
| SCHOOLS | `/schools` |
| REHEARSE | `/rehearse` |
| WORK | `/work` |
| STUCK DESK | `/stuck` |

Development and Account pages are reached from the Office (systems row, Passport card) and the header profile button — never as extra tabs.

## All routes

| # | Page | Path | Family | Tab | Access | Phase | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | The Office | `/` | Home | OFFICE | Member | 1 | Planned |
| 2 | Welcome | `/welcome` | Home | OFFICE | Public | 1 | Planned |
| 3 | Notifications | `/notifications` | Home | OFFICE | Member | 8 | Planned |
| 4 | The Conservatory | `/schools` | Training | SCHOOLS | Public | 2 | Planned |
| 5 | School Detail | `/schools/$schoolSlug` | Training | SCHOOLS | Public | 2 | Planned |
| 6 | Year & Term | `/schools/$schoolSlug/terms/$termId` | Training | SCHOOLS | Member | 2 | Planned |
| 7 | Course | `/schools/$schoolSlug/courses/$courseId` | Training | SCHOOLS | Member | 2 | Planned |
| 8 | Workshop | `/schools/$schoolSlug/workshops/$workshopId` | Training | SCHOOLS | Member | 2 | Planned |
| 9 | Lesson | `/schools/$schoolSlug/lessons/$lessonId` | Training | SCHOOLS | Member | 2 | Planned |
| 10 | Exercise Session | `/schools/$schoolSlug/exercises/$exerciseId` | Training | SCHOOLS | Member | 2 | Planned |
| 11 | Assessment | `/schools/$schoolSlug/assessments/$assessmentId` | Training | SCHOOLS | Member | 2 | Planned |
| 12 | Advancement & Graduation | `/schools/$schoolSlug/advancement` | Training | SCHOOLS | Member | 2 | Planned |
| 13 | Technique Matrix | `/technique-matrix` | Training | SCHOOLS | Public | 2 | Planned |
| 14 | Living Scene | `/rehearse` | Rehearsal | REHEARSE | Member | 5 | Planned |
| 15 | Scene Setup | `/rehearse/scenes/$sceneId` | Rehearsal | REHEARSE | Member | 5 | Planned |
| 16 | Live Scene Session | `/rehearse/sessions/$sessionId` | Rehearsal | REHEARSE | Member | 5 | Planned |
| 17 | Performance Lab | `/rehearse/lab` | Rehearsal | REHEARSE | Member | 4 | Planned |
| 18 | Take Review | `/rehearse/lab/takes/$takeId` | Rehearsal | REHEARSE | Member | 4 | Planned |
| 19 | Rehearsal Lounge | `/rehearse/lounge` | Rehearsal | REHEARSE | Member | 5 | Planned |
| 20 | Actor at Work | `/work` | Professional | WORK | Member | 7 | Planned |
| 21 | Auditions | `/work/auditions` | Professional | WORK | Member | 7 | Planned |
| 22 | Audition Prep | `/work/auditions/$auditionId` | Professional | WORK | Member | 7 | Planned |
| 23 | Character Laboratory | `/work/characters` | Professional | WORK | Member | 7 | Planned |
| 24 | Scene Breakdown | `/work/breakdowns/$breakdownId` | Professional | WORK | Member | 7 | Planned |
| 25 | Self-Tape Studio | `/work/self-tape` | Professional | WORK | Member | 7 | Planned |
| 26 | Scripts Library | `/work/scripts` | Professional | WORK | Member | 7 | Planned |
| 27 | Script Workspace | `/work/scripts/$scriptId` | Professional | WORK | Member | 7 | Planned |
| 28 | Projects & Journals | `/work/projects` | Professional | WORK | Member | 7 | Planned |
| 29 | The Stuck Desk | `/stuck` | Troubleshooting | STUCK DESK | Member | 6 | Planned |
| 30 | Diagnose My Problem | `/stuck/diagnose` | Troubleshooting | STUCK DESK | Member | 6 | Planned |
| 31 | Problem Detail | `/stuck/problems/$problemSlug` | Troubleshooting | STUCK DESK | Member | 6 | Planned |
| 32 | Intervention Session | `/stuck/rescue/$interventionId` | Troubleshooting | STUCK DESK | Member | 6 | Planned |
| 33 | Retake Result | `/stuck/rescue/$interventionId/result` | Troubleshooting | STUCK DESK | Member | 6 | Planned |
| 34 | Actor's Baseline | `/baseline` | Development | OFFICE | Member | 3 | Planned |
| 35 | Baseline Task | `/baseline/$taskId` | Development | OFFICE | Member | 3 | Planned |
| 36 | Baseline Results | `/baseline/results` | Development | OFFICE | Member | 3 | Planned |
| 37 | My Actor's Journey | `/journey` | Development | OFFICE | Member | 3 | Planned |
| 38 | Evidence Locker | `/journey/evidence` | Development | OFFICE | Member | 3 | Planned |
| 39 | Milestones | `/journey/milestones` | Development | OFFICE | Member | 3 | Planned |
| 40 | Portfolio | `/journey/portfolio` | Development | OFFICE | Member | 7 | Planned |
| 41 | The Director's Chair | `/directors-chair` | Development | OFFICE | Member | 8 | Planned |
| 42 | Sign In / Create Account | `/auth` | Account | OFFICE | Public | 1 | Planned |
| 43 | Reset Password | `/reset-password` | Account | OFFICE | Public | 1 | Planned |
| 44 | Profile | `/account` | Account | OFFICE | Member | 1 | Planned |
| 45 | Settings | `/account/settings` | Account | OFFICE | Member | 1 | Planned |
| 46 | Privacy & Data | `/account/privacy` | Account | OFFICE | Member | 1 | Planned |
| 47 | About & Feature Status | `/about` | Account | OFFICE | Public | 1 | Planned |
