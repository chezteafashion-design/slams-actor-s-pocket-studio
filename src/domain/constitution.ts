/**
 * SLAMS constitution — the immutable product architecture expressed as typed data.
 * Navigation, feature status, docs (docs/constitution/02, 03) and tests all read from here.
 * Change the product shape here first; never hand-edit generated docs.
 */

export const PRODUCT = {
  name: "SLAMS",
  tagline: "The Actor's Pocket Studio",
  parentStudio: "mrahmostudios",
  credit: "mrahmostudios presents",
} as const;

/* ---------------------------------------------------------------- Status */

export const FEATURE_STATUSES = ["planned", "in-development", "beta", "live", "blocked"] as const;
export type FeatureStatus = (typeof FEATURE_STATUSES)[number];

export const STATUS_LABELS: Record<FeatureStatus, string> = {
  planned: "Planned",
  "in-development": "In development",
  beta: "Beta",
  live: "Live",
  blocked: "Blocked",
};

/* ---------------------------------------------------------------- Worlds */

export const WORLDS = [
  {
    id: "conservatory",
    name: "The Conservatory",
    summary: "Eight structured acting schools with curriculum, exercises, assessment and advancement.",
  },
  {
    id: "actor-at-work",
    name: "Actor at Work",
    summary: "Auditions, character laboratory, scene breakdown, self-tape studio, scripts, journals and professional preparation.",
  },
  {
    id: "stuck-desk",
    name: "The Stuck Desk",
    summary: "Acting problems, practical interventions, exercises and retakes.",
  },
] as const;
export type WorldId = (typeof WORLDS)[number]["id"];

/* ------------------------------------------------------------ Navigation */

export const NAV_DESTINATIONS = [
  { id: "office", label: "OFFICE", path: "/" },
  { id: "schools", label: "SCHOOLS", path: "/schools" },
  { id: "rehearse", label: "REHEARSE", path: "/rehearse" },
  { id: "work", label: "WORK", path: "/work" },
  { id: "stuck", label: "STUCK DESK", path: "/stuck" },
] as const;
export type NavDestinationId = (typeof NAV_DESTINATIONS)[number]["id"];

/** The four principal actions on the Office. Each opens a permanent destination. */
export const OFFICE_ACTIONS = [
  { label: "TRAIN", destination: "schools" },
  { label: "REHEARSE", destination: "rehearse" },
  { label: "WORK", destination: "work" },
  { label: "GET UNSTUCK", destination: "stuck" },
] as const satisfies ReadonlyArray<{ label: string; destination: NavDestinationId }>;

/* --------------------------------------------------------------- Schools */

export const SCHOOLS = [
  { order: 1, slug: "stanislavski", name: "Stanislavski", focus: "Given circumstances, objectives, the system of physical actions." },
  { order: 2, slug: "meisner", name: "Meisner", focus: "Truthful behaviour through repetition, listening and response." },
  { order: 3, slug: "stella-adler", name: "Stella Adler", focus: "Imagination, script analysis, size and the actor's choices." },
  { order: 4, slug: "lee-strasberg", name: "Lee Strasberg", focus: "Relaxation, sense memory and personal truth — taught with emotional safety." },
  { order: 5, slug: "michael-chekhov", name: "Michael Chekhov", focus: "Psychological gesture, atmosphere, imaginary body." },
  { order: 6, slug: "laban-bartenieff", name: "Laban / Bartenieff", focus: "Effort, shape, space and body connectivity." },
  { order: 7, slug: "practical-aesthetics", name: "Practical Aesthetics", focus: "Script analysis into a playable action; do the action, not the feeling." },
  { order: 8, slug: "viewpoints-composition", name: "Viewpoints / Composition", focus: "Time and space awareness, ensemble, composition." },
] as const;
export type SchoolSlug = (typeof SCHOOLS)[number]["slug"];

/** Educational hierarchy, top to bottom. Each level belongs to exactly one parent. */
export const EDUCATIONAL_HIERARCHY = [
  "school",
  "year",
  "term",
  "course",
  "workshop",
  "lesson",
  "exercise",
  "practice-evidence",
  "assessment",
  "advancement",
] as const;

/* ------------------------------------------------- Systems and engines */

export const SUPPORTING_SYSTEMS = [
  { id: "baseline", name: "Actor's Baseline", summary: "Diagnostic onboarding that maps current skill and recommends a pathway." },
  { id: "performance-lab", name: "Performance Lab", summary: "Record, review, compare and improve takes." },
  { id: "technique-matrix", name: "Technique Matrix", summary: "Compare techniques and choose the one that fits a need." },
  { id: "rehearsal-lounge", name: "Rehearsal Lounge", summary: "Rehearse with a real partner or the Unpredictable Partner reader." },
  { id: "passport", name: "Actor's Passport / My Actor's Journey", summary: "Real progress, evidence, milestones and portfolio." },
  { id: "directors-chair", name: "The Director / Master's Chair", summary: "Notes, feedback and direction from coaches or clearly labelled AI." },
] as const;
export type SystemId = (typeof SUPPORTING_SYSTEMS)[number]["id"];

export const ENGINES = [
  { id: "living-scene", name: "Living Scene Engine", summary: "Runs interactive scenes: partner lines, injected notes, traps, timing, takes." },
  { id: "actor-development", name: "Actor Development Engine", summary: "Derives progress, eligibility and milestones from recorded events only." },
] as const;
export type EngineId = (typeof ENGINES)[number]["id"];

/* ------------------------------------------------ Signature experiences */

export interface SignatureExperience {
  id: string;
  name: string;
  purpose: string;
  /** How it actually works — the working feature it is attached to. */
  mechanism: string;
  homePage: string;
  alsoIn: string[];
  dependsOn: Array<SystemId | EngineId | "media-recording" | "ai-gateway">;
  phase: number;
  status: FeatureStatus;
}

export const SIGNATURE_EXPERIENCES: SignatureExperience[] = [
  {
    id: "living-scene",
    name: "Living Scene",
    purpose: "Rehearse a scene that responds and changes, rather than reading static text.",
    mechanism: "Living Scene Engine runs Explore → Perform → Intervene → Practice → Reflect → Save over a structured scene script with partner lines, beats and optional recording.",
    homePage: "live-session",
    alsoIn: ["rehearse", "scene-setup", "script"],
    dependsOn: ["living-scene"],
    phase: 5,
    status: "planned",
  },
  {
    id: "unpredictable-director",
    name: "Unpredictable Director",
    purpose: "Train the actor to absorb sudden direction without losing truth.",
    mechanism: "A seeded note injector interrupts the scene with adjustments drawn from a curated note bank; the actor must apply the note on the next beat. Optional AI notes are labelled as AI.",
    homePage: "live-session",
    alsoIn: ["scene-setup", "directors-chair"],
    dependsOn: ["living-scene", "directors-chair"],
    phase: 5,
    status: "planned",
  },
  {
    id: "listening-trap",
    name: "Listening Trap",
    purpose: "Expose pre-planned responses by changing what the partner says.",
    mechanism: "The engine silently alters a partner line (word, intent or order). The actor then marks what changed; the result is scored against the planted change.",
    homePage: "exercise",
    alsoIn: ["live-session", "scene-setup", "problem"],
    dependsOn: ["living-scene"],
    phase: 5,
    status: "planned",
  },
  {
    id: "bullshit-detector",
    name: "Bullsh*t Detector",
    purpose: "Separate doing from showing; catch indicated emotion and generalities.",
    mechanism: "A forced-choice truth rubric on each take (\"what were you doing to your partner?\", \"where did you show instead of do?\") cross-checked against the actor's stated tactic. Flags contradictions; never claims automated video judgement.",
    homePage: "take-review",
    alsoIn: ["assessment", "problem"],
    dependsOn: ["performance-lab", "media-recording"],
    phase: 4,
    status: "planned",
  },
  {
    id: "no-tears-required",
    name: "No Tears Required",
    purpose: "Remove the pressure to produce emotion; replace it with playable action.",
    mechanism: "Stuck Desk intervention for forced or blocked emotion: converts the emotional goal into an action verb, an obstacle and a physical task, then retakes.",
    homePage: "intervention",
    alsoIn: ["problem"],
    dependsOn: ["performance-lab"],
    phase: 6,
    status: "planned",
  },
  {
    id: "do-the-damn-note",
    name: "Do the Damn Note",
    purpose: "Build the professional skill of taking a note and visibly applying it.",
    mechanism: "A director note is attached to a take; the actor records a retake bound to that note and both takes are compared side by side; the note is closed only when the retake exists.",
    homePage: "take-review",
    alsoIn: ["performance-lab", "directors-chair"],
    dependsOn: ["performance-lab", "directors-chair", "media-recording"],
    phase: 4,
    status: "planned",
  },
  {
    id: "set-from-hell",
    name: "Set From Hell",
    purpose: "Rehearse under real-world pressure: cuts, interruptions, last-minute changes.",
    mechanism: "A pressure run for self-tapes and auditions: the engine injects time cuts, line changes and resets from a scenario bank while recording.",
    homePage: "self-tape",
    alsoIn: ["audition"],
    dependsOn: ["living-scene", "media-recording"],
    phase: 7,
    status: "planned",
  },
  {
    id: "sixty-second-rescue",
    name: "60-Second Rescue",
    purpose: "Fix one specific problem in one minute before a take or audition.",
    mechanism: "A timed 60-second intervention (before take → intervention → after take) chosen from the diagnosed problem; results saved as before/after evidence.",
    homePage: "intervention",
    alsoIn: ["stuck", "retake"],
    dependsOn: ["performance-lab"],
    phase: 6,
    status: "planned",
  },
  {
    id: "three-takes-three-tactics",
    name: "Three Takes Three Tactics",
    purpose: "Prove range by playing the same moment with three different actions.",
    mechanism: "Performance Lab guided set: the actor declares three action verbs, records one take per tactic, then reviews them side by side.",
    homePage: "performance-lab",
    alsoIn: ["take-review"],
    dependsOn: ["performance-lab", "media-recording"],
    phase: 4,
    status: "planned",
  },
  {
    id: "unpredictable-partner",
    name: "Unpredictable Partner",
    purpose: "Stop the actor rehearsing against a fixed reading.",
    mechanism: "The partner reader varies delivery, intent and timing of partner lines from variation sets (text cues; optional text-to-speech). Real partners can join via the Rehearsal Lounge.",
    homePage: "lounge",
    alsoIn: ["live-session", "scene-setup"],
    dependsOn: ["living-scene", "rehearsal-lounge"],
    phase: 5,
    status: "planned",
  },
];

/* --------------------------------------------------------------- Pages */

export const PAGE_FAMILIES = [
  "home",
  "training",
  "rehearsal",
  "professional",
  "troubleshooting",
  "development",
  "account",
] as const;
export type PageFamily = (typeof PAGE_FAMILIES)[number];

export const FAMILY_LABELS: Record<PageFamily, string> = {
  home: "Home",
  training: "Training",
  rehearsal: "Rehearsal",
  professional: "Professional",
  troubleshooting: "Troubleshooting",
  development: "Development",
  account: "Account",
};

export interface PageContract {
  number: number;
  id: string;
  name: string;
  family: PageFamily;
  path: string;
  /** Bottom-nav tab highlighted on this page. Development and Account pages sit under the Office. */
  tab: NavDestinationId;
  world: WorldId | null;
  purpose: string;
  actions: string[];
  data: string[];
  systems: SystemId[];
  engines: EngineId[];
  access: "public" | "member";
  phase: number;
  status: FeatureStatus;
  /** Reference to the supplied mockup board, when one exists. */
  mockup?: string;
}

type PageInput = Omit<PageContract, "number" | "systems" | "engines" | "status" | "world"> &
  Partial<Pick<PageContract, "systems" | "engines" | "status" | "world">>;

const pages: PageInput[] = [
  // ---------------- HOME
  { id: "office", name: "The Office", family: "home", path: "/", tab: "office", mockup: "01", status: "beta",
    purpose: "Central hub: current training, the four principal actions, supporting-system shortcuts and the next real step.",
    actions: ["Resume current lesson", "Train", "Rehearse", "Work", "Get unstuck", "Open a supporting system"],
    data: ["enrollments", "lesson_progress", "director_notes", "notifications"],
    systems: ["baseline", "performance-lab", "technique-matrix", "rehearsal-lounge", "passport", "directors-chair"],
    engines: ["actor-development"], access: "member", phase: 1 },
  { id: "welcome", name: "Welcome", family: "home", path: "/welcome", tab: "office",
    purpose: "First-run entry: 'mrahmostudios presents', the product promise, and sign in or create account.",
    actions: ["Create account", "Sign in", "Read about SLAMS"], data: [], access: "public", phase: 1, status: "beta" },
  { id: "notifications", name: "Notifications", family: "home", path: "/notifications", tab: "office",
    purpose: "Real events only: notes received, reviews completed, rehearsals the actor scheduled.",
    actions: ["Open related item", "Mark read", "Mark all read"], data: ["notifications"], access: "member", phase: 8 },

  // ---------------- TRAINING
  { id: "conservatory", name: "The Conservatory", family: "training", path: "/schools", tab: "schools", world: "conservatory", mockup: "04",
    purpose: "The eight schools with honest enrollment state and entry to each.",
    actions: ["Open school", "Compare in Technique Matrix", "View my enrollments"],
    data: ["content:schools", "enrollments"], systems: ["technique-matrix"], access: "public", phase: 2 },
  { id: "school", name: "School Detail", family: "training", path: "/schools/$schoolSlug", tab: "schools", world: "conservatory", mockup: "05",
    purpose: "School overview, curriculum (years and terms), practice library and assessments.",
    actions: ["Enroll", "Set as primary or support school", "Open term", "Open exercise"],
    data: ["content:schools", "content:years", "content:terms", "enrollments"], access: "public", phase: 2 },
  { id: "term", name: "Year & Term", family: "training", path: "/schools/$schoolSlug/terms/$termId", tab: "schools", world: "conservatory",
    purpose: "A term within its year: courses in sequence, completion computed from real attempts.",
    actions: ["Open course", "Resume next lesson"], data: ["content:terms", "content:courses", "lesson_progress"],
    engines: ["actor-development"], access: "member", phase: 2 },
  { id: "course", name: "Course", family: "training", path: "/schools/$schoolSlug/courses/$courseId", tab: "schools", world: "conservatory",
    purpose: "Course outcomes and its workshops.", actions: ["Open workshop"],
    data: ["content:courses", "content:workshops", "lesson_progress"], access: "member", phase: 2 },
  { id: "workshop", name: "Workshop", family: "training", path: "/schools/$schoolSlug/workshops/$workshopId", tab: "schools", world: "conservatory",
    purpose: "Ordered lessons and the practice evidence the workshop requires.",
    actions: ["Open lesson", "View required evidence"], data: ["content:workshops", "content:lessons", "practice_evidence"], access: "member", phase: 2 },
  { id: "lesson", name: "Lesson", family: "training", path: "/schools/$schoolSlug/lessons/$lessonId", tab: "schools", world: "conservatory", mockup: "06",
    purpose: "Learn (why, how, when, avoid), then exercise, practice and evidence.",
    actions: ["Start exercise", "Mark lesson studied", "Attach evidence"],
    data: ["content:lessons", "lesson_progress", "practice_evidence"], access: "member", phase: 2 },
  { id: "exercise", name: "Exercise Session", family: "training", path: "/schools/$schoolSlug/exercises/$exerciseId", tab: "schools", world: "conservatory",
    purpose: "Guided, timed exercise run producing an attempt and practice evidence (reflection, recording or partner note).",
    actions: ["Start", "Pause", "Record evidence", "Write reflection", "Finish attempt"],
    data: ["content:exercises", "exercise_attempts", "practice_evidence"], engines: ["living-scene", "actor-development"], access: "member", phase: 2 },
  { id: "assessment", name: "Assessment", family: "training", path: "/schools/$schoolSlug/assessments/$assessmentId", tab: "schools", world: "conservatory",
    purpose: "Rubric, selected evidence and self-assessment. Result stays pending until a defined reviewer (rule, coach or labelled AI) decides.",
    actions: ["Select evidence", "Self-assess", "Submit", "View result"],
    data: ["content:assessments", "assessment_submissions", "practice_evidence"], systems: ["directors-chair"], access: "member", phase: 2 },
  { id: "advancement", name: "Advancement & Graduation", family: "training", path: "/schools/$schoolSlug/advancement", tab: "schools", world: "conservatory",
    purpose: "Advancement rules and which are met, from real submissions. Advancement is granted only when the rules pass.",
    actions: ["Review requirements", "Claim advancement when eligible", "Add to Passport"],
    data: ["content:advancement_rules", "assessment_submissions", "advancements"], systems: ["passport"], engines: ["actor-development"], access: "member", phase: 2 },
  { id: "technique-matrix", name: "Technique Matrix", family: "training", path: "/technique-matrix", tab: "schools", world: "conservatory",
    purpose: "Compare schools across shared dimensions; find which technique addresses a need; choose a school.",
    actions: ["Compare schools", "Filter by need", "Open school"], data: ["content:schools", "content:technique_dimensions"],
    systems: ["technique-matrix"], access: "public", phase: 2 },

  // ---------------- REHEARSAL
  { id: "rehearse", name: "Living Scene", family: "rehearsal", path: "/rehearse", tab: "rehearse", mockup: "07",
    purpose: "Rehearse hub: scene library, recent sessions and rehearsal modes.",
    actions: ["Open scene", "Resume session", "Open Performance Lab", "Open Rehearsal Lounge"],
    data: ["content:scenes", "user_scenes", "scene_sessions"], engines: ["living-scene"], access: "member", phase: 5 },
  { id: "scene-setup", name: "Scene Setup", family: "rehearsal", path: "/rehearse/scenes/$sceneId", tab: "rehearse",
    purpose: "Scene info, role, given circumstances, director's note and setup (mode, partner variability, recording).",
    actions: ["Choose role", "Choose mode", "Adjust setup", "Start scene"],
    data: ["content:scenes", "user_scenes", "scene_sessions"], engines: ["living-scene"], access: "member", phase: 5 },
  { id: "live-session", name: "Live Scene Session", family: "rehearsal", path: "/rehearse/sessions/$sessionId", tab: "rehearse",
    purpose: "Run the scene: Explore, Perform, Intervene, Practice, Reflect, Save — with partner lines, injected notes and optional recording.",
    actions: ["Advance line", "Pause", "Mark what changed", "Record take", "Reflect", "Save session"],
    data: ["scene_sessions", "session_events", "takes"], systems: ["directors-chair"], engines: ["living-scene"], access: "member", phase: 5 },
  { id: "performance-lab", name: "Performance Lab", family: "rehearsal", path: "/rehearse/lab", tab: "rehearse",
    purpose: "All takes; record a new take; Three Takes Three Tactics sets; comparisons.",
    actions: ["Record take", "Start three-tactic set", "Compare takes", "Open take"],
    data: ["takes", "take_sets"], systems: ["performance-lab"], access: "member", phase: 4 },
  { id: "take-review", name: "Take Review", family: "rehearsal", path: "/rehearse/lab/takes/$takeId", tab: "rehearse",
    purpose: "Play a take, run the truth rubric, compare with another take, request a coach review, retake against a note.",
    actions: ["Play", "Run truth rubric", "Compare", "Retake against note", "Request review", "Save as evidence"],
    data: ["takes", "take_reviews", "director_notes", "practice_evidence"], systems: ["performance-lab", "directors-chair"], access: "member", phase: 4 },
  { id: "lounge", name: "Rehearsal Lounge", family: "rehearsal", path: "/rehearse/lounge", tab: "rehearse",
    purpose: "Rehearse with a real partner by invite link, or with the Unpredictable Partner reader; schedule sessions.",
    actions: ["Invite partner", "Rehearse with reader", "Schedule session"],
    data: ["rehearsal_rooms", "rehearsal_invites", "scene_sessions"], systems: ["rehearsal-lounge"], engines: ["living-scene"], access: "member", phase: 5 },

  // ---------------- PROFESSIONAL
  { id: "work", name: "Actor at Work", family: "professional", path: "/work", tab: "work", world: "actor-at-work", mockup: "08",
    purpose: "Professional hub: auditions, characters, breakdowns, self-tapes, scripts, projects.",
    actions: ["Open auditions", "Open character lab", "Open scene breakdown", "Open self-tape studio", "Open scripts", "Open projects"],
    data: ["auditions", "characters", "scripts", "projects"], access: "member", phase: 7 },
  { id: "auditions", name: "Auditions", family: "professional", path: "/work/auditions", tab: "work", world: "actor-at-work",
    purpose: "Audition tracker with dates, status and prep progress.", actions: ["Add audition", "Open audition", "Update status"],
    data: ["auditions"], access: "member", phase: 7 },
  { id: "audition", name: "Audition Prep", family: "professional", path: "/work/auditions/$auditionId", tab: "work", world: "actor-at-work",
    purpose: "Prep checklist: sides, breakdown, character, self-tape and a pressure run.",
    actions: ["Attach sides", "Open breakdown", "Open character", "Start pressure run", "Record self-tape"],
    data: ["auditions", "scripts", "scene_breakdowns", "characters", "takes"], engines: ["living-scene"], access: "member", phase: 7 },
  { id: "character-lab", name: "Character Laboratory", family: "professional", path: "/work/characters", tab: "work", world: "actor-at-work",
    purpose: "Build a character: given circumstances, objectives, super-objective, physicality, imagination and relationships.",
    actions: ["New character", "Edit layer", "Link to project", "Rehearse as character"],
    data: ["characters", "projects"], systems: ["technique-matrix"], access: "member", phase: 7 },
  { id: "breakdown", name: "Scene Breakdown", family: "professional", path: "/work/breakdowns/$breakdownId", tab: "work", world: "actor-at-work",
    purpose: "Beat-by-beat analysis: objective, action, obstacle, what changed, subtext.",
    actions: ["Add beat", "Set objective and action", "Send to Living Scene"],
    data: ["scene_breakdowns", "scripts"], engines: ["living-scene"], access: "member", phase: 7 },
  { id: "self-tape", name: "Self-Tape Studio", family: "professional", path: "/work/self-tape", tab: "work", world: "actor-at-work",
    purpose: "Framing guide, slate, multiple takes, select and download.",
    actions: ["Check framing", "Record slate", "Record take", "Start Set From Hell run", "Select take", "Download"],
    data: ["takes", "auditions"], systems: ["performance-lab"], engines: ["living-scene"], access: "member", phase: 7 },
  { id: "scripts", name: "Scripts Library", family: "professional", path: "/work/scripts", tab: "work", world: "actor-at-work",
    purpose: "Upload or paste scripts and sides; organise by project.", actions: ["Upload script", "Paste text", "Open script"],
    data: ["scripts", "projects"], access: "member", phase: 7 },
  { id: "script", name: "Script Workspace", family: "professional", path: "/work/scripts/$scriptId", tab: "work", world: "actor-at-work",
    purpose: "Read and mark a script (beats, objectives, tactics, subtext); send to breakdown or Living Scene.",
    actions: ["Mark text", "Create breakdown", "Rehearse in Living Scene"],
    data: ["scripts", "script_marks", "scene_breakdowns"], engines: ["living-scene"], access: "member", phase: 7 },
  { id: "projects", name: "Projects & Journals", family: "professional", path: "/work/projects", tab: "work", world: "actor-at-work",
    purpose: "Productions, classes and personal projects with linked journal entries.",
    actions: ["New project", "Write journal entry", "Link script or character"], data: ["projects", "journal_entries"], access: "member", phase: 7 },

  // ---------------- TROUBLESHOOTING
  { id: "stuck", name: "The Stuck Desk", family: "troubleshooting", path: "/stuck", tab: "stuck", world: "stuck-desk", mockup: "09",
    purpose: "Common acting problems and entry to diagnosis.", actions: ["Diagnose my problem", "Choose a common issue", "Start 60-Second Rescue"],
    data: ["content:problems", "stuck_reports"], access: "member", phase: 6 },
  { id: "diagnose", name: "Diagnose My Problem", family: "troubleshooting", path: "/stuck/diagnose", tab: "stuck", world: "stuck-desk",
    purpose: "Short questionnaire mapped by explicit rules to a problem and interventions.", actions: ["Answer question", "Back", "See diagnosis"],
    data: ["content:problems", "stuck_reports"], access: "member", phase: 6 },
  { id: "problem", name: "Problem Detail", family: "troubleshooting", path: "/stuck/problems/$problemSlug", tab: "stuck", world: "stuck-desk",
    purpose: "What the problem is, likely causes, ranked interventions and related lessons.",
    actions: ["Start intervention", "Open related lesson"], data: ["content:problems", "content:interventions"], access: "member", phase: 6 },
  { id: "intervention", name: "Intervention Session", family: "troubleshooting", path: "/stuck/rescue/$interventionId", tab: "stuck", world: "stuck-desk",
    purpose: "Timed intervention: before take, intervention, after take.",
    actions: ["Record before take", "Run intervention", "Record after take"],
    data: ["interventions", "takes"], systems: ["performance-lab"], access: "member", phase: 6 },
  { id: "retake", name: "Retake Result", family: "troubleshooting", path: "/stuck/rescue/$interventionId/result", tab: "stuck", world: "stuck-desk",
    purpose: "Before and after compared, self-rating, save as evidence, next step.",
    actions: ["Compare takes", "Rate change", "Save as evidence", "Try another intervention"],
    data: ["interventions", "takes", "practice_evidence"], engines: ["actor-development"], access: "member", phase: 6 },

  // ---------------- DEVELOPMENT
  { id: "baseline", name: "Actor's Baseline", family: "development", path: "/baseline", tab: "office", mockup: "02",
    purpose: "Diagnostic onboarding overview: four parts with honest time estimates.", actions: ["Start assessment", "Resume part"],
    data: ["baseline_assessments"], systems: ["baseline"], access: "member", phase: 3 },
  { id: "baseline-task", name: "Baseline Task", family: "development", path: "/baseline/$taskId", tab: "office",
    purpose: "One part of the baseline: experience and goals, practical tasks, strengths, pathway preferences.",
    actions: ["Answer", "Record task", "Save and continue"], data: ["baseline_responses", "takes"], systems: ["baseline"], access: "member", phase: 3 },
  { id: "baseline-results", name: "Baseline Results", family: "development", path: "/baseline/results", tab: "office", mockup: "03",
    purpose: "Dimension profile computed from the actor's own answers and ratings; recommended pathway with its reasons.",
    actions: ["Accept pathway", "Adjust pathway", "Begin training"],
    data: ["baseline_results", "enrollments"], systems: ["baseline"], engines: ["actor-development"], access: "member", phase: 3 },
  { id: "journey", name: "My Actor's Journey", family: "development", path: "/journey", tab: "office", mockup: "10",
    purpose: "Passport: real progress across schools, assessments, takes, notes and milestones.",
    actions: ["Open evidence", "Open milestones", "Open portfolio"],
    data: ["enrollments", "advancements", "takes", "director_notes", "milestones"], systems: ["passport"], engines: ["actor-development"], access: "member", phase: 3 },
  { id: "evidence", name: "Evidence Locker", family: "development", path: "/journey/evidence", tab: "office",
    purpose: "Every piece of practice evidence with its source exercise, take or intervention.",
    actions: ["Filter", "Open evidence", "Delete evidence"], data: ["practice_evidence"], systems: ["passport"], access: "member", phase: 3 },
  { id: "milestones", name: "Milestones", family: "development", path: "/journey/milestones", tab: "office",
    purpose: "Milestones earned by rule from real events, with the evidence that earned them.",
    actions: ["Open milestone", "View requirements"], data: ["milestones"], systems: ["passport"], engines: ["actor-development"], access: "member", phase: 3 },
  { id: "portfolio", name: "Portfolio", family: "development", path: "/journey/portfolio", tab: "office",
    purpose: "Headshots, selected scenes and resume; shareable only when the actor chooses.",
    actions: ["Upload headshot", "Add scene", "Edit resume", "Share link"], data: ["portfolio_items", "takes"], systems: ["passport"], access: "member", phase: 7 },
  { id: "directors-chair", name: "The Director's Chair", family: "development", path: "/directors-chair", tab: "office",
    purpose: "Notes received, feedback requests and Master's Chair sessions with coaches or labelled AI.",
    actions: ["Open note", "Request feedback", "Mark note applied"], data: ["director_notes", "review_requests"],
    systems: ["directors-chair"], access: "member", phase: 8 },

  // ---------------- ACCOUNT
  { id: "auth", name: "Sign In / Create Account", family: "account", path: "/auth", tab: "office",
    purpose: "Email sign-in and account creation. Google sign-in follows once it is switched on for the backend.", actions: ["Sign in", "Create account", "Forgot password"],
    data: ["auth.users", "profiles"], access: "public", phase: 1, status: "beta" },
  { id: "reset-password", name: "Reset Password", family: "account", path: "/reset-password", tab: "office",
    purpose: "Set a new password from the emailed link.", actions: ["Set new password"], data: ["auth.users"], access: "public", phase: 1, status: "beta" },
  { id: "account", name: "Profile", family: "account", path: "/account", tab: "office",
    purpose: "Name, experience level and goals. Photo arrives with the Portfolio.", actions: ["Edit profile", "Sign out"], data: ["profiles"], access: "member", phase: 1, status: "beta" },
  { id: "settings", name: "Settings", family: "account", path: "/account/settings", tab: "office",
    purpose: "Coach language intensity, reduced motion, captions and recording defaults.",
    actions: ["Toggle setting", "Save"], data: ["user_settings"], access: "member", phase: 1, status: "beta" },
  { id: "privacy", name: "Privacy & Data", family: "account", path: "/account/privacy", tab: "office",
    purpose: "Export data, delete recordings, manage sharing, delete account.",
    actions: ["Export data", "Delete recordings", "Revoke share", "Delete account"], data: ["takes", "review_shares", "profiles"], access: "member", phase: 1, status: "beta" },
  { id: "about", name: "About & Feature Status", family: "account", path: "/about", tab: "office",
    purpose: "mrahmostudios credit, live status of every feature, technique non-affiliation notice.",
    actions: ["Read status", "Contact"], data: ["registry:features"], access: "public", phase: 1, status: "beta" },
];

export const PAGES: PageContract[] = pages.map((p, i) => ({
  systems: [],
  engines: [],
  status: "planned",
  world: null,
  ...p,
  number: i + 1,
}));

export function getPage(id: string): PageContract | undefined {
  return PAGES.find((p) => p.id === id);
}

export function pagesByFamily(family: PageFamily): PageContract[] {
  return PAGES.filter((p) => p.family === family);
}

export function signaturesForPage(pageId: string): SignatureExperience[] {
  return SIGNATURE_EXPERIENCES.filter((s) => s.homePage === pageId || s.alsoIn.includes(pageId));
}

/* ------------------------------------------------------------- Roadmap */

export type PhaseStatus = "complete" | "in-progress" | "planned";

export const ROADMAP_PHASES: ReadonlyArray<{ phase: number; name: string; status: PhaseStatus; goal: string }> = [
  { phase: 0, name: "Constitution", status: "complete", goal: "Architecture, registry, coverage matrix, plan. No product features." },
  { phase: 1, name: "Foundation", status: "in-progress", goal: "Design system, app shell and five-tab navigation, Lovable Cloud, auth, profiles, settings, privacy, feature-status framework." },
  { phase: 2, name: "Conservatory vertical slice", status: "planned", goal: "Curriculum-as-code model, all eight school shells, one complete term end to end through assessment and advancement." },
  { phase: 3, name: "Baseline & Development Engine", status: "planned", goal: "Actor's Baseline, results and pathway, Passport, evidence and rule-earned milestones." },
  { phase: 4, name: "Performance Lab & media", status: "planned", goal: "Recording, private storage, takes, Take Review, Three Takes Three Tactics, Do the Damn Note, Bullsh*t Detector." },
  { phase: 5, name: "Living Scene Engine", status: "planned", goal: "Scene model, Live Session, Unpredictable Director, Unpredictable Partner, Listening Trap, Rehearsal Lounge." },
  { phase: 6, name: "Stuck Desk", status: "planned", goal: "Problem library, diagnosis rules, interventions, 60-Second Rescue, No Tears Required, retake results." },
  { phase: 7, name: "Actor at Work", status: "planned", goal: "Auditions, character lab, breakdowns, scripts, self-tape with Set From Hell, projects, journals, portfolio." },
  { phase: 8, name: "Director's Chair & notifications", status: "planned", goal: "Coach and labelled-AI feedback, review requests, notifications." },
  { phase: 9, name: "Curriculum completion", status: "planned", goal: "Full authored content for all eight schools, reviewed by a qualified practitioner." },
  { phase: 10, name: "Release hardening", status: "planned", goal: "Accessibility audit, performance, offline tolerance, PWA, native packaging readiness." },
];

export function getPhase(phase: number) {
  return ROADMAP_PHASES.find((r) => r.phase === phase);
}
