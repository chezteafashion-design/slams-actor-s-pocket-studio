# 04 — Component Architecture

## Layers

```text
src/
  routes/                 Thin route files: params, loader, head(), compose features
    _authenticated/       Member-only subtree (managed auth layout)
  features/<area>/        Feature UI + hooks per world/system
    office/ conservatory/ rehearse/ work/ stuck/ development/ account/
  components/
    ui/                   shadcn/Radix primitives (button, dialog, tabs…)
    slams/                SLAMS design-system components (below)
  domain/                 Pure TypeScript: models, rules, engines, registry (no React, no I/O)
    constitution.ts       Product registry (pages, systems, experiences, status)
    curriculum/           Hierarchy types + validators
    development-engine/   Progress, eligibility, milestone rules
    living-scene/         Scene state machine, injectors, seeded RNG
    stuck-desk/           Diagnosis rules
  content/                Curriculum-as-code, scenes, problems, note banks
  server/                 *.functions.ts server functions (auth, data, AI)
  integrations/           Lovable Cloud client (generated)
  lib/                    Utilities (media, formatting)
```

Rule: domain logic never lives in components. Components call hooks; hooks call server functions; server functions call domain rules and the database.

## SLAMS design-system components (`src/components/slams/`)

| Component | Role |
| --- | --- |
| `AppShell` | Top bar + content + `BottomNav`; hides nav in full-screen sessions |
| `TopBar` | Wordmark, notifications bell (real count), profile button |
| `BottomNav` | Exactly the five destinations from `NAV_DESTINATIONS` |
| `ActionTile` | Office TRAIN / REHEARSE / WORK / GET UNSTUCK tiles |
| `SystemShortcut` | Office supporting-system row items |
| `PaperCard` | Parchment card surface (mission, notes, curriculum) |
| `BrassFrame` | Gold-bordered premium container / CTA |
| `SchoolSpine` / `SchoolCard` | School book spine and portrait card |
| `StepRail` | Phase rail (Explore→Save, Baseline parts) |
| `ProgressDial` | Renders only engine-computed values; empty state otherwise |
| `StatusBadge` | Honest feature status from the registry |
| `HonestEmpty` | Empty state with the one real next action |
| `Recorder` | MediaRecorder wrapper with permission, preview, retry |
| `TakePlayer` / `TakeCompare` | Playback and side-by-side compare |
| `CountdownTimer` | 60-Second Rescue and timed exercises |
| `RubricForm` | Truth rubric / assessment rubric |
| `DirectorNote` | Note display with source label (coach / system / AI) |
| `ScriptView` | Script reading and marking |

## State and data

- Server state: TanStack Query; route loaders `ensureQueryData`, components `useSuspenseQuery`.
- Engine session state (Living Scene, interventions): local reducer from `src/domain`, persisted as events at checkpoints.
- Forms: react-hook-form + zod schemas shared with server validators.
- No global client store unless a real need appears.

## Accessibility

Radix primitives for focus and ARIA; every icon button has a label; captions/transcripts for media; reduced-motion respected; 44px touch targets; WCAG 2.2 AA contrast on paper and dark surfaces.
