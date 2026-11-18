import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/slams/AppShell";
import { AuthForm, type AuthMode } from "@/features/account/AuthForm";

interface AuthSearch {
  redirect?: string | undefined;
  mode?: AuthMode | undefined;
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    redirect: typeof search['redirect'] === "string" ? search['redirect'] : undefined,
    mode: search['mode'] === "signup" || search['mode'] === "forgot" ? search['mode'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — SLAMS" },
      { name: "description", content: "Sign in to SLAMS, The Actor's Pocket Studio, or create your account." },
      { property: "og:title", content: "Sign in — SLAMS" },
      { property: "og:description", content: "Sign in to SLAMS, The Actor's Pocket Studio, or create your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect, mode } = Route.useSearch();
  return (
    <AppShell title="The stage door" kicker="mrahmostudios presents SLAMS" member={false} back={{ to: "/welcome", label: "Welcome" }}>
      <AuthForm key={mode ?? "signin"} initialMode={mode ?? "signin"} redirect={redirect} />
    </AppShell>
  );
}
