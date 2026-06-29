"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertType = "success" | "error" | "warning" | "info";

const typeConfig: Record<
  AlertType,
  { icon: React.ElementType; bg: string; border: string; iconColor: string; titleColor: string }
> = {
  success: {
    icon: CheckCircle2,
    bg: "bg-sage-light dark:bg-sage/10",
    border: "border-sage/30",
    iconColor: "text-sage",
    titleColor: "text-sage",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-destructive/5 dark:bg-destructive/10",
    border: "border-destructive/25",
    iconColor: "text-destructive",
    titleColor: "text-destructive",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-peach-light dark:bg-peach/10",
    border: "border-peach/40",
    iconColor: "text-peach",
    titleColor: "text-peach",
  },
  info: {
    icon: Info,
    bg: "bg-teal-light dark:bg-teal/10",
    border: "border-teal/30",
    iconColor: "text-teal",
    titleColor: "text-teal",
  },
};

export interface AlertProps {
  type?: AlertType;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  show?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function Alert({
  type = "info",
  title,
  description,
  children,
  dismissible,
  onDismiss,
  show = true,
  className,
  icon,
}: AlertProps) {
  const [visible, setVisible] = React.useState(show);
  const config = typeConfig[type];
  const Icon = config.icon;

  function handleDismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative flex gap-3 rounded-2xl border p-4",
            config.bg,
            config.border,
            className
          )}
        >
          <span className={cn("shrink-0 mt-0.5", config.iconColor)}>
            {icon ?? <Icon className="w-4 h-4" />}
          </span>

          <div className="flex-1 min-w-0 space-y-0.5">
            {title && (
              <p className={cn("text-sm font-semibold", config.titleColor)}>{title}</p>
            )}
            {description && (
              <p className="text-sm text-foreground/75">{description}</p>
            )}
            {children && <div className="text-sm text-foreground/75">{children}</div>}
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="shrink-0 text-foreground/40 hover:text-foreground/70 transition-colors -mt-0.5 -mr-0.5 p-1 rounded-lg hover:bg-foreground/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Inline alert (smaller, no background) ── */
export function InlineAlert({ type = "info", children, className }: {
  type?: AlertType;
  children: React.ReactNode;
  className?: string;
}) {
  const config = typeConfig[type];
  const Icon = config.icon;
  return (
    <p className={cn("flex items-center gap-1.5 text-sm", config.iconColor, className)}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {children}
    </p>
  );
}
