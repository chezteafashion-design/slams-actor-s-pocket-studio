import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { settingsQuery } from "./queries";

/** Applies saved settings that affect the whole app (reduced motion). */
export function SettingsEffects({ userId }: { userId: string }) {
  const { data } = useQuery(settingsQuery(userId));
  const reduced = data?.reduced_motion ?? false;
  useEffect(() => {
    document.documentElement.dataset['reducedMotion'] = reduced ? "true" : "false";
    return () => {
      delete document.documentElement.dataset['reducedMotion'];
    };
  }, [reduced]);
  return null;
}
