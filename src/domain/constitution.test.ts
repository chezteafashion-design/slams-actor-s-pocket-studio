import { readFileSync } from "node:fs";
import path from "node:path";
import {
  EDUCATIONAL_HIERARCHY,
  ENGINES,
  NAV_DESTINATIONS,
  OFFICE_ACTIONS,
  PAGE_FAMILIES,
  PAGES,
  ROADMAP_PHASES,
  SCHOOLS,
  SIGNATURE_EXPERIENCES,
  SUPPORTING_SYSTEMS,
  WORLDS,
  getPage,
} from "./constitution";
import { GENERATED_DOCS } from "./constitution-docs";

describe("SLAMS constitution", () => {
  it("has exactly 47 pages numbered 1..47 with unique ids and paths", () => {
    expect(PAGES).toHaveLength(47);
    expect(PAGES.map((p) => p.number)).toEqual(Array.from({ length: 47 }, (_, i) => i + 1));
    expect(new Set(PAGES.map((p) => p.id)).size).toBe(47);
    expect(new Set(PAGES.map((p) => p.path)).size).toBe(47);
  });

  it("organises pages into the seven families, each non-empty", () => {
    expect(PAGE_FAMILIES).toEqual(["home", "training", "rehearsal", "professional", "troubleshooting", "development", "account"]);
    for (const f of PAGE_FAMILIES) expect(PAGES.some((p) => p.family === f)).toBe(true);
  });

  it("has three worlds", () => {
    expect(WORLDS.map((w) => w.name)).toEqual(["The Conservatory", "Actor at Work", "The Stuck Desk"]);
  });

  it("has exactly five permanent navigation destinations in order, each backed by a page", () => {
    expect(NAV_DESTINATIONS.map((n) => n.label)).toEqual(["OFFICE", "SCHOOLS", "REHEARSE", "WORK", "STUCK DESK"]);
    for (const n of NAV_DESTINATIONS) expect(PAGES.find((p) => p.path === n.path)).toBeDefined();
  });

  it("gives the Office the four principal actions", () => {
    expect(OFFICE_ACTIONS.map((a) => a.label)).toEqual(["TRAIN", "REHEARSE", "WORK", "GET UNSTUCK"]);
    expect(OFFICE_ACTIONS.map((a) => a.destination)).toEqual(["schools", "rehearse", "work", "stuck"]);
  });

  it("lists the eight schools in constitutional order", () => {
    expect(SCHOOLS.map((s) => s.name)).toEqual([
      "Stanislavski", "Meisner", "Stella Adler", "Lee Strasberg",
      "Michael Chekhov", "Laban / Bartenieff", "Practical Aesthetics", "Viewpoints / Composition",
    ]);
  });

  it("keeps the ten-level educational hierarchy", () => {
    expect(EDUCATIONAL_HIERARCHY).toEqual([
      "school", "year", "term", "course", "workshop", "lesson", "exercise", "practice-evidence", "assessment", "advancement",
    ]);
  });

  it("has six supporting systems and two engines, each used by at least one page", () => {
    expect(SUPPORTING_SYSTEMS).toHaveLength(6);
    expect(ENGINES).toHaveLength(2);
    for (const s of SUPPORTING_SYSTEMS) expect(PAGES.some((p) => (p.systems as string[]).includes(s.id))).toBe(true);
    for (const e of ENGINES) expect(PAGES.some((p) => (p.engines as string[]).includes(e.id))).toBe(true);
  });

  it("attaches all ten signature experiences to real pages, none as a nav destination", () => {
    expect(SIGNATURE_EXPERIENCES).toHaveLength(10);
    const navPaths = NAV_DESTINATIONS.map((n) => n.path) as string[];
    for (const s of SIGNATURE_EXPERIENCES) {
      const home = getPage(s.homePage);
      expect(home, s.id).toBeDefined();
      expect(navPaths).not.toContain(s.id);
      for (const id of s.alsoIn) expect(getPage(id), `${s.id} -> ${id}`).toBeDefined();
    }
  });

  it("reports every feature honestly as not yet live during the constitution phase", () => {
    for (const p of PAGES) expect(p.status).toBe("planned");
    for (const s of SIGNATURE_EXPERIENCES) expect(s.status).toBe("planned");
  });

  it("schedules every page and experience into a defined roadmap phase", () => {
    const phases = ROADMAP_PHASES.map((r) => r.phase) as number[];
    for (const p of PAGES) expect(phases).toContain(p.phase);
    for (const s of SIGNATURE_EXPERIENCES) expect(phases).toContain(s.phase);
  });

  it("keeps generated constitution docs in sync with the registry", () => {
    for (const doc of GENERATED_DOCS) {
      const onDisk = readFileSync(path.resolve(process.cwd(), doc.file), "utf8");
      expect(onDisk, `${doc.file} is stale — run bun scripts/generate-constitution-docs.ts`).toBe(doc.render());
    }
  });
});
