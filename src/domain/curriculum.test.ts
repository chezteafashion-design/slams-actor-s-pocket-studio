import { validateCurriculum, type SchoolCurriculum } from "./curriculum";

function validCurriculum(): SchoolCurriculum {
  return {
    schoolSlug: "stanislavski",
    years: [
      {
        id: "stanislavski.y1",
        number: 1,
        title: "Year One",
        terms: [
          {
            id: "stanislavski.y1.t1",
            number: 1,
            title: "Foundations",
            courses: [
              {
                id: "stanislavski.y1.t1.c1",
                title: "Attention and Action",
                outcomes: ["Name a playable action"],
                workshops: [
                  {
                    id: "stanislavski.y1.t1.c1.w1",
                    title: "The given moment",
                    requiredEvidence: [
                      {
                        id: "stanislavski.y1.t1.evidence.reflection",
                        description: "A short reflection on the actor's choices.",
                        acceptedKinds: ["reflection"],
                      },
                    ],
                    lessons: [
                      {
                        id: "stanislavski.y1.t1.c1.w1.l1",
                        title: "Attend to what is here",
                        why: "Attention gives action something concrete to meet.",
                        how: "Choose one observable detail and let it alter the next action.",
                        when: "Use this when a moment feels general or pre-planned.",
                        avoid: "Do not perform a feeling or force a result.",
                        exercises: [
                          {
                            id: "stanislavski.y1.t1.c1.w1.l1.e1",
                            title: "Observe, then act",
                            kind: "guided-practice",
                            durationSec: 120,
                            steps: ["Observe one detail.", "Choose an action in response."],
                            evidenceKinds: ["reflection"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    assessments: [
      {
        id: "stanislavski.y1.t1.assessment",
        scope: "term",
        rubric: [
          {
            id: "stanislavski.y1.t1.rubric.action",
            prompt: "Can the actor name and sustain a playable action?",
          },
        ],
        evidenceRequirementIds: ["stanislavski.y1.t1.evidence.reflection"],
        reviewer: "coach",
      },
    ],
    advancementRules: [
      {
        id: "stanislavski.y1.advancement",
        fromLevel: "year-one",
        toLevel: "year-two",
        assessmentIds: ["stanislavski.y1.t1.assessment"],
      },
    ],
  };
}

describe("validateCurriculum", () => {
  it("accepts a complete hierarchy with correctly linked assessment and advancement", () => {
    expect(validateCurriculum(validCurriculum())).toEqual([]);
  });

  it("rejects an unknown school", () => {
    const curriculum = {
      ...validCurriculum(),
      schoolSlug: "unknown",
    } as unknown as SchoolCurriculum;
    expect(validateCurriculum(curriculum).map((issue) => issue.code)).toContain("unknown-school");
  });

  it("rejects an empty school curriculum", () => {
    const curriculum = { ...validCurriculum(), years: [] };
    expect(
      validateCurriculum(curriculum).some(
        (issue) => issue.path === "years" && issue.code === "empty-list",
      ),
    ).toBe(true);
  });

  it("rejects duplicate stable IDs anywhere in the hierarchy", () => {
    const curriculum = validCurriculum();
    curriculum.years[0]!.terms[0]!.courses[0]!.workshops[0]!.lessons[0]!.exercises[0]!.id =
      "stanislavski.y1.t1.c1.w1.l1";
    expect(validateCurriculum(curriculum).some((issue) => issue.code === "duplicate-id")).toBe(
      true,
    );
  });

  it("rejects an assessment that refers to evidence not defined in a workshop", () => {
    const curriculum = validCurriculum();
    curriculum.assessments[0]!.evidenceRequirementIds = ["stanislavski.missing.evidence"];
    expect(
      validateCurriculum(curriculum).some(
        (issue) =>
          issue.code === "invalid-reference" && issue.path.includes("evidenceRequirementIds"),
      ),
    ).toBe(true);
  });

  it("rejects an advancement rule that refers to a missing assessment", () => {
    const curriculum = validCurriculum();
    curriculum.advancementRules[0]!.assessmentIds = ["stanislavski.missing.assessment"];
    expect(
      validateCurriculum(curriculum).some(
        (issue) => issue.code === "invalid-reference" && issue.path.includes("assessmentIds"),
      ),
    ).toBe(true);
  });

  it("rejects invalid duration and missing practice steps", () => {
    const curriculum = validCurriculum();
    const exercise =
      curriculum.years[0]!.terms[0]!.courses[0]!.workshops[0]!.lessons[0]!.exercises[0]!;
    exercise.durationSec = 0;
    exercise.steps = [];
    const issues = validateCurriculum(curriculum);
    expect(issues.some((issue) => issue.code === "invalid-duration")).toBe(true);
    expect(
      issues.some((issue) => issue.path.endsWith(".steps") && issue.code === "empty-list"),
    ).toBe(true);
  });
});
