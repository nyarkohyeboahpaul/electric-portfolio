import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { gallery, galleryFilters, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = gallery.filter((g) => filter === "All" || g.category === filter);
  const current: GalleryItem | null = active != null ? filtered[active] : null;

  const next = useCallback(() => setActive((i) => (i == null ? null : (i + 1) % filtered.length)), [filtered.length]);
  const prev = useCallback(() => setActive((i) => (i == null ? null : (i - 1 + filtered.length) % filtered.length)), [filtered.length]);

  useEffect(() => {
    if (active == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, next, prev]);

  return (
    <section className="relative py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <SectionHeading
          eyebrow="Visual work"
          title="Gallery"
          subtitle="A curated collection of design work, experiments, and creative explorations."
        />

        <div className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:px-0 lg:mt-10">
          {galleryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "shrink-0 rounded-pill border px-4 py-2 text-xs font-medium transition-all min-h-[36px]",
                filter === f
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* True CSS-columns masonry */}
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          <AnimatePresence>
            {filtered.map((g, i) => (
              <motion.button
                key={g.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                onClick={() => setActive(i)}
                className="group relative mb-4 block w-full overflow-hidden rounded-lg border border-border bg-surface text-left break-inside-avoid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/85 via-background/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex w-fit rounded-pill bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-foreground">
                    {g.category}
                  </span>
                  <div className="mt-2 font-display text-base font-semibold text-foreground">{g.title}</div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex flex-col bg-background/95 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <div className="flex items-center justify-between p-4 sm:p-6">
              <span className="rounded-pill border border-border bg-surface/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent">
                {current.category}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setActive(null); }}
                aria-label="Close lightbox"
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/80 backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden p-2 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface/80 backdrop-blur sm:grid hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.src}
                  alt={current.title}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) next();
                    else if (info.offset.x > 60) prev();
                  }}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-full max-w-full rounded-lg object-contain shadow-glow"
                />
              </AnimatePresence>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface/80 backdrop-blur sm:grid hover:border-accent hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="border-t border-border bg-background/80 p-4 text-center sm:p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-display text-lg font-semibold lg:text-xl">{current.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{current.description}</p>
              <div className="mt-2 text-[10px] font-mono text-muted-foreground">
                {(active ?? 0) + 1} / {filtered.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
