# 07 — Feature Dependency Map

```mermaid
graph TD
  F[Foundation: design system, shell, 5-tab nav] --> A[Auth, profiles, settings]
  A --> DB[User data tables + RLS]
  C[Curriculum-as-code model] --> CON[Conservatory pages]
  DB --> CON
  DB --> DEV[Actor Development Engine]
  CON --> DEV
  DEV --> BASE[Actor's Baseline]
  DEV --> PASS[Passport, evidence, milestones]
  DB --> MED[Media core: recorder, private storage, takes]
  MED --> LAB[Performance Lab, Take Review]
  LAB --> TT[Three Takes Three Tactics]
  LAB --> BS[Bullsh*t Detector]
  LAB --> NOTE[Do the Damn Note]
  SCN[Scene model + Living Scene Engine] --> LIVE[Live Scene Session]
  MED --> LIVE
  LIVE --> UD[Unpredictable Director]
  LIVE --> UP[Unpredictable Partner]
  LIVE --> LT[Listening Trap]
  LIVE --> LOUNGE[Rehearsal Lounge]
  LAB --> STUCK[Stuck Desk interventions]
  STUCK --> RESCUE[60-Second Rescue]
  STUCK --> NT[No Tears Required]
  LIVE --> SFH[Set From Hell]
  MED --> WORK[Actor at Work: self-tape, auditions]
  WORK --> SFH
  AI[Lovable AI Gateway server functions] --> CHAIR[Director's Chair]
  NOTE --> CHAIR
  CHAIR --> NOTIF[Notifications]
  PASS --> PORT[Portfolio]
```

## Critical path

Foundation → Auth/DB → Curriculum model → Development Engine → Media core → Living Scene Engine. Everything else hangs off these six.

## External dependencies

| Dependency | Needed by | Fallback |
| --- | --- | --- |
| Lovable Cloud | Everything with user data | None — required from Phase 1 |
| Browser camera/mic (MediaRecorder) | Takes, self-tape, interventions | Text reflection evidence; clear unsupported-device message |
| Lovable AI Gateway | Director's Chair AI notes, optional note generation | Curated note banks and coach review |
| Text-to-speech (optional) | Unpredictable Partner voiced lines | On-screen partner lines |
| Qualified practitioner review | Curriculum content (Phase 9) | Content stays `beta` until reviewed |
| Capacitor | Native packaging | PWA |
