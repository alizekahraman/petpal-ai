"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PawPrint,
  HeartPulse,
  UtensilsCrossed,
  Calendar,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/pets", label: "My Pets", icon: PawPrint },
  { href: "/health", label: "Health", icon: HeartPulse },
  { href: "/feeding", label: "Feeding", icon: UtensilsCrossed },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen bg-sidebar border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
          <PawPrint className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-base text-sidebar-foreground tracking-tight">
          {siteConfig.name}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {label === "AI Assistant" && (
                <span className="ml-auto text-[10px] font-semibold bg-primary/15 text-primary rounded-full px-1.5 py-0.5">
                  NEW
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-0.5">
        {bottomItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors">
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
