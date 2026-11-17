/** Renders the generated constitution documents (02 route registry, 03 coverage matrix). */
import {
  ENGINES,
  FAMILY_LABELS,
  NAV_DESTINATIONS,
  PAGE_FAMILIES,
  PAGES,
  SIGNATURE_EXPERIENCES,
  STATUS_LABELS,
  SUPPORTING_SYSTEMS,
  getPage,
  pagesByFamily,
  signaturesForPage,
} from "./constitution";

const HEADER = "<!-- GENERATED from src/domain/constitution.ts by `bun scripts/generate-constitution-docs.ts`. Do not edit by hand. -->";

const tabLabel = (id: string) => NAV_DESTINATIONS.find((n) => n.id === id)?.label ?? id;
const sysName = (id: string) =>
  SUPPORTING_SYSTEMS.find((s) => s.id === id)?.name ?? ENGINES.find((e) => e.id === id)?.name ?? id;
const pageName = (id: string) => getPage(id)?.name ?? `MISSING:${id}`;

export function renderRouteRegistry(): string {
  const lines: string[] = [
    HEADER,
    "",
    "# 02 — Route Registry",
    "",
    "Every route SLAMS will ship. Paths use TanStack Router syntax (`$param`). `Tab` is the bottom-nav destination highlighted on that page. `Member` routes live under the authenticated layout.",
    "",
    "## Permanent navigation",
    "",
    "| Tab | Path |",
    "| --- | --- |",
    ...NAV_DESTINATIONS.map((n) => `| ${n.label} | \`${n.path}\` |`),
    "",
    "Development and Account pages are reached from the Office (systems row, Passport card) and the header profile button — never as extra tabs.",
    "",
    "## All routes",
    "",
    "| # | Page | Path | Family | Tab | Access | Phase | Status |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...PAGES.map(
      (p) =>
        `| ${p.number} | ${p.name} | \`${p.path}\` | ${FAMILY_LABELS[p.family]} | ${tabLabel(p.tab)} | ${p.access === "public" ? "Public" : "Member"} | ${p.phase} | ${STATUS_LABELS[p.status]} |`,
    ),
    "",
  ];
  return lines.join("\n");
}

export function renderCoverageMatrix(): string {
  const lines: string[] = [
    HEADER,
    "",
    "# 03 — 47-Page Functional Coverage Matrix",
    "",
    `Total pages: **${PAGES.length}** across **${PAGE_FAMILIES.length}** families. Pages marked with a mockup number come from the supplied 10-screen blueprint board; the remaining pages were reconstructed from the constitution and must be confirmed against the original 47-page blueprint.`,
    "",
    "| Family | Pages |",
    "| --- | --- |",
    ...PAGE_FAMILIES.map((f) => `| ${FAMILY_LABELS[f]} | ${pagesByFamily(f).length} |`),
    "",
  ];

  for (const family of PAGE_FAMILIES) {
    lines.push(`## ${FAMILY_LABELS[family]}`, "");
    for (const p of pagesByFamily(family)) {
      const sig = signaturesForPage(p.id).map((s) => s.name);
      const sys = [...p.systems, ...p.engines].map(sysName);
      lines.push(
        `### ${p.number}. ${p.name}${p.mockup ? ` (mockup ${p.mockup})` : ""}`,
        "",
        `- **Path:** \`${p.path}\` · **Tab:** ${tabLabel(p.tab)} · **Access:** ${p.access} · **Phase:** ${p.phase} · **Status:** ${STATUS_LABELS[p.status]}`,
        `- **Purpose:** ${p.purpose}`,
        `- **Actions:** ${p.actions.join("; ")}`,
        `- **Data:** ${p.data.length ? p.data.map((d) => `\`${d}\``).join(", ") : "none"}`,
        `- **Systems / engines:** ${sys.length ? sys.join(", ") : "—"}`,
        `- **Signature experiences:** ${sig.length ? sig.join(", ") : "—"}`,
        "",
      );
    }
  }

  lines.push(
    "## Signature experience placement",
    "",
    "| Experience | Home page | Also appears in | Depends on | Phase |",
    "| --- | --- | --- | --- | --- |",
    ...SIGNATURE_EXPERIENCES.map(
      (s) =>
        `| ${s.name} | ${pageName(s.homePage)} | ${s.alsoIn.map(pageName).join(", ")} | ${s.dependsOn.map(sysName).join(", ")} | ${s.phase} |`,
    ),
    "",
    "## Supporting system and engine coverage",
    "",
    "| System / engine | Pages |",
    "| --- | --- |",
    ...[...SUPPORTING_SYSTEMS, ...ENGINES].map((s) => {
      const used = PAGES.filter(
        (p) => (p.systems as string[]).includes(s.id) || (p.engines as string[]).includes(s.id),
      );
      return `| ${s.name} | ${used.map((p) => `${p.number}. ${p.name}`).join(", ")} |`;
    }),
    "",
  );
  return lines.join("\n");
}

export const GENERATED_DOCS = [
  { file: "docs/constitution/02-route-registry.md", render: renderRouteRegistry },
  { file: "docs/constitution/03-page-coverage-matrix.md", render: renderCoverageMatrix },
] as const;
