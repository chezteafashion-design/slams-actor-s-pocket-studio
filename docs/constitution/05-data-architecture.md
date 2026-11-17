# 05 — Data Architecture

Two kinds of data, never mixed:

1. **Authored content** — curriculum, scenes, problems, interventions, note banks. Curriculum-as-code in `src/content/`, typed, validated by tests, referenced by stable string IDs (e.g. `meisner.y1.t1.c1.w2.l3`).
2. **User data** — everything an actor does. Lovable Cloud Postgres with row-level security; recordings and scripts in private storage buckets.

Content IDs are permanent: content can be revised, but an ID is never reused for different material, so user history stays meaningful.

## Content model (TypeScript)

```text
School { slug, order, name, focus, years: Year[] }
  Year { id, number, title, terms: Term[] }
    Term { id, number, title, courses: Course[] }
      Course { id, title, outcomes[], workshops: Workshop[] }
        Workshop { id, title, lessons: Lesson[], requiredEvidence: EvidenceRequirement[] }
          Lesson { id, title, why, how, when, avoid, exercises: Exercise[] }
            Exercise { id, title, kind, durationSec, steps[], evidenceKinds[], signature? }
  Assessment { id, schoolSlug, scope (term|year), rubric[], evidenceRequirements[], reviewer }
  AdvancementRule { id, schoolSlug, from, to, requires: AssessmentId[] }
Scene { id, title, roles[], lines[], beats[], givenCircumstances, variationSets[] }
Problem { slug, title, symptoms[], causes[], interventions: InterventionId[], relatedLessons[] }
Intervention { id, title, durationSec, steps[], signature? }
NoteBank / PressureBank { id, entries[] }
```

## User data (Postgres)

All tables have `id uuid`, `created_at`, and `user_id` (owner) unless noted. RLS: owner-only read/write by default.

| Table | Key columns | Notes |
| --- | --- | --- |
| `profiles` | user_id PK, display_name, experience_level, goals[], avatar_path | Created on sign-up |
| `user_roles` | user_id, role (`actor`,`coach`,`admin`) | Separate table; checked via security-definer function |
| `user_settings` | user_id PK, language_intensity, reduced_motion, captions, recording_defaults | |
| `enrollments` | school_slug, role (`primary`,`support`,`elective`), status, started_at | One row per school |
| `lesson_progress` | lesson_id, status (`studied`), studied_at | |
| `exercise_attempts` | exercise_id, started_at, finished_at, reflection | |
| `practice_evidence` | kind (`recording`,`reflection`,`partner_note`,`rubric`), source_type, source_id, take_id?, body | Links any evidence to its origin |
| `assessment_submissions` | assessment_id, evidence_ids[], self_scores jsonb, status (`draft`,`submitted`,`passed`,`needs_work`), reviewer_kind, reviewer_id?, decided_at | Status changes only by the defined reviewer |
| `advancements` | school_slug, from_level, to_level, basis_submission_ids[], granted_at | Written only by the Development Engine server function |
| `baseline_assessments` | version, started_at, completed_at | |
| `baseline_responses` | baseline_id, task_id, answers jsonb, take_id? | |
| `baseline_results` | baseline_id, dimension_scores jsonb, pathway jsonb, rule_version | Computed by a versioned rule set |
| `user_scenes` | title, source_script_id?, scene jsonb | Actor-created scenes |
| `scene_sessions` | scene_ref, mode, seed, config jsonb, phase, started_at, ended_at | Seed makes injections reproducible |
| `session_events` | session_id, t_ms, type, payload jsonb | Notes injected, traps, actor marks |
| `takes` | storage_path, duration_ms, source_type, source_id, tactic?, note_id?, set_id? | File in private `recordings` bucket |
| `take_sets` | kind (`three_tactics`), tactics[] | |
| `take_reviews` | take_id, reviewer_kind (`self`,`coach`,`ai`), rubric jsonb, notes | AI rows always `reviewer_kind='ai'` |
| `director_notes` | source (`system`,`coach`,`ai`), author_id?, context_type, context_id, body, status (`open`,`applied`,`dismissed`), applied_take_id? | `applied` requires a take |
| `review_requests` / `review_shares` | take_ids[], coach_id, status, expires_at | Explicit, revocable sharing grants |
| `rehearsal_rooms` / `rehearsal_invites` | scene_ref, host_id, invite_token_hash, expires_at | Partner sessions |
| `auditions` | title, project, role, date, status, script_id? | |
| `characters` | project_id?, name, circumstances jsonb, objective, super_objective, physicality jsonb, imagination jsonb | |
| `scripts` / `script_marks` | title, storage_path?, text / range, kind, note | |
| `scene_breakdowns` | script_id, beats jsonb | |
| `projects` / `journal_entries` | title, kind, dates / project_id?, body | |
| `stuck_reports` | problem_slug, answers jsonb | Diagnosis input and result |
| `interventions` | problem_slug, intervention_id, before_take_id, after_take_id, rating_before, rating_after, completed_at | |
| `milestones` | milestone_id, earned_at, basis jsonb | Written only by engine rules |
| `portfolio_items` | kind, storage_path?, data jsonb, is_shared | |
| `notifications` | type, ref_type, ref_id, read_at | Created only by real events |

Storage buckets (private): `recordings`, `scripts`, `headshots`. Access via signed URLs issued by server functions after ownership/share checks.

## Derived data (Actor Development Engine)

Progress, completion percentages, eligibility and milestone checks are pure functions in `src/domain/development-engine/` over the rows above, executed in server functions. Database views may cache aggregates; nothing stores a hand-entered percentage.

## Security

- RLS on every table; owner policies; coach access only through `review_shares`.
- Roles in `user_roles`, checked with a security-definer `has_role()` function; never on profiles.
- Writes that change standing (assessment results, advancements, milestones) go through server functions, never direct client inserts.
- Recordings never public; account deletion cascades to rows and storage objects.
