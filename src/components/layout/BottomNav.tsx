import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, User, FileText, FolderOpen, BookOpen, Image as ImageIcon } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICONS = { Home, User, FileText, FolderOpen, BookOpen, Image: ImageIcon };

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Primary"
      className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-1 pt-1.5">
        {navLinks.map((l) => {
          const Icon = ICONS[l.icon];
          const active = pathname === l.to;
          return (
            <li key={l.to} className="flex-1">
              <Link
                to={l.to}
                className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1"
              >
                <motion.span
                  animate={{ scale: active ? 1.1 : 1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  className={cn("grid place-items-center", active ? "text-accent" : "text-white/40")}
                >
                  <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 2} />
                </motion.span>
                <span
                  className={cn(
                    "text-[10px] font-medium leading-none",
                    active ? "text-accent" : "text-white/40",
                  )}
                >
                  {l.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
