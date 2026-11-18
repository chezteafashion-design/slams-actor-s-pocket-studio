import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { SchoolDirectory } from "@/features/conservatory/SchoolDirectory";

export const Route = createFileRoute("/schools/")({
  head: () => ({
    meta: [
      { title: "The Conservatory — SLAMS" },
      {
        name: "description",
        content: "Explore eight distinct acting schools in the SLAMS Conservatory.",
      },
      { property: "og:title", content: "The Conservatory — SLAMS" },
      {
        property: "og:description",
        content: "Explore eight distinct acting schools in the SLAMS Conservatory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SchoolsPage,
});

function SchoolsPage() {
  return (
    <AppShell title="The Conservatory" kicker="Eight schools · one craft" tab="schools">
      <SchoolDirectory />
    </AppShell>
  );
}
