import { createFileRoute } from "@tanstack/react-router";
import { AdminGate } from "@/components/admin/AdminGate";
import { ProjectForm } from "./projects.new";

export const Route = createFileRoute("/admin/projects/$id")({
  component: () => (
    <AdminGate title="Edit Project">
      <ProjectForm />
    </AdminGate>
  ),
  head: () => ({
    meta: [
      { title: "Admin · Edit Project" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
