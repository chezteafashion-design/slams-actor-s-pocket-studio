import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { deleteAccountSchema } from "@/domain/account";
import { gatherTrainingData } from "./export-data";

/** Everything SLAMS stores about the caller, as one JSON document. */
export const exportMyData = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId, claims } = context;
    const [profile, settings, roles, training] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("user_settings").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("user_roles").select("role, created_at").eq("user_id", userId),
      gatherTrainingData(supabase, userId),
    ]);
    const failed = [profile.error, settings.error, roles.error].find(Boolean);
    if (failed) throw new Error("Could not gather your data. Try again.");
    return {
      exported_at: new Date().toISOString(),
      product: "SLAMS — The Actor's Pocket Studio",
      account: { id: userId, email: typeof claims.email === "string" ? claims.email : null },
      profile: profile.data,
      settings: settings.data,
      roles: roles.data ?? [],
      training,
      recordings: training["practice_evidence"]?.filter((row) => "kind" in row && row.kind === "recording") ?? [],
      shares: [],
    };
  });

/** Permanently deletes the caller's account; profile, settings and roles go with it. */
export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => deleteAccountSchema.parse(input))
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(context.userId);
    if (error) throw new Error("Could not delete your account. Try again.");
    return { deleted: true };
  });
