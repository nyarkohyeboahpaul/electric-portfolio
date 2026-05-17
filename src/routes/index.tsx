import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Skills } from "@/components/portfolio/Skills";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { NAME, ROLE, EMAIL, socials } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `${NAME} — ${ROLE} in Manila` },
      {
        name: "description",
        content: `${NAME} is an independent ${ROLE.toLowerCase()} and front-end engineer in Manila. Eight years designing calm, fast, considered software for venture-backed teams.`,
      },
      { property: "og:title", content: `${NAME} — ${ROLE}` },
      { property: "og:description", content: `Portfolio of ${NAME}, ${ROLE.toLowerCase()} in Manila. Selected work, services, and case studies.` },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${NAME} — ${ROLE}` },
      { name: "twitter:description", content: `Portfolio of ${NAME}, ${ROLE.toLowerCase()} in Manila.` },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: NAME,
          jobTitle: ROLE,
          email: `mailto:${EMAIL}`,
          address: { "@type": "PostalAddress", addressLocality: "Manila", addressCountry: "PH" },
          sameAs: socials.map((s) => s.href),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}
