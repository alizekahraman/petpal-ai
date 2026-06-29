"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type TagColor = "teal" | "sage" | "lavender" | "peach" | "neutral";

const colorMap: Record<TagColor, string> = {
  teal:     "bg-teal-light text-teal border-teal/20 hover:border-teal/40",
  sage:     "bg-sage-light text-sage border-sage/20 hover:border-sage/40",
  lavender: "bg-lavender-light text-lavender border-lavender/20 hover:border-lavender/40",
  peach:    "bg-peach-light text-peach border-peach/20 hover:border-peach/40",
  neutral:  "bg-muted text-muted-foreground border-border hover:border-border/80",
};

const closeColorMap: Record<TagColor, string> = {
  teal:     "hover:bg-teal/20",
  sage:     "hover:bg-sage/20",
  lavender: "hover:bg-lavender/20",
  peach:    "hover:bg-peach/20",
  neutral:  "hover:bg-foreground/10",
};

export interface TagProps {
  children: React.ReactNode;
  color?: TagColor;
  icon?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
  size?: "sm" | "md";
}

export function Tag({ children, color = "neutral", icon, onRemove, className, size = "md" }: TagProps) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "inline-flex items-center gap-1.5 font-medium border rounded-full transition-colors",
        size === "sm" ? "text-[10px] px-2 py-0.5 gap-1" : "text-xs px-2.5 py-1",
        colorMap[color],
        className
      )}
    >
      {icon && (
        <span className="shrink-0 [&>svg]:w-3 [&>svg]:h-3">{icon}</span>
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "shrink-0 rounded-full p-0.5 transition-colors",
            closeColorMap[color]
          )}
        >
          <X className="w-2.5 h-2.5" />
        </button>
      )}
    </motion.span>
  );
}

/* ── TagList: manages a list of dismissible tags ── */
export interface TagListProps {
  tags: Array<{ id: string; label: string; color?: TagColor; icon?: React.ReactNode }>;
  onRemove?: (id: string) => void;
  size?: "sm" | "md";
  className?: string;
}

export function TagList({ tags, onRemove, size, className }: TagListProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      <AnimatePresence>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            color={tag.color}
            icon={tag.icon}
            size={size}
            onRemove={onRemove ? () => onRemove(tag.id) : undefined}
          >
            {tag.label}
          </Tag>
        ))}
      </AnimatePresence>
    </div>
  );
}
