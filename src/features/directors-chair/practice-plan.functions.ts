import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  buildPlanInstructions,
  buildPlanPrompt,
  normalizePlan,
  planRequestSchema,
  summarizeHistory,
  type PlanFailureCode,
  type PracticePlan,
} from "@/domain/practice-plan";
import { PLANNING_CATALOG, loadTrainingHistory } from "./catalog";

export type PracticePlanResult =
  | { ok: true; plan: PracticePlan; basedOnEmptyRecord: boolean; hadGoals: boolean; generatedAt: string }
  | { ok: false; code: PlanFailureCode; message: string };

/** Reads the caller's own record and goals, asks Lovable AI for a plan, and checks it before returning. */
export const requestPracticePlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => planRequestSchema.parse(input ?? {}))
  .handler(async ({ data, context }): Promise<PracticePlanResult> => {
    const { supabase, userId } = context;
    let history;
    const [profile, settings] = await Promise.all([
      supabase.from("profiles").select("goals, experience_level").eq("id", userId).maybeSingle(),
      supabase.from("user_settings").select("language_intensity").eq("user_id", userId).maybeSingle(),
    ]);
    try {
      history = await loadTrainingHistory(supabase, userId);
    } catch {
      return { ok: false, code: "record", message: "Couldn't read your training record. Try again." };
    }
    if (profile.error || settings.error) return { ok: false, code: "record", message: "Couldn't read your profile. Try again." };

    const summary = summarizeHistory(history, PLANNING_CATALOG);
    const goals = profile.data?.goals ?? "";
    const intensity = settings.data?.language_intensity ?? "full";
    const { writePracticePlan } = await import("./plan-ai.server");
    const ai = await writePracticePlan({
      instructions: buildPlanInstructions(intensity),
      prompt: buildPlanPrompt({
        summary,
        goals,
        experienceLevel: profile.data?.experience_level ?? null,
        focus: data.focus,
        intensity,
        catalog: PLANNING_CATALOG,
      }),
      signal: getRequest().signal,
    });
    if (!ai.ok) return ai;
    const plan = normalizePlan(ai.raw, PLANNING_CATALOG);
    if (!plan) return { ok: false, code: "no-plan", message: "The Director's answer didn't pass our checks, so it isn't shown. Try again." };
    return { ok: true, plan, basedOnEmptyRecord: summary.isEmpty, hadGoals: goals.trim().length > 0, generatedAt: new Date().toISOString() };
  });
