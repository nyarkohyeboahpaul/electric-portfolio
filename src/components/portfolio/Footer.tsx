import { Github, Linkedin, Twitter, Dribbble, Instagram, Heart } from "lucide-react";
import { NAME, navLinks, socials } from "@/lib/data";

const ICONS = { Github, Linkedin, Twitter, Dribbble, Instagram };

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#hero" className="inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-display text-lg font-bold text-accent-foreground">A</span>
              <span className="font-display text-base font-semibold">alex<span className="text-accent">.</span>wallace</span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Independent product designer & front-end engineer in Manila.
              Helping teams ship calm, fast, considered software.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Navigate</div>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-foreground/80 hover:text-accent">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Elsewhere</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-accent hover:text-accent">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {NAME}. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5">
            Built with TanStack Start & <Heart className="h-3 w-3 fill-accent text-accent" />
          </span>
        </div>
      </div>
    </footer>
  );
}
