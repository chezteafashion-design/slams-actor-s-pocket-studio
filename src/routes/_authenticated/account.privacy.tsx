import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Film, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/slams/AppShell";
import { HonestEmpty } from "@/components/slams/HonestEmpty";
import { CardHeading, PaperCard } from "@/components/slams/PaperCard";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DELETE_CONFIRMATION } from "@/domain/account";
import { deleteMyAccount, exportMyData } from "@/features/account/account.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/account/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & data — SLAMS" },
      { name: "description", content: "Download everything SLAMS stores about you, or delete your account." },
      { property: "og:title", content: "Privacy & data — SLAMS" },
      { property: "og:description", content: "Download everything SLAMS stores about you, or delete your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const exportFn = useServerFn(exportMyData);
  const deleteFn = useServerFn(deleteMyAccount);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [exporting, setExporting] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [deleting, setDeleting] = useState(false);

  const onExport = async () => {
    setExporting(true);
    try {
      const data = await exportFn();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `slams-my-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Your data has been downloaded.");
    } catch {
      toast.error("Couldn't export your data. Try again.");
    } finally {
      setExporting(false);
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    try {
      await deleteFn({ data: { confirmation: phrase } });
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut({ scope: "local" });
      toast.success("Your account has been deleted.");
      navigate({ to: "/welcome", replace: true });
    } catch {
      toast.error("Couldn't delete your account. Nothing was removed. Try again.");
      setDeleting(false);
    }
  };

  return (
    <AppShell title="Privacy & data" kicker="Account" tab="office" back={{ to: "/account", label: "Profile" }}>
      <div className="space-y-6">
        <PaperCard>
          <CardHeading hint="Your profile, settings and role as one file.">Download your data</CardHeading>
          <Button variant="brass" onClick={onExport} disabled={exporting}>{exporting ? "Preparing…" : "Download my data"}</Button>
        </PaperCard>

        <PaperCard>
          <CardHeading>Recordings and sharing</CardHeading>
          <div className="space-y-2">
            <HonestEmpty icon={Film} title="No recordings stored">
              SLAMS can't record yet. When the Performance Lab opens (Phase 4), your takes are private by default and can be deleted here.
            </HonestEmpty>
            <HonestEmpty icon={Share2} title="Nothing shared">
              Sharing with a coach arrives with the Director's Chair (Phase 8). Any share you make will be revocable here.
            </HonestEmpty>
          </div>
        </PaperCard>

        <PaperCard tone="danger">
          <CardHeading hint="Deletes your account, profile and settings for good. This can't be undone.">Delete account</CardHeading>
          <AlertDialog onOpenChange={(o) => !o && setPhrase("")}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete my account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your SLAMS account?</AlertDialogTitle>
                <AlertDialogDescription>Everything goes, permanently. Type {DELETE_CONFIRMATION} to confirm.</AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-1.5">
                <Label htmlFor="delete-phrase" className="sr-only">Confirmation phrase</Label>
                <Input id="delete-phrase" value={phrase} onChange={(e) => setPhrase(e.target.value)} autoComplete="off" placeholder={DELETE_CONFIRMATION} />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep my account</AlertDialogCancel>
                <Button variant="destructive" disabled={phrase !== DELETE_CONFIRMATION || deleting} onClick={onDelete}>
                  {deleting ? "Deleting…" : "Delete forever"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PaperCard>
      </div>
    </AppShell>
  );
}
