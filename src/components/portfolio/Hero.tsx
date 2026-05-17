import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { orbitSkills, stats, ROLE } from "@/lib/data";
import { useCountUp } from "@/hooks/use-count-up";

const ROLES = ["Designer.", "Developer.", "Creator."];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStart(true), 600);
    return () => clearTimeout(t);
  }, []);
  const n = useCountUp(value, 1800, start);
  return (
    <div>
      <div className="font-display text-3xl font-bold tracking-tight md:text-4xl">
        {n}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
    </div>
  );
}

function TypewriterRole() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = ROLES[i];
    const speed = del ? 55 : 95;
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1500);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((p) => (p + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return (
    <span className="text-gradient">
      {text}
      <span className="ml-1 inline-block h-[0.85em] w-[3px] -translate-y-[0.08em] bg-accent align-middle motion-safe:animate-pulse" />
    </span>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="hex-grid absolute inset-0 -z-10 opacity-50" />
      <div className="noise-bg pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-ring" />
            Hello, I'm a
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-[88px]"
          >
            UI & UX
            <br />
            <TypewriterRole />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            I'm Alex Wallace, an independent product designer in Manila helping
            startups and teams ship calm, fast, and quietly opinionated digital
            products. Eight years of late-night kerning and on-time deliveries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:scale-[1.02] hover:shadow-glow"
            >
              View Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-pill border border-border bg-surface/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {stats.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </motion.div>
        </div>

        {/* Right — Portrait + orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto aspect-square w-full max-w-[480px]"
        >
          {/* gradient ring */}
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_140deg,theme(colors.accent),transparent_40%,theme(colors.accent)_70%,transparent)] opacity-80 blur-[1px]" />
          <div className="absolute inset-[8px] rounded-full bg-background" />
          <div className="absolute inset-[14px] overflow-hidden rounded-full border border-white/5">
            <img
              src={portrait}
              alt="Portrait of Alex Wallace, UI/UX designer based in Manila"
              width={896}
              height={1152}
              className="h-full w-full scale-[1.05] object-cover object-center"
              fetchPriority="high"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>

          {/* orbit badges */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {orbitSkills.map((s, i) => {
              const radius = i % 2 === 0 ? 230 : 250;
              const duration = 22 + i * 2;
              const delay = -(duration / orbitSkills.length) * i;
              return (
                <div
                  key={s}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit"
                  style={{
                    // @ts-expect-error css var
                    "--orbit-r": `${radius}px`,
                    "--orbit-d": `${duration}s`,
                    animationDelay: `${delay}s`,
                  }}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {s}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill border border-border bg-surface px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Available for projects — Q3
          </div>
        </motion.div>
      </div>
    </section>
  );
}
