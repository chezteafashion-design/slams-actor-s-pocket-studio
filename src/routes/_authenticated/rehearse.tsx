import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { DESK_DESTINATIONS } from "@/features/office/desk";
import { DestinationDetails } from "@/features/office/DestinationDetails";

export const Route = createFileRoute("/_authenticated/rehearse")({
  head: () => ({
    meta: [
      { title: "Rehearse — SLAMS" },
      { name: "description", content: "Living Scene rehearsal: a partner who changes, a director who interrupts, takes you can review." },
      { property: "og:title", content: "Rehearse — SLAMS" },
      { property: "og:description", content: "Living Scene rehearsal: a partner who changes, a director who interrupts, takes you can review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RehearsePage,
});

function RehearsePage() {
  const destination = DESK_DESTINATIONS["rehearse"];
  return (
    <AppShell title={destination.title} kicker={destination.kicker} tab="rehearse">
      <DestinationDetails destination={destination} />
    </AppShell>
  );
}
