import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const card = cva("rounded-lg", {
  variants: {
    tone: {
      /** Parchment note pinned to the desk. */
      paper: "surface-paper p-4",
      /** Dark panel with a brass edge: forms and settings. */
      panel: "border border-brass/30 bg-card p-4 text-card-foreground",
      /** Warning panel for irreversible actions. */
      danger: "border border-destructive/60 bg-destructive/10 p-4 text-foreground",
    },
  },
  defaultVariants: { tone: "panel" },
});

export function PaperCard({ tone, className, children }: VariantProps<typeof card> & { className?: string; children: ReactNode }) {
  return <section className={cn(card({ tone }), className)}>{children}</section>;
}

export function CardHeading({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <div className="mb-3">
      <h2 className="font-label text-xs text-brass">{children}</h2>
      {hint && <p className="mt-1 text-xs leading-snug text-muted-foreground">{hint}</p>}
    </div>
  );
}
