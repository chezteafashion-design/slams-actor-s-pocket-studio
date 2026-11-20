import { validateCurriculum } from "@/domain/curriculum";
import { stanislavskiYearOneTermOne } from "./stanislavski";

describe("Stanislavski Year One, Term One draft", () => {
  it("passes stable-ID, hierarchy, evidence, assessment, and advancement validation", () => {
    expect(validateCurriculum(stanislavskiYearOneTermOne)).toEqual([]);
  });

  it("contains authored lessons and exercises rather than placeholder nodes", () => {
    const term = stanislavskiYearOneTermOne.years[0]!.terms[0]!;
    const lessons = term.courses.flatMap((course) =>
      course.workshops.flatMap((workshop) => workshop.lessons),
    );
    const exercises = lessons.flatMap((lesson) => lesson.exercises);

    expect(term.courses.length).toBeGreaterThan(0);
    expect(lessons.length).toBeGreaterThan(0);
    expect(
      exercises.every((exercise) => exercise.steps.length > 0 && exercise.durationSec > 0),
    ).toBe(true);
    expect(stanislavskiYearOneTermOne.assessments[0]?.reviewer).toBe("coach");
  });
});
