/** Server-only: the Lovable AI Gateway call that writes a practice plan. */
import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, NoObjectGeneratedError, Output, RetryError, jsonSchema, streamText } from "ai";
import { PLAN_JSON_SCHEMA, type PlanFailureCode } from "@/domain/practice-plan";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export type PlanAiResult = { ok: true; raw: unknown } | { ok: false; code: Exclude<PlanFailureCode, "record">; message: string };

/** Resends the gateway-issued run id on follow-up requests within this one call. Never minted here. */
function createRunIdFetch() {
  let runId: string | undefined;
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (runId && !headers.has(RUN_ID_HEADER)) headers.set(RUN_ID_HEADER, runId);
    const response = await fetch(input, { ...init, headers });
    runId ??= response.headers.get(RUN_ID_HEADER)?.trim() || undefined;
    return response;
  };
}

function statusOf(error: unknown): number | undefined {
  if (APICallError.isInstance(error)) return error.statusCode;
  if (RetryError.isInstance(error)) return statusOf(error.lastError);
  if (error && typeof error === "object" && "cause" in error) return statusOf((error as { cause: unknown }).cause);
  return undefined;
}

function safeMessage(error: unknown): string | undefined {
  const source = RetryError.isInstance(error) ? error.lastError : error;
  if (!APICallError.isInstance(source) || !source.responseBody) return undefined;
  try {
    const body = JSON.parse(source.responseBody) as { message?: unknown; error?: { message?: unknown } };
    const m = body.message ?? body.error?.message;
    return typeof m === "string" ? m.slice(0, 300) : undefined;
  } catch {
    return undefined;
  }
}

export async function writePracticePlan(args: { instructions: string; prompt: string; signal?: AbortSignal }): Promise<PlanAiResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return { ok: false, code: "config", message: "The Director's AI isn't set up for this studio yet." };

  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: createRunIdFetch(),
  });

  try {
    const result = streamText({
      model: provider.responses(MODEL),
      instructions: args.instructions,
      messages: [{ role: "user", content: args.prompt }],
      output: Output.object({ schema: jsonSchema(PLAN_JSON_SCHEMA as never), name: "practice_plan" }),
      maxRetries: 0,
      abortSignal: args.signal,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "medium",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
      onError: () => {
        /* handled below when the output is awaited */
      },
    });
    const raw = await result.output;
    return { ok: true, raw };
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      return { ok: false, code: "no-plan", message: "The Director didn't produce a usable plan this time. Nothing was saved." };
    }
    const status = statusOf(error);
    console.error("practice plan: gateway call failed", status ?? "no status");
    if (status === 401) return { ok: false, code: "config", message: "The Director's AI isn't set up correctly for this studio." };
    if (status === 402) return { ok: false, code: "credits", message: safeMessage(error) ?? "This studio has run out of AI credits. Add credits to keep writing plans." };
    if (status === 403) return { ok: false, code: "denied", message: safeMessage(error) ?? "The AI service declined this request." };
    if (status === 429) return { ok: false, code: "rate-limited", message: "Too many requests right now. Wait a minute and try again." };
    return { ok: false, code: "unavailable", message: "The Director's AI is unavailable right now. Try again in a little while." };
  }
}
