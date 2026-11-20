export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      advancement_assessment_reviews: {
        Row: {
          advancement_id: string
          assessment_review_id: string
          review_outcome: Database["public"]["Enums"]["assessment_review_outcome"]
          school_slug: string
          user_id: string
        }
        Insert: {
          advancement_id: string
          assessment_review_id: string
          review_outcome?: Database["public"]["Enums"]["assessment_review_outcome"]
          school_slug: string
          user_id: string
        }
        Update: {
          advancement_id?: string
          assessment_review_id?: string
          review_outcome?: Database["public"]["Enums"]["assessment_review_outcome"]
          school_slug?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "advancement_assessment_review_advancement_id_user_id_schoo_fkey"
            columns: ["advancement_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "advancements"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
          {
            foreignKeyName: "advancement_assessment_review_assessment_review_id_user_id_fkey"
            columns: [
              "assessment_review_id",
              "user_id",
              "school_slug",
              "review_outcome",
            ]
            isOneToOne: false
            referencedRelation: "assessment_reviews"
            referencedColumns: ["id", "user_id", "school_slug", "outcome"]
          },
        ]
      }
      advancements: {
        Row: {
          advancement_rule_id: string
          enrollment_id: string
          from_level_id: string
          granted_at: string
          id: string
          school_slug: string
          to_level_id: string
          user_id: string
        }
        Insert: {
          advancement_rule_id: string
          enrollment_id: string
          from_level_id: string
          granted_at?: string
          id?: string
          school_slug: string
          to_level_id: string
          user_id: string
        }
        Update: {
          advancement_rule_id?: string
          enrollment_id?: string
          from_level_id?: string
          granted_at?: string
          id?: string
          school_slug?: string
          to_level_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "advancements_enrollment_id_user_id_school_slug_fkey"
            columns: ["enrollment_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
          {
            foreignKeyName: "advancements_school_slug_advancement_rule_id_fkey"
            columns: ["school_slug", "advancement_rule_id"]
            isOneToOne: false
            referencedRelation: "curriculum_advancement_rules"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      assessment_reviews: {
        Row: {
          criterion_results: Json
          decided_at: string
          feedback: string | null
          id: string
          outcome: Database["public"]["Enums"]["assessment_review_outcome"]
          reviewer_id: string | null
          reviewer_kind: Database["public"]["Enums"]["curriculum_reviewer_kind"]
          school_slug: string
          submission_id: string
          user_id: string
        }
        Insert: {
          criterion_results?: Json
          decided_at?: string
          feedback?: string | null
          id?: string
          outcome: Database["public"]["Enums"]["assessment_review_outcome"]
          reviewer_id?: string | null
          reviewer_kind: Database["public"]["Enums"]["curriculum_reviewer_kind"]
          school_slug: string
          submission_id: string
          user_id: string
        }
        Update: {
          criterion_results?: Json
          decided_at?: string
          feedback?: string | null
          id?: string
          outcome?: Database["public"]["Enums"]["assessment_review_outcome"]
          reviewer_id?: string | null
          reviewer_kind?: Database["public"]["Enums"]["curriculum_reviewer_kind"]
          school_slug?: string
          submission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_reviews_submission_id_user_id_school_slug_fkey"
            columns: ["submission_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "assessment_submissions"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
        ]
      }
      assessment_submission_evidence: {
        Row: {
          created_at: string
          evidence_id: string
          school_slug: string
          submission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          evidence_id: string
          school_slug: string
          submission_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          evidence_id?: string
          school_slug?: string
          submission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_submission_evidenc_evidence_id_user_id_school_s_fkey"
            columns: ["evidence_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "practice_evidence"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
          {
            foreignKeyName: "assessment_submission_evidenc_submission_id_user_id_school_fkey"
            columns: ["submission_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "assessment_submissions"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
        ]
      }
      assessment_submissions: {
        Row: {
          assessment_id: string
          created_at: string
          enrollment_id: string
          id: string
          school_slug: string
          self_scores: Json
          status: Database["public"]["Enums"]["assessment_submission_status"]
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_id: string
          created_at?: string
          enrollment_id: string
          id?: string
          school_slug: string
          self_scores?: Json
          status?: Database["public"]["Enums"]["assessment_submission_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_id?: string
          created_at?: string
          enrollment_id?: string
          id?: string
          school_slug?: string
          self_scores?: Json
          status?: Database["public"]["Enums"]["assessment_submission_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_submissions_enrollment_id_user_id_school_slug_fkey"
            columns: ["enrollment_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
          {
            foreignKeyName: "assessment_submissions_school_slug_assessment_id_fkey"
            columns: ["school_slug", "assessment_id"]
            isOneToOne: false
            referencedRelation: "curriculum_assessments"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_advancement_rule_assessments: {
        Row: {
          assessment_id: string
          rule_id: string
          school_slug: string
        }
        Insert: {
          assessment_id: string
          rule_id: string
          school_slug: string
        }
        Update: {
          assessment_id?: string
          rule_id?: string
          school_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_advancement_rule_asse_school_slug_assessment_id_fkey"
            columns: ["school_slug", "assessment_id"]
            isOneToOne: false
            referencedRelation: "curriculum_assessments"
            referencedColumns: ["school_slug", "id"]
          },
          {
            foreignKeyName: "curriculum_advancement_rule_assessment_school_slug_rule_id_fkey"
            columns: ["school_slug", "rule_id"]
            isOneToOne: false
            referencedRelation: "curriculum_advancement_rules"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_advancement_rules: {
        Row: {
          created_at: string
          from_level_id: string
          id: string
          school_slug: string
          to_level_id: string
        }
        Insert: {
          created_at?: string
          from_level_id: string
          id: string
          school_slug: string
          to_level_id: string
        }
        Update: {
          created_at?: string
          from_level_id?: string
          id?: string
          school_slug?: string
          to_level_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_advancement_rules_school_slug_fkey"
            columns: ["school_slug"]
            isOneToOne: false
            referencedRelation: "curriculum_schools"
            referencedColumns: ["slug"]
          },
        ]
      }
      curriculum_assessment_criteria: {
        Row: {
          assessment_id: string
          id: string
          prompt: string
          sort_order: number
        }
        Insert: {
          assessment_id: string
          id: string
          prompt: string
          sort_order: number
        }
        Update: {
          assessment_id?: string
          id?: string
          prompt?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_assessment_criteria_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "curriculum_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      curriculum_assessment_evidence: {
        Row: {
          assessment_id: string
          evidence_requirement_id: string
          school_slug: string
        }
        Insert: {
          assessment_id: string
          evidence_requirement_id: string
          school_slug: string
        }
        Update: {
          assessment_id?: string
          evidence_requirement_id?: string
          school_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_assessment_evidenc_school_slug_evidence_require_fkey"
            columns: ["school_slug", "evidence_requirement_id"]
            isOneToOne: false
            referencedRelation: "curriculum_evidence_requirements"
            referencedColumns: ["school_slug", "id"]
          },
          {
            foreignKeyName: "curriculum_assessment_evidence_school_slug_assessment_id_fkey"
            columns: ["school_slug", "assessment_id"]
            isOneToOne: false
            referencedRelation: "curriculum_assessments"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_assessments: {
        Row: {
          created_at: string
          id: string
          reviewer_kind: Database["public"]["Enums"]["curriculum_reviewer_kind"]
          school_slug: string
          scope: Database["public"]["Enums"]["curriculum_assessment_scope"]
          term_id: string | null
          year_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          reviewer_kind: Database["public"]["Enums"]["curriculum_reviewer_kind"]
          school_slug: string
          scope: Database["public"]["Enums"]["curriculum_assessment_scope"]
          term_id?: string | null
          year_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          reviewer_kind?: Database["public"]["Enums"]["curriculum_reviewer_kind"]
          school_slug?: string
          scope?: Database["public"]["Enums"]["curriculum_assessment_scope"]
          term_id?: string | null
          year_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_assessments_school_slug_fkey"
            columns: ["school_slug"]
            isOneToOne: false
            referencedRelation: "curriculum_schools"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "curriculum_assessments_school_slug_term_id_fkey"
            columns: ["school_slug", "term_id"]
            isOneToOne: false
            referencedRelation: "curriculum_terms"
            referencedColumns: ["school_slug", "id"]
          },
          {
            foreignKeyName: "curriculum_assessments_school_slug_year_id_fkey"
            columns: ["school_slug", "year_id"]
            isOneToOne: false
            referencedRelation: "curriculum_years"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_courses: {
        Row: {
          created_at: string
          id: string
          outcomes: string[]
          school_slug: string
          sort_order: number
          term_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id: string
          outcomes: string[]
          school_slug: string
          sort_order: number
          term_id: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          outcomes?: string[]
          school_slug?: string
          sort_order?: number
          term_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_courses_school_slug_term_id_fkey"
            columns: ["school_slug", "term_id"]
            isOneToOne: false
            referencedRelation: "curriculum_terms"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_evidence_requirements: {
        Row: {
          accepted_kinds: Database["public"]["Enums"]["curriculum_evidence_kind"][]
          created_at: string
          description: string
          id: string
          school_slug: string
          workshop_id: string
        }
        Insert: {
          accepted_kinds: Database["public"]["Enums"]["curriculum_evidence_kind"][]
          created_at?: string
          description: string
          id: string
          school_slug: string
          workshop_id: string
        }
        Update: {
          accepted_kinds?: Database["public"]["Enums"]["curriculum_evidence_kind"][]
          created_at?: string
          description?: string
          id?: string
          school_slug?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_evidence_requirements_school_slug_workshop_id_fkey"
            columns: ["school_slug", "workshop_id"]
            isOneToOne: false
            referencedRelation: "curriculum_workshops"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_exercises: {
        Row: {
          created_at: string
          duration_sec: number
          evidence_kinds: Database["public"]["Enums"]["curriculum_evidence_kind"][]
          exercise_kind: Database["public"]["Enums"]["curriculum_exercise_kind"]
          id: string
          lesson_id: string
          school_slug: string
          signature: string | null
          sort_order: number
          steps: string[]
          title: string
        }
        Insert: {
          created_at?: string
          duration_sec: number
          evidence_kinds: Database["public"]["Enums"]["curriculum_evidence_kind"][]
          exercise_kind: Database["public"]["Enums"]["curriculum_exercise_kind"]
          id: string
          lesson_id: string
          school_slug: string
          signature?: string | null
          sort_order: number
          steps: string[]
          title: string
        }
        Update: {
          created_at?: string
          duration_sec?: number
          evidence_kinds?: Database["public"]["Enums"]["curriculum_evidence_kind"][]
          exercise_kind?: Database["public"]["Enums"]["curriculum_exercise_kind"]
          id?: string
          lesson_id?: string
          school_slug?: string
          signature?: string | null
          sort_order?: number
          steps?: string[]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_exercises_school_slug_lesson_id_fkey"
            columns: ["school_slug", "lesson_id"]
            isOneToOne: false
            referencedRelation: "curriculum_lessons"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_lessons: {
        Row: {
          avoid_text: string
          created_at: string
          how: string
          id: string
          school_slug: string
          sort_order: number
          title: string
          when_text: string
          why: string
          workshop_id: string
        }
        Insert: {
          avoid_text: string
          created_at?: string
          how: string
          id: string
          school_slug: string
          sort_order: number
          title: string
          when_text: string
          why: string
          workshop_id: string
        }
        Update: {
          avoid_text?: string
          created_at?: string
          how?: string
          id?: string
          school_slug?: string
          sort_order?: number
          title?: string
          when_text?: string
          why?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_lessons_school_slug_workshop_id_fkey"
            columns: ["school_slug", "workshop_id"]
            isOneToOne: false
            referencedRelation: "curriculum_workshops"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_schools: {
        Row: {
          content_status: Database["public"]["Enums"]["curriculum_content_status"]
          created_at: string
          focus: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          content_status?: Database["public"]["Enums"]["curriculum_content_status"]
          created_at?: string
          focus: string
          name: string
          slug: string
          sort_order: number
        }
        Update: {
          content_status?: Database["public"]["Enums"]["curriculum_content_status"]
          created_at?: string
          focus?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      curriculum_terms: {
        Row: {
          created_at: string
          id: string
          school_slug: string
          term_number: number
          title: string
          year_id: string
        }
        Insert: {
          created_at?: string
          id: string
          school_slug: string
          term_number: number
          title: string
          year_id: string
        }
        Update: {
          created_at?: string
          id?: string
          school_slug?: string
          term_number?: number
          title?: string
          year_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_terms_school_slug_year_id_fkey"
            columns: ["school_slug", "year_id"]
            isOneToOne: false
            referencedRelation: "curriculum_years"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_workshops: {
        Row: {
          course_id: string
          created_at: string
          id: string
          school_slug: string
          sort_order: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id: string
          school_slug: string
          sort_order: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          school_slug?: string
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_workshops_school_slug_course_id_fkey"
            columns: ["school_slug", "course_id"]
            isOneToOne: false
            referencedRelation: "curriculum_courses"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      curriculum_years: {
        Row: {
          created_at: string
          id: string
          school_slug: string
          title: string
          year_number: number
        }
        Insert: {
          created_at?: string
          id: string
          school_slug: string
          title: string
          year_number: number
        }
        Update: {
          created_at?: string
          id?: string
          school_slug?: string
          title?: string
          year_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_years_school_slug_fkey"
            columns: ["school_slug"]
            isOneToOne: false
            referencedRelation: "curriculum_schools"
            referencedColumns: ["slug"]
          },
        ]
      }
      enrollments: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["enrollment_role"]
          school_slug: string
          started_at: string
          status: Database["public"]["Enums"]["enrollment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["enrollment_role"]
          school_slug: string
          started_at?: string
          status?: Database["public"]["Enums"]["enrollment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["enrollment_role"]
          school_slug?: string
          started_at?: string
          status?: Database["public"]["Enums"]["enrollment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_school_slug_fkey"
            columns: ["school_slug"]
            isOneToOne: false
            referencedRelation: "curriculum_schools"
            referencedColumns: ["slug"]
          },
        ]
      }
      exercise_attempt_evidence: {
        Row: {
          created_at: string
          evidence_id: string
          exercise_attempt_id: string
          school_slug: string
          user_id: string
        }
        Insert: {
          created_at?: string
          evidence_id: string
          exercise_attempt_id: string
          school_slug: string
          user_id: string
        }
        Update: {
          created_at?: string
          evidence_id?: string
          exercise_attempt_id?: string
          school_slug?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_attempt_evidence_evidence_id_user_id_school_slug_fkey"
            columns: ["evidence_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "practice_evidence"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
          {
            foreignKeyName: "exercise_attempt_evidence_exercise_attempt_id_user_id_scho_fkey"
            columns: ["exercise_attempt_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "exercise_attempts"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
        ]
      }
      exercise_attempts: {
        Row: {
          created_at: string
          enrollment_id: string
          exercise_id: string
          finished_at: string | null
          id: string
          reflection: string | null
          school_slug: string
          started_at: string
          status: Database["public"]["Enums"]["exercise_attempt_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          exercise_id: string
          finished_at?: string | null
          id?: string
          reflection?: string | null
          school_slug: string
          started_at?: string
          status?: Database["public"]["Enums"]["exercise_attempt_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          exercise_id?: string
          finished_at?: string | null
          id?: string
          reflection?: string | null
          school_slug?: string
          started_at?: string
          status?: Database["public"]["Enums"]["exercise_attempt_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_attempts_enrollment_id_user_id_school_slug_fkey"
            columns: ["enrollment_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
          {
            foreignKeyName: "exercise_attempts_school_slug_exercise_id_fkey"
            columns: ["school_slug", "exercise_id"]
            isOneToOne: false
            referencedRelation: "curriculum_exercises"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          created_at: string
          enrollment_id: string
          id: string
          lesson_id: string
          school_slug: string
          status: Database["public"]["Enums"]["lesson_progress_status"]
          studied_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          id?: string
          lesson_id: string
          school_slug: string
          status?: Database["public"]["Enums"]["lesson_progress_status"]
          studied_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          id?: string
          lesson_id?: string
          school_slug?: string
          status?: Database["public"]["Enums"]["lesson_progress_status"]
          studied_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_enrollment_id_user_id_school_slug_fkey"
            columns: ["enrollment_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
          {
            foreignKeyName: "lesson_progress_school_slug_lesson_id_fkey"
            columns: ["school_slug", "lesson_id"]
            isOneToOne: false
            referencedRelation: "curriculum_lessons"
            referencedColumns: ["school_slug", "id"]
          },
        ]
      }
      practice_evidence: {
        Row: {
          body: string | null
          created_at: string
          enrollment_id: string
          id: string
          kind: Database["public"]["Enums"]["curriculum_evidence_kind"]
          school_slug: string
          source_id: string
          source_type: string
          storage_path: string | null
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          enrollment_id: string
          id?: string
          kind: Database["public"]["Enums"]["curriculum_evidence_kind"]
          school_slug: string
          source_id: string
          source_type: string
          storage_path?: string | null
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          enrollment_id?: string
          id?: string
          kind?: Database["public"]["Enums"]["curriculum_evidence_kind"]
          school_slug?: string
          source_id?: string
          source_type?: string
          storage_path?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_evidence_enrollment_id_user_id_school_slug_fkey"
            columns: ["enrollment_id", "user_id", "school_slug"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id", "user_id", "school_slug"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          experience_level:
            | Database["public"]["Enums"]["experience_level"]
            | null
          goals: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          goals?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          goals?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          captions: boolean
          created_at: string
          language_intensity: Database["public"]["Enums"]["language_intensity"]
          recording_countdown: number
          reduced_motion: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          captions?: boolean
          created_at?: string
          language_intensity?: Database["public"]["Enums"]["language_intensity"]
          recording_countdown?: number
          reduced_motion?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          captions?: boolean
          created_at?: string
          language_intensity?: Database["public"]["Enums"]["language_intensity"]
          recording_countdown?: number
          reduced_motion?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "coach" | "actor"
      assessment_review_outcome: "passed" | "needs_work"
      assessment_submission_status: "draft" | "submitted"
      curriculum_assessment_scope: "term" | "year"
      curriculum_content_status: "in-development" | "beta" | "live" | "archived"
      curriculum_evidence_kind:
        | "recording"
        | "reflection"
        | "partner-note"
        | "rubric"
      curriculum_exercise_kind:
        | "guided-practice"
        | "reflection"
        | "repetition"
        | "analysis"
      curriculum_reviewer_kind: "rule" | "coach" | "ai"
      enrollment_role: "primary" | "support" | "elective"
      enrollment_status: "active" | "paused" | "withdrawn"
      exercise_attempt_status: "in_progress" | "completed" | "abandoned"
      experience_level:
        | "beginner"
        | "developing"
        | "experienced"
        | "professional"
        | "returning"
      language_intensity: "full" | "softened"
      lesson_progress_status: "studied"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "coach", "actor"],
      assessment_review_outcome: ["passed", "needs_work"],
      assessment_submission_status: ["draft", "submitted"],
      curriculum_assessment_scope: ["term", "year"],
      curriculum_content_status: ["in-development", "beta", "live", "archived"],
      curriculum_evidence_kind: [
        "recording",
        "reflection",
        "partner-note",
        "rubric",
      ],
      curriculum_exercise_kind: [
        "guided-practice",
        "reflection",
        "repetition",
        "analysis",
      ],
      curriculum_reviewer_kind: ["rule", "coach", "ai"],
      enrollment_role: ["primary", "support", "elective"],
      enrollment_status: ["active", "paused", "withdrawn"],
      exercise_attempt_status: ["in_progress", "completed", "abandoned"],
      experience_level: [
        "beginner",
        "developing",
        "experienced",
        "professional",
        "returning",
      ],
      language_intensity: ["full", "softened"],
      lesson_progress_status: ["studied"],
    },
  },
} as const
