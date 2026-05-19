import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { NAME } from "@/lib/data";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: `Projects — ${NAME}` },
      { name: "description", content: `Selected product, brand and web projects shipped by ${NAME} for venture-backed teams.` },
      { property: "og:title", content: `Projects — ${NAME}` },
      { property: "og:description", content: `Selected work — UI/UX, branding, web development, motion.` },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
});

function ProjectsPage() {
  return (
    <>
      <div className="pt-20 lg:pt-28" />
      <Portfolio />
      <Testimonials />
    </>
  );
}
