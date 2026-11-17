import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DestinationDetails } from "./DestinationDetails";
import type { DeskDestination } from "./desk";

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
  return (
    <div className="px-5 pb-8 pt-6">
      <SheetHeader className="space-y-2 text-left">
        <p className="font-label text-xs text-brass">{destination.kicker}</p>
        <SheetTitle className="font-display text-3xl font-normal leading-none text-foreground">{destination.title}</SheetTitle>
        <SheetDescription className="sr-only">{destination.summary}</SheetDescription>
      </SheetHeader>
      <DestinationDetails destination={destination} />
    </div>
  );
}
