import { motion } from "framer-motion";
import { Palette, PenTool, MonitorSmartphone, Sparkles, Wand2, LineChart, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { services, type Service } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICONS = { Palette, PenTool, MonitorSmartphone, Sparkles, Wand2, LineChart };

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const Icon = ICONS[s.icon];
  const featured = s.featured;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-7 transition-colors",
        featured
          ? "border-transparent bg-accent text-accent-foreground"
          : "border-border bg-surface hover:border-accent/40",
      )}
    >
      {!featured && (
        <span className="absolute left-0 top-6 h-12 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
      )}

      <div className="flex items-start justify-between">
        <div
          className={cn(
            "grid h-12 w-12 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[15deg]",
            featured ? "bg-accent-foreground/10 text-accent-foreground" : "bg-accent-dim text-accent",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className={cn(
          "h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1",
          featured ? "text-accent-foreground/70" : "text-muted-foreground",
        )} />
      </div>

      <div className={cn(
        "mt-8 text-[10px] uppercase tracking-[0.2em]",
        featured ? "text-accent-foreground/70" : "text-muted-foreground",
      )}>
        {s.count}
      </div>
      <h3 className={cn(
        "mt-2 font-display text-2xl font-bold",
        featured ? "text-accent-foreground" : "text-foreground",
      )}>
        {s.title}
      </h3>
      <p className={cn(
        "mt-3 text-sm",
        featured ? "text-accent-foreground/80" : "text-muted-foreground",
      )}>
        {s.description}
      </p>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What I do"
            title="Services"
            subtitle="Six things I do well. Most clients hire me for two or three at a time."
          />
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
