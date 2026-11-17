import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StatusBadge } from "@/components/slams/StatusBadge";
import { STATUS_LABELS } from "@/domain/constitution";
import { availabilityOf, pagesOf, signaturesOf, type DeskDestination } from "./desk";

export function DestinationSheet({ destination, onClose }: { destination: DeskDestination | null; onClose: () => void }) {
  const open = destination !== null;
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="mx-auto max-h-[85dvh] max-w-[480px] overflow-y-auto rounded-t-xl border-brass/40 bg-card p-0">
        {destination && <SheetBody destination={destination} />}
      </SheetContent>
    </Sheet>
  );
}

function SheetBody({ destination }: { destination: DeskDestination }) {
  const availability = availabilityOf(destination);
  const pages = pagesOf(destination);
  const signatures = signaturesOf(destination);
  return (
    <div className="px-5 pb-8 pt-6">
      <SheetHeader className="space-y-2 text-left">
        <p className="font-label text-xs text-brass">{destination.kicker}</p>
        <SheetTitle className="font-display text-3xl font-normal leading-none text-foreground">{destination.title}</SheetTitle>
        <StatusBadge status={availability.status} className="w-fit">{availability.label}</StatusBadge>
        <SheetDescription className="pt-1 text-[15px] leading-relaxed text-muted-foreground">{destination.summary}</SheetDescription>
      </SheetHeader>

      <section className="mt-6">
        <h3 className="font-label text-xs text-brass">What's inside</h3>
        <ul className="mt-2 divide-y divide-border rounded-md border border-border">
          {pages.map((p) => (
            <li key={p.id} className="flex items-start justify-between gap-3 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-xs leading-snug text-muted-foreground">{p.purpose}</p>
              </div>
              <span className="shrink-0 font-label text-[10px] text-muted-foreground">
                {STATUS_LABELS[p.status]} · P{p.phase}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {signatures.length > 0 && (
        <section className="mt-6">
          <h3 className="font-label text-xs text-brass">Signature experiences here</h3>
          <ul className="mt-2 space-y-2">
            {signatures.map((s) => (
              <li key={s.id} className="rounded-md border border-border bg-secondary/40 px-3 py-2.5">
                <p className="font-display text-lg leading-tight text-foreground">{s.name}</p>
                <p className="text-xs leading-snug text-muted-foreground">{s.purpose}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-6 text-xs text-muted-foreground">
        Nothing here is faked. This opens when it actually works.
      </p>
    </div>
  );
}
