import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Send } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { SectionHeading } from "./SectionHeading";
import { EMAIL, skills, stats } from "@/lib/data";

function SkillBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between text-sm">
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

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:items-center md:gap-16">
        {/* Photo + chips */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border-l-2 border-accent bg-surface">
            <img
              src={portrait}
              alt="Alex Wallace working in his Manila studio"
              loading="lazy"
              width={896}
              height={1152}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          </div>
          {/* floating chips */}
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 220, damping: 18 }}
              className="glass absolute rounded-2xl border border-border px-4 py-3 shadow-glow"
              style={{
                top: i === 0 ? "8%" : i === 1 ? "44%" : "78%",
                right: i % 2 === 0 ? "-18px" : "auto",
                left: i % 2 === 1 ? "-22px" : "auto",
              }}
            >
              <div className="font-display text-2xl font-bold leading-none">
                {s.value}
                <span className="text-accent">{s.suffix}</span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <div>
          <SectionHeading
            eyebrow="Let me introduce myself"
            title="About me"
            subtitle="A story of hard work, late kerning, and on-time deliveries."
          />
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              I started designing in 2017 in a Quezon City coffee shop with a
              borrowed MacBook and an unreasonable amount of optimism. Today I lead
              product design for venture-backed teams across Manila, Singapore and
              San Francisco — building software people actually want to use.
            </p>
            <p>
              I care about the boring parts: form states, empty states, error
              copy, the keyboard flow nobody else tests. Beautiful is easy.
              Beautiful <em>and</em> usable, on a deadline, is the job.
            </p>
          </div>

          <p className="mt-6 text-sm">
            <span className="text-muted-foreground">Reach me at</span>{" "}
            <a href={`mailto:${EMAIL}`} className="font-medium text-accent underline-offset-4 hover:underline">
              {EMAIL}
            </a>
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]">
              <Send className="h-4 w-4" /> Hire Me
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-pill border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>

          <div className="mt-10 space-y-5">
            {skills.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
