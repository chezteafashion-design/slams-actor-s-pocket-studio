import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, LockKeyhole } from "lucide-react";
import { StatusBadge } from "@/components/slams/StatusBadge";
import { getPage, SCHOOLS } from "@/domain/constitution";
import { getCurriculumForSchool } from "@/content/curriculum/stanislavski";

export function SchoolOverview({ schoolSlug }: { schoolSlug: string }) {
  const school = SCHOOLS.find((entry) => entry.slug === schoolSlug);

  if (!school) {
    return (
      <div className="space-y-4">
        <StatusBadge status="planned">School not found</StatusBadge>
        <p className="text-sm leading-relaxed text-muted-foreground">
          That school is not in the SLAMS curriculum registry.
        </p>
        <Link
          to="/schools"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-sm text-foreground hover:border-brass/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Return to all schools
        </Link>
      </div>
    );
  }

  const status = getPage("school")?.status ?? "planned";
  const curriculum = getCurriculumForSchool(school.slug);
  const schoolNumber = String(school.order).padStart(2, "0");

  return (
    <div className="space-y-5">
      <Link
        to="/schools"
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All eight schools
      </Link>

      <section className="rounded-lg border border-brass/35 bg-gradient-to-br from-brass/10 via-card to-card p-5">
        <p className="font-label text-xs text-brass">School {schoolNumber} · The Conservatory</p>
        <h2 className="mt-2 font-display text-3xl leading-tight text-foreground">{school.name}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{school.focus}</p>
      </section>

      <section
        aria-labelledby="curriculum-status-heading"
        className="rounded-lg border border-border bg-card p-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id="curriculum-status-heading" className="font-label text-xs text-brass">
            Curriculum status
          </h3>
          <StatusBadge status={status}>In development</StatusBadge>
        </div>
        <div className="mt-3 flex gap-3">
          <LockKeyhole
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {curriculum
              ? "A first-term curriculum draft is available below for review. It is not practitioner-approved, does not record your work, and cannot grant assessment results or advancement."
              : "Lessons, exercises, evidence requirements, assessments, and advancement rules for this school have not yet been published. This overview does not imply enrollment or recorded progress."}
          </p>
        </div>
      </section>

      {curriculum ? (
        <section aria-labelledby="term-heading" className="space-y-4">
          {curriculum.years.map((year) =>
            year.terms.map((term) => (
              <div key={term.id} className="space-y-4">
                <div>
                  <p className="font-label text-[11px] text-brass">Draft curriculum · read only</p>
                  <h3
                    id="term-heading"
                    className="mt-1 font-display text-2xl leading-tight text-foreground"
                  >
                    {term.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{year.title}</p>
                </div>

                {term.courses.map((course) => (
                  <article key={course.id} className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-display text-xl text-foreground">{course.title}</h4>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {course.outcomes.map((outcome) => (
                        <li key={outcome} className="flex gap-2">
                          <span className="text-brass" aria-hidden="true">
                            —
                          </span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    {course.workshops.map((workshop) => (
                      <section key={workshop.id} className="mt-4 border-t border-border pt-4">
                        <h5 className="font-label text-xs text-brass">{workshop.title}</h5>
                        <div className="mt-3 space-y-2">
                          {workshop.lessons.map((lesson) => (
                            <details
                              key={lesson.id}
                              className="group rounded-md border border-border/80 bg-secondary/30"
                            >
                              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                                <span className="flex items-center gap-2">
                                  <BookOpen className="size-4 text-brass" aria-hidden="true" />
                                  {lesson.title}
                                </span>
                                <span className="shrink-0 text-xs text-muted-foreground group-open:hidden">
                                  Read
                                </span>
                                <span className="hidden shrink-0 text-xs text-muted-foreground group-open:inline">
                                  Close
                                </span>
                              </summary>
                              <div className="space-y-3 border-t border-border px-3 py-3 text-sm leading-relaxed">
                                <TextBlock label="Why" text={lesson.why} />
                                <TextBlock label="How" text={lesson.how} />
                                <TextBlock label="When" text={lesson.when} />
                                <TextBlock label="Avoid" text={lesson.avoid} />
                                {lesson.exercises.map((exercise) => (
                                  <div
                                    key={exercise.id}
                                    className="rounded-md border border-brass/25 bg-brass/5 p-3"
                                  >
                                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                                      <h6 className="font-semibold text-foreground">
                                        {exercise.title}
                                      </h6>
                                      <span className="font-label text-[10px] text-muted-foreground">
                                        About {Math.ceil(exercise.durationSec / 60)} min · practice
                                        prompt
                                      </span>
                                    </div>
                                    <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
                                      {exercise.steps.map((step) => (
                                        <li key={step}>{step}</li>
                                      ))}
                                    </ol>
                                  </div>
                                ))}
                              </div>
                            </details>
                          ))}
                        </div>
                      </section>
                    ))}
                  </article>
                ))}
              </div>
            )),
          )}

          <div className="rounded-lg border border-dashed border-border p-4">
            <h4 className="font-display text-lg text-foreground">Assessment & advancement</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A draft term rubric and rule-based prerequisite are defined in the content model.
              Assessment submission, review, saved evidence, and advancement are not yet connected
              to a user account, so no result or completion action is offered.
            </p>
          </div>
        </section>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-4">
          <h3 className="font-display text-xl text-foreground">Curriculum outline in progress</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This shell shows the school&apos;s registered focus only. Its lessons and progression
            will appear after authored content passes the curriculum checks.
          </p>
        </div>
      )}

      <Link
        to="/auth"
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-brass/50 px-4 text-sm font-semibold text-brass hover:bg-brass/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Sign in or create an account
      </Link>
    </div>
  );
}

function TextBlock({ label, text }: { label: string; text: string }) {
  return (
    <p className="text-muted-foreground">
      <span className="font-label text-[10px] text-foreground">{label}: </span>
      {text}
    </p>
  );
}
