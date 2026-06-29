"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, PawPrint, HeartPulse, UtensilsCrossed,
  Calendar, Sparkles, Settings, LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ds/avatar";
import { Badge } from "@/components/ds/badge";
import { siteConfig } from "@/config/site";

const navItems = [
  { href: "/dashboard",    label: "Home",         icon: LayoutDashboard },
  { href: "/pets",         label: "My Pets",      icon: PawPrint },
  { href: "/health",       label: "Health",        icon: HeartPulse },
  { href: "/feeding",      label: "Feeding",       icon: UtensilsCrossed },
  { href: "/schedule",     label: "Schedule",      icon: Calendar },
  { href: "/ai-assistant", label: "AI Assistant",  icon: Sparkles, badge: "NEW" },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 232 }}
      transition={{ duration: 0.22 }}
      className={cn(
        "hidden md:flex flex-col min-h-screen bg-sidebar border-r border-sidebar-border shrink-0 overflow-hidden",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-3.5 py-4 border-b border-sidebar-border shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            <PawPrint className="w-4 h-4 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="font-semibold text-sm text-sidebar-foreground tracking-tight overflow-hidden whitespace-nowrap"
              >
                {siteConfig.name}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          {collapsed
            ? <ChevronRight className="w-3.5 h-3.5" />
            : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-none">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} className="block relative">
              <motion.div
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/65 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
                whileHover={{ x: 1 }}
                transition={{ duration: 0.1 }}
              >
                {/* Active bar */}
                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                <Icon className={cn("w-4 h-4 shrink-0", active && "stroke-[2.5px]")} />

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex-1 truncate"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {!collapsed && badge && (
                  <Badge color="primary" variant="soft" size="xs" className="ml-auto shrink-0">
                    {badge}
                  </Badge>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-sidebar-border space-y-0.5 shrink-0">
        {bottomItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}>
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/65 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
                whileHover={{ x: 1 }}
                transition={{ duration: 0.1 }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}

        {/* User row */}
        <div className={cn(
          "flex items-center gap-2.5 px-3 py-2.5 rounded-xl mt-1",
          "text-sidebar-foreground/65 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
          "transition-colors cursor-pointer"
        )}>
          <Avatar name="Jane Doe" size="sm" className="shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0"
              >
                <p className="text-xs font-medium text-sidebar-foreground truncate">Jane Doe</p>
                <p className="text-[10px] text-muted-foreground truncate">jane@example.com</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && <LogOut className="w-3.5 h-3.5 shrink-0 ml-auto" />}
        </div>
      </div>
    </motion.aside>
  );
}
