/** Account rules: pure, shared by pages, server functions and tests. */
import { z } from "zod";

export const EXPERIENCE_LEVELS = [
  { id: "beginner", label: "Beginner", hint: "New to acting training" },
  { id: "developing", label: "Developing", hint: "Some classes or productions behind you" },
  { id: "experienced", label: "Experienced", hint: "Regular training and performing" },
  { id: "professional", label: "Working professional", hint: "Acting is part of how you earn" },
  { id: "returning", label: "Returning", hint: "Coming back to training after time away" },
] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]["id"];
const LEVEL_IDS = EXPERIENCE_LEVELS.map((l) => l.id) as [ExperienceLevel, ...ExperienceLevel[]];

export const LANGUAGE_INTENSITIES = [
  { id: "full", label: "Full strength", hint: "The coach as written. Swearing included." },
  { id: "softened", label: "Softened", hint: "Same notes, cleaner words." },
] as const;
export type LanguageIntensity = (typeof LANGUAGE_INTENSITIES)[number]["id"];

export const RECORDING_COUNTDOWNS = [3, 5, 10] as const;
export type RecordingCountdown = (typeof RECORDING_COUNTDOWNS)[number];

export const PASSWORD_MIN = 8;
export const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address.").max(254);
export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN, `Use at least ${PASSWORD_MIN} characters.`)
  .max(72, "Use 72 characters or fewer.");
export const displayNameSchema = z.string().trim().min(1, "Tell us what to call you.").max(80, "Keep it under 80 characters.");

export const signUpSchema = z.object({ displayName: displayNameSchema, email: emailSchema, password: passwordSchema });
export const signInSchema = z.object({ email: emailSchema, password: z.string().min(1, "Enter your password.") });
export const newPasswordSchema = z
  .object({ password: passwordSchema, confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: "The two passwords don't match.", path: ["confirm"] });

export const profileSchema = z.object({
  display_name: displayNameSchema,
  experience_level: z.enum(LEVEL_IDS).nullable(),
  goals: z.string().trim().max(1000, "Keep goals under 1000 characters."),
});
export type ProfileInput = z.infer<typeof profileSchema>;

export const settingsPatchSchema = z
  .object({
    language_intensity: z.enum(["full", "softened"]),
    reduced_motion: z.boolean(),
    captions: z.boolean(),
    recording_countdown: z.union([z.literal(3), z.literal(5), z.literal(10)]),
  })
  .partial();

/** Typed exactly to delete an account. */
export const DELETE_CONFIRMATION = "DELETE MY ACCOUNT";
export const deleteAccountSchema = z.object({ confirmation: z.literal(DELETE_CONFIRMATION) });

/** Only same-origin app paths may be used as a post-sign-in destination. */
export function safeRedirect(target: unknown, fallback = "/"): string {
  if (typeof target !== "string") return fallback;
  if (!target.startsWith("/") || target.startsWith("//") || target.startsWith("/\\")) return fallback;
  if (/^\/(auth|reset-password|welcome)(\/|\?|$)/.test(target)) return fallback;
  return target;
}

/** First validation message, for a single inline error line. */
export function firstError(result: z.SafeParseReturnType<unknown, unknown>): string | null {
  return result.success ? null : (result.error.issues[0]?.message ?? "Check the form.");
}
