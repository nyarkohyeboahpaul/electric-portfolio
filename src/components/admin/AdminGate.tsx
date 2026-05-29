import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Wraps every admin page. Redirects to /admin/login if not signed in.
 * If signed in but not the assigned admin, shows a sign-out option.
 */
export function AdminGate({ title, children }: { title: string; children: React.ReactNode }) {
  const { loading, userId, email, isAdmin, error } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !userId) navigate({ to: "/admin/login" });
  }, [loading, userId, navigate]);

  if (loading || !userId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
        <div className="max-w-md rounded-xl border border-[#1F1F1F] bg-[#111] p-8 text-center">
          <h2 className="mb-2 text-xl font-bold">Admin access check failed</h2>
          <p className="mb-6 text-sm text-[#888]">
            Your sign-in worked, but the dashboard could not verify the admin role yet.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
        <div className="max-w-md rounded-xl border border-[#1F1F1F] bg-[#111] p-8 text-center">
          <h2 className="mb-2 text-xl font-bold">Not authorized</h2>
          <p className="mb-6 text-sm text-[#888]">
            {email ? <>You're signed in as <span className="text-white">{email}</span>, which isn't the admin account.</> : "This account doesn't have admin access."} Sign in with the admin account to continue.
          </p>
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/admin/login" });
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return <AdminLayout title={title} email={email}>{children}</AdminLayout>;
}
