import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Navbar({ onContact }: { onContact: () => void }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-x-0 top-0 z-50 py-3 lg:py-4"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "glass flex h-14 items-center justify-between rounded-pill border border-white/5 px-3 sm:px-4 lg:h-16 transition-shadow",
            scrolled && "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]",
          )}
        >
          <Link to="/" className="group flex items-center gap-2.5 min-h-[44px] px-1">
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground font-display text-lg font-bold transition-transform group-hover:rotate-12">
              A
              <span className="absolute inset-0 rounded-full pulse-ring" />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              alex<span className="text-accent">.</span>wallace
            </span>
          </Link>

          {/* Desktop nav links (md+) */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "group relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    active ? "text-accent" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onContact}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 sm:px-4"
          >
            Let's Talk <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
