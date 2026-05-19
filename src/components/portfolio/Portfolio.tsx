import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { portfolioFilters, projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects"
            subtitle="A small slice. Ask for the full case studies over email."
          />
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
            {portfolioFilters.map((f) => (
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
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:mt-14 lg:grid-cols-4 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.button
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                  onClick={() => setActive(p)}
                  className="group relative block overflow-hidden rounded-2xl border border-border bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      width={1280}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-accent/0 p-5 opacity-0 transition-all duration-300 group-hover:bg-accent/90 group-hover:opacity-100">
                    <div className="flex items-start justify-between text-accent-foreground">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">{p.category}</div>
                        <div className="mt-1 font-display text-xl font-bold lg:text-2xl">{p.title}</div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded-pill bg-accent-foreground/10 px-2 py-0.5 text-[10px] font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                      <ArrowUpRight className="h-6 w-6 shrink-0" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 transition-opacity group-hover:opacity-0 lg:p-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{p.category}</div>
                      <div className="mt-1 font-display text-base font-semibold lg:text-lg">{p.title}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Detail overlay: bottom sheet on mobile, centered on desktop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-background/80 backdrop-blur-sm md:items-center"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-border bg-surface md:rounded-3xl"
            >
              <button
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-[16/9] overflow-hidden rounded-t-3xl md:rounded-t-3xl">
                <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-5 lg:p-8">
                <span className="inline-block rounded-pill border border-border bg-surface-2 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-accent">
                  {active.category}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold lg:text-3xl">{active.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{active.description}</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Role</div>
                    <div className="mt-1 text-sm font-medium">{active.role}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Tools</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {active.tools.map((t) => (
                        <span key={t} className="rounded-pill border border-border px-2 py-0.5 text-xs">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: active.slug }}
                    onClick={() => setActive(null)}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-pill bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
                  >
                    Read case study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {active.liveUrl && (
                    <a href={active.liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent">
                      <ExternalLink className="h-4 w-4" /> Live
                    </a>
                  )}
                  {active.githubUrl && (
                    <a href={active.githubUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
