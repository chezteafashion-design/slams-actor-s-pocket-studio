import { OFFICE_ACTIONS, getPage } from "@/domain/constitution";
import { COACH_LINES, DESK_DESTINATIONS, DESK_HOTSPOTS, availabilityOf, nextCoachLine } from "./desk";

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
    expect(train.status).toBe("planned");
    expect(train.phase).toBe(2);
    expect(train.label).toBe("Not open yet · Phase 2: Conservatory vertical slice");
  });

  it("cycles the coach's lines in order and wraps around", () => {
    expect(nextCoachLine(0)).toEqual({ line: COACH_LINES[0], next: 1 });
    expect(nextCoachLine(COACH_LINES.length - 1).next).toBe(0);
  });
});
