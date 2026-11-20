import type { SchoolCurriculum } from "@/domain/curriculum";

/**
 * Original draft content for the first SLAMS Conservatory term.
 * IDs are permanent references; the content remains in development until reviewed.
 */
export const stanislavskiYearOneTermOne: SchoolCurriculum = {
  schoolSlug: "stanislavski",
  years: [
    {
      id: "stanislavski.y1",
      number: 1,
      title: "Year One — Foundations",
      terms: [
        {
          id: "stanislavski.y1.t1",
          number: 1,
          title: "Term One — Attention, Circumstances & Action",
          courses: [
            {
              id: "stanislavski.y1.t1.c1",
              title: "Working from the Given Moment",
              outcomes: [
                "Separate observable facts from assumptions about a scene.",
                "Use given circumstances to make a specific, playable choice.",
                "Keep attention on a task or partner instead of indicating a result.",
              ],
              workshops: [
                {
                  id: "stanislavski.y1.t1.c1.w1",
                  title: "Facts before invention",
                  requiredEvidence: [
                    {
                      id: "stanislavski.y1.t1.c1.w1.evidence.reflection",
                      description:
                        "A short written reflection distinguishing observed facts from assumptions.",
                      acceptedKinds: ["reflection"],
                    },
                  ],
                  lessons: [
                    {
                      id: "stanislavski.y1.t1.c1.w1.l1",
                      title: "Notice what is actually there",
                      why: "Specific attention gives an actor something concrete to respond to. It can interrupt a general or pre-planned performance.",
                      how: "Choose a simple, safe object or task in the room. Notice observable details before deciding what they mean. Let one detail change what you do next.",
                      when: "Use this as a warm-up when attention is scattered, or when you catch yourself planning a reaction before the moment arrives.",
                      avoid:
                        "Do not invent a story about the object, force an emotion, or treat the exercise as a test of perception.",
                      exercises: [
                        {
                          id: "stanislavski.y1.t1.c1.w1.l1.e1",
                          title: "Three facts, one response",
                          kind: "guided-practice",
                          durationSec: 180,
                          steps: [
                            "Choose an ordinary object and silently name three details you can verify.",
                            "Name one assumption you made, then set it aside.",
                            "Handle or examine the object for one minute, responding only to details you actually notice.",
                            "Write one sentence about what changed when you stayed with the facts.",
                          ],
                          evidenceKinds: ["reflection"],
                        },
                      ],
                    },
                    {
                      id: "stanislavski.y1.t1.c1.w1.l2",
                      title: "Given circumstances are playable facts",
                      why: "Time, place, relationships, and immediate events create the conditions in which an action makes sense.",
                      how: "For a short text or everyday task, list only what is established. Mark questions separately. Choose one unanswered question and make a practical, reversible choice for rehearsal.",
                      when: "Use this before a first read or when a scene feels vague and you need a concrete point of entry.",
                      avoid:
                        "Do not confuse a useful rehearsal choice with a fact from the text. Keep the difference visible.",
                      exercises: [
                        {
                          id: "stanislavski.y1.t1.c1.w1.l2.e1",
                          title: "Facts, questions, choices",
                          kind: "analysis",
                          durationSec: 240,
                          steps: [
                            "Choose a short public-domain passage or a familiar everyday task.",
                            "Write three established facts about time, place, or relationship.",
                            "Write two questions the material leaves open.",
                            "Choose one practical answer to test, and label it as your rehearsal choice.",
                          ],
                          evidenceKinds: ["reflection"],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "stanislavski.y1.t1.c1.w2",
                  title: "Attention and contact",
                  requiredEvidence: [
                    {
                      id: "stanislavski.y1.t1.c1.w2.evidence.reflection",
                      description:
                        "A reflection describing a moment of renewed attention and the observable change it produced.",
                      acceptedKinds: ["reflection"],
                    },
                  ],
                  lessons: [
                    {
                      id: "stanislavski.y1.t1.c1.w2.l1",
                      title: "Attend to the partner, not the effect",
                      why: "A scene stays alive when attention is available to the other person and the changing circumstances.",
                      how: "In a low-stakes partner exchange, listen for the literal information first. Before replying, identify one new fact in what you heard and let it shape your response.",
                      when: "Use this when you know your lines but stop receiving the other person, or when a response feels pre-set.",
                      avoid:
                        "Do not stare, wait artificially, or try to manufacture surprise. The task is to receive information, not display listening.",
                      exercises: [
                        {
                          id: "stanislavski.y1.t1.c1.w2.l1.e1",
                          title: "Listen for the new fact",
                          kind: "guided-practice",
                          durationSec: 300,
                          steps: [
                            "Ask a partner to describe an ordinary, recent activity for one minute.",
                            "Listen for one detail you did not know; do not interrupt or prepare a story.",
                            "Ask one simple follow-up based on that detail.",
                            "Switch roles, then write what you heard that changed your next question.",
                          ],
                          evidenceKinds: ["reflection", "partner-note"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: "stanislavski.y1.t1.c2",
              title: "Objectives, Actions & Obstacles",
              outcomes: [
                "Describe an objective as something one person wants from another in a particular moment.",
                "Choose a playable action verb rather than an emotion to perform.",
                "Adjust an action when a real obstacle or new response appears.",
              ],
              workshops: [
                {
                  id: "stanislavski.y1.t1.c2.w1",
                  title: "A playable objective",
                  requiredEvidence: [
                    {
                      id: "stanislavski.y1.t1.c2.w1.evidence.reflection",
                      description:
                        "A reflection naming an objective, action verb, and the response that changed the actor's approach.",
                      acceptedKinds: ["reflection"],
                    },
                  ],
                  lessons: [
                    {
                      id: "stanislavski.y1.t1.c2.w1.l1",
                      title: "Want something specific",
                      why: "A playable objective gives the actor a task in the scene instead of a result to indicate.",
                      how: "Complete the sentence: ‘I want you to…’ Keep the answer concrete, directed toward another person, and possible to pursue now.",
                      when: "Use this when a scene is being played as a mood, or when the objective is too broad to affect the next line.",
                      avoid:
                        "Avoid objectives that name an emotion, a life-long outcome, or something the other person cannot respond to in the scene.",
                      exercises: [
                        {
                          id: "stanislavski.y1.t1.c2.w1.l1.e1",
                          title: "Make the want playable",
                          kind: "analysis",
                          durationSec: 240,
                          steps: [
                            "Choose a short exchange from a public-domain text or an invented everyday situation.",
                            "Write one objective beginning ‘I want you to…’",
                            "Check that the objective can be pursued in this moment and can meet resistance.",
                            "Rewrite it if it names only a feeling or a distant result.",
                          ],
                          evidenceKinds: ["reflection"],
                        },
                      ],
                    },
                    {
                      id: "stanislavski.y1.t1.c2.w1.l2",
                      title: "Choose an action, not a feeling",
                      why: "A verb gives attention a job. Emotional responses may arise, but they are not a task the actor can directly command.",
                      how: "Try distinct verbs toward the same objective—such as to reassure, challenge, invite, or expose. Notice what each verb asks you to do to your partner.",
                      when: "Use this when a line sounds the same each time or when you are trying to produce a particular feeling.",
                      avoid:
                        "Do not turn the verb into a demonstrative gesture or announce the tactic. Keep the action directed and responsive.",
                      exercises: [
                        {
                          id: "stanislavski.y1.t1.c2.w1.l2.e1",
                          title: "One line, three actions",
                          kind: "repetition",
                          durationSec: 360,
                          steps: [
                            "Choose one short, non-distressing line and one partner or imagined listener.",
                            "Play it with the action ‘to reassure’; pause and reset.",
                            "Play the same line with ‘to challenge’, then with ‘to invite’.",
                            "Write what each action changed in your focus and behavior; do not score which feeling was strongest.",
                          ],
                          evidenceKinds: ["reflection"],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "stanislavski.y1.t1.c2.w2",
                  title: "Obstacle and adjustment",
                  requiredEvidence: [
                    {
                      id: "stanislavski.y1.t1.c2.w2.evidence.reflection",
                      description:
                        "A reflection on an obstacle, an attempted action, and one adjustment made in response.",
                      acceptedKinds: ["reflection"],
                    },
                  ],
                  lessons: [
                    {
                      id: "stanislavski.y1.t1.c2.w2.l1",
                      title: "Let resistance change the tactic",
                      why: "An obstacle makes the pursuit active. A changed response from a partner can call for a changed action without changing the objective.",
                      how: "Keep the objective steady. When a partner's answer blocks the first tactic, try a different action verb that still pursues the same want.",
                      when: "Use this in rehearsal when a tactic has stopped working or the scene has become a fixed sequence of lines.",
                      avoid:
                        "Do not manufacture conflict, pressure a partner, or confuse louder behavior with a stronger action.",
                      exercises: [
                        {
                          id: "stanislavski.y1.t1.c2.w2.l1.e1",
                          title: "Same want, changed tactic",
                          kind: "guided-practice",
                          durationSec: 420,
                          steps: [
                            "Work with a partner using a simple, agreed low-stakes request.",
                            "Name a clear objective privately and begin with one action verb.",
                            "If the partner gives a genuine reason to resist, pause and choose a different verb toward the same objective.",
                            "After two rounds, record the obstacle, first tactic, adjustment, and what the partner actually did.",
                          ],
                          evidenceKinds: ["reflection", "partner-note"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  assessments: [
    {
      id: "stanislavski.y1.t1.assessment",
      scope: "term",
      rubric: [
        {
          id: "stanislavski.y1.t1.rubric.facts",
          prompt: "Can the actor distinguish established facts from rehearsal choices?",
        },
        {
          id: "stanislavski.y1.t1.rubric.objective",
          prompt: "Is the objective specific, playable, and directed toward another person?",
        },
        {
          id: "stanislavski.y1.t1.rubric.action",
          prompt: "Does the actor use an action verb rather than attempt to perform an emotion?",
        },
        {
          id: "stanislavski.y1.t1.rubric.adjustment",
          prompt:
            "Can the actor describe an adjustment made in response to an obstacle or new information?",
        },
      ],
      evidenceRequirementIds: [
        "stanislavski.y1.t1.c1.w1.evidence.reflection",
        "stanislavski.y1.t1.c1.w2.evidence.reflection",
        "stanislavski.y1.t1.c2.w1.evidence.reflection",
        "stanislavski.y1.t1.c2.w2.evidence.reflection",
      ],
      reviewer: "coach",
    },
  ],
  advancementRules: [
    {
      id: "stanislavski.y1.advancement.to-y2",
      fromLevel: "stanislavski.y1",
      toLevel: "stanislavski.y2",
      assessmentIds: ["stanislavski.y1.t1.assessment"],
    },
  ],
};

export function getCurriculumForSchool(schoolSlug: string): SchoolCurriculum | undefined {
  return schoolSlug === stanislavskiYearOneTermOne.schoolSlug
    ? stanislavskiYearOneTermOne
    : undefined;
}
