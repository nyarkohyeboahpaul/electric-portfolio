import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminAuthState = {
  loading: boolean;
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
  error: string | null;
};

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    loading: true,
    userId: null,
    email: null,
    isAdmin: false,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function check(userId: string | null, email: string | null) {
      if (!userId) {
        if (mounted) setState({ loading: false, userId: null, email: null, isAdmin: false, error: null });
        return;
      }
      const { data: userResult, error: userError } = await supabase.auth.getUser();
      if (userError || !userResult.user || userResult.user.id !== userId) {
        if (mounted) {
          setState({
            loading: false,
            userId: null,
            email: null,
            isAdmin: false,
            error: userError?.message ?? "Could not verify your signed-in session.",
          });
        }
        return;
      }

      // RLS lets the signed-in user read their own user_roles rows.
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (mounted) {
        setState({
          loading: false,
          userId,
          email,
          isAdmin: !error && !!data,
          error: error?.message ?? null,
        });
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      check(session?.user?.id ?? null, session?.user?.email ?? null);
    });

    supabase.auth.getSession().then(({ data }) => {
      check(data.session?.user?.id ?? null, data.session?.user?.email ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
