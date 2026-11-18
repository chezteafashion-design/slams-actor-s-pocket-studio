import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { DESK_DESTINATIONS } from "@/features/office/desk";
import { DestinationDetails } from "@/features/office/DestinationDetails";

export const Route = createFileRoute("/_authenticated/schools")({
  head: () => ({
    meta: [
      { title: "Schools — SLAMS" },
      { name: "description", content: "The Conservatory: eight acting schools, from Stanislavski to Viewpoints, with real assessment and advancement." },
      { property: "og:title", content: "Schools — SLAMS" },
      { property: "og:description", content: "The Conservatory: eight acting schools, from Stanislavski to Viewpoints, with real assessment and advancement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SchoolsPage,
});

function SchoolsPage() {
  const destination = DESK_DESTINATIONS["train"];
  return (
    <AppShell title={destination.title} kicker={destination.kicker} tab="schools">
      <DestinationDetails destination={destination} />
    </AppShell>
  );
}
