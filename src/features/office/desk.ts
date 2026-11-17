/** The Office desk: which illustrated object opens which part of the studio, and its honest status. */
import {
  getPage,
  getPhase,
  signaturesForPage,
  type FeatureStatus,
  type NavDestinationId,
  type PageContract,
  type SignatureExperience,
} from "@/domain/constitution";

export type DeskDestinationId =
  | "train"
  | "rehearse"
  | "work"
  | "stuck"
  | "passport"
  | "technique-matrix"
  | "directors-chair"
  | "baseline";

export interface DeskDestination {
  id: DeskDestinationId;
  kicker: string;
  title: string;
  summary: string;
  pageIds: string[];
  tab?: NavDestinationId;
}

export const DESK_DESTINATIONS: Record<DeskDestinationId, DeskDestination> = {
  train: {
    id: "train", kicker: "The Conservatory", title: "Train", tab: "schools",
    summary: "Eight schools of acting technique. Years, terms, courses, workshops, lessons and exercises — assessed, and advanced only on real evidence.",
    pageIds: ["conservatory", "school", "term", "course", "workshop", "lesson", "exercise", "assessment", "advancement", "technique-matrix"],
  },
  rehearse: {
    id: "rehearse", kicker: "Living Scene", title: "Rehearse", tab: "rehearse",
    summary: "Scenes that fight back: a partner who changes, a director who interrupts, takes you can review and redo.",
    pageIds: ["rehearse", "scene-setup", "live-session", "performance-lab", "take-review", "lounge"],
  },
  work: {
    id: "work", kicker: "Actor at Work", title: "Work", tab: "work",
    summary: "Auditions, characters, scene breakdowns, self-tapes, scripts and journals — the professional side of the job.",
    pageIds: ["work", "auditions", "audition", "character-lab", "breakdown", "self-tape", "scripts", "script", "projects"],
  },
  stuck: {
    id: "stuck", kicker: "The Stuck Desk", title: "Get Unstuck", tab: "stuck",
    summary: "Name the problem, get a practical fix, retake. Dead scenes, overacting, forced emotion, not listening.",
    pageIds: ["stuck", "diagnose", "problem", "intervention", "retake"],
  },
  passport: {
    id: "passport", kicker: "Actor's Passport", title: "My Actor's Journey",
    summary: "Your real record: evidence, assessments, milestones and portfolio. Nothing in here that you didn't earn.",
    pageIds: ["journey", "evidence", "milestones", "portfolio"],
  },
  "technique-matrix": {
    id: "technique-matrix", kicker: "Supporting system", title: "Technique Matrix", tab: "schools",
    summary: "Compare the eight techniques side by side and find the one that fixes what you need.",
    pageIds: ["technique-matrix"],
  },
  "directors-chair": {
    id: "directors-chair", kicker: "The Master's Chair", title: "Director's Notes",
    summary: "Notes from coaches — or clearly labelled AI. Take the note. Then do the damn note.",
    pageIds: ["directors-chair"],
  },
  baseline: {
    id: "baseline", kicker: "Start here", title: "Actor's Baseline",
    summary: "A short diagnostic of where you are now. Your pathway through the schools is built from your answers — not guessed.",
    pageIds: ["baseline", "baseline-task", "baseline-results"],
  },
};

/** Hotspot rectangles in % of the desk illustration (941 × 1672). */
export const DESK_HOTSPOTS: Array<{
  id: string;
  destination: DeskDestinationId;
  label: string;
  rect: { left: number; top: number; width: number; height: number };
}> = [
  { id: "work-sign", destination: "work", label: "Work — Actor at Work", rect: { left: 2.5, top: 13.5, width: 19, height: 14.5 } },
  { id: "rehearse-sign", destination: "rehearse", label: "Rehearse — Living Scene", rect: { left: 68.5, top: 15.5, width: 29.5, height: 7.8 } },
  { id: "train-books", destination: "train", label: "Train — The Conservatory", rect: { left: 68, top: 38.2, width: 31.5, height: 24.8 } },
  { id: "stuck-note", destination: "stuck", label: "Get Unstuck — The Stuck Desk", rect: { left: 66, top: 64, width: 33.5, height: 20 } },
  { id: "passport-drawer", destination: "passport", label: "Actor's Passport", rect: { left: 3.5, top: 29.8, width: 14.5, height: 4.6 } },
  { id: "journey-drawer", destination: "passport", label: "My Actor's Journey", rect: { left: 3.5, top: 39.6, width: 14.5, height: 6.8 } },
  { id: "matrix-book", destination: "technique-matrix", label: "Technique Matrix", rect: { left: 69.5, top: 86.5, width: 30, height: 13.3 } },
  { id: "notes-pad", destination: "directors-chair", label: "Director's Notes", rect: { left: 9, top: 91.3, width: 26, height: 8.6 } },
];

export interface Availability {
  status: FeatureStatus;
  phase: number;
  phaseName: string;
  label: string;
}

/** Honest availability, derived only from the registry. */
export function availabilityOf(dest: DeskDestination): Availability {
  const pages = dest.pageIds.map(getPage).filter((p): p is PageContract => Boolean(p));
  const live = pages.filter((p) => p.status === "live");
  const phase = Math.min(...pages.map((p) => p.phase));
  const phaseName = getPhase(phase)?.name ?? "";
  if (live.length === pages.length) return { status: "live", phase, phaseName, label: "Open" };
  if (live.length > 0) return { status: "beta", phase, phaseName, label: `Partly open · ${live.length} of ${pages.length} pages` };
  const building = pages.some((p) => p.status === "in-development");
  return {
    status: building ? "in-development" : "planned",
    phase,
    phaseName,
    label: `${building ? "Being built" : "Not open yet"} · Phase ${phase}: ${phaseName}`,
  };
}

export function pagesOf(dest: DeskDestination): PageContract[] {
  return dest.pageIds.map(getPage).filter((p): p is PageContract => Boolean(p));
}

export function signaturesOf(dest: DeskDestination): SignatureExperience[] {
  const seen = new Map<string, SignatureExperience>();
  for (const id of dest.pageIds) for (const s of signaturesForPage(id)) seen.set(s.id, s);
  return [...seen.values()];
}

/** The coach's lines. Curated, cycled in order — not generated. */
export const COACH_LINES = [
  "You're planning the scene instead of doing it.",
  "Stop showing me. Do something to them.",
  "Listen. Then answer. In that order.",
  "Feelings are a by-product. Play the action.",
  "One clear choice beats five clever ones.",
  "Take the note. Then actually do the note.",
  "Nobody cares how hard you're working. Show me what changed.",
] as const;

export function nextCoachLine(index: number): { line: string; next: number } {
  const i = ((index % COACH_LINES.length) + COACH_LINES.length) % COACH_LINES.length;
  return { line: COACH_LINES[i] ?? COACH_LINES[0], next: (i + 1) % COACH_LINES.length };
}
