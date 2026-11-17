<!-- GENERATED from src/domain/constitution.ts by `bun scripts/generate-constitution-docs.ts`. Do not edit by hand. -->

# 03 — 47-Page Functional Coverage Matrix

Total pages: **47** across **7** families. Pages marked with a mockup number come from the supplied 10-screen blueprint board; the remaining pages were reconstructed from the constitution and must be confirmed against the original 47-page blueprint.

| Family | Pages |
| --- | --- |
| Home | 3 |
| Training | 10 |
| Rehearsal | 6 |
| Professional | 9 |
| Troubleshooting | 5 |
| Development | 8 |
| Account | 6 |

## Home

### 1. The Office (mockup 01)

- **Path:** `/` · **Tab:** OFFICE · **Access:** member · **Phase:** 1 · **Status:** Planned
- **Purpose:** Central hub: current training, the four principal actions, supporting-system shortcuts and the next real step.
- **Actions:** Resume current lesson; Train; Rehearse; Work; Get unstuck; Open a supporting system
- **Data:** `enrollments`, `lesson_progress`, `director_notes`, `notifications`
- **Systems / engines:** Actor's Baseline, Performance Lab, Technique Matrix, Rehearsal Lounge, Actor's Passport / My Actor's Journey, The Director / Master's Chair, Actor Development Engine
- **Signature experiences:** —

### 2. Welcome

- **Path:** `/welcome` · **Tab:** OFFICE · **Access:** public · **Phase:** 1 · **Status:** Planned
- **Purpose:** First-run entry: 'mrahmostudios presents', the product promise, and sign in or create account.
- **Actions:** Create account; Sign in; Read about SLAMS
- **Data:** none
- **Systems / engines:** —
- **Signature experiences:** —

### 3. Notifications

- **Path:** `/notifications` · **Tab:** OFFICE · **Access:** member · **Phase:** 8 · **Status:** Planned
- **Purpose:** Real events only: notes received, reviews completed, rehearsals the actor scheduled.
- **Actions:** Open related item; Mark read; Mark all read
- **Data:** `notifications`
- **Systems / engines:** —
- **Signature experiences:** —

## Training

### 4. The Conservatory (mockup 04)

- **Path:** `/schools` · **Tab:** SCHOOLS · **Access:** public · **Phase:** 2 · **Status:** Planned
- **Purpose:** The eight schools with honest enrollment state and entry to each.
- **Actions:** Open school; Compare in Technique Matrix; View my enrollments
- **Data:** `content:schools`, `enrollments`
- **Systems / engines:** Technique Matrix
- **Signature experiences:** —

### 5. School Detail (mockup 05)

- **Path:** `/schools/$schoolSlug` · **Tab:** SCHOOLS · **Access:** public · **Phase:** 2 · **Status:** Planned
- **Purpose:** School overview, curriculum (years and terms), practice library and assessments.
- **Actions:** Enroll; Set as primary or support school; Open term; Open exercise
- **Data:** `content:schools`, `content:years`, `content:terms`, `enrollments`
- **Systems / engines:** —
- **Signature experiences:** —

### 6. Year & Term

- **Path:** `/schools/$schoolSlug/terms/$termId` · **Tab:** SCHOOLS · **Access:** member · **Phase:** 2 · **Status:** Planned
- **Purpose:** A term within its year: courses in sequence, completion computed from real attempts.
- **Actions:** Open course; Resume next lesson
- **Data:** `content:terms`, `content:courses`, `lesson_progress`
- **Systems / engines:** Actor Development Engine
- **Signature experiences:** —

### 7. Course

- **Path:** `/schools/$schoolSlug/courses/$courseId` · **Tab:** SCHOOLS · **Access:** member · **Phase:** 2 · **Status:** Planned
- **Purpose:** Course outcomes and its workshops.
- **Actions:** Open workshop
- **Data:** `content:courses`, `content:workshops`, `lesson_progress`
- **Systems / engines:** —
- **Signature experiences:** —

### 8. Workshop

- **Path:** `/schools/$schoolSlug/workshops/$workshopId` · **Tab:** SCHOOLS · **Access:** member · **Phase:** 2 · **Status:** Planned
- **Purpose:** Ordered lessons and the practice evidence the workshop requires.
- **Actions:** Open lesson; View required evidence
- **Data:** `content:workshops`, `content:lessons`, `practice_evidence`
- **Systems / engines:** —
- **Signature experiences:** —

### 9. Lesson (mockup 06)

- **Path:** `/schools/$schoolSlug/lessons/$lessonId` · **Tab:** SCHOOLS · **Access:** member · **Phase:** 2 · **Status:** Planned
- **Purpose:** Learn (why, how, when, avoid), then exercise, practice and evidence.
- **Actions:** Start exercise; Mark lesson studied; Attach evidence
- **Data:** `content:lessons`, `lesson_progress`, `practice_evidence`
- **Systems / engines:** —
- **Signature experiences:** —

### 10. Exercise Session

- **Path:** `/schools/$schoolSlug/exercises/$exerciseId` · **Tab:** SCHOOLS · **Access:** member · **Phase:** 2 · **Status:** Planned
- **Purpose:** Guided, timed exercise run producing an attempt and practice evidence (reflection, recording or partner note).
- **Actions:** Start; Pause; Record evidence; Write reflection; Finish attempt
- **Data:** `content:exercises`, `exercise_attempts`, `practice_evidence`
- **Systems / engines:** Living Scene Engine, Actor Development Engine
- **Signature experiences:** Listening Trap

### 11. Assessment

- **Path:** `/schools/$schoolSlug/assessments/$assessmentId` · **Tab:** SCHOOLS · **Access:** member · **Phase:** 2 · **Status:** Planned
- **Purpose:** Rubric, selected evidence and self-assessment. Result stays pending until a defined reviewer (rule, coach or labelled AI) decides.
- **Actions:** Select evidence; Self-assess; Submit; View result
- **Data:** `content:assessments`, `assessment_submissions`, `practice_evidence`
- **Systems / engines:** The Director / Master's Chair
- **Signature experiences:** Bullsh*t Detector

### 12. Advancement & Graduation

- **Path:** `/schools/$schoolSlug/advancement` · **Tab:** SCHOOLS · **Access:** member · **Phase:** 2 · **Status:** Planned
- **Purpose:** Advancement rules and which are met, from real submissions. Advancement is granted only when the rules pass.
- **Actions:** Review requirements; Claim advancement when eligible; Add to Passport
- **Data:** `content:advancement_rules`, `assessment_submissions`, `advancements`
- **Systems / engines:** Actor's Passport / My Actor's Journey, Actor Development Engine
- **Signature experiences:** —

### 13. Technique Matrix

- **Path:** `/technique-matrix` · **Tab:** SCHOOLS · **Access:** public · **Phase:** 2 · **Status:** Planned
- **Purpose:** Compare schools across shared dimensions; find which technique addresses a need; choose a school.
- **Actions:** Compare schools; Filter by need; Open school
- **Data:** `content:schools`, `content:technique_dimensions`
- **Systems / engines:** Technique Matrix
- **Signature experiences:** —

## Rehearsal

### 14. Living Scene (mockup 07)

- **Path:** `/rehearse` · **Tab:** REHEARSE · **Access:** member · **Phase:** 5 · **Status:** Planned
- **Purpose:** Rehearse hub: scene library, recent sessions and rehearsal modes.
- **Actions:** Open scene; Resume session; Open Performance Lab; Open Rehearsal Lounge
- **Data:** `content:scenes`, `user_scenes`, `scene_sessions`
- **Systems / engines:** Living Scene Engine
- **Signature experiences:** Living Scene

### 15. Scene Setup

- **Path:** `/rehearse/scenes/$sceneId` · **Tab:** REHEARSE · **Access:** member · **Phase:** 5 · **Status:** Planned
- **Purpose:** Scene info, role, given circumstances, director's note and setup (mode, partner variability, recording).
- **Actions:** Choose role; Choose mode; Adjust setup; Start scene
- **Data:** `content:scenes`, `user_scenes`, `scene_sessions`
- **Systems / engines:** Living Scene Engine
- **Signature experiences:** Living Scene, Unpredictable Director, Listening Trap, Unpredictable Partner

### 16. Live Scene Session

- **Path:** `/rehearse/sessions/$sessionId` · **Tab:** REHEARSE · **Access:** member · **Phase:** 5 · **Status:** Planned
- **Purpose:** Run the scene: Explore, Perform, Intervene, Practice, Reflect, Save — with partner lines, injected notes and optional recording.
- **Actions:** Advance line; Pause; Mark what changed; Record take; Reflect; Save session
- **Data:** `scene_sessions`, `session_events`, `takes`
- **Systems / engines:** The Director / Master's Chair, Living Scene Engine
- **Signature experiences:** Living Scene, Unpredictable Director, Listening Trap, Unpredictable Partner

### 17. Performance Lab

- **Path:** `/rehearse/lab` · **Tab:** REHEARSE · **Access:** member · **Phase:** 4 · **Status:** Planned
- **Purpose:** All takes; record a new take; Three Takes Three Tactics sets; comparisons.
- **Actions:** Record take; Start three-tactic set; Compare takes; Open take
- **Data:** `takes`, `take_sets`
- **Systems / engines:** Performance Lab
- **Signature experiences:** Do the Damn Note, Three Takes Three Tactics

### 18. Take Review

- **Path:** `/rehearse/lab/takes/$takeId` · **Tab:** REHEARSE · **Access:** member · **Phase:** 4 · **Status:** Planned
- **Purpose:** Play a take, run the truth rubric, compare with another take, request a coach review, retake against a note.
- **Actions:** Play; Run truth rubric; Compare; Retake against note; Request review; Save as evidence
- **Data:** `takes`, `take_reviews`, `director_notes`, `practice_evidence`
- **Systems / engines:** Performance Lab, The Director / Master's Chair
- **Signature experiences:** Bullsh*t Detector, Do the Damn Note, Three Takes Three Tactics

### 19. Rehearsal Lounge

- **Path:** `/rehearse/lounge` · **Tab:** REHEARSE · **Access:** member · **Phase:** 5 · **Status:** Planned
- **Purpose:** Rehearse with a real partner by invite link, or with the Unpredictable Partner reader; schedule sessions.
- **Actions:** Invite partner; Rehearse with reader; Schedule session
- **Data:** `rehearsal_rooms`, `rehearsal_invites`, `scene_sessions`
- **Systems / engines:** Rehearsal Lounge, Living Scene Engine
- **Signature experiences:** Unpredictable Partner

## Professional

### 20. Actor at Work (mockup 08)

- **Path:** `/work` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Professional hub: auditions, characters, breakdowns, self-tapes, scripts, projects.
- **Actions:** Open auditions; Open character lab; Open scene breakdown; Open self-tape studio; Open scripts; Open projects
- **Data:** `auditions`, `characters`, `scripts`, `projects`
- **Systems / engines:** —
- **Signature experiences:** —

### 21. Auditions

- **Path:** `/work/auditions` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Audition tracker with dates, status and prep progress.
- **Actions:** Add audition; Open audition; Update status
- **Data:** `auditions`
- **Systems / engines:** —
- **Signature experiences:** —

### 22. Audition Prep

- **Path:** `/work/auditions/$auditionId` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Prep checklist: sides, breakdown, character, self-tape and a pressure run.
- **Actions:** Attach sides; Open breakdown; Open character; Start pressure run; Record self-tape
- **Data:** `auditions`, `scripts`, `scene_breakdowns`, `characters`, `takes`
- **Systems / engines:** Living Scene Engine
- **Signature experiences:** Set From Hell

### 23. Character Laboratory

- **Path:** `/work/characters` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Build a character: given circumstances, objectives, super-objective, physicality, imagination and relationships.
- **Actions:** New character; Edit layer; Link to project; Rehearse as character
- **Data:** `characters`, `projects`
- **Systems / engines:** Technique Matrix
- **Signature experiences:** —

### 24. Scene Breakdown

- **Path:** `/work/breakdowns/$breakdownId` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Beat-by-beat analysis: objective, action, obstacle, what changed, subtext.
- **Actions:** Add beat; Set objective and action; Send to Living Scene
- **Data:** `scene_breakdowns`, `scripts`
- **Systems / engines:** Living Scene Engine
- **Signature experiences:** —

### 25. Self-Tape Studio

- **Path:** `/work/self-tape` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Framing guide, slate, multiple takes, select and download.
- **Actions:** Check framing; Record slate; Record take; Start Set From Hell run; Select take; Download
- **Data:** `takes`, `auditions`
- **Systems / engines:** Performance Lab, Living Scene Engine
- **Signature experiences:** Set From Hell

### 26. Scripts Library

- **Path:** `/work/scripts` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Upload or paste scripts and sides; organise by project.
- **Actions:** Upload script; Paste text; Open script
- **Data:** `scripts`, `projects`
- **Systems / engines:** —
- **Signature experiences:** —

### 27. Script Workspace

- **Path:** `/work/scripts/$scriptId` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Read and mark a script (beats, objectives, tactics, subtext); send to breakdown or Living Scene.
- **Actions:** Mark text; Create breakdown; Rehearse in Living Scene
- **Data:** `scripts`, `script_marks`, `scene_breakdowns`
- **Systems / engines:** Living Scene Engine
- **Signature experiences:** Living Scene

### 28. Projects & Journals

- **Path:** `/work/projects` · **Tab:** WORK · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Productions, classes and personal projects with linked journal entries.
- **Actions:** New project; Write journal entry; Link script or character
- **Data:** `projects`, `journal_entries`
- **Systems / engines:** —
- **Signature experiences:** —

## Troubleshooting

### 29. The Stuck Desk (mockup 09)

- **Path:** `/stuck` · **Tab:** STUCK DESK · **Access:** member · **Phase:** 6 · **Status:** Planned
- **Purpose:** Common acting problems and entry to diagnosis.
- **Actions:** Diagnose my problem; Choose a common issue; Start 60-Second Rescue
- **Data:** `content:problems`, `stuck_reports`
- **Systems / engines:** —
- **Signature experiences:** 60-Second Rescue

### 30. Diagnose My Problem

- **Path:** `/stuck/diagnose` · **Tab:** STUCK DESK · **Access:** member · **Phase:** 6 · **Status:** Planned
- **Purpose:** Short questionnaire mapped by explicit rules to a problem and interventions.
- **Actions:** Answer question; Back; See diagnosis
- **Data:** `content:problems`, `stuck_reports`
- **Systems / engines:** —
- **Signature experiences:** —

### 31. Problem Detail

- **Path:** `/stuck/problems/$problemSlug` · **Tab:** STUCK DESK · **Access:** member · **Phase:** 6 · **Status:** Planned
- **Purpose:** What the problem is, likely causes, ranked interventions and related lessons.
- **Actions:** Start intervention; Open related lesson
- **Data:** `content:problems`, `content:interventions`
- **Systems / engines:** —
- **Signature experiences:** Listening Trap, Bullsh*t Detector, No Tears Required

### 32. Intervention Session

- **Path:** `/stuck/rescue/$interventionId` · **Tab:** STUCK DESK · **Access:** member · **Phase:** 6 · **Status:** Planned
- **Purpose:** Timed intervention: before take, intervention, after take.
- **Actions:** Record before take; Run intervention; Record after take
- **Data:** `interventions`, `takes`
- **Systems / engines:** Performance Lab
- **Signature experiences:** No Tears Required, 60-Second Rescue

### 33. Retake Result

- **Path:** `/stuck/rescue/$interventionId/result` · **Tab:** STUCK DESK · **Access:** member · **Phase:** 6 · **Status:** Planned
- **Purpose:** Before and after compared, self-rating, save as evidence, next step.
- **Actions:** Compare takes; Rate change; Save as evidence; Try another intervention
- **Data:** `interventions`, `takes`, `practice_evidence`
- **Systems / engines:** Actor Development Engine
- **Signature experiences:** 60-Second Rescue

## Development

### 34. Actor's Baseline (mockup 02)

- **Path:** `/baseline` · **Tab:** OFFICE · **Access:** member · **Phase:** 3 · **Status:** Planned
- **Purpose:** Diagnostic onboarding overview: four parts with honest time estimates.
- **Actions:** Start assessment; Resume part
- **Data:** `baseline_assessments`
- **Systems / engines:** Actor's Baseline
- **Signature experiences:** —

### 35. Baseline Task

- **Path:** `/baseline/$taskId` · **Tab:** OFFICE · **Access:** member · **Phase:** 3 · **Status:** Planned
- **Purpose:** One part of the baseline: experience and goals, practical tasks, strengths, pathway preferences.
- **Actions:** Answer; Record task; Save and continue
- **Data:** `baseline_responses`, `takes`
- **Systems / engines:** Actor's Baseline
- **Signature experiences:** —

### 36. Baseline Results (mockup 03)

- **Path:** `/baseline/results` · **Tab:** OFFICE · **Access:** member · **Phase:** 3 · **Status:** Planned
- **Purpose:** Dimension profile computed from the actor's own answers and ratings; recommended pathway with its reasons.
- **Actions:** Accept pathway; Adjust pathway; Begin training
- **Data:** `baseline_results`, `enrollments`
- **Systems / engines:** Actor's Baseline, Actor Development Engine
- **Signature experiences:** —

### 37. My Actor's Journey (mockup 10)

- **Path:** `/journey` · **Tab:** OFFICE · **Access:** member · **Phase:** 3 · **Status:** Planned
- **Purpose:** Passport: real progress across schools, assessments, takes, notes and milestones.
- **Actions:** Open evidence; Open milestones; Open portfolio
- **Data:** `enrollments`, `advancements`, `takes`, `director_notes`, `milestones`
- **Systems / engines:** Actor's Passport / My Actor's Journey, Actor Development Engine
- **Signature experiences:** —

### 38. Evidence Locker

- **Path:** `/journey/evidence` · **Tab:** OFFICE · **Access:** member · **Phase:** 3 · **Status:** Planned
- **Purpose:** Every piece of practice evidence with its source exercise, take or intervention.
- **Actions:** Filter; Open evidence; Delete evidence
- **Data:** `practice_evidence`
- **Systems / engines:** Actor's Passport / My Actor's Journey
- **Signature experiences:** —

### 39. Milestones

- **Path:** `/journey/milestones` · **Tab:** OFFICE · **Access:** member · **Phase:** 3 · **Status:** Planned
- **Purpose:** Milestones earned by rule from real events, with the evidence that earned them.
- **Actions:** Open milestone; View requirements
- **Data:** `milestones`
- **Systems / engines:** Actor's Passport / My Actor's Journey, Actor Development Engine
- **Signature experiences:** —

### 40. Portfolio

- **Path:** `/journey/portfolio` · **Tab:** OFFICE · **Access:** member · **Phase:** 7 · **Status:** Planned
- **Purpose:** Headshots, selected scenes and resume; shareable only when the actor chooses.
- **Actions:** Upload headshot; Add scene; Edit resume; Share link
- **Data:** `portfolio_items`, `takes`
- **Systems / engines:** Actor's Passport / My Actor's Journey
- **Signature experiences:** —

### 41. The Director's Chair

- **Path:** `/directors-chair` · **Tab:** OFFICE · **Access:** member · **Phase:** 8 · **Status:** Planned
- **Purpose:** Notes received, feedback requests and Master's Chair sessions with coaches or labelled AI.
- **Actions:** Open note; Request feedback; Mark note applied
- **Data:** `director_notes`, `review_requests`
- **Systems / engines:** The Director / Master's Chair
- **Signature experiences:** Unpredictable Director, Do the Damn Note

## Account

### 42. Sign In / Create Account

- **Path:** `/auth` · **Tab:** OFFICE · **Access:** public · **Phase:** 1 · **Status:** Planned
- **Purpose:** Email and Google sign-in; account creation.
- **Actions:** Sign in; Create account; Continue with Google; Forgot password
- **Data:** `auth.users`, `profiles`
- **Systems / engines:** —
- **Signature experiences:** —

### 43. Reset Password

- **Path:** `/reset-password` · **Tab:** OFFICE · **Access:** public · **Phase:** 1 · **Status:** Planned
- **Purpose:** Set a new password from the emailed link.
- **Actions:** Set new password
- **Data:** `auth.users`
- **Systems / engines:** —
- **Signature experiences:** —

### 44. Profile

- **Path:** `/account` · **Tab:** OFFICE · **Access:** member · **Phase:** 1 · **Status:** Planned
- **Purpose:** Name, experience level, goals and photo.
- **Actions:** Edit profile; Sign out
- **Data:** `profiles`
- **Systems / engines:** —
- **Signature experiences:** —

### 45. Settings

- **Path:** `/account/settings` · **Tab:** OFFICE · **Access:** member · **Phase:** 1 · **Status:** Planned
- **Purpose:** Notifications, recording defaults, language intensity, reduced motion and captions.
- **Actions:** Toggle setting; Save
- **Data:** `user_settings`
- **Systems / engines:** —
- **Signature experiences:** —

### 46. Privacy & Data

- **Path:** `/account/privacy` · **Tab:** OFFICE · **Access:** member · **Phase:** 1 · **Status:** Planned
- **Purpose:** Export data, delete recordings, manage sharing, delete account.
- **Actions:** Export data; Delete recordings; Revoke share; Delete account
- **Data:** `takes`, `review_shares`, `profiles`
- **Systems / engines:** —
- **Signature experiences:** —

### 47. About & Feature Status

- **Path:** `/about` · **Tab:** OFFICE · **Access:** public · **Phase:** 1 · **Status:** Planned
- **Purpose:** mrahmostudios credit, live status of every feature, technique non-affiliation notice.
- **Actions:** Read status; Contact
- **Data:** `registry:features`
- **Systems / engines:** —
- **Signature experiences:** —

## Signature experience placement

| Experience | Home page | Also appears in | Depends on | Phase |
| --- | --- | --- | --- | --- |
| Living Scene | Live Scene Session | Living Scene, Scene Setup, Script Workspace | Living Scene Engine | 5 |
| Unpredictable Director | Live Scene Session | Scene Setup, The Director's Chair | Living Scene Engine, The Director / Master's Chair | 5 |
| Listening Trap | Exercise Session | Live Scene Session, Scene Setup, Problem Detail | Living Scene Engine | 5 |
| Bullsh*t Detector | Take Review | Assessment, Problem Detail | Performance Lab, media-recording | 4 |
| No Tears Required | Intervention Session | Problem Detail | Performance Lab | 6 |
| Do the Damn Note | Take Review | Performance Lab, The Director's Chair | Performance Lab, The Director / Master's Chair, media-recording | 4 |
| Set From Hell | Self-Tape Studio | Audition Prep | Living Scene Engine, media-recording | 7 |
| 60-Second Rescue | Intervention Session | The Stuck Desk, Retake Result | Performance Lab | 6 |
| Three Takes Three Tactics | Performance Lab | Take Review | Performance Lab, media-recording | 4 |
| Unpredictable Partner | Rehearsal Lounge | Live Scene Session, Scene Setup | Living Scene Engine, Rehearsal Lounge | 5 |

## Supporting system and engine coverage

| System / engine | Pages |
| --- | --- |
| Actor's Baseline | 1. The Office, 34. Actor's Baseline, 35. Baseline Task, 36. Baseline Results |
| Performance Lab | 1. The Office, 17. Performance Lab, 18. Take Review, 25. Self-Tape Studio, 32. Intervention Session |
| Technique Matrix | 1. The Office, 4. The Conservatory, 13. Technique Matrix, 23. Character Laboratory |
| Rehearsal Lounge | 1. The Office, 19. Rehearsal Lounge |
| Actor's Passport / My Actor's Journey | 1. The Office, 12. Advancement & Graduation, 37. My Actor's Journey, 38. Evidence Locker, 39. Milestones, 40. Portfolio |
| The Director / Master's Chair | 1. The Office, 11. Assessment, 16. Live Scene Session, 18. Take Review, 41. The Director's Chair |
| Living Scene Engine | 10. Exercise Session, 14. Living Scene, 15. Scene Setup, 16. Live Scene Session, 19. Rehearsal Lounge, 22. Audition Prep, 24. Scene Breakdown, 25. Self-Tape Studio, 27. Script Workspace |
| Actor Development Engine | 1. The Office, 6. Year & Term, 10. Exercise Session, 12. Advancement & Graduation, 33. Retake Result, 36. Baseline Results, 37. My Actor's Journey, 39. Milestones |
