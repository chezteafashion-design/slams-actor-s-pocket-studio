import { Link } from "@tanstack/react-router";
import { NotebookPen, ScrollText } from "lucide-react";
import { CardHeading, PaperCard } from "@/components/slams/PaperCard";
import { HonestEmpty } from "@/components/slams/HonestEmpty";
import { EXPERIENCE_LEVELS, type ExperienceLevel } from "@/domain/account";
import type { TrainingSummary } from "@/domain/practice-plan";

const date = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border border-border px-3 py-2">
      <p className="font-display text-2xl leading-none text-foreground">{value}</p>
      <p className="mt-1 font-label text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

export function TrainingRecordCard({ summary }: { summary: TrainingSummary }) {
  const evidenceTotal = Object.values(summary.evidenceByKind).reduce((a, b) => a + b, 0);
  return (
    <PaperCard>
      <CardHeading hint={summary.lastActivityAt ? `Last activity ${date(summary.lastActivityAt)}. Counted from your saved work only.` : "Counted from your saved work only."}>
        Your training record
      </CardHeading>
      {summary.isEmpty ? (
        <HonestEmpty icon={ScrollText} title="Nothing recorded yet">
          Lessons, exercises, evidence and reviews appear here once you save them in the Conservatory. A plan written now is based on your goals alone.
        </HonestEmpty>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Stat value={summary.lessonsStudied} label="Lessons studied" />
            <Stat value={summary.exercisesCompleted} label="Exercises done" />
            <Stat value={evidenceTotal} label="Evidence saved" />
            <Stat value={summary.assessmentsSubmitted} label="Assessments sent" />
            <Stat value={summary.reviewsPassed} label="Reviews passed" />
            <Stat value={summary.advancements.length} label="Advancements" />
          </div>
          {(summary.exercisesInProgress > 0 || summary.exercisesAbandoned > 0 || summary.reviewsNeedWork > 0) && (
            <p className="text-xs text-muted-foreground">
              {summary.exercisesInProgress} exercise{summary.exercisesInProgress === 1 ? "" : "s"} in progress · {summary.exercisesAbandoned} dropped · {summary.reviewsNeedWork} review{summary.reviewsNeedWork === 1 ? "" : "s"} needing work
            </p>
          )}
          {summary.schools.length > 0 && (
            <div>
              <h3 className="font-label text-[11px] text-brass">Schools</h3>
              <ul className="mt-1 space-y-1 text-sm">
                {summary.schools.map((s) => (
                  <li key={`${s.slug}-${s.startedAt}`} className="flex justify-between gap-2">
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-xs capitalize text-muted-foreground">{s.status} · since {date(s.startedAt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {summary.recentReflections.length > 0 && (
            <div>
              <h3 className="font-label text-[11px] text-brass">Your recent reflections</h3>
              <ul className="mt-1 space-y-2">
                {summary.recentReflections.map((r, i) => (
                  <li key={i} className="border-l-2 border-brass/40 pl-3 text-sm">
                    <p className="text-xs text-muted-foreground">{r.exercise} · {date(r.at)}</p>
                    <p className="italic text-foreground">“{r.text}”</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {summary.recentFeedback.length > 0 && (
            <div>
              <h3 className="font-label text-[11px] text-brass">Review feedback</h3>
              <ul className="mt-1 space-y-2">
                {summary.recentFeedback.map((f, i) => (
                  <li key={i} className="text-sm">
                    <p className="text-xs text-muted-foreground">{f.schoolName} · {f.outcome === "passed" ? "Passed" : "Needs work"} · {date(f.at)}</p>
                    <p className="text-foreground">{f.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </PaperCard>
  );
}

export function GoalsCard({ goals, level }: { goals: string; level: ExperienceLevel | null }) {
  const levelLabel = EXPERIENCE_LEVELS.find((l) => l.id === level)?.label;
  return (
    <PaperCard>
      <CardHeading hint={levelLabel ? `Experience: ${levelLabel}` : "Experience level not set."}>Your goals</CardHeading>
      {goals.trim() ? (
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{goals}</p>
      ) : (
        <HonestEmpty icon={NotebookPen} title="No goals written yet">
          The Director plans better when it knows what you're working towards.
        </HonestEmpty>
      )}
      <Link to="/account" className="mt-3 inline-block font-label text-[11px] text-brass underline-offset-4 hover:underline">
        {goals.trim() ? "Edit goals in your profile →" : "Write your goals in your profile →"}
      </Link>
    </PaperCard>
  );
}
