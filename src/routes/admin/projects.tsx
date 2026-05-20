import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AdminGate } from "@/components/admin/AdminGate";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/projects")({
  component: () => <AdminGate title="Projects"><ProjectsList /></AdminGate>,
  head: () => ({ meta: [{ title: "Admin · Projects" }, { name: "robots", content: "noindex" }] }),
});

function ProjectsList() {
  const { data, refetch } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  const [busy, setBusy] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    setBusy(id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refetch();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild><Link to="/admin/projects/new"><Plus className="mr-2 h-4 w-4" /> New Project</Link></Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#1F1F1F] bg-[#141414]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#1F1F1F] bg-[#1A1A1A] text-left text-xs uppercase tracking-wider text-[#888]">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-sm text-[#888]">
                No projects yet. <Link className="text-[var(--accent)]" to="/admin/projects/new">Create the first one</Link>.
              </td></tr>
            )}
            {data?.map((p) => (
              <tr key={p.id} className="border-b border-[#1F1F1F] last:border-0 hover:bg-[#1E1E1E]">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-[#aaa]">{p.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "published" ? "bg-[var(--accent-dim)] text-[var(--accent)]" : "bg-[#1A1A1A] text-[#888]"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/admin/projects/$id" params={{ id: p.id }}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => remove(p.id)} disabled={busy === p.id}>
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
