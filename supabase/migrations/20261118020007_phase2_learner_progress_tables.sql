-- SLAMS Phase 2: learner progress tables.
-- Depends on 20261118015927_phase2_curriculum_tables.sql. Actors may write practice
-- records and draft/submitted work only. Assessment results and advancements
-- are service-written; authenticated clients receive read access only.
do $$ begin
  create type public.enrollment_role as enum ('primary', 'support', 'elective');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.enrollment_status as enum ('active', 'paused', 'withdrawn');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.lesson_progress_status as enum ('studied');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.exercise_attempt_status as enum ('in_progress', 'completed', 'abandoned');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.assessment_submission_status as enum ('draft', 'submitted');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.assessment_review_outcome as enum ('passed', 'needs_work');
exception when duplicate_object then null;
end $$;

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  school_slug text not null references public.curriculum_schools(slug) on delete restrict,
  role public.enrollment_role not null default 'elective',
  status public.enrollment_status not null default 'active',
  started_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, school_slug),
  unique (id, user_id, school_slug)
);

-- A learner may have at most one active primary school at a time.
create unique index enrollments_one_active_primary_per_user
  on public.enrollments (user_id)
  where role = 'primary' and status = 'active';

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null,
  school_slug text not null,
  lesson_id text not null,
  status public.lesson_progress_status not null default 'studied',
  studied_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (enrollment_id, lesson_id),
  foreign key (enrollment_id, user_id, school_slug)
    references public.enrollments(id, user_id, school_slug) on delete cascade,
  foreign key (school_slug, lesson_id)
    references public.curriculum_lessons(school_slug, id) on delete restrict
);

create table public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null,
  school_slug text not null,
  exercise_id text not null,
  status public.exercise_attempt_status not null default 'in_progress',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  reflection text check (reflection is null or char_length(reflection) <= 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'completed' or finished_at is not null),
  unique (id, user_id, school_slug),
  foreign key (enrollment_id, user_id, school_slug)
    references public.enrollments(id, user_id, school_slug) on delete cascade,
  foreign key (school_slug, exercise_id)
    references public.curriculum_exercises(school_slug, id) on delete restrict
);

-- body holds text evidence; storage_path is metadata for a private object only.
-- This SQL does not create a bucket or grant access to its contents. Private
-- Storage policies and signed-URL checks must be reviewed separately.
create table public.practice_evidence (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null,
  school_slug text not null,
  kind public.curriculum_evidence_kind not null,
  source_type text not null check (source_type in (
    'lesson', 'exercise_attempt', 'assessment_submission', 'take'
  )),
  -- Content IDs are stable strings; user-record source IDs may be UUID strings.
  source_id text not null check (char_length(btrim(source_id)) > 0),
  body text,
  storage_path text,
  created_at timestamptz not null default now(),
  check (
    (body is not null and char_length(btrim(body)) > 0 and storage_path is null)
    or (body is null and storage_path is not null and char_length(btrim(storage_path)) > 0)
  ),
  unique (id, user_id, school_slug),
  foreign key (enrollment_id, user_id, school_slug)
    references public.enrollments(id, user_id, school_slug) on delete cascade
);

create table public.exercise_attempt_evidence (
  user_id uuid not null,
  school_slug text not null,
  exercise_attempt_id uuid not null,
  evidence_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (exercise_attempt_id, evidence_id),
  foreign key (exercise_attempt_id, user_id, school_slug)
    references public.exercise_attempts(id, user_id, school_slug) on delete cascade,
  foreign key (evidence_id, user_id, school_slug)
    references public.practice_evidence(id, user_id, school_slug) on delete cascade
);

create table public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null,
  school_slug text not null,
  assessment_id text not null,
  status public.assessment_submission_status not null default 'draft',
  self_scores jsonb not null default '{}'::jsonb
    check (jsonb_typeof(self_scores) = 'object'),
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'draft' and submitted_at is null)
      or (status = 'submitted' and submitted_at is not null)),
  unique (id, user_id, school_slug),
  foreign key (enrollment_id, user_id, school_slug)
    references public.enrollments(id, user_id, school_slug) on delete cascade,
  foreign key (school_slug, assessment_id)
    references public.curriculum_assessments(school_slug, id) on delete restrict
);

create table public.assessment_submission_evidence (
  user_id uuid not null,
  school_slug text not null,
  submission_id uuid not null,
  evidence_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (submission_id, evidence_id),
  foreign key (submission_id, user_id, school_slug)
    references public.assessment_submissions(id, user_id, school_slug) on delete cascade,
  foreign key (evidence_id, user_id, school_slug)
    references public.practice_evidence(id, user_id, school_slug) on delete cascade
);

-- Review decisions affect standing. Only trusted server/service-role code writes.
create table public.assessment_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  school_slug text not null,
  submission_id uuid not null unique,
  outcome public.assessment_review_outcome not null,
  reviewer_kind public.curriculum_reviewer_kind not null,
  reviewer_id uuid references auth.users(id) on delete restrict,
  criterion_results jsonb not null default '{}'::jsonb
    check (jsonb_typeof(criterion_results) = 'object'),
  feedback text,
  decided_at timestamptz not null default now(),
  unique (id, user_id, school_slug, outcome),
  foreign key (submission_id, user_id, school_slug)
    references public.assessment_submissions(id, user_id, school_slug) on delete restrict,
  check ((reviewer_kind = 'coach' and reviewer_id is not null)
      or (reviewer_kind in ('rule', 'ai') and reviewer_id is null))
);

-- This is an engine-written record. It is never directly writable by an actor.
create table public.advancements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null,
  school_slug text not null,
  advancement_rule_id text not null,
  from_level_id text not null,
  to_level_id text not null,
  granted_at timestamptz not null default now(),
  unique (enrollment_id, to_level_id),
  unique (id, user_id, school_slug),
  foreign key (enrollment_id, user_id, school_slug)
    references public.enrollments(id, user_id, school_slug) on delete cascade,
  foreign key (school_slug, advancement_rule_id)
    references public.curriculum_advancement_rules(school_slug, id) on delete restrict,
  check (from_level_id <> to_level_id)
);

-- Only passing reviews may be recorded as the basis for a granted advancement.
create table public.advancement_assessment_reviews (
  user_id uuid not null,
  school_slug text not null,
  advancement_id uuid not null,
  assessment_review_id uuid not null,
  review_outcome public.assessment_review_outcome not null default 'passed'
    check (review_outcome = 'passed'),
  primary key (advancement_id, assessment_review_id),
  foreign key (advancement_id, user_id, school_slug)
    references public.advancements(id, user_id, school_slug) on delete cascade,
  foreign key (assessment_review_id, user_id, school_slug, review_outcome)
    references public.assessment_reviews(id, user_id, school_slug, outcome) on delete restrict
);

-- One owner-only policy for actor-managed practice data.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'enrollments',
    'lesson_progress',
    'exercise_attempts',
    'practice_evidence',
    'exercise_attempt_evidence',
    'assessment_submissions',
    'assessment_submission_evidence'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all privileges on table public.%I from anon, authenticated', table_name);
    execute format('grant select, insert, update, delete on table public.%I to authenticated', table_name);
    execute format('grant all privileges on table public.%I to service_role', table_name);
    execute format(
      'create policy "Actors manage own progress" on public.%I for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id)',
      table_name
    );
  end loop;
end $$;

-- Decisions and advancements are owner-readable but not client-writable.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'assessment_reviews',
    'advancements',
    'advancement_assessment_reviews'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all privileges on table public.%I from anon, authenticated', table_name);
    execute format('grant select on table public.%I to authenticated', table_name);
    execute format('grant all privileges on table public.%I to service_role', table_name);
  end loop;
end $$;

create policy "Actors read own assessment reviews"
  on public.assessment_reviews for select to authenticated
  using (auth.uid() = user_id);

create policy "Actors read own advancements"
  on public.advancements for select to authenticated
  using (auth.uid() = user_id);

create policy "Actors read own advancement evidence"
  on public.advancement_assessment_reviews for select to authenticated
  using (auth.uid() = user_id);

create index lesson_progress_user_school_idx
  on public.lesson_progress (user_id, school_slug, studied_at desc);
create index exercise_attempts_user_exercise_idx
  on public.exercise_attempts (user_id, exercise_id, started_at desc);
create index practice_evidence_user_created_idx
  on public.practice_evidence (user_id, created_at desc);
create index assessment_submissions_user_assessment_idx
  on public.assessment_submissions (user_id, assessment_id, created_at desc);
create index advancements_user_school_idx
  on public.advancements (user_id, school_slug, granted_at desc);

create trigger enrollments_updated_at before update on public.enrollments
  for each row execute function public.set_updated_at();
create trigger lesson_progress_updated_at before update on public.lesson_progress
  for each row execute function public.set_updated_at();
create trigger exercise_attempts_updated_at before update on public.exercise_attempts
  for each row execute function public.set_updated_at();
create trigger assessment_submissions_updated_at before update on public.assessment_submissions
  for each row execute function public.set_updated_at();

comment on table public.practice_evidence is
  'Evidence metadata owned by an actor; storage_path is not an authorization grant. Configure private Storage policies separately.';
comment on table public.assessment_reviews is
  'Standing-changing review results are writable only through trusted server/service-role code.';
comment on table public.advancements is
  'Rule-earned standing records are writable only through trusted server/service-role code.';
