import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminGate } from "@/components/admin/AdminGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/projects/new")({
  component: () => <AdminGate title="New Project"><ProjectForm /></AdminGate>,
  head: () => ({ meta: [{ title: "Admin · New Project" }, { name: "robots", content: "noindex" }] }),
});

export const EditRoute = createFileRoute("/admin/projects/$id")({
  component: () => <AdminGate title="Edit Project"><ProjectForm /></AdminGate>,
  head: () => ({ meta: [{ title: "Admin · Edit Project" }, { name: "robots", content: "noindex" }] }),
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ProjectForm() {
  const navigate = useNavigate();
  const params = (Route as any).useParams?.() ?? {};
  const id = (params.id as string | undefined) ?? null;
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    cover_image_url: "",
    category: "UI & UX",
    tags: "",
    role: "",
    tools: "",
    live_url: "",
    github_url: "",
    status: "draft" as "draft" | "published",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    supabase.from("projects").select("*").eq("id", id!).single().then(({ data }) => {
      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          description: data.description ?? "",
          cover_image_url: data.cover_image_url ?? "",
          category: data.category ?? "UI & UX",
          tags: (data.tags ?? []).join(", "),
          role: data.role ?? "",
          tools: (data.tools ?? []).join(", "),
          live_url: data.live_url ?? "",
          github_url: data.github_url ?? "",
          status: (data.status as "draft" | "published") ?? "draft",
        });
      }
      setLoading(false);
    });
  }, [id, isEdit]);

  async function uploadCover(file: File) {
    const path = `projects/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("portfolio-media").upload(path, file);
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("portfolio-media").getPublicUrl(path);
    setForm((f) => ({ ...f, cover_image_url: data.publicUrl }));
    toast.success("Image uploaded");
  }

  async function save(publish = false) {
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      description: form.description,
      cover_image_url: form.cover_image_url || null,
      category: form.category,
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      role: form.role,
      tools: form.tools.split(",").map((s) => s.trim()).filter(Boolean),
      live_url: form.live_url || null,
      github_url: form.github_url || null,
      status: publish ? "published" : form.status,
    };
    const q = isEdit
      ? supabase.from("projects").update(payload).eq("id", id!)
      : supabase.from("projects").insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    navigate({ to: "/admin/projects" });
  }

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save(); }}
      className="max-w-3xl space-y-5 rounded-xl border border-[#1F1F1F] bg-[#141414] p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })} required className="mt-1 bg-[#1A1A1A]" />
        </div>
        <div>
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1 bg-[#1A1A1A]" />
        </div>
      </div>

      <div>
        <Label>Cover image</Label>
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} className="mt-1 block w-full text-sm" />
        {form.cover_image_url && <img src={form.cover_image_url} alt="" className="mt-2 max-h-40 rounded-md object-cover" />}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Category</Label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 h-9 w-full rounded-md border border-[#252525] bg-[#1A1A1A] px-2 text-sm">
            {["UI & UX", "Web Design", "Branding", "Graphic Design", "Web Dev"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <Label>Status</Label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })} className="mt-1 h-9 w-full rounded-md border border-[#252525] bg-[#1A1A1A] px-2 text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 bg-[#1A1A1A]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Tags (comma separated)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="mt-1 bg-[#1A1A1A]" /></div>
        <div><Label>Tools (comma separated)</Label><Input value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })} className="mt-1 bg-[#1A1A1A]" /></div>
        <div><Label>Role</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1 bg-[#1A1A1A]" /></div>
        <div><Label>Live URL</Label><Input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} className="mt-1 bg-[#1A1A1A]" /></div>
        <div className="sm:col-span-2"><Label>GitHub URL</Label><Input value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} className="mt-1 bg-[#1A1A1A]" /></div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save</Button>
        <Button type="button" variant="outline" onClick={() => save(true)} disabled={saving}>Save & Publish</Button>
      </div>
    </form>
  );
}
