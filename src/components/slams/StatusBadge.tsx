import { cva } from "class-variance-authority";
import type { FeatureStatus } from "@/domain/constitution";
import { cn } from "@/lib/utils";

const badge = cva("inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-label text-[11px]", {
  variants: {
    status: {
      planned: "border-border text-muted-foreground",
      "in-development": "border-brass/60 text-brass",
      beta: "border-brass bg-brass/15 text-brass",
      live: "border-primary bg-primary text-primary-foreground",
      blocked: "border-destructive text-destructive",
    },
  },
});

export function StatusBadge({ status, children, className }: { status: FeatureStatus; children: string; className?: string }) {
  return (
    <span className={cn(badge({ status }), className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
