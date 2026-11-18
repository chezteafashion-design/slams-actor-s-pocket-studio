import { useRouter } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaperCard } from "@/components/slams/PaperCard";
import { emailSchema, firstError, safeRedirect, signInSchema, signUpSchema } from "@/domain/account";
import { supabase } from "@/integrations/supabase/client";

export type AuthMode = "signin" | "signup" | "forgot";

function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "That email and password don't match.";
  if (m.includes("email not confirmed")) return "Confirm your email first — check your inbox for the link.";
  if (m.includes("rate limit") || m.includes("too many")) return "Too many attempts. Wait a few minutes and try again.";
  if (m.includes("already registered")) return "An account with this email already exists. Sign in instead.";
  if (m.includes("password")) return message;
  return "Something went wrong. Try again.";
}

export function AuthForm({ initialMode, redirect }: { initialMode: AuthMode; redirect?: string | undefined }) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<null | "confirm" | "reset">(null);
  const [busy, setBusy] = useState(false);
  const target = safeRedirect(redirect);

  // Already signed in: go straight on.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.history.replace(target);
    });
  }, [router, target]);

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError(null);
    setSent(null);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const parsed = signUpSchema.safeParse({ displayName, email, password });
        if (!parsed.success) return setError(firstError(parsed));
        const { data, error: err } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: window.location.origin, data: { display_name: parsed.data.displayName } },
        });
        if (err) return setError(friendlyAuthError(err.message));
        if (data.session) return router.history.replace(target);
        return setSent("confirm");
      }
      if (mode === "signin") {
        const parsed = signInSchema.safeParse({ email, password });
        if (!parsed.success) return setError(firstError(parsed));
        const { error: err } = await supabase.auth.signInWithPassword(parsed.data);
        if (err) return setError(friendlyAuthError(err.message));
        return router.history.replace(target);
      }
      const parsed = emailSchema.safeParse(email);
      if (!parsed.success) return setError(firstError(parsed));
      const { error: err } = await supabase.auth.resetPasswordForEmail(parsed.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) return setError(friendlyAuthError(err.message));
      setSent("reset");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <PaperCard tone="paper">
        <p className="font-label text-xs text-oxblood">Check your inbox</p>
        <p className="mt-2 font-display text-2xl leading-tight">
          {sent === "confirm" ? "Confirm your email to open the studio." : "If that email has an account, a reset link is on its way."}
        </p>
        <p className="mt-2 text-sm text-paper-muted">
          {sent === "confirm"
            ? `We sent a link to ${email.trim()}. Open it on this device. If you already have an account, sign in instead.`
            : "The link opens a page where you choose a new password."}
        </p>
        <Button variant="desk" className="mt-4" onClick={() => switchMode("signin")}>Back to sign in</Button>
      </PaperCard>
    );
  }

  const title = mode === "signup" ? "Create your account" : mode === "signin" ? "Sign in" : "Reset your password";
  return (
    <PaperCard>
      <h2 className="font-display text-2xl leading-none text-foreground">{title}</h2>
      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        {mode === "signup" && (
          <div className="space-y-1.5">
            <Label htmlFor="displayName">What should the coach call you?</Label>
            <Input id="displayName" autoComplete="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={80} />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {mode !== "forgot" && (
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {mode === "signup" && <p className="text-xs text-muted-foreground">At least 8 characters.</p>}
          </div>
        )}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="brass" className="w-full" disabled={busy}>
          {busy ? "One moment…" : mode === "signup" ? "Create account" : mode === "signin" ? "Sign in" : "Send reset link"}
        </Button>
      </form>
      <div className="mt-5 flex flex-col items-start gap-2 text-sm">
        {mode === "signin" && (
          <>
            <button type="button" className="text-brass underline-offset-4 hover:underline" onClick={() => switchMode("forgot")}>Forgot your password?</button>
            <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => switchMode("signup")}>New here? Create an account</button>
          </>
        )}
        {mode !== "signin" && (
          <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => switchMode("signin")}>Already have an account? Sign in</button>
        )}
      </div>
    </PaperCard>
  );
}
