"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-medium text-sm",
    "rounded-xl whitespace-nowrap select-none",
    "transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:border-border/80",
        ghost:
          "bg-transparent text-foreground hover:bg-muted",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        soft:
          "bg-primary/10 text-primary hover:bg-primary/15",
        "soft-sage":
          "bg-sage-light text-sage hover:bg-sage/20",
        "soft-lavender":
          "bg-lavender-light text-lavender hover:bg-lavender/20",
        "soft-peach":
          "bg-peach-light text-peach hover:bg-peach/30",
      },
      size: {
        sm:   "h-8 px-3 text-xs rounded-lg gap-1.5",
        md:   "h-10 px-4",
        lg:   "h-12 px-6 text-base rounded-xl",
        xl:   "h-14 px-8 text-base rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, iconLeft, iconRight, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          iconLeft && <span className="shrink-0">{iconLeft}</span>
        )}
        {children}
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
