-- SLAMS Phase 2: curriculum catalog tables.
-- Authored curriculum remains typed content-as-code in src/content/. These
-- normalized tables are a read model for curriculum and stable-ID references
-- from learner-progress records. A trusted publisher must validate IDs before
-- writing rows.
do $$ begin
  create type public.curriculum_content_status as enum (
    'in-development', 'beta', 'live', 'archived'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.curriculum_exercise_kind as enum (
    'guided-practice', 'reflection', 'repetition', 'analysis'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.curriculum_evidence_kind as enum (
    'recording', 'reflection', 'partner-note', 'rubric'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.curriculum_reviewer_kind as enum (
    'rule', 'coach', 'ai'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.curriculum_assessment_scope as enum ('term', 'year');
exception when duplicate_object then null;
end $$;

create table public.curriculum_schools (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  sort_order smallint not null unique check (sort_order > 0),
  name text not null check (char_length(btrim(name)) > 0),
  focus text not null check (char_length(btrim(focus)) > 0),
  content_status public.curriculum_content_status not null default 'in-development',
  created_at timestamptz not null default now()
);

create table public.curriculum_years (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null references public.curriculum_schools(slug) on delete restrict,
  year_number smallint not null check (year_number > 0),
  title text not null check (char_length(btrim(title)) > 0),
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  unique (school_slug, year_number)
);

create table public.curriculum_terms (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null,
  year_id text not null,
  term_number smallint not null check (term_number > 0),
  title text not null check (char_length(btrim(title)) > 0),
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  unique (year_id, term_number),
  foreign key (school_slug, year_id)
    references public.curriculum_years(school_slug, id) on delete restrict
);

create table public.curriculum_courses (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null,
  term_id text not null,
  sort_order smallint not null check (sort_order > 0),
  title text not null check (char_length(btrim(title)) > 0),
  outcomes text[] not null check (cardinality(outcomes) > 0),
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  unique (term_id, sort_order),
  foreign key (school_slug, term_id)
    references public.curriculum_terms(school_slug, id) on delete restrict
);

create table public.curriculum_workshops (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null,
  course_id text not null,
  sort_order smallint not null check (sort_order > 0),
  title text not null check (char_length(btrim(title)) > 0),
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  unique (course_id, sort_order),
  foreign key (school_slug, course_id)
    references public.curriculum_courses(school_slug, id) on delete restrict
);

create table public.curriculum_lessons (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null,
  workshop_id text not null,
  sort_order smallint not null check (sort_order > 0),
  title text not null check (char_length(btrim(title)) > 0),
  why text not null check (char_length(btrim(why)) > 0),
  how text not null check (char_length(btrim(how)) > 0),
  when_text text not null check (char_length(btrim(when_text)) > 0),
  avoid_text text not null check (char_length(btrim(avoid_text)) > 0),
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  unique (workshop_id, sort_order),
  foreign key (school_slug, workshop_id)
    references public.curriculum_workshops(school_slug, id) on delete restrict
);

create table public.curriculum_exercises (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null,
  lesson_id text not null,
  sort_order smallint not null check (sort_order > 0),
  title text not null check (char_length(btrim(title)) > 0),
  exercise_kind public.curriculum_exercise_kind not null,
  duration_sec integer not null check (duration_sec > 0),
  steps text[] not null check (cardinality(steps) > 0),
  evidence_kinds public.curriculum_evidence_kind[] not null
    check (cardinality(evidence_kinds) > 0),
  signature text,
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  unique (lesson_id, sort_order),
  foreign key (school_slug, lesson_id)
    references public.curriculum_lessons(school_slug, id) on delete restrict
);

create table public.curriculum_evidence_requirements (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null,
  workshop_id text not null,
  description text not null check (char_length(btrim(description)) > 0),
  accepted_kinds public.curriculum_evidence_kind[] not null
    check (cardinality(accepted_kinds) > 0),
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  foreign key (school_slug, workshop_id)
    references public.curriculum_workshops(school_slug, id) on delete restrict
);

create table public.curriculum_assessments (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null references public.curriculum_schools(slug) on delete restrict,
  scope public.curriculum_assessment_scope not null,
  term_id text,
  year_id text,
  reviewer_kind public.curriculum_reviewer_kind not null,
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  check (
    (scope = 'term' and term_id is not null and year_id is null)
    or (scope = 'year' and year_id is not null and term_id is null)
  ),
  foreign key (school_slug, term_id)
    references public.curriculum_terms(school_slug, id) on delete restrict,
  foreign key (school_slug, year_id)
    references public.curriculum_years(school_slug, id) on delete restrict
);

create table public.curriculum_assessment_criteria (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  assessment_id text not null references public.curriculum_assessments(id) on delete restrict,
  sort_order smallint not null check (sort_order > 0),
  prompt text not null check (char_length(btrim(prompt)) > 0),
  unique (assessment_id, sort_order)
);

create table public.curriculum_assessment_evidence (
  school_slug text not null,
  assessment_id text not null,
  evidence_requirement_id text not null,
  primary key (assessment_id, evidence_requirement_id),
  foreign key (school_slug, assessment_id)
    references public.curriculum_assessments(school_slug, id) on delete restrict,
  foreign key (school_slug, evidence_requirement_id)
    references public.curriculum_evidence_requirements(school_slug, id) on delete restrict
);

create table public.curriculum_advancement_rules (
  id text primary key check (id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  school_slug text not null references public.curriculum_schools(slug) on delete restrict,
  from_level_id text not null check (from_level_id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  to_level_id text not null check (to_level_id ~ '^[a-z0-9]+([.-][a-z0-9]+)*$'),
  created_at timestamptz not null default now(),
  unique (school_slug, id),
  check (from_level_id <> to_level_id)
);

create table public.curriculum_advancement_rule_assessments (
  school_slug text not null,
  rule_id text not null,
  assessment_id text not null,
  primary key (rule_id, assessment_id),
  foreign key (school_slug, rule_id)
    references public.curriculum_advancement_rules(school_slug, id) on delete restrict,
  foreign key (school_slug, assessment_id)
    references public.curriculum_assessments(school_slug, id) on delete restrict
);

-- Seed the eight public school shells from src/domain/constitution.ts.
-- Authored lessons and terms remain source-controlled in src/content/.
insert into public.curriculum_schools (slug, sort_order, name, focus) values
  ('stanislavski', 1, 'Stanislavski', 'Given circumstances, objectives, the system of physical actions.'),
  ('meisner', 2, 'Meisner', 'Truthful behaviour through repetition, listening and response.'),
  ('stella-adler', 3, 'Stella Adler', 'Imagination, script analysis, size and the actor''s choices.'),
  ('lee-strasberg', 4, 'Lee Strasberg', 'Relaxation, sense memory and personal truth — taught with emotional safety.'),
  ('michael-chekhov', 5, 'Michael Chekhov', 'Psychological gesture, atmosphere, imaginary body.'),
  ('laban-bartenieff', 6, 'Laban / Bartenieff', 'Effort, shape, space and body connectivity.'),
  ('practical-aesthetics', 7, 'Practical Aesthetics', 'Script analysis into a playable action; do the action, not the feeling.'),
  ('viewpoints-composition', 8, 'Viewpoints / Composition', 'Time and space awareness, ensemble, composition.')
on conflict (slug) do nothing;

-- Curriculum is public read-only. Only the future trusted publisher/service may write.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'curriculum_schools',
    'curriculum_years',
    'curriculum_terms',
    'curriculum_courses',
    'curriculum_workshops',
    'curriculum_lessons',
    'curriculum_exercises',
    'curriculum_evidence_requirements',
    'curriculum_assessments',
    'curriculum_assessment_criteria',
    'curriculum_assessment_evidence',
    'curriculum_advancement_rules',
    'curriculum_advancement_rule_assessments'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all privileges on table public.%I from anon, authenticated', table_name);
    execute format('grant select on table public.%I to anon, authenticated', table_name);
    execute format('grant all privileges on table public.%I to service_role', table_name);
    execute format(
      'create policy "Public read curriculum" on public.%I for select to anon, authenticated using (true)',
      table_name
    );
  end loop;
end $$;
