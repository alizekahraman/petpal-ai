"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Syringe, Stethoscope, Pill, Scissors, Smile, Weight,
  UtensilsCrossed, Calendar, HeartPulse, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ds/badge";
import type { HealthEventType } from "@/types";

type TimelineType = HealthEventType | "feeding" | "reminder" | "general";

const typeConfig: Record<TimelineType, {
  icon: LucideIcon;
  color: "teal" | "sage" | "lavender" | "peach" | "neutral";
  bg: string;
  iconColor: string;
}> = {
  vaccination:  { icon: Syringe,         color: "sage",     bg: "bg-sage-light",     iconColor: "text-sage" },
  vet_visit:    { icon: Stethoscope,      color: "teal",     bg: "bg-teal-light",     iconColor: "text-teal" },
  medication:   { icon: Pill,             color: "lavender", bg: "bg-lavender-light", iconColor: "text-lavender" },
  surgery:      { icon: HeartPulse,       color: "peach",    bg: "bg-peach-light",    iconColor: "text-peach" },
  dental:       { icon: Smile,            color: "teal",     bg: "bg-teal-light",     iconColor: "text-teal" },
  grooming:     { icon: Scissors,         color: "lavender", bg: "bg-lavender-light", iconColor: "text-lavender" },
  weight:       { icon: Weight,           color: "neutral",  bg: "bg-muted",          iconColor: "text-muted-foreground" },
  other:        { icon: HeartPulse,       color: "neutral",  bg: "bg-muted",          iconColor: "text-muted-foreground" },
  feeding:      { icon: UtensilsCrossed,  color: "peach",    bg: "bg-peach-light",    iconColor: "text-peach" },
  reminder:     { icon: Calendar,         color: "lavender", bg: "bg-lavender-light", iconColor: "text-lavender" },
  general:      { icon: Calendar,         color: "neutral",  bg: "bg-muted",          iconColor: "text-muted-foreground" },
};

export interface TimelineItemProps {
  type?: TimelineType;
  title: string;
  description?: string;
  date: string;
  badge?: string;
  meta?: string;
  nextDue?: string;
  isLast?: boolean;
  icon?: LucideIcon;
  animate?: boolean;
  index?: number;
  action?: React.ReactNode;
  className?: string;
}

export function TimelineItem({
  type = "general",
  title,
  description,
  date,
  badge,
  meta,
  nextDue,
  isLast = false,
  icon: CustomIcon,
  animate = true,
  index = 0,
  action,
  className,
}: TimelineItemProps) {
  const config = typeConfig[type];
  const Icon = CustomIcon ?? config.icon;

  const content = (
    <div className={cn("flex gap-4", className)}>
      {/* Left: icon + connector */}
      <div className="flex flex-col items-center shrink-0">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", config.bg)}>
          <Icon className={cn("w-4 h-4", config.iconColor)} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-border/60 my-2 min-h-[20px]" />
        )}
      </div>

      {/* Right: content */}
      <div className={cn("flex-1 min-w-0", !isLast && "pb-5")}>
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-foreground leading-tight">{title}</p>
            {badge && (
              <Badge color={config.color} variant="soft" size="xs" className="capitalize">
                {badge}
              </Badge>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {description && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
        )}

        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <p className="text-[11px] text-muted-foreground/70">
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {meta && (
            <>
              <span className="text-[11px] text-muted-foreground/40">·</span>
              <p className="text-[11px] text-muted-foreground/70">{meta}</p>
            </>
          )}
        </div>

        {nextDue && (
          <p className="text-[11px] text-primary/80 mt-1 font-medium">
            Next due: {new Date(nextDue).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        )}
      </div>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}

/* ── Timeline wrapper ── */
export function Timeline({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-0", className)}>{children}</div>;
}
