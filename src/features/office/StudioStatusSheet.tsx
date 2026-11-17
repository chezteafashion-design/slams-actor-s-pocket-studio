import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ROADMAP_PHASES } from "@/domain/constitution";
import { cn } from "@/lib/utils";

const LABEL = { complete: "Done", "in-progress": "Building now", planned: "Planned" } as const;

export function StudioStatusSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-h-[85dvh] max-w-[480px] overflow-y-auto rounded-t-xl border-brass/40 bg-card px-5 pb-8 pt-6">
        <SheetHeader className="space-y-2 text-left">
          <p className="font-label text-xs text-brass">mrahmostudios presents</p>
          <SheetTitle className="font-display text-3xl font-normal leading-none">How the studio is being built</SheetTitle>
          <SheetDescription className="text-[15px] text-muted-foreground">
            One phase at a time. Each part opens only when it really works.
          </SheetDescription>
        </SheetHeader>
        <ol className="mt-5 space-y-2">
          {ROADMAP_PHASES.map((p) => (
            <li key={p.phase} className={cn("rounded-md border px-3 py-2.5", p.status === "planned" ? "border-border" : "border-brass/60 bg-brass/10")}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold">
                  <span className="font-label text-xs text-brass">Phase {p.phase}</span> · {p.name}
                </p>
                <span className={cn("font-label text-[10px]", p.status === "planned" ? "text-muted-foreground" : "text-brass")}>{LABEL[p.status]}</span>
              </div>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{p.goal}</p>
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
