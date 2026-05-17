import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./SectionHeading";
import { portfolioFilters, projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Portfolio"
            subtitle="A small slice. Ask for the full case studies over email."
          />
          <div className="flex flex-wrap gap-2">
            {portfolioFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-pill border px-4 py-1.5 text-xs font-medium transition-all",
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
          <motion.div layout className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  {/* hover overlay */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-accent/0 p-6 opacity-0 transition-all duration-300 group-hover:bg-accent/90 group-hover:opacity-100">
                    <div className="flex items-start justify-between text-accent-foreground">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">{p.category}</div>
                        <div className="mt-1 font-display text-2xl font-bold">{p.title}</div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded-pill bg-accent-foreground/10 px-2 py-0.5 text-[10px] font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                      <ArrowUpRight className="h-6 w-6 shrink-0" />
                    </div>
                  </div>
                  {/* always-on title bar */}
                  <div className="flex items-center justify-between p-5 transition-opacity group-hover:opacity-0">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{p.category}</div>
                      <div className="mt-1 font-display text-lg font-semibold">{p.title}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl border-border bg-surface">
          {active && (
            <>
              <div className="-mx-6 -mt-6 aspect-[16/9] overflow-hidden rounded-t-lg">
                <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              </div>
              <DialogHeader className="pt-4">
                <Badge variant="secondary" className="w-fit border border-border bg-surface-2 text-accent">
                  {active.category}
                </Badge>
                <DialogTitle className="font-display text-3xl">{active.title}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {active.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 grid gap-4 sm:grid-cols-2">
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
              <div className="mt-4 flex gap-3">
                {active.liveUrl && (
                  <a href={active.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-pill bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:scale-[1.02]">
                    <ExternalLink className="h-4 w-4" /> Live
                  </a>
                )}
                {active.githubUrl && (
                  <a href={active.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-pill border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent">
                    <Github className="h-4 w-4" /> Code
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
