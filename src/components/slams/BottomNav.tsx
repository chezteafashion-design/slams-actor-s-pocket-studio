import { Briefcase, Clapperboard, GraduationCap, House, LifeBuoy, type LucideIcon } from "lucide-react";
import { NAV_DESTINATIONS, type NavDestinationId } from "@/domain/constitution";
import { cn } from "@/lib/utils";

const ICONS: Record<NavDestinationId, LucideIcon> = {
  office: House,
  schools: GraduationCap,
  rehearse: Clapperboard,
  work: Briefcase,
  stuck: LifeBuoy,
};

/** The five permanent destinations. Exactly these, always. */
export function BottomNav({ active, onSelect }: { active: NavDestinationId; onSelect: (id: NavDestinationId) => void }) {
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto grid max-w-[480px] grid-cols-5">
        {NAV_DESTINATIONS.map((d) => {
          const Icon = ICONS[d.id];
          const isActive = d.id === active;
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => onSelect(d.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex h-16 w-full flex-col items-center justify-center gap-1 font-label text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                {d.label}
                {isActive && <span aria-hidden className="absolute bottom-1 h-0.5 w-8 rounded-full bg-primary" />}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
