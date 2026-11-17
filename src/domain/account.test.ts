import { DELETE_CONFIRMATION, deleteAccountSchema, newPasswordSchema, profileSchema, safeRedirect, signUpSchema } from "./account";

describe("account rules", () => {
  it("only redirects to same-origin app paths after sign-in", () => {
    expect(safeRedirect("/account/settings")).toBe("/account/settings");
    expect(safeRedirect("https://evil.example")).toBe("/");
    expect(safeRedirect("//evil.example")).toBe("/");
    expect(safeRedirect("/auth?redirect=/")).toBe("/");
    expect(safeRedirect(undefined)).toBe("/");
  });

  it("requires passwords of at least 8 characters", () => {
    expect(signUpSchema.safeParse({ displayName: "Moe", email: "a@b.co", password: "1234567" }).success).toBe(false);
    expect(signUpSchema.safeParse({ displayName: "Moe", email: "a@b.co", password: "12345678" }).success).toBe(true);
  });

  it("rejects a new password that doesn't match its confirmation", () => {
    expect(newPasswordSchema.safeParse({ password: "longenough", confirm: "different1" }).success).toBe(false);
  });

  it("deletes an account only with the exact confirmation phrase", () => {
    expect(deleteAccountSchema.safeParse({ confirmation: "delete my account" }).success).toBe(false);
    expect(deleteAccountSchema.safeParse({ confirmation: DELETE_CONFIRMATION }).success).toBe(true);
  });

  it("limits profile goals to 1000 characters", () => {
    expect(profileSchema.safeParse({ display_name: "Moe", experience_level: null, goals: "x".repeat(1001) }).success).toBe(false);
  });
});
