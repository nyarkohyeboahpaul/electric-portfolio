import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Skills } from "@/components/portfolio/Skills";
import { useContact } from "./__root";
import { NAME } from "@/lib/data";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: `About — ${NAME}` },
      { name: "description", content: `About ${NAME}: eight years designing calm, fast, considered software for venture-backed teams in Manila and beyond.` },
      { property: "og:title", content: `About — ${NAME}` },
      { property: "og:description", content: `Background, services and toolkit of ${NAME}, an independent UI/UX designer in Manila.` },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  const { open } = useContact();
  return (
    <>
      <div className="pt-20 lg:pt-28" />
      <About onContact={open} />
      <Services />
      <Skills />
    </>
  );
}
