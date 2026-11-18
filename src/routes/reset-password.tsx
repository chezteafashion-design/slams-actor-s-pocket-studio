import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AppShell } from "@/components/slams/AppShell";
import { PaperCard } from "@/components/slams/PaperCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firstError, newPasswordSchema } from "@/domain/account";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Choose a new password — SLAMS" },
      { name: "description", content: "Set a new password for your SLAMS account." },
      { property: "og:title", content: "Choose a new password — SLAMS" },
      { property: "og:description", content: "Set a new password for your SLAMS account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

type Stage = "checking" | "ready" | "invalid" | "done";

function ResetPasswordPage() {
  const [stage, setStage] = useState<Stage>("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const fromLink = window.location.hash.includes("type=recovery");
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setStage("ready");
    });
    supabase.auth.getSession().then(({ data: s }) => {
      if (s.session && fromLink) setStage("ready");
    });
    const t = setTimeout(() => setStage((cur) => (cur === "checking" ? "invalid" : cur)), 4000);
    return () => {
      clearTimeout(t);
      data.subscription.unsubscribe();
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = newPasswordSchema.safeParse({ password, confirm });
    if (!parsed.success) return setError(firstError(parsed));
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password: parsed.data.password });
    setBusy(false);
    if (err) return setError(err.message);
    setStage("done");
  };

  return (
    <AppShell title="New password" kicker="Account" member={false} back={{ to: "/welcome", label: "Welcome" }}>
      {stage === "checking" && <p className="text-sm text-muted-foreground">Checking your reset link…</p>}
      {stage === "invalid" && (
        <PaperCard>
          <p className="text-sm text-foreground">This page only works from the link in a password-reset email, and each link expires.</p>
          <Button asChild variant="brass" className="mt-4">
            <Link to="/auth" search={{ mode: "forgot" }}>Send a new link</Link>
          </Button>
        </PaperCard>
      )}
      {stage === "ready" && (
        <PaperCard>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Type it again</Label>
              <Input id="confirm-password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="brass" className="w-full" disabled={busy}>{busy ? "Saving…" : "Save new password"}</Button>
          </form>
        </PaperCard>
      )}
      {stage === "done" && (
        <PaperCard tone="paper">
          <p className="font-display text-2xl leading-tight">Password changed.</p>
          <Button asChild variant="desk" className="mt-4">
            <Link to="/">Back to the Office</Link>
          </Button>
        </PaperCard>
      )}
    </AppShell>
  );
}
