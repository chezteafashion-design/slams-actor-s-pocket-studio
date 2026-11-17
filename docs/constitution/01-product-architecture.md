# 01 — Product Architecture

## 1. Mission

SLAMS is a comprehensive acting-training and professional actor-development studio: structured acting education, practical exercises, scene rehearsal, professional preparation, troubleshooting and guided development. It must feel like a premium creative institution — a working theatre office, not an educational dashboard.

Audience: beginners, developing actors, experienced performers, working professionals, actors returning to training, actors preparing for auditions and performances. The product never talks down; its voice is a demanding, honest coach ("not your cheerleader").

## 2. Immutable shape

```text
                         THE OFFICE  (home)
           TRAIN      REHEARSE        WORK        GET UNSTUCK
             |           |              |               |
     THE CONSERVATORY  REHEARSE    ACTOR AT WORK   THE STUCK DESK
     (8 schools)     (Living Scene)  (professional)  (troubleshooting)
             \___________|______________|_______________/
                 SIX SUPPORTING SYSTEMS (contextual)
   Baseline · Performance Lab · Technique Matrix · Rehearsal Lounge
              Passport / Journey · Director / Master's Chair
                 TWO SHARED ENGINES (invisible services)
         Living Scene Engine          Actor Development Engine
```

- **Three primary worlds:** The Conservatory, Actor at Work, The Stuck Desk.
- **Five permanent navigation destinations (bottom bar):** OFFICE | SCHOOLS | REHEARSE | WORK | STUCK DESK. No other tabs, ever.
- **Office principal actions:** TRAIN → Schools, REHEARSE → Rehearse, WORK → Work, GET UNSTUCK → Stuck Desk.
- **Supporting systems** are reached contextually (Office systems row, links inside flows), never as tabs.
- **Engines** have no pages of their own; they power pages.
- **Ten signature experiences** are modes and flows inside existing pages (03, "Signature experience placement"). They are not destinations.

## 3. The eight schools (constitutional order)

1 Stanislavski · 2 Meisner · 3 Stella Adler · 4 Lee Strasberg · 5 Michael Chekhov · 6 Laban / Bartenieff · 7 Practical Aesthetics · 8 Viewpoints / Composition.

Each school has its own curriculum, exercise library, assessments and progression. Schools share the data model, not content. Years/terms per school are content decisions made in Phase 2/9; the mockup board's suggested durations (e.g. Stanislavski 4 years / 8 terms) are treated as drafts.

## 4. Educational hierarchy

School → Year → Term → Course → Workshop → Lesson → Exercise → Practice Evidence → Assessment → Advancement.

Content levels (School … Exercise, Assessment definitions, Advancement rules) are authored content. Practice Evidence, Assessment submissions and Advancements are user data that reference content by stable IDs. See 05.

## 5. Signature experiences

| Experience | Lives in | Working mechanism |
| --- | --- | --- |
| Living Scene | Rehearse → Live Scene Session | Living Scene Engine phases Explore → Perform → Intervene → Practice → Reflect → Save |
| Unpredictable Director | Live Scene Session | Seeded note injection from a curated bank; optional labelled AI notes |
| Listening Trap | Exercise Session, Live Scene Session | Silent change to a partner line; actor marks what changed; scored against the plant |
| Bullsh*t Detector | Take Review, Assessment | Forced-choice truth rubric cross-checked against declared tactic |
| No Tears Required | Stuck Desk intervention | Converts emotional goals into action, obstacle and physical task, then retake |
| Do the Damn Note | Take Review, Director's Chair | Note bound to a retake; closed only when the retake exists; side-by-side compare |
| Set From Hell | Self-Tape Studio, Audition Prep | Pressure run injecting cuts, line changes and resets during recording |
| 60-Second Rescue | Stuck Desk intervention | Timed before / intervention / after loop with saved evidence |
| Three Takes Three Tactics | Performance Lab | Three declared action verbs, one take each, compared |
| Unpredictable Partner | Rehearsal Lounge, Live Scene Session | Partner reader varies delivery, intent and timing from variation sets |

## 6. Technology

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | TanStack Start v1, React 19, TypeScript strict | Full-stack, SSR for public pages, typed routing |
| Styling | Tailwind v4 tokens in `src/styles.css`, shadcn/Radix primitives | One themable design system, accessible primitives |
| Backend | Lovable Cloud (Postgres, auth, private file storage) | Persistence, row-level security, recordings |
| Server logic | `createServerFn` server functions; `/api/public/*` only for external callers | Secure, typed server boundary |
| AI | Lovable AI Gateway, called only from server functions | Director's Chair feedback, optional note generation; always labelled |
| Media | Browser MediaRecorder → private storage; later native capture via Capacitor | Works in mobile browsers now, packaged apps later |
| Content | Curriculum-as-code typed modules (`src/content/`) | Reviewable, versioned, validated by tests |
| Tests | Vitest + Testing Library; Playwright checks for flows | Rules and flows verified, not assumed |
| Packaging | Mobile-first responsive PWA → Capacitor iOS/Android | One codebase |

## 7. Product integrity rules (non-negotiable)

1. Never substitute a visual mockup for working functionality.
2. Never fabricate progress, assessments, recordings, AI responses or achievements. Empty means empty.
3. Every visible control has a defined action; if the action is not built, the control is not shown.
4. Every feature carries an honest status (`planned`, `in-development`, `beta`, `live`, `blocked`) from the registry, visible on About & Feature Status.
5. AI output is always labelled as AI and never presented as a human coach's judgement.
6. Nothing claims automated analysis of video or voice unless that analysis is actually implemented.
7. Progress percentages are computed from recorded events by the Actor Development Engine only.

## 8. Experience principles

- Mobile-first (360–430px primary), thumb-reachable actions, bottom nav always visible outside full-screen sessions.
- Theatre-office art direction: near-black warm wood, oxblood/theatre red, brass, parchment paper cards, condensed caps labels, serif titles.
- Fast to the work: from Office to a running exercise in ≤ 2 taps.
- Emotional safety: no exercise requires reliving trauma; affective-memory work carries guidance and opt-outs.
- Mature language is part of the brand voice; a Settings toggle softens it.

## 9. Resolved conflicts between mockups and constitution

| Mockup shows | Constitution rule | Resolution |
| --- | --- | --- |
| 7-tab nav (Office/Training/Rehearse/Work/Unstuck/Development/Account) | 5 destinations | 5 tabs; Development via Office, Account via header |
| Book shelf order differs (e.g. Practical Aesthetics 4th) | Schools ordered 1–8 | Constitutional order |
| "Your progress 42%", "Level 2 · Committed Actor 37%" | No fabricated progress | Shown only when computed; otherwise an honest empty state |

## 10. Open questions for the founder

1. The original 47-page blueprint was not supplied in full; 10 pages map to the mockup board and 37 were reconstructed (03). Please confirm or supply the original.
2. Levels/ranks naming (e.g. "Committed Actor") and their rules.
3. Who reviews assessments at launch: rule-only, invited coaches, mrahmostudios staff, or labelled AI?
4. Pricing / access model (free, subscription, per-school).
5. Use of the illustrated coach character as an in-app guide and its licensing.
