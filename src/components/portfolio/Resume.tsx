import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Award, BadgeCheck, ShieldCheck, Download } from "lucide-react";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { experiences, education, skillGroups, certifications } from "@/lib/data";

const CERT_ICONS = { Award, BadgeCheck, ShieldCheck };

function SkillBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-xs text-accent">{percentage}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${percentage}%` : 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
        />
      </div>
    </div>
  );
}

function TimelineEntry({ children, i }: { children: React.ReactNode; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative pl-6 lg:pl-8"
    >
      <span className="absolute left-0 top-2 grid h-3 w-3 -translate-x-[5px] place-items-center rounded-full bg-accent shadow-[0_0_0_4px_var(--background)]" />
      {children}
    </motion.li>
  );
}

export function ResumeContent() {
  useEffect(() => {
    // GSAP optional enhancement (lightweight: framer already handles primary reveals)
  }, []);

  return (
    <section className="relative py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="My background"
            title="Resume"
            subtitle="Eight years of shipping product design, brand systems, and front-end code for venture-backed teams."
          />
          <div className="mt-6">
            <a
              href="/files/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform active:scale-[0.98] hover:shadow-glow"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Experience + Education */}
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-accent">Work Experience</div>
            <ul className="mt-6 space-y-7 border-l border-border lg:ml-1">
              {experiences.map((e, i) => (
                <TimelineEntry key={e.id} i={i}>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{e.period}</div>
                  <h3 className="mt-1 font-display text-xl font-semibold lg:text-2xl">{e.role}</h3>
                  <div className="text-sm font-medium text-accent">{e.company}</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {e.bullets.map((b, k) => (
                      <li key={k} className="leading-relaxed">— {b}</li>
                    ))}
                  </ul>
                </TimelineEntry>
              ))}
            </ul>

            <div className="mt-14 text-xs uppercase tracking-[0.22em] text-accent">Education</div>
            <ul className="mt-6 space-y-7 border-l border-border lg:ml-1">
              {education.map((e, i) => (
                <TimelineEntry key={e.id} i={i}>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{e.period}</div>
                  <h3 className="mt-1 font-display text-xl font-semibold">{e.degree}</h3>
                  <div className="text-sm font-medium text-accent">{e.school}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
                </TimelineEntry>
              ))}
            </ul>
          </div>

          {/* RIGHT: Skills + Certifications */}
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-accent">Technical Skills</div>
            <div className="mt-6 space-y-8">
              {skillGroups.map((g) => (
                <div key={g.label}>
                  <h4 className="mb-4 font-display text-base font-semibold">{g.label}</h4>
                  <div className="space-y-4">
                    {g.items.map((it, i) => (
                      <SkillBar key={it.name} {...it} delay={i * 0.08} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 text-xs uppercase tracking-[0.22em] text-accent">Certifications</div>
            <ul className="mt-6 space-y-3">
              {certifications.map((c) => {
                const Icon = CERT_ICONS[c.icon];
                return (
                  <li
                    key={c.id}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4 transition-colors hover:border-accent/40"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-dim text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold leading-tight">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.issuer}</div>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">{c.year}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
