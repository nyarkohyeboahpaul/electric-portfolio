import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, BookOpen, Image as ImageIcon, Mail, Plus, Upload, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminGate } from "@/components/admin/AdminGate";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  component: () => (
    <AdminGate title="Dashboard">
      <DashboardContent />
    </AdminGate>
  ),
  head: () => ({ meta: [{ title: "Admin · Dashboard" }, { name: "robots", content: "noindex" }] }),
});

function DashboardContent() {
  const { data: counts } = useQuery({
    queryKey: ["admin", "counts"],
    queryFn: async () => {
      const [projects, posts, images, unread] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("gallery_images").select("*", { count: "exact", head: true }),
        supabase.from("messages").select("*", { count: "exact", head: true }).eq("read", false),
      ]);
      return {
        projects: projects.count ?? 0,
        posts: posts.count ?? 0,
        images: images.count ?? 0,
        unread: unread.count ?? 0,
      };
    },
  });

  const stats = [
    { label: "Projects", value: counts?.projects ?? 0, icon: Briefcase, color: "text-emerald-400" },
    { label: "Blog Posts", value: counts?.posts ?? 0, icon: BookOpen, color: "text-sky-400" },
    { label: "Gallery Images", value: counts?.images ?? 0, icon: ImageIcon, color: "text-pink-400" },
    { label: "Unread Messages", value: counts?.unread ?? 0, icon: Mail, color: "text-amber-400" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-xl border border-[#1F1F1F] bg-[#141414] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#888]">{s.label}</span>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="mt-3 text-3xl font-bold">{s.value}</div>
            </div>
          );
        })}
      </div>

      <section className="rounded-xl border border-[#1F1F1F] bg-[#141414] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#888]">
          Quick actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/admin/projects/new"><Plus className="mr-2 h-4 w-4" /> New Project</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/blog/new"><Plus className="mr-2 h-4 w-4" /> New Blog Post</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/gallery"><Upload className="mr-2 h-4 w-4" /> Upload Image</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/messages"><Eye className="mr-2 h-4 w-4" /> View Messages</Link>
          </Button>
        </div>
      </section>

      <section className="rounded-xl border border-[#1F1F1F] bg-[#141414] p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#888]">
          Welcome
        </h2>
        <p className="text-sm text-[#bbb]">
          This is your portfolio control center. Use the sidebar to edit content, customise
          the theme in <Link className="text-[var(--accent)]" to="/admin/appearance">Appearance</Link>,
          and manage incoming messages. Every change you save here goes live on the public
          site on the next page load.
        </p>
      </section>
    </div>
  );
}
