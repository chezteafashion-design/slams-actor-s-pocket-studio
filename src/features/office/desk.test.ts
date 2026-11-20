import { OFFICE_ACTIONS, getPage } from "@/domain/constitution";
import { COACH_LINES, DESK_DESTINATIONS, DESK_HOTSPOTS, PRINCIPAL_DESTINATIONS, availabilityOf, nextCoachLine, tabPath } from "./desk";

describe("Office desk", () => {
  it("has a desk object for each of the four principal actions, opening the matching destination", () => {
    const tabsReachable = DESK_HOTSPOTS.map((h) => DESK_DESTINATIONS[h.destination].tab);
    for (const a of OFFICE_ACTIONS) expect(tabsReachable).toContain(a.destination);
  });

  it("only points at pages that exist in the registry", () => {
    for (const d of Object.values(DESK_DESTINATIONS))
      for (const id of d.pageIds) expect(getPage(id), `${d.id} -> ${id}`).toBeDefined();
  });

  it("keeps every hotspot inside the illustration", () => {
    for (const h of DESK_HOTSPOTS) {
      expect(h.rect.left).toBeGreaterThanOrEqual(0);
      expect(h.rect.top).toBeGreaterThanOrEqual(0);
      expect(h.rect.left + h.rect.width).toBeLessThanOrEqual(100);
      expect(h.rect.top + h.rect.height).toBeLessThanOrEqual(100);
    }
  });

  it("never reports an unbuilt destination as open", () => {
    const train = availabilityOf(DESK_DESTINATIONS.train);
    expect(train.status).toBe("in-development");
    expect(train.phase).toBe(2);
    expect(train.label).toBe("Being built · Phase 2: Conservatory vertical slice");
  });

  it("sends each of the four principal actions to its own tab", () => {
    const routed = DESK_HOTSPOTS.map((h) => PRINCIPAL_DESTINATIONS[h.destination]).filter(Boolean);
    for (const a of OFFICE_ACTIONS) expect(routed).toContain(a.destination);
    expect(tabPath("schools")).toBe("/schools");
    expect(tabPath("stuck")).toBe("/stuck");
  });

  it("keeps supporting systems as sheets, not tabs", () => {
    expect(PRINCIPAL_DESTINATIONS.passport).toBeUndefined();
    expect(PRINCIPAL_DESTINATIONS["technique-matrix"]).toBeUndefined();
  });

  it("cycles the coach's lines in order and wraps around", () => {
    expect(nextCoachLine(0)).toEqual({ line: COACH_LINES[0]!.full, next: 1 });
    expect(nextCoachLine(COACH_LINES.length - 1).next).toBe(0);
  });

  it("never swears when language is set to softened", () => {
    for (let i = 0; i < COACH_LINES.length; i++) expect(nextCoachLine(i, "softened").line).not.toMatch(/damn|bullsh|f\*|fuck/i);
    expect(nextCoachLine(5, "full").line).toBe("Take the note. Then do the damn note.");
    expect(nextCoachLine(5, "softened").line).toBe("Take the note. Then actually do the note.");
  });
});
