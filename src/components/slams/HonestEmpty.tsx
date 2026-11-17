import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** An empty state that says plainly what isn't there yet, and why. Never filled with sample data. */
export function HonestEmpty({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-dashed border-border px-3 py-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs leading-snug text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
