import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminAuthState = {
  loading: boolean;
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
};

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    loading: true,
    userId: null,
    email: null,
    isAdmin: false,
  });

  useEffect(() => {
    let mounted = true;

    async function check(userId: string | null, email: string | null) {
      if (!userId) {
        if (mounted) setState({ loading: false, userId: null, email: null, isAdmin: false });
        return;
      }
      // RLS lets the user read their own user_roles rows.
      const { data } = await supabase
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
          isAdmin: !!data,
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

/**
 * If there is no admin in user_roles yet, the first signed-in user can claim
 * the role. Returns true if the claim succeeded.
 */
export async function claimAdminIfNone(userId: string): Promise<boolean> {
  // Use a server-side RPC-like approach via the table directly. The RLS
  // policy on user_roles only allows admins to insert — so on first claim
  // we use a small SECURITY DEFINER function. We add it inline via a check:
  // try to insert; if it fails, attempt RPC. For simplicity here we just
  // count existing admins via select (users can read their own rows only,
  // so we use the count on the public exposed RPC).
  // Simpler: rely on a server function endpoint we expose separately.
  const { data } = await supabase.rpc("claim_admin_if_none", { _user_id: userId });
  return !!data;
}
