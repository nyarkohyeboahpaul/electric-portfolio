import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[i];

  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <SectionHeading eyebrow="Kind words" title="What clients say" align="center" />

        <div
          className="relative mx-auto mt-10 max-w-3xl lg:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="absolute -top-6 left-0 h-12 w-12 text-accent/15 lg:h-16 lg:w-16" aria-hidden />
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border bg-surface p-5 lg:p-12">
            <AnimatePresence mode="wait" custom={i}>
              <motion.div
                key={t.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) setI((p) => (p + 1) % testimonials.length);
                  else if (info.offset.x > 60) setI((p) => (p - 1 + testimonials.length) % testimonials.length);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 font-display text-lg font-medium leading-snug lg:text-2xl">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-4 lg:mt-8">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground font-display text-lg font-bold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, k) => (
              <button
                key={k}
                aria-label={`Show testimonial ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all min-w-[24px] min-h-[24px] grid place-items-center`}
              >
                <span className={`block h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-1.5 bg-border"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
