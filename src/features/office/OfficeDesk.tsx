import { useEffect, useState } from "react";
import deskImage from "@/assets/office-desk.jpg";
import logoImage from "@/assets/slams-logo.png";
import { BottomNav } from "@/components/slams/BottomNav";
import { Button } from "@/components/ui/button";
import { PRODUCT, type NavDestinationId } from "@/domain/constitution";
import { DestinationSheet } from "./DestinationSheet";
import { StudioStatusSheet } from "./StudioStatusSheet";
import { DESK_DESTINATIONS, DESK_HOTSPOTS, nextCoachLine, type DeskDestinationId } from "./desk";

const TAB_TO_DESTINATION: Record<Exclude<NavDestinationId, "office">, DeskDestinationId> = {
  schools: "train",
  rehearse: "rehearse",
  work: "work",
  stuck: "stuck",
};

export function OfficeDesk() {
  const [openId, setOpenId] = useState<DeskDestinationId | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [coach, setCoach] = useState<{ line: string; next: number } | null>(null);

  useEffect(() => {
    if (!coach) return;
    const t = setTimeout(() => setCoach(null), 6000);
    return () => clearTimeout(t);
  }, [coach]);

  const onTab = (id: NavDestinationId) => {
    if (id === "office") window.scrollTo({ top: 0, behavior: "smooth" });
    else setOpenId(TAB_TO_DESTINATION[id]);
  };

  return (
    <div className="min-h-dvh pb-20">
      <main className="mx-auto max-w-[480px]">
        <h1 className="sr-only">
          {PRODUCT.credit} {PRODUCT.name} — {PRODUCT.tagline}. The Office.
        </h1>

        <div className="relative [container-type:inline-size]">
          <img
            src={deskImage}
            alt="The coach's office: a weary acting coach in a leather armchair offers a mug reading 'Not your f***ing cheerleader'. Around him: a WORK checklist, a REHEARSE sign over a stage, the Conservatory's eight books, a GET UNSTUCK note, Passport and Journey drawers, Director's Notes and the Technique Matrix."
            width={941}
            height={1672}
            fetchPriority="high"
            className="block h-auto w-full select-none"
            draggable={false}
          />

          {/* Masthead */}
          <div className="pointer-events-none absolute inset-x-0 top-[1.2%] flex flex-col items-center">
            <p className="font-display text-[3.6cqw] leading-none text-foreground/90">{PRODUCT.credit}</p>
            <img src={logoImage} alt={`${PRODUCT.name} — ${PRODUCT.tagline}`} width={640} height={323} className="mt-[1cqw] w-[46%]" />
          </div>

          {/* Desk objects */}
          {DESK_HOTSPOTS.map((h) => (
            <button
              key={h.id}
              type="button"
              data-hint="true"
              aria-label={`${h.label}: see what's inside`}
              onClick={() => setOpenId(h.destination)}
              className="desk-hotspot absolute"
              style={{ left: `${h.rect.left}%`, top: `${h.rect.top}%`, width: `${h.rect.width}%`, height: `${h.rect.height}%` }}
            />
          ))}

          {/* The coach */}
          <button
            type="button"
            aria-label="Ask the coach for a note"
            onClick={() => setCoach(nextCoachLine(coach?.next ?? 0))}
            className="desk-hotspot absolute left-[27%] top-[19%] h-[45%] w-[39%]"
          />
          <div aria-live="polite" className="pointer-events-none absolute left-[3%] top-[24%] w-[46%]">
            {coach && (
              <p key={coach.line} className="animate-bubble-in surface-paper relative rounded-lg px-[3cqw] py-[2.4cqw] font-display text-[4.4cqw] leading-tight">
                “{coach.line}”
                <span aria-hidden className="absolute -right-[2.2cqw] top-[40%] size-[4cqw] rotate-45 bg-paper" />
              </p>
            )}
          </div>

          {/* Clipboard: real training state only */}
          <div className="absolute left-[10.5%] top-[69.5%] flex h-[20.5%] w-[57%] flex-col items-start justify-center gap-[1.8cqw] text-paper-foreground">
            <span className="rounded-sm bg-primary px-[2cqw] py-[0.6cqw] font-label text-[3cqw] text-primary-foreground">Current training</span>
            <p className="font-display text-[6cqw] leading-none">Nothing started yet.</p>
            <p className="text-[3.4cqw] italic leading-snug text-paper-muted">Your record begins the day you do the work.</p>
            <Button variant="desk" size="sm" onClick={() => setOpenId("baseline")} className="h-auto px-[3cqw] py-[1.6cqw] text-[3.3cqw]">
              Where do I start? →
            </Button>
          </div>
        </div>

        <section className="px-5 pb-6 pt-5 text-center">
          <p className="font-label text-xs text-brass">The Office</p>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Tap anything on the desk to see what it does. The studio opens room by room — nothing here pretends to work before it does.
          </p>
          <Button variant="brass" className="mt-4" onClick={() => setStatusOpen(true)}>
            How the studio is being built
          </Button>
        </section>
      </main>

      <BottomNav active="office" onSelect={onTab} />
      <DestinationSheet destination={openId ? DESK_DESTINATIONS[openId] : null} onClose={() => setOpenId(null)} />
      <StudioStatusSheet open={statusOpen} onOpenChange={setStatusOpen} />
    </div>
  );
}
