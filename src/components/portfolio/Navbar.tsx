import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding,background] duration-300",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="mx-auto max-w-7xl px-5">
          <div className={cn(
            "glass flex items-center justify-between rounded-pill border border-white/5 px-4 py-2.5 transition-all",
            scrolled && "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]",
          )}>
            <a href="#hero" className="group flex items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground font-display text-lg font-bold transition-transform group-hover:rotate-12">
                A
                <span className="absolute inset-0 rounded-full pulse-ring" />
              </span>
              <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
                alex<span className="text-accent">.</span>wallace
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-px scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="hidden rounded-full bg-accent px-4 font-medium text-accent-foreground hover:bg-accent/90 sm:inline-flex">
                <a href="#contact">
                  Let's Talk <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground md:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between p-5">
              <span className="font-display text-lg font-bold">menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 pt-10">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                  className="border-b border-border py-5 font-display text-4xl font-bold tracking-tight hover:text-accent"
                >
                  {l.label}.
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 grid place-items-center rounded-pill bg-accent py-4 font-medium text-accent-foreground"
              >
                Let's Talk →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
