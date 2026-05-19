import { createFileRoute } from "@tanstack/react-router";
import { ResumeContent } from "@/components/portfolio/Resume";
import { NAME } from "@/lib/data";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
  head: () => ({
    meta: [
      { title: `Resume — ${NAME}` },
      { name: "description", content: `Resume of ${NAME} — work experience, education, technical skills and certifications.` },
      { property: "og:title", content: `Resume — ${NAME}` },
      { property: "og:description", content: `Eight years of product design and front-end engineering, summarised.` },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
});

function ResumePage() {
  return (
    <>
      <div className="pt-20 lg:pt-28" />
      <ResumeContent />
    </>
  );
}
