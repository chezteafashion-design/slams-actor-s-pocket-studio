import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { summarizeHistory } from "@/domain/practice-plan";
import { PLANNING_CATALOG, loadTrainingHistory } from "./catalog";

/** The actor's own record, summarised the same way the Director reads it. */
export const trainingSummaryQuery = (userId: string) =>
  queryOptions({
    queryKey: ["training-summary", userId],
    queryFn: async () => summarizeHistory(await loadTrainingHistory(supabase, userId), PLANNING_CATALOG),
  });
