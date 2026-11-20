# Phase 2 Supabase migrations

Both timestamped SQL migrations have been applied successfully to the app-connected `Slams2` project (`urzqnvosughttofeirra`), in the order shown below. Their local filenames match the UTC versions recorded in Supabase migration history.

`supabase/migrations/20261118015927_phase2_curriculum_tables.sql` creates the normalized curriculum catalog, enums, public read-only RLS, and seed rows for all eight school shells. Authored lesson content remains typed and reviewed in `src/content/`; a trusted publisher should validate stable IDs before writing curriculum rows.

`supabase/migrations/20261118020007_phase2_learner_progress_tables.sql` creates enrollments, lesson progress, exercise attempts, evidence metadata/links, assessment submissions/reviews, and advancement records. Learners may access only their own progress. Client roles cannot write assessment decisions or advancement records; those require trusted server-side code.

Remaining follow-up: the migrations do not create a private Storage bucket or its object policies. They also do not implement the server functions that validate submissions and issue decisions. Coach access to learner evidence is intentionally not granted here; that requires a separate, explicit sharing policy.

Next, regenerate the generated Supabase TypeScript types—do not edit `src/integrations/supabase/types.ts` by hand—and implement/test the server-side submission and advancement functions before enabling those user journeys.
