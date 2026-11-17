import { StatusBadge } from "@/components/slams/StatusBadge";
import { STATUS_LABELS } from "@/domain/constitution";
import { availabilityOf, pagesOf, signaturesOf, type DeskDestination } from "./desk";

/** What a destination contains and its real status, straight from the registry. */
export function DestinationDetails({ destination }: { destination: DeskDestination }) {
  const availability = availabilityOf(destination);
  const pages = pagesOf(destination);
  const signatures = signaturesOf(destination);
  return (
    <div>
      <StatusBadge status={availability.status} className="w-fit">{availability.label}</StatusBadge>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{destination.summary}</p>

      <section className="mt-6">
        <h2 className="font-label text-xs text-brass">What's inside</h2>
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
          <h2 className="font-label text-xs text-brass">Signature experiences here</h2>
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

      <p className="mt-6 text-xs text-muted-foreground">Nothing here is faked. This opens when it actually works.</p>
    </div>
  );
}
