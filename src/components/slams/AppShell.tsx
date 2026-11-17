import { Link } from "@tanstack/react-router";
import { ChevronLeft, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import logoImage from "@/assets/slams-logo.png";
import type { NavDestinationId } from "@/domain/constitution";
import { BottomNav } from "./BottomNav";

type BackTo = "/" | "/account" | "/welcome";

/** Frame for every page except the Office desk: top bar, content column, and (for members) the five tabs. */
export function AppShell({
  title,
  kicker,
  tab,
  back,
  member = true,
  children,
}: {
  title: string;
  kicker?: string;
  /** Highlighted tab. Omit on public pages to hide the tab bar. */
  tab?: NavDestinationId;
  back?: { to: BackTo; label: string };
  member?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={tab ? "min-h-dvh pb-24" : "min-h-dvh pb-10"}>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[480px] items-center justify-between gap-2 px-3">
          {back ? (
            <Link to={back.to} className="flex items-center gap-1 rounded-md px-1.5 py-1 font-label text-[11px] text-muted-foreground hover:text-foreground">
              <ChevronLeft className="size-4" aria-hidden /> {back.label}
            </Link>
          ) : (
            <Link to="/" aria-label="SLAMS — back to the Office" className="rounded-md px-1">
              <img src={logoImage} alt="" width={640} height={323} className="h-8 w-auto" />
            </Link>
          )}
          {member && (
            <Link to="/account" aria-label="Your account" className="grid size-9 place-items-center rounded-full border border-brass/40 text-brass hover:bg-brass/10">
              <UserRound className="size-4" aria-hidden />
            </Link>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-[480px] px-5 pt-6">
        {kicker && <p className="font-label text-xs text-brass">{kicker}</p>}
        <h1 className="font-display text-4xl leading-none text-foreground">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
      {tab && <BottomNav active={tab} />}
    </div>
  );
}
