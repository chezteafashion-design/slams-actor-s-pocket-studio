import { describe, expect, it } from "vitest";
import {
  PLAN_FOCUS_MAX,
  buildPlanInstructions,
  buildPlanPrompt,
  normalizePlan,
  planRequestSchema,
  summarizeHistory,
  type CatalogExercise,
  type TrainingHistory,
} from "./practice-plan";

const empty: TrainingHistory = {
  enrollments: [], lesson_progress: [], exercise_attempts: [], practice_evidence: [],
  assessment_submissions: [], assessment_reviews: [], advancements: [],
};
const catalog: CatalogExercise[] = [
  { id: "stanislavski.y1.t1.c1.w1.l1.e1", title: "Three facts, one response", schoolSlug: "stanislavski", lessonTitle: "Notice what is actually there", minutes: 3 },
];
const history: TrainingHistory = {
  ...empty,
  enrollments: [{ id: "e1", school_slug: "stanislavski", status: "active", role: "primary", started_at: "2026-11-01T10:00:00Z" }],
  lesson_progress: [
    { lesson_id: "l1", school_slug: "stanislavski", studied_at: "2026-11-02T10:00:00Z" },
    { lesson_id: "l1", school_slug: "stanislavski", studied_at: "2026-11-03T10:00:00Z" },
  ],
  exercise_attempts: [
    { exercise_id: catalog[0]!.id, school_slug: "stanislavski", status: "completed", reflection: "I stopped planning once I watched the cup.", started_at: "2026-11-04T10:00:00Z", finished_at: "2026-11-04T10:05:00Z" },
    { exercise_id: "x", school_slug: "stanislavski", status: "abandoned", reflection: null, started_at: "2026-11-05T10:00:00Z", finished_at: null },
  ],
  practice_evidence: [{ kind: "reflection", school_slug: "stanislavski", created_at: "2026-11-04T10:05:00Z" }],
};
const rawPlan = {
  headline: "Stop planning, start noticing",
  focus: "Attention on what is actually there.",
  why: "Your reflection says planning drops away when you watch something real.",
  sessions: [
    { title: "Three facts warm-up", minutes: 3, exerciseId: catalog[0]!.id, steps: ["Pick an object", "Name three facts"], notice: "When you start guessing." },
    { title: "Invented drill", minutes: 200, exerciseId: "made.up.id", steps: ["Do it"], notice: "" },
  ],
  checkIn: "What did you notice that you didn't plan?",
  groundedIn: ["1 exercise completed"],
};

describe("training history review", () => {
  it("reports an empty record as empty, with nothing counted", () => {
    const s = summarizeHistory(empty, catalog);
    expect(s.isEmpty).toBe(true);
    expect(s.lessonsStudied).toBe(0);
    expect(s.lastActivityAt).toBeNull();
  });

  it("counts only what was saved: distinct lessons, finished and dropped exercises, reflections by exercise title", () => {
    const s = summarizeHistory(history, catalog);
    expect(s.isEmpty).toBe(false);
    expect(s.lessonsStudied).toBe(1);
    expect(s.exercisesCompleted).toBe(1);
    expect(s.exercisesAbandoned).toBe(1);
    expect(s.evidenceByKind.reflection).toBe(1);
    expect(s.schools[0]?.name).toBe("Stanislavski");
    expect(s.recentReflections[0]).toMatchObject({ exercise: "Three facts, one response", text: "I stopped planning once I watched the cup." });
    expect(s.lastActivityAt).toBe("2026-11-05T10:00:00Z");
  });
});

describe("practice plan brief", () => {
  it("gives the Director the actor's goals and real record, marked as data", () => {
    const prompt = buildPlanPrompt({ summary: summarizeHistory(history, catalog), goals: "Book a lead role", experienceLevel: "developing", focus: "", intensity: "full", catalog });
    expect(prompt).toContain("Goals: Book a lead role");
    expect(prompt).toContain("Experience level: Developing");
    expect(prompt).toContain("Exercises: 1 completed, 0 in progress, 1 abandoned");
    expect(prompt).toContain("<actor_data>");
  });

  it("tells the Director plainly when nothing is recorded", () => {
    const prompt = buildPlanPrompt({ summary: summarizeHistory(empty), goals: "", experienceLevel: null, focus: "", intensity: "full", catalog: [] });
    expect(prompt).toContain("Training record: empty");
    expect(prompt).toContain("Goals: Not written yet");
  });

  it("forbids swearing when the actor chose softened language", () => {
    expect(buildPlanInstructions("softened")).toContain("never swear");
  });

  it("limits the optional focus to the stated length", () => {
    expect(planRequestSchema.safeParse({ focus: "a".repeat(PLAN_FOCUS_MAX) }).success).toBe(true);
    expect(planRequestSchema.safeParse({ focus: "a".repeat(PLAN_FOCUS_MAX + 1) }).success).toBe(false);
  });
});

describe("checking the AI's plan before it is shown", () => {
  it("drops exercise ids that aren't in the Conservatory and clamps session length", () => {
    const plan = normalizePlan(rawPlan, catalog)!;
    expect(plan.sessions[0]?.exercise?.title).toBe("Three facts, one response");
    expect(plan.sessions[1]?.exercise).toBeNull();
    expect(plan.sessions[0]?.minutes).toBe(5);
    expect(plan.sessions[1]?.minutes).toBe(45);
  });

  it("refuses a plan with nothing to practise or the wrong shape", () => {
    expect(normalizePlan({ ...rawPlan, sessions: [] }, catalog)).toBeNull();
    expect(normalizePlan({ headline: "Hi" }, catalog)).toBeNull();
  });
});
