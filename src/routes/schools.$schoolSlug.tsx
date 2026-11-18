import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { SCHOOLS } from "@/domain/constitution";
import { SchoolOverview } from "@/features/conservatory/SchoolOverview";

export const Route = createFileRoute("/schools/$schoolSlug")({
  head: ({ params }) => {
    const school = SCHOOLS.find((entry) => entry.slug === params.schoolSlug);
    const title = school
      ? `${school.name} — The Conservatory — SLAMS`
      : "School — The Conservatory — SLAMS";
    const description = school?.focus ?? "Explore an acting school in the SLAMS Conservatory.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: SchoolPage,
});

function SchoolPage() {
  const { schoolSlug } = Route.useParams();
  const school = SCHOOLS.find((entry) => entry.slug === schoolSlug);
  return (
    <AppShell title={school?.name ?? "School not found"} kicker="The Conservatory" tab="schools">
      <SchoolOverview schoolSlug={schoolSlug} />
    </AppShell>
  );
}
