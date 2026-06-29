"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type EmptyStateSize = "sm" | "md" | "lg";

const sizeMap: Record<EmptyStateSize, { icon: string; iconWrap: string; title: string; desc: string; py: string }> = {
  sm: { icon: "w-5 h-5", iconWrap: "w-10 h-10 rounded-xl",  title: "text-sm",  desc: "text-xs",  py: "py-8" },
  md: { icon: "w-6 h-6", iconWrap: "w-14 h-14 rounded-2xl", title: "text-sm",  desc: "text-sm",  py: "py-12" },
  lg: { icon: "w-8 h-8", iconWrap: "w-20 h-20 rounded-3xl", title: "text-lg",  desc: "text-sm",  py: "py-20" },
};

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: EmptyStateSize;
  className?: string;
  illustration?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  size = "md",
  className,
  illustration,
}: EmptyStateProps) {
  const s = sizeMap[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex flex-col items-center justify-center text-center px-6", s.py, className)}
    >
      {illustration ?? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={cn("flex items-center justify-center bg-muted mb-4 shrink-0", s.iconWrap)}
        >
          <Icon className={cn("text-muted-foreground", s.icon)} />
        </motion.div>
      )}

      <h3 className={cn("font-semibold text-foreground mb-1", s.title)}>{title}</h3>

      {description && (
        <p className={cn("text-muted-foreground max-w-xs leading-relaxed mb-4", s.desc)}>
          {description}
        </p>
      )}

      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ── Search empty state ── */
export function SearchEmptyState({ query, className }: { query: string; className?: string }) {
  return (
    <EmptyState
      icon={Search}
      title={`No results for "${query}"`}
      description="Try adjusting your search or browse all options."
      size="sm"
      className={className}
    />
  );
}
