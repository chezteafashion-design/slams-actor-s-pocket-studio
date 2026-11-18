import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/slams/AppShell";
import { CardHeading, PaperCard } from "@/components/slams/PaperCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { LANGUAGE_INTENSITIES, RECORDING_COUNTDOWNS, type LanguageIntensity, type RecordingCountdown } from "@/domain/account";
import { settingsQuery, updateSettings, type UserSettings } from "@/features/account/queries";

export const Route = createFileRoute("/_authenticated/account/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SLAMS" },
      { name: "description", content: "Coach language, motion, captions and recording defaults." },
      { property: "og:title", content: "Settings — SLAMS" },
      { property: "og:description", content: "Coach language, motion, captions and recording defaults." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery(context.user.id)),
  component: SettingsPage,
});

type Patch = Partial<Pick<UserSettings, "language_intensity" | "reduced_motion" | "captions" | "recording_countdown">>;

function SettingsPage() {
  const { user } = Route.useRouteContext();
  const { data: settings } = useSuspenseQuery(settingsQuery(user.id));
  const queryClient = useQueryClient();
  const key = settingsQuery(user.id).queryKey;

  // Saves on every change; rolls back if the save fails.
  const save = useMutation({
    mutationFn: (patch: Patch) => updateSettings(user.id, patch),
    onMutate: async (patch) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData(key);
      if (previous) queryClient.setQueryData(key, { ...previous, ...patch });
      return { previous };
    },
    onError: (_e, _p, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(key, ctx.previous);
      toast.error("Couldn't save that setting. Try again.");
    },
    onSuccess: (data) => queryClient.setQueryData(key, data),
  });

  return (
    <AppShell title="Settings" kicker="Account" tab="office" back={{ to: "/account", label: "Profile" }}>
      <div className="space-y-6">
        <PaperCard>
          <CardHeading hint="Changes how the coach talks to you.">Coach language</CardHeading>
          <RadioGroup value={settings.language_intensity} onValueChange={(v) => save.mutate({ language_intensity: v as LanguageIntensity })} className="gap-2">
            {LANGUAGE_INTENSITIES.map((l) => (
              <Label key={l.id} htmlFor={`lang-${l.id}`} className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-2.5 font-normal has-[[data-state=checked]]:border-brass">
                <RadioGroupItem id={`lang-${l.id}`} value={l.id} className="mt-0.5" />
                <span>
                  <span className="block text-sm font-semibold text-foreground">{l.label}</span>
                  <span className="block text-xs text-muted-foreground">{l.hint}</span>
                </span>
              </Label>
            ))}
          </RadioGroup>
        </PaperCard>

        <PaperCard>
          <CardHeading>Comfort</CardHeading>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="reduced-motion" className="font-normal">
              <span className="block text-sm font-semibold text-foreground">Reduce motion</span>
              <span className="block text-xs text-muted-foreground">Stops glows and animations across the app.</span>
            </Label>
            <Switch id="reduced-motion" checked={settings.reduced_motion} onCheckedChange={(v) => save.mutate({ reduced_motion: v })} />
          </div>
        </PaperCard>

        <PaperCard>
          <CardHeading hint="Saved now. Used when recording opens in the Performance Lab and Self-Tape Studio (Phase 4).">Recording defaults</CardHeading>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="captions" className="font-normal">
              <span className="block text-sm font-semibold text-foreground">Captions on playback</span>
            </Label>
            <Switch id="captions" checked={settings.captions} onCheckedChange={(v) => save.mutate({ captions: v })} />
          </div>
          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-foreground">Countdown before a take</legend>
            <RadioGroup
              value={String(settings.recording_countdown)}
              onValueChange={(v) => save.mutate({ recording_countdown: Number(v) as RecordingCountdown })}
              className="mt-2 grid grid-cols-3 gap-2"
            >
              {RECORDING_COUNTDOWNS.map((n) => (
                <Label key={n} htmlFor={`count-${n}`} className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border py-2 font-normal has-[[data-state=checked]]:border-brass">
                  <RadioGroupItem id={`count-${n}`} value={String(n)} /> {n} s
                </Label>
              ))}
            </RadioGroup>
          </fieldset>
        </PaperCard>
      </div>
    </AppShell>
  );
}
