import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import deskImage from "@/assets/office-desk.jpg";
import logoImage from "@/assets/slams-logo.png";
import { Button } from "@/components/ui/button";
import { PRODUCT } from "@/domain/constitution";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — SLAMS, The Actor's Pocket Studio" },
      { name: "description", content: "mrahmostudios presents SLAMS: eight acting schools, living-scene rehearsal, professional preparation and a coach who is not your cheerleader." },
      { property: "og:title", content: "SLAMS — The Actor's Pocket Studio" },
      { property: "og:description", content: "mrahmostudios presents SLAMS. Train, rehearse, work and get unstuck." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
  }, []);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <img src={deskImage} alt="" aria-hidden width={941} height={1672} className="absolute inset-0 h-full w-full object-cover object-top opacity-45" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <main className="relative mx-auto flex min-h-dvh max-w-[480px] flex-col px-6 pb-10 pt-10">
        <div className="text-center">
          <p className="font-display text-lg text-foreground/90">{PRODUCT.credit}</p>
          <h1 className="mt-2">
            <img src={logoImage} alt={`${PRODUCT.name} — ${PRODUCT.tagline}`} width={640} height={323} className="mx-auto w-[78%]" />
          </h1>
        </div>
        <div className="mt-auto space-y-5">
          <p className="font-display text-3xl leading-tight text-foreground">A coach in your pocket.<br />Not a cheerleader.</p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Eight schools of technique. Scenes that fight back. Real preparation for auditions and self-tapes. A desk for when you're stuck. Your record only shows what you actually did.
          </p>
          <div className="space-y-3">
            {signedIn ? (
              <Button asChild variant="brass" size="lg" className="w-full"><Link to="/">Enter the Office</Link></Button>
            ) : (
              <>
                <Button asChild variant="brass" size="lg" className="w-full"><Link to="/auth" search={{ mode: "signup" }}>Create account</Link></Button>
                <Button asChild variant="outline" size="lg" className="w-full border-brass/40 font-label"><Link to="/auth">Sign in</Link></Button>
              </>
            )}
            <Link to="/about" className="block pt-1 text-center text-sm text-brass underline-offset-4 hover:underline">What's open today — and what isn't</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
