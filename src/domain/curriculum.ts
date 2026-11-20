import { SCHOOLS, type SchoolSlug } from "./constitution";

export type EvidenceKind = "recording" | "reflection" | "partner-note" | "rubric";
export type ExerciseKind = "guided-practice" | "reflection" | "repetition" | "analysis";
export type AssessmentReviewer = "rule" | "coach" | "ai";

export interface EvidenceRequirement {
  id: string;
  description: string;
  acceptedKinds: EvidenceKind[];
}

export interface CurriculumExercise {
  id: string;
  title: string;
  kind: ExerciseKind;
  durationSec: number;
  steps: string[];
  evidenceKinds: EvidenceKind[];
  signature?: string;
}

export interface CurriculumLesson {
  id: string;
  title: string;
  why: string;
  how: string;
  when: string;
  avoid: string;
  exercises: CurriculumExercise[];
}

export interface CurriculumWorkshop {
  id: string;
  title: string;
  lessons: CurriculumLesson[];
  requiredEvidence: EvidenceRequirement[];
}

export interface CurriculumCourse {
  id: string;
  title: string;
  outcomes: string[];
  workshops: CurriculumWorkshop[];
}

export interface CurriculumTerm {
  id: string;
  number: number;
  title: string;
  courses: CurriculumCourse[];
}

export interface CurriculumYear {
  id: string;
  number: number;
  title: string;
  terms: CurriculumTerm[];
}

export interface CurriculumAssessment {
  id: string;
  scope: "term" | "year";
  rubric: Array<{ id: string; prompt: string }>;
  evidenceRequirementIds: string[];
  reviewer: AssessmentReviewer;
}

export interface CurriculumAdvancementRule {
  id: string;
  fromLevel: string;
  toLevel: string;
  assessmentIds: string[];
}

export interface SchoolCurriculum {
  schoolSlug: SchoolSlug;
  years: CurriculumYear[];
  assessments: CurriculumAssessment[];
  advancementRules: CurriculumAdvancementRule[];
}

export interface CurriculumIssue {
  code:
    | "unknown-school"
    | "missing-value"
    | "invalid-id"
    | "duplicate-id"
    | "empty-list"
    | "invalid-duration"
    | "invalid-reference";
  path: string;
  message: string;
}

const ID_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const EVIDENCE_KINDS: readonly EvidenceKind[] = [
  "recording",
  "reflection",
  "partner-note",
  "rubric",
];

/**
 * Validate a complete authored school curriculum before it can be used by routes,
 * assessments, or the progress engine. IDs are stable references, not display text.
 */
export function validateCurriculum(curriculum: SchoolCurriculum): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];
  const schoolExists = SCHOOLS.some((school) => school.slug === curriculum.schoolSlug);
  if (!schoolExists) {
    issues.push({
      code: "unknown-school",
      path: "schoolSlug",
      message: `Unknown school slug: ${curriculum.schoolSlug}`,
    });
  }

  const ids = new Map<string, string>();
  const evidenceIds = new Set<string>();
  const assessmentIds = new Set(curriculum.assessments.map((assessment) => assessment.id));
  const registerId = (id: string, path: string) => {
    if (!id.trim() || !ID_PATTERN.test(id)) {
      issues.push({
        code: "invalid-id",
        path,
        message: `Use a stable lowercase content ID; received "${id}".`,
      });
      return;
    }
    const previous = ids.get(id);
    if (previous) {
      issues.push({
        code: "duplicate-id",
        path,
        message: `ID "${id}" is already used at ${previous}.`,
      });
      return;
    }
    ids.set(id, path);
  };
  const requiredText = (value: string, path: string) => {
    if (!value.trim())
      issues.push({
        code: "missing-value",
        path,
        message: "This authored field must not be empty.",
      });
  };
  const requireItems = (items: readonly unknown[], path: string) => {
    if (items.length === 0)
      issues.push({
        code: "empty-list",
        path,
        message: "A complete curriculum node must contain at least one item here.",
      });
  };
  const checkKinds = (kinds: readonly EvidenceKind[], path: string) => {
    requireItems(kinds, path);
    for (const kind of kinds) {
      if (!EVIDENCE_KINDS.includes(kind)) {
        issues.push({
          code: "invalid-reference",
          path,
          message: `Unknown evidence kind "${kind}".`,
        });
      }
    }
  };

  const yearPath = (index: number) => `years[${index}]`;
  requireItems(curriculum.years, "years");
  curriculum.years.forEach((year, yi) => {
    const yp = yearPath(yi);
    registerId(year.id, `${yp}.id`);
    requiredText(year.title, `${yp}.title`);
    if (!Number.isInteger(year.number) || year.number < 1) {
      issues.push({
        code: "missing-value",
        path: `${yp}.number`,
        message: "Year number must be a positive integer.",
      });
    }
    requireItems(year.terms, `${yp}.terms`);
    year.terms.forEach((term, ti) => {
      const tp = `${yp}.terms[${ti}]`;
      registerId(term.id, `${tp}.id`);
      requiredText(term.title, `${tp}.title`);
      if (!Number.isInteger(term.number) || term.number < 1) {
        issues.push({
          code: "missing-value",
          path: `${tp}.number`,
          message: "Term number must be a positive integer.",
        });
      }
      requireItems(term.courses, `${tp}.courses`);
      term.courses.forEach((course, ci) => {
        const cp = `${tp}.courses[${ci}]`;
        registerId(course.id, `${cp}.id`);
        requiredText(course.title, `${cp}.title`);
        requireItems(course.outcomes, `${cp}.outcomes`);
        course.outcomes.forEach((outcome, oi) => requiredText(outcome, `${cp}.outcomes[${oi}]`));
        requireItems(course.workshops, `${cp}.workshops`);
        course.workshops.forEach((workshop, wi) => {
          const wp = `${cp}.workshops[${wi}]`;
          registerId(workshop.id, `${wp}.id`);
          requiredText(workshop.title, `${wp}.title`);
          requireItems(workshop.lessons, `${wp}.lessons`);
          requireItems(workshop.requiredEvidence, `${wp}.requiredEvidence`);
          workshop.requiredEvidence.forEach((requirement, ri) => {
            const rp = `${wp}.requiredEvidence[${ri}]`;
            registerId(requirement.id, `${rp}.id`);
            evidenceIds.add(requirement.id);
            requiredText(requirement.description, `${rp}.description`);
            checkKinds(requirement.acceptedKinds, `${rp}.acceptedKinds`);
          });
          workshop.lessons.forEach((lesson, li) => {
            const lp = `${wp}.lessons[${li}]`;
            registerId(lesson.id, `${lp}.id`);
            for (const field of ["title", "why", "how", "when", "avoid"] as const) {
              requiredText(lesson[field], `${lp}.${field}`);
            }
            requireItems(lesson.exercises, `${lp}.exercises`);
            lesson.exercises.forEach((exercise, ei) => {
              const ep = `${lp}.exercises[${ei}]`;
              registerId(exercise.id, `${ep}.id`);
              requiredText(exercise.title, `${ep}.title`);
              if (!Number.isInteger(exercise.durationSec) || exercise.durationSec <= 0) {
                issues.push({
                  code: "invalid-duration",
                  path: `${ep}.durationSec`,
                  message: "Exercise duration must be a positive number of seconds.",
                });
              }
              requireItems(exercise.steps, `${ep}.steps`);
              exercise.steps.forEach((step, si) => requiredText(step, `${ep}.steps[${si}]`));
              checkKinds(exercise.evidenceKinds, `${ep}.evidenceKinds`);
            });
          });
        });
      });
    });
  });

  requireItems(curriculum.assessments, "assessments");
  curriculum.assessments.forEach((assessment, ai) => {
    const ap = `assessments[${ai}]`;
    registerId(assessment.id, `${ap}.id`);
    requireItems(assessment.rubric, `${ap}.rubric`);
    assessment.rubric.forEach((criterion, ri) => {
      const rp = `${ap}.rubric[${ri}]`;
      registerId(criterion.id, `${rp}.id`);
      requiredText(criterion.prompt, `${rp}.prompt`);
    });
    requireItems(assessment.evidenceRequirementIds, `${ap}.evidenceRequirementIds`);
    assessment.evidenceRequirementIds.forEach((id, ri) => {
      if (!evidenceIds.has(id)) {
        issues.push({
          code: "invalid-reference",
          path: `${ap}.evidenceRequirementIds[${ri}]`,
          message: `No workshop defines evidence requirement "${id}".`,
        });
      }
    });
  });

  requireItems(curriculum.advancementRules, "advancementRules");
  curriculum.advancementRules.forEach((rule, ri) => {
    const rp = `advancementRules[${ri}]`;
    registerId(rule.id, `${rp}.id`);
    requiredText(rule.fromLevel, `${rp}.fromLevel`);
    requiredText(rule.toLevel, `${rp}.toLevel`);
    requireItems(rule.assessmentIds, `${rp}.assessmentIds`);
    rule.assessmentIds.forEach((id, ai) => {
      if (!assessmentIds.has(id)) {
        issues.push({
          code: "invalid-reference",
          path: `${rp}.assessmentIds[${ai}]`,
          message: `No curriculum assessment defines "${id}".`,
        });
      }
    });
  });

  return issues;
}
