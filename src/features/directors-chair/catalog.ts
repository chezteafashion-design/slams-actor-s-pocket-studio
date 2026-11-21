import { getCurriculumForSchool } from "@/content/curriculum/stanislavski";
import { SCHOOLS } from "@/domain/constitution";
import type { SchoolCurriculum } from "@/domain/curriculum";
import { flattenCatalog, type TrainingHistory } from "@/domain/practice-plan";
import { gatherTrainingData } from "@/features/account/export-data";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/** Every exercise authored so far, across the eight schools. */
export const PLANNING_CATALOG = flattenCatalog(
  SCHOOLS.map((s) => getCurriculumForSchool(s.slug)).filter((c): c is SchoolCurriculum => Boolean(c)),
);

/** The caller's full training record through their own RLS client (browser or server). */
export async function loadTrainingHistory(supabase: SupabaseClient<Database>, userId: string): Promise<TrainingHistory> {
  const data = (await gatherTrainingData(supabase, userId)) as unknown as Partial<TrainingHistory>;
  return {
    enrollments: data.enrollments ?? [],
    lesson_progress: data.lesson_progress ?? [],
    exercise_attempts: data.exercise_attempts ?? [],
    practice_evidence: data.practice_evidence ?? [],
    assessment_submissions: data.assessment_submissions ?? [],
    assessment_reviews: data.assessment_reviews ?? [],
    advancements: data.advancements ?? [],
  };
}
