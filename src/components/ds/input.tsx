"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  success?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      success,
      iconLeft,
      iconRight,
      inputSize = "md",
      type,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const inputId = id ?? React.useId();

    const isPassword = type === "password";
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    const sizeClasses = {
      sm: "h-9 text-xs px-3 rounded-lg",
      md: "h-10 text-sm px-3.5 rounded-xl",
      lg: "h-12 text-sm px-4 rounded-xl",
    };

    const stateRing = error
      ? "border-destructive ring-destructive/20"
      : success
      ? "border-sage ring-sage/20"
      : focused
      ? "border-primary ring-primary/20"
      : "border-border";

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground/90 cursor-pointer"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {iconLeft && (
            <span className="absolute left-3 text-muted-foreground pointer-events-none z-10">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            className={cn(
              "w-full bg-background text-foreground placeholder:text-muted-foreground/60",
              "border transition-all duration-150 outline-none",
              "ring-0 focus:ring-2",
              stateRing,
              sizeClasses[inputSize],
              iconLeft && "pl-9",
              (iconRight || isPassword || error || success) && "pr-9",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Right icon / password toggle / state icon */}
          <span className="absolute right-3 flex items-center text-muted-foreground z-10">
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            ) : error ? (
              <AlertCircle className="w-4 h-4 text-destructive" />
            ) : success ? (
              <CheckCircle2 className="w-4 h-4 text-sage" />
            ) : (
              iconRight
            )}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-destructive flex items-center gap-1"
            >
              {error}
            </motion.p>
          )}
          {success && !error && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-sage"
            >
              {success}
            </motion.p>
          )}
          {hint && !error && !success && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted-foreground"
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Input.displayName = "Input";

/* ── Textarea variant ── */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const inputId = id ?? React.useId();

    const stateRing = error
      ? "border-destructive ring-destructive/20"
      : focused
      ? "border-primary ring-primary/20"
      : "border-border";

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground/90 cursor-pointer">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-background text-foreground placeholder:text-muted-foreground/60",
            "border rounded-xl px-3.5 py-2.5 text-sm min-h-[80px] resize-y",
            "transition-all duration-150 outline-none ring-0 focus:ring-2",
            stateRing,
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          {...props}
        />
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-destructive"
            >
              {error}
            </motion.p>
          )}
          {hint && !error && (
            <p className="text-xs text-muted-foreground">{hint}</p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

/* ── Search input ── */
export interface SearchInputProps extends Omit<InputProps, "iconLeft"> {
  onClear?: () => void;
}

export function SearchInput({ className, onClear, ...props }: SearchInputProps) {
  return (
    <Input
      {...props}
      iconLeft={<Search className="w-4 h-4" />}
      iconRight={
        props.value && onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : undefined
      }
      className={className}
    />
  );
}
