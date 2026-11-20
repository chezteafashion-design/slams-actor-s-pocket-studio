import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { EXPORT_PAGE_SIZE, TRAINING_EXPORT_TABLES } from "@/domain/account-export";

/** Uses the caller's RLS client; never an admin client. */
export async function gatherTrainingData(supabase: SupabaseClient<Database>, userId: string) {
  const entries = await Promise.all(TRAINING_EXPORT_TABLES.map(async ({ table, order }) => {
    const rows: Database["public"]["Tables"][typeof table]["Row"][] = [];
    for (let offset = 0; ; offset += EXPORT_PAGE_SIZE) {
      let query = supabase.from(table).select("*").eq("user_id", userId);
      for (const column of order) query = query.order(column, { ascending: true });
      const { data, error } = await query.range(offset, offset + EXPORT_PAGE_SIZE - 1);
      if (error) throw new Error("Could not gather your training data. Try again.");
      const page = data ?? [];
      rows.push(...page);
      if (page.length < EXPORT_PAGE_SIZE) break;
    }
    return [table, rows] as const;
  }));
  return Object.fromEntries(entries);
}