import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return async (scope: "global" | "local" = "global") => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut({ scope });
    navigate({ to: "/welcome", replace: true });
  };
}
