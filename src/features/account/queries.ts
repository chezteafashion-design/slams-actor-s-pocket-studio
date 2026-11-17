import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesUpdate } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;
export type UserSettings = Tables<"user_settings">;

export const profileQuery = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async (): Promise<Profile> => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (error) throw error;
      return data;
    },
  });

export const settingsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["settings", userId],
    queryFn: async (): Promise<UserSettings> => {
      const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId).single();
      if (error) throw error;
      return data;
    },
  });

export async function updateProfile(userId: string, patch: TablesUpdate<"profiles">) {
  const { data, error } = await supabase.from("profiles").update(patch).eq("id", userId).select("*").single();
  if (error) throw error;
  return data;
}

export async function updateSettings(userId: string, patch: TablesUpdate<"user_settings">) {
  const { data, error } = await supabase.from("user_settings").update(patch).eq("user_id", userId).select("*").single();
  if (error) throw error;
  return data;
}
