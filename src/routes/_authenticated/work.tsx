import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { DESK_DESTINATIONS } from "@/features/office/desk";
import { DestinationDetails } from "@/features/office/DestinationDetails";

export const Route = createFileRoute("/_authenticated/work")({
  head: () => ({
    meta: [
      { title: "Actor at Work — SLAMS" },
      { name: "description", content: "Auditions, character work, scene breakdowns, self-tapes, scripts and journals." },
      { property: "og:title", content: "Actor at Work — SLAMS" },
      { property: "og:description", content: "Auditions, character work, scene breakdowns, self-tapes, scripts and journals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const destination = DESK_DESTINATIONS["work"];
  return (
    <AppShell title={destination.title} kicker={destination.kicker} tab="work">
      <DestinationDetails destination={destination} />
    </AppShell>
  );
}
