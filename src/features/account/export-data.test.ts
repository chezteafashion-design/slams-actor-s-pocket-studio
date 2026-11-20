import { describe, expect, it } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { gatherTrainingData } from "./export-data";

function fakeClient(fail = false) {
  const scopes: { table: string; column: string; value: string }[] = [];
  const ranges: { table: string; start: number; end: number }[] = [];
  const client = {
    from(table: string) {
      const query = {
        select() { return query; },
        eq(column: string, value: string) { scopes.push({ table, column, value }); return query; },
        order() { return query; },
        async range(start: number, end: number) {
          ranges.push({ table, start, end });
          if (fail && table === "assessment_reviews") return { data: null, error: { message: "denied" } };
          const count = table === "exercise_attempts" ? Math.max(0, Math.min(500, 1001 - start)) : 1;
          return { data: Array.from({ length: count }, (_, i) => ({ id: `${table}-${start + i}`, user_id: "actor-one" })), error: null };
        },
      };
      return query;
    },
  } as unknown as SupabaseClient<Database>;
  return { client, scopes, ranges };
}

describe("training data export", () => {
  it("includes all ten new owner tables and scopes every read to the caller", async () => {
    const { client, scopes } = fakeClient();
    const data = await gatherTrainingData(client, "actor-one");
    expect(Object.keys(data).sort()).toEqual([
      "advancement_assessment_reviews", "advancements", "assessment_reviews", "assessment_submission_evidence",
      "assessment_submissions", "enrollments", "exercise_attempt_evidence", "exercise_attempts", "lesson_progress", "practice_evidence",
    ]);
    expect(scopes.length).toBeGreaterThanOrEqual(10);
    expect(scopes.every(({ column, value }) => column === "user_id" && value === "actor-one")).toBe(true);
  });

  it("exports more than Supabase's 1000-row default without truncation", async () => {
    const { client, ranges } = fakeClient();
    const data = await gatherTrainingData(client, "actor-one");
    expect(data["exercise_attempts"]).toHaveLength(1001);
    expect(ranges.filter(({ table }) => table === "exercise_attempts").map(({ start, end }) => [start, end])).toEqual([[0, 499], [500, 999], [1000, 1499]]);
  });

  it("refuses a partial export if any training table cannot be read", async () => {
    const { client } = fakeClient(true);
    await expect(gatherTrainingData(client, "actor-one")).rejects.toThrow("Could not gather your training data");
  });
});