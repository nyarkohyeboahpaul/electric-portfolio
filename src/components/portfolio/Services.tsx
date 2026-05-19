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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-colors lg:p-7",
        featured
          ? "border-transparent bg-accent text-accent-foreground"
          : "border-border bg-surface hover:border-accent/40",
      )}
    >
      {!featured && (
        <span className="absolute left-0 top-6 h-12 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
      )}

      <div className="flex items-start justify-between">
        <div className={cn(
          "grid h-12 w-12 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[15deg]",
          featured ? "bg-accent-foreground/10 text-accent-foreground" : "bg-accent-dim text-accent",
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className={cn("h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1", featured ? "text-accent-foreground/70" : "text-muted-foreground")} />
      </div>

      <div className={cn("mt-6 text-[10px] uppercase tracking-[0.2em] lg:mt-8", featured ? "text-accent-foreground/70" : "text-muted-foreground")}>
        {s.count}
      </div>
      <h3 className={cn("mt-2 font-display text-xl font-bold lg:text-2xl", featured ? "text-accent-foreground" : "text-foreground")}>
        {s.title}
      </h3>
      <p className={cn("mt-3 text-sm", featured ? "text-accent-foreground/80" : "text-muted-foreground")}>
        {s.description}
      </p>
    </motion.article>
  );
}

export function Services() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <SectionHeading
          eyebrow="What I do"
          title="Services"
          subtitle="Six things I do well. Most clients hire me for two or three at a time."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
