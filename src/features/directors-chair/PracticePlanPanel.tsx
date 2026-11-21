import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Clock, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CardHeading, PaperCard } from "@/components/slams/PaperCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PLAN_FOCUS_MAX, planTotalMinutes, type PracticePlan } from "@/domain/practice-plan";
import { requestPracticePlan, type PracticePlanResult } from "./practice-plan.functions";

export function PracticePlanPanel() {
  const ask = useServerFn(requestPracticePlan);
  const [focus, setFocus] = useState("");
  const plan = useMutation({
    mutationFn: (f: string): Promise<PracticePlanResult> => ask({ data: { focus: f } }),
  });
  const result = plan.data;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (plan.isPending) return;
    plan.mutate(focus.trim());
  };

  return (
    <div className="space-y-4">
      <PaperCard>
        <CardHeading hint="The Director reads your record and goals above and writes one focused plan. It is written by Lovable AI — not a coach, and not an assessment.">
          Ask for your next practice plan
        </CardHeading>
        <form onSubmit={onSubmit} className="space-y-3" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="plan-focus">Anything specific this time? (optional)</Label>
            <Textarea
              id="plan-focus"
              value={focus}
              maxLength={PLAN_FOCUS_MAX}
              rows={3}
              placeholder="e.g. Audition on Friday — I keep rushing the first line."
              onChange={(e) => setFocus(e.target.value)}
            />
            <p className="text-right text-[11px] text-muted-foreground">{focus.length}/{PLAN_FOCUS_MAX}</p>
          </div>
          <Button type="submit" variant="brass" className="w-full" disabled={plan.isPending}>
            <Sparkles className="size-4" aria-hidden />
            {plan.isPending ? "The Director is reading your record…" : result?.ok ? "Write another plan" : "Write my next practice plan"}
          </Button>
        </form>
      </PaperCard>

      <div aria-live="polite">
        {plan.isError && (
          <PaperCard tone="danger">
            <p className="text-sm">Couldn't reach the Director. Check your connection and try again.</p>
          </PaperCard>
        )}
        {result && !result.ok && (
          <PaperCard tone="danger">
            <p className="text-sm">{result.message}</p>
          </PaperCard>
        )}
        {result?.ok && <PlanCard plan={result.plan} emptyRecord={result.basedOnEmptyRecord} hadGoals={result.hadGoals} at={result.generatedAt} />}
      </div>
    </div>
  );
}

function PlanCard({ plan, emptyRecord, hadGoals, at }: { plan: PracticePlan; emptyRecord: boolean; hadGoals: boolean; at: string }) {
  return (
    <PaperCard tone="paper" className="space-y-4">
      <div>
        <span className="inline-block rounded-sm bg-primary px-2 py-0.5 font-label text-[10px] text-primary-foreground">
          AI-written plan · Lovable AI · not a coach's assessment
        </span>
        <h2 className="mt-2 font-display text-2xl leading-tight">{plan.headline}</h2>
        <p className="mt-1 flex items-center gap-1 text-xs text-paper-muted">
          <Clock className="size-3.5" aria-hidden /> {plan.sessions.length} session{plan.sessions.length === 1 ? "" : "s"} · about {planTotalMinutes(plan)} minutes
        </p>
      </div>
      <div>
        <p className="font-label text-[11px] text-oxblood">The focus</p>
        <p className="text-[15px] font-semibold leading-snug">{plan.focus}</p>
        <p className="mt-1 text-sm leading-relaxed text-paper-muted">{plan.why}</p>
      </div>
      <ol className="space-y-3">
        {plan.sessions.map((s, i) => (
          <li key={i} className="rounded-md border border-paper-foreground/15 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-display text-lg leading-tight">{i + 1}. {s.title}</p>
              <span className="shrink-0 font-label text-[11px] text-paper-muted">{s.minutes} min</span>
            </div>
            {s.exercise && (
              <p className="mt-1 text-xs text-paper-muted">
                From the Conservatory:{" "}
                <Link to="/schools/$schoolSlug" params={{ schoolSlug: s.exercise.schoolSlug }} className="font-semibold text-oxblood underline-offset-2 hover:underline">
                  {s.exercise.title}
                </Link>{" "}
                ({s.exercise.lessonTitle})
              </p>
            )}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {s.steps.map((step, j) => <li key={j}>{step}</li>)}
            </ul>
            {s.notice && <p className="mt-2 text-sm italic text-paper-muted">Notice: {s.notice}</p>}
          </li>
        ))}
      </ol>
      {plan.checkIn && (
        <div>
          <p className="font-label text-[11px] text-oxblood">Afterwards, ask yourself</p>
          <p className="text-sm">{plan.checkIn}</p>
        </div>
      )}
      <div className="border-t border-paper-foreground/15 pt-3 text-xs text-paper-muted">
        <p>
          {emptyRecord
            ? hadGoals ? "Based on your goals only — you have no training recorded yet." : "Based on very little — no training recorded and no goals written yet."
            : "Based on your saved training record and goals."}
        </p>
        {plan.groundedIn.length > 0 && <p className="mt-1">It leans on: {plan.groundedIn.join(" · ")}</p>}
        <p className="mt-1">
          Written {new Date(at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}. Not saved to your record — it disappears when you leave this page.
        </p>
      </div>
    </PaperCard>
  );
}
