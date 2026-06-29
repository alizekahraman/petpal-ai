"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatColor = "teal" | "sage" | "lavender" | "peach";

const colorConfig: Record<StatColor, { icon: string; bg: string; ring: string }> = {
  teal:     { icon: "text-teal",     bg: "bg-teal-light",     ring: "ring-teal/20" },
  sage:     { icon: "text-sage",     bg: "bg-sage-light",     ring: "ring-sage/20" },
  lavender: { icon: "text-lavender", bg: "bg-lavender-light", ring: "ring-lavender/20" },
  peach:    { icon: "text-peach",    bg: "bg-peach-light",    ring: "ring-peach/20" },
};

/* Animated counter */
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    const controls = animate(mv, value, { duration: 0.8, ease: "easeOut" });
    const unsub = rounded.on("change", setDisplay);
    return () => { controls.stop(); unsub(); };
  }, [value]);

  return <>{display}{suffix}</>;
}

export interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color?: StatColor;
  trend?: { value: number; label: string };
  description?: string;
  suffix?: string;
  animateValue?: boolean;
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  color = "teal",
  trend,
  description,
  suffix = "",
  animateValue = true,
  className,
  onClick,
}: StatCardProps) {
  const c = colorConfig[color];
  const isNumeric = typeof value === "number";

  return (
    <motion.div
      className={cn(
        "bg-card rounded-2xl border border-border/50 shadow-card p-4",
        onClick && "cursor-pointer",
        className
      )}
      whileHover={onClick ? { y: -2, boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.07)" } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>

          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {isNumeric && animateValue ? (
              <AnimatedNumber value={value as number} suffix={suffix} />
            ) : (
              <>{value}{suffix}</>
            )}
          </p>

          {trend && (
            <div className="flex items-center gap-1">
              {trend.value >= 0 ? (
                <TrendingUp className="w-3 h-3 text-sage" />
              ) : (
                <TrendingDown className="w-3 h-3 text-destructive" />
              )}
              <p className="text-[11px] text-muted-foreground">
                <span className={trend.value >= 0 ? "text-sage font-medium" : "text-destructive font-medium"}>
                  {trend.value >= 0 ? "+" : ""}{trend.value}%
                </span>{" "}
                {trend.label}
              </p>
            </div>
          )}

          {description && !trend && (
            <p className="text-[11px] text-muted-foreground">{description}</p>
          )}
        </div>

        <div className={cn("p-2.5 rounded-xl ring-1 shrink-0", c.bg, c.ring)}>
          <Icon className={cn("w-4 h-4", c.icon)} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Horizontal stat (for lists) ── */
export function StatRow({ label, value, icon: Icon, color = "teal", className }: Omit<StatCardProps, "trend" | "animateValue">) {
  const c = colorConfig[color];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("p-2 rounded-lg shrink-0", c.bg)}>
        <Icon className={cn("w-3.5 h-3.5", c.icon)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
