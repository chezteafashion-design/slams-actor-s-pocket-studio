import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/slams/AppShell";
import { CardHeading, PaperCard } from "@/components/slams/PaperCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { EXPERIENCE_LEVELS, firstError, profileSchema, type ExperienceLevel } from "@/domain/account";
import { profileQuery, updateProfile } from "@/features/account/queries";
import { useSignOut } from "@/features/account/useSignOut";

export const Route = createFileRoute("/_authenticated/account/")({
  head: () => ({
    meta: [
      { title: "Your profile — SLAMS" },
      { name: "description", content: "Your name, experience level and goals in SLAMS." },
      { property: "og:title", content: "Your profile — SLAMS" },
      { property: "og:description", content: "Your name, experience level and goals in SLAMS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(profileQuery(context.user.id)),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useRouteContext();
  const { data: profile } = useSuspenseQuery(profileQuery(user.id));
  const queryClient = useQueryClient();
  const signOut = useSignOut();
  const [displayName, setDisplayName] = useState(profile.display_name);
  const [level, setLevel] = useState<ExperienceLevel | null>(profile.experience_level);
  const [goals, setGoals] = useState(profile.goals);
  const [error, setError] = useState<string | null>(null);

  const save = useMutation({
    mutationFn: (input: Parameters<typeof updateProfile>[1]) => updateProfile(user.id, input),
    onSuccess: (data) => {
      queryClient.setQueryData(profileQuery(user.id).queryKey, data);
      toast.success("Profile saved.");
    },
    onError: () => toast.error("Couldn't save your profile. Try again."),
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = profileSchema.safeParse({ display_name: displayName, experience_level: level, goals });
    if (!parsed.success) return setError(firstError(parsed));
    setError(null);
    save.mutate(parsed.data);
  };

  return (
    <AppShell title="Your profile" kicker="Account" tab="office" back={{ to: "/", label: "Office" }}>
      <div className="space-y-6">
        <PaperCard>
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="display-name">Name</Label>
              <Input id="display-name" value={displayName} maxLength={80} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Where are you as an actor?</legend>
              <RadioGroup value={level ?? ""} onValueChange={(v) => setLevel(v as ExperienceLevel)} className="gap-2">
                {EXPERIENCE_LEVELS.map((l) => (
                  <Label key={l.id} htmlFor={`level-${l.id}`} className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-2.5 font-normal has-[[data-state=checked]]:border-brass">
                    <RadioGroupItem id={`level-${l.id}`} value={l.id} className="mt-0.5" />
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{l.label}</span>
                      <span className="block text-xs text-muted-foreground">{l.hint}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </fieldset>
            <div className="space-y-1.5">
              <Label htmlFor="goals">What do you want from your training?</Label>
              <Textarea id="goals" rows={4} maxLength={1000} value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="e.g. Stop pushing for emotion. Book a lead in a short film this year." />
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="brass" disabled={save.isPending}>{save.isPending ? "Saving…" : "Save profile"}</Button>
          </form>
        </PaperCard>

        <PaperCard>
          <CardHeading hint={user.email}>Account</CardHeading>
          <ul className="divide-y divide-border">
            {([
              { to: "/account/settings", label: "Settings" },
              { to: "/account/privacy", label: "Privacy & data" },
              { to: "/about", label: "About & feature status" },
            ] as const).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="flex items-center justify-between py-3 text-sm text-foreground hover:text-brass">
                  {l.label} <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-3 w-full" onClick={() => signOut()}>Sign out</Button>
        </PaperCard>
      </div>
    </AppShell>
  );
}
