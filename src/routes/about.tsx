import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { CardHeading, PaperCard } from "@/components/slams/PaperCard";
import { StatusBadge } from "@/components/slams/StatusBadge";
import { FAMILY_LABELS, PAGE_FAMILIES, PRODUCT, ROADMAP_PHASES, SCHOOLS, STATUS_LABELS, pagesByFamily } from "@/domain/constitution";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Feature Status — SLAMS" },
      { name: "description", content: "What SLAMS is, who makes it, and the honest status of every page in the studio." },
      { property: "og:title", content: "About & Feature Status — SLAMS" },
      { property: "og:description", content: "mrahmostudios presents SLAMS. The honest status of every page in the studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

const PHASE_LABEL = { complete: "Done", "in-progress": "Building now", planned: "Planned" } as const;

function AboutPage() {
  return (
    <AppShell title="About SLAMS" kicker={PRODUCT.credit} member={false} back={{ to: "/welcome", label: "Welcome" }}>
      <div className="space-y-6">
        <PaperCard tone="paper">
          <p className="font-display text-2xl leading-tight">{PRODUCT.name} — {PRODUCT.tagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-paper-muted">
            An acting studio by mrahmostudios: structured schools, rehearsal, professional preparation and troubleshooting. Every page below shows its real status. Nothing is marked open until it works.
          </p>
        </PaperCard>

        <PaperCard>
          <CardHeading>How it's being built</CardHeading>
          <ol className="space-y-2">
            {ROADMAP_PHASES.map((p) => (
              <li key={p.phase} className="flex items-start justify-between gap-3">
                <span className="text-sm text-foreground"><span className="text-muted-foreground">{p.phase}.</span> {p.name}</span>
                <span className="shrink-0 font-label text-[10px] text-muted-foreground">{PHASE_LABEL[p.status]}</span>
              </li>
            ))}
          </ol>
        </PaperCard>

        <section aria-labelledby="status-heading">
          <h2 id="status-heading" className="font-label text-xs text-brass">Every page, honestly</h2>
          <div className="mt-3 space-y-5">
            {PAGE_FAMILIES.map((family) => (
              <div key={family}>
                <h3 className="font-display text-xl text-foreground">{FAMILY_LABELS[family]}</h3>
                <ul className="mt-2 divide-y divide-border rounded-md border border-border" data-testid={`family-${family}`}>
                  {pagesByFamily(family).map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3 px-3 py-2">
                      <span className="text-sm text-foreground">{p.name}</span>
                      <StatusBadge status={p.status} className="shrink-0">{STATUS_LABELS[p.status]}</StatusBadge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <PaperCard>
          <CardHeading>About the techniques</CardHeading>
          <p className="text-xs leading-relaxed text-muted-foreground">
            SLAMS teaches its own interpretations of {SCHOOLS.map((s) => s.name).join(", ")}. It is not affiliated with, endorsed by, or speaking for any practitioner, estate, studio or institution connected to these techniques.
          </p>
        </PaperCard>
      </div>
    </AppShell>
  );
}
