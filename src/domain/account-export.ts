import type { Database } from "@/integrations/supabase/types";

/** Owner-scoped training tables, including the links needed to reconstruct history. */
export const TRAINING_EXPORT_TABLES = [
  { table: "enrollments", order: ["id"] },
  { table: "lesson_progress", order: ["id"] },
  { table: "exercise_attempts", order: ["id"] },
  { table: "practice_evidence", order: ["id"] },
  { table: "exercise_attempt_evidence", order: ["exercise_attempt_id", "evidence_id"] },
  { table: "assessment_submissions", order: ["id"] },
  { table: "assessment_submission_evidence", order: ["submission_id", "evidence_id"] },
  { table: "assessment_reviews", order: ["id"] },
  { table: "advancements", order: ["id"] },
  { table: "advancement_assessment_reviews", order: ["advancement_id", "assessment_review_id"] },
] as const satisfies readonly { table: keyof Database["public"]["Tables"]; order: readonly string[] }[];

export const EXPORT_PAGE_SIZE = 500;