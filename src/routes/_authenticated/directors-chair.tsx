import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { StatusBadge } from "@/components/slams/StatusBadge";
import { profileQuery } from "@/features/account/queries";
import { PracticePlanPanel } from "@/features/directors-chair/PracticePlanPanel";
import { GoalsCard, TrainingRecordCard } from "@/features/directors-chair/TrainingReview";
import { trainingSummaryQuery } from "@/features/directors-chair/queries";

export const Route = createFileRoute("/_authenticated/directors-chair")({
  head: () => ({
    meta: [
      { title: "The Director's Chair — SLAMS" },
      { name: "description", content: "Review your training record and goals, then get a focused, clearly labelled AI practice plan." },
      { property: "og:title", content: "The Director's Chair — SLAMS" },
      { property: "og:description", content: "Your training record, your goals and a focused next practice plan from the Director." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(profileQuery(context.user.id)),
      context.queryClient.ensureQueryData(trainingSummaryQuery(context.user.id)),
    ]),
  component: DirectorsChairPage,
});

function DirectorsChairPage() {
  const { user } = Route.useRouteContext();
  const { data: profile } = useSuspenseQuery(profileQuery(user.id));
  const { data: summary } = useSuspenseQuery(trainingSummaryQuery(user.id));
  return (
    <AppShell title="The Director's Chair" kicker="The Master's Chair" tab="office" back={{ to: "/", label: "Office" }}>
      <div className="space-y-6">
        <div>
          <StatusBadge status="beta" className="w-fit">Beta · Practice plans</StatusBadge>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Look at what you've actually done, remember what you're working towards, then take one focused plan away. Coach notes and feedback requests open here later.
          </p>
        </div>
        <TrainingRecordCard summary={summary} />
        <GoalsCard goals={profile.goals} level={profile.experience_level} />
        <PracticePlanPanel />
      </div>
    </AppShell>
  );
}
