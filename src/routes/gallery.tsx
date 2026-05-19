import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/portfolio/Gallery";
import { NAME } from "@/lib/data";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: `Gallery — ${NAME}` },
      { name: "description", content: `Visual work, experiments and creative explorations by ${NAME}.` },
      { property: "og:title", content: `Gallery — ${NAME}` },
      { property: "og:description", content: `A curated masonry collection of UI design, illustrations, photography and 3D work.` },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

function GalleryPage() {
  return (
    <>
      <div className="pt-20 lg:pt-28" />
      <Gallery />
    </>
  );
}
