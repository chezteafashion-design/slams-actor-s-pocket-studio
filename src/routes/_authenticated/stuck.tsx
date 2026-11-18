import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { DESK_DESTINATIONS } from "@/features/office/desk";
import { DestinationDetails } from "@/features/office/DestinationDetails";

export const Route = createFileRoute("/_authenticated/stuck")({
  head: () => ({
    meta: [
      { title: "The Stuck Desk — SLAMS" },
      { name: "description", content: "Name the acting problem, get a practical fix, retake." },
      { property: "og:title", content: "The Stuck Desk — SLAMS" },
      { property: "og:description", content: "Name the acting problem, get a practical fix, retake." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StuckPage,
});

function StuckPage() {
  const destination = DESK_DESTINATIONS["stuck"];
  return (
    <AppShell title={destination.title} kicker={destination.kicker} tab="stuck">
      <DestinationDetails destination={destination} />
    </AppShell>
  );
}
