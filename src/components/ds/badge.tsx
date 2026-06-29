"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium rounded-full border transition-colors whitespace-nowrap",
  {
    variants: {
      color: {
        teal:        "",
        sage:        "",
        lavender:    "",
        peach:       "",
        destructive: "",
        neutral:     "",
        primary:     "",
      },
      variant: {
        soft:    "",
        solid:   "",
        outline: "",
      },
      size: {
        xs:  "text-[10px] px-1.5 py-0",
        sm:  "text-xs px-2 py-0.5",
        md:  "text-xs px-2.5 py-1",
        lg:  "text-sm px-3 py-1",
      },
    },
    compoundVariants: [
      /* soft */
      { color: "teal",        variant: "soft",    className: "bg-teal-light        text-teal        border-transparent" },
      { color: "sage",        variant: "soft",    className: "bg-sage-light        text-sage        border-transparent" },
      { color: "lavender",    variant: "soft",    className: "bg-lavender-light    text-lavender    border-transparent" },
      { color: "peach",       variant: "soft",    className: "bg-peach-light       text-peach       border-transparent" },
      { color: "destructive", variant: "soft",    className: "bg-destructive/10    text-destructive border-transparent" },
      { color: "neutral",     variant: "soft",    className: "bg-muted             text-muted-foreground border-transparent" },
      { color: "primary",     variant: "soft",    className: "bg-primary/10        text-primary     border-transparent" },
      /* solid */
      { color: "teal",        variant: "solid",   className: "bg-teal        text-white border-transparent" },
      { color: "sage",        variant: "solid",   className: "bg-sage        text-white border-transparent" },
      { color: "lavender",    variant: "solid",   className: "bg-lavender    text-white border-transparent" },
      { color: "peach",       variant: "solid",   className: "bg-peach       text-white border-transparent" },
      { color: "destructive", variant: "solid",   className: "bg-destructive text-white border-transparent" },
      { color: "neutral",     variant: "solid",   className: "bg-foreground  text-background border-transparent" },
      { color: "primary",     variant: "solid",   className: "bg-primary     text-primary-foreground border-transparent" },
      /* outline */
      { color: "teal",        variant: "outline", className: "bg-transparent text-teal        border-teal/40" },
      { color: "sage",        variant: "outline", className: "bg-transparent text-sage        border-sage/40" },
      { color: "lavender",    variant: "outline", className: "bg-transparent text-lavender    border-lavender/40" },
      { color: "peach",       variant: "outline", className: "bg-transparent text-peach       border-peach/40" },
      { color: "destructive", variant: "outline", className: "bg-transparent text-destructive border-destructive/40" },
      { color: "neutral",     variant: "outline", className: "bg-transparent text-muted-foreground border-border" },
      { color: "primary",     variant: "outline", className: "bg-transparent text-primary     border-primary/40" },
    ],
    defaultVariants: {
      color: "neutral",
      variant: "soft",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  icon?: React.ReactNode;
  animate?: boolean;
}

const dotColorMap: Record<string, string> = {
  teal:        "bg-teal",
  sage:        "bg-sage",
  lavender:    "bg-lavender",
  peach:       "bg-peach",
  destructive: "bg-destructive",
  neutral:     "bg-muted-foreground",
  primary:     "bg-primary",
};

export function Badge({
  className,
  color = "neutral",
  variant = "soft",
  size = "sm",
  dot,
  icon,
  animate = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = animate ? motion.span : "span";

  return (
    <Comp
      className={cn(badgeVariants({ color, variant, size }), className)}
      {...(animate
        ? {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 0.15, ease: "easeOut" },
          }
        : {})}
      {...(props as any)}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColorMap[color ?? "neutral"])}
        />
      )}
      {icon && <span className="shrink-0 [&>svg]:w-3 [&>svg]:h-3">{icon}</span>}
      {children}
    </Comp>
  );
}
