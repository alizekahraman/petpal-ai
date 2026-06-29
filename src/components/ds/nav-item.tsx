"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface NavItemProps {
  href?: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  badge?: string | number;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  collapsed?: boolean;
  className?: string;
}

export function NavItem({
  href,
  label,
  icon: Icon,
  active,
  badge,
  disabled,
  onClick,
  children,
  collapsed,
  className,
}: NavItemProps) {
  const [open, setOpen] = React.useState(active);

  const hasChildren = React.Children.count(children) > 0;

  const inner = (
    <motion.span
      className={cn(
        "relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium",
        "transition-colors duration-150 select-none",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/65 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      whileHover={{ x: disabled ? 0 : 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {/* Active indicator */}
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="nav-active"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {Icon && (
        <Icon className={cn("w-4 h-4 shrink-0", active && "stroke-[2.5px]")} />
      )}

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>

          {badge !== undefined && (
            <span className={cn(
              "ml-auto text-[10px] font-semibold rounded-full px-1.5 py-0.5 min-w-[20px] text-center shrink-0",
              typeof badge === "number"
                ? "bg-primary/15 text-primary"
                : "bg-primary/15 text-primary"
            )}>
              {badge}
            </span>
          )}

          {hasChildren && (
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.18 }}
              className="ml-auto shrink-0"
            >
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.span>
          )}
        </>
      )}
    </motion.span>
  );

  const handleClick = () => {
    if (hasChildren) setOpen((v) => !v);
    onClick?.();
  };

  const wrapped = href && !hasChildren ? (
    <Link href={href} className="block" onClick={onClick}>
      {inner}
    </Link>
  ) : (
    <button type="button" className="w-full text-left" onClick={handleClick}>
      {inner}
    </button>
  );

  return (
    <div>
      {wrapped}
      {/* Sub-items */}
      <AnimatePresence initial={false}>
        {hasChildren && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden pl-7 mt-0.5 space-y-0.5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Sub nav item (indented child) ── */
export function SubNavItem({ href, label, active, onClick }: Omit<NavItemProps, "icon" | "children" | "collapsed">) {
  return (
    <Link
      href={href ?? "#"}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/55 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
      )}
    >
      <span className="w-1 h-1 rounded-full bg-current opacity-50 shrink-0" />
      {label}
    </Link>
  );
}
