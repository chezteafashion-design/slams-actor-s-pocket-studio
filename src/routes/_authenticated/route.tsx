import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SettingsEffects } from "@/features/account/SettingsEffects";

/** Members-only area. The session lives in the browser, so this gate runs client-side. */
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      if (location.pathname === "/") throw redirect({ to: "/welcome" });
      throw redirect({ to: "/auth", search: { redirect: location.href } });
    }
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user } = Route.useRouteContext();
  return (
    <>
      <SettingsEffects userId={user.id} />
      <Outlet />
    </>
  );
}
