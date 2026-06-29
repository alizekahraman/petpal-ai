"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, PawPrint, HeartPulse, Calendar, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",    label: "Home",     icon: LayoutDashboard },
  { href: "/pets",         label: "Pets",     icon: PawPrint },
  { href: "/health",       label: "Health",   icon: HeartPulse },
  { href: "/schedule",     label: "Schedule", icon: Calendar },
  { href: "/ai-assistant", label: "AI",       icon: Sparkles },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-border/50">
      <div className="flex items-center justify-around px-1 py-2 pb-safe">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl min-w-[56px]"
            >
              {/* Active background pill */}
              <AnimatePresence>
                {active && (
                  <motion.span
                    layoutId="mobile-nav-pill"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={{ y: active ? -1 : 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-150",
                    active ? "text-primary stroke-[2.5px]" : "text-muted-foreground"
                  )}
                />
              </motion.div>

              <span className={cn(
                "text-[10px] font-medium transition-colors duration-150 relative",
                active ? "text-primary" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
