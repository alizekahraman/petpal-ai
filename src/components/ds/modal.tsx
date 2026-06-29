"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeMap: Record<ModalSize, string> = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  full: "max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]",
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  hideClose?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
  hideClose,
  className,
}: ModalProps) {
  // Close on Escape
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const content = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={cn(
              "relative z-10 w-full bg-card rounded-2xl shadow-modal border border-border/40",
              "flex flex-col max-h-[90vh] overflow-hidden",
              sizeMap[size],
              className
            )}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            {(title || !hideClose) && (
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
                <div className="space-y-0.5">
                  {title && (
                    <h2 className="text-base font-semibold text-foreground leading-tight">{title}</h2>
                  )}
                  {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
                {!hideClose && (
                  <button
                    onClick={onClose}
                    className="shrink-0 p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="shrink-0 px-6 py-4 border-t border-border/50 flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

/* ── Confirm dialog ── */
export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  loading?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size="sm">
      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={onConfirm}
          disabled={loading}
          className={cn(
            "w-full h-10 rounded-xl text-sm font-medium transition-colors",
            variant === "destructive"
              ? "bg-destructive text-white hover:bg-destructive/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {loading ? "Loading..." : confirmLabel}
        </button>
        <button
          onClick={onClose}
          className="w-full h-10 rounded-xl text-sm font-medium border border-border hover:bg-muted transition-colors"
        >
          {cancelLabel}
        </button>
      </div>
    </Modal>
  );
}
