import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminAuth, claimAdminIfNone } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Wraps every admin page. Redirects to /admin/login if not signed in.
 * If signed in but not admin, shows a Claim Admin button (only works
 * before any admin exists — backed by the SECURITY DEFINER RPC).
 */
export function AdminGate({ title, children }: { title: string; children: React.ReactNode }) {
  const { loading, userId, isAdmin } = useAdminAuth();
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

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
        <div className="max-w-md rounded-xl border border-[#1F1F1F] bg-[#111] p-8 text-center">
          <h2 className="mb-2 text-xl font-bold">Admin access required</h2>
          <p className="mb-6 text-sm text-[#888]">
            You're signed in but don't have the admin role. If no admin exists yet,
            you can claim it now (one-time only).
          </p>
          <Button
            onClick={async () => {
              const ok = await claimAdminIfNone(userId);
              if (ok) {
                toast.success("You're now the admin. Reloading…");
                setTimeout(() => window.location.reload(), 600);
              } else {
                toast.error("An admin already exists. Ask them to grant you access.");
              }
            }}
          >
            Claim admin role
          </Button>
        </div>
      </div>
    );
  }

  return <AdminLayout title={title}>{children}</AdminLayout>;
}
