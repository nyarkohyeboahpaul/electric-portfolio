import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { useContact } from "./__root";
import { NAME, ROLE } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `${NAME} — ${ROLE}` },
      { name: "description", content: `Portfolio of ${NAME}, independent ${ROLE.toLowerCase()} and front-end engineer in Manila.` },
      { property: "og:title", content: `${NAME} — ${ROLE}` },
      { property: "og:description", content: `Portfolio of ${NAME}, ${ROLE.toLowerCase()} in Manila. Selected work, services, and case studies.` },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const { open } = useContact();
  return <Hero onContact={open} />;
}
