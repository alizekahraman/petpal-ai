"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-muted", className)}
      {...props}
    />
  );
}

/* ── Text skeleton (multiple lines) ── */
function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

/* ── Avatar skeleton ── */
function AvatarSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const s = { sm: "w-8 h-8 rounded-xl", md: "w-10 h-10 rounded-xl", lg: "w-12 h-12 rounded-2xl", xl: "w-16 h-16 rounded-2xl" };
  return <Skeleton className={s[size]} />;
}

/* ── Stat card skeleton ── */
function StatCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-2.5 w-28" />
        </div>
        <Skeleton className="w-9 h-9 rounded-xl" />
      </div>
    </div>
  );
}

/* ── Pet card skeleton ── */
function PetCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-card p-4 flex items-center gap-4">
      <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-2.5 w-16" />
      </div>
      <Skeleton className="w-4 h-4 rounded" />
    </div>
  );
}

/* ── Timeline skeleton ── */
function TimelineSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-0">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
            {i < items - 1 && <div className="w-0.5 flex-1 bg-muted my-1 min-h-[24px]" />}
          </div>
          <div className="flex-1 pb-6 space-y-2 pt-1.5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Card skeleton (generic) ── */
function CardSkeleton({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("bg-card rounded-2xl border border-border/50 shadow-card p-5 space-y-3", className)}>
      <Skeleton className="h-5 w-32" />
      <TextSkeleton lines={rows} />
    </div>
  );
}

/* ── Page header skeleton ── */
function PageHeaderSkeleton() {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton className="h-10 w-28 rounded-xl" />
    </div>
  );
}

/* ── List skeleton ── */
function ListSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl border border-border/50 p-4 flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Chat skeleton ── */
function ChatSkeleton() {
  return (
    <div className="space-y-4">
      {[false, true, false].map((isUser, i) => (
        <div key={i} className={cn("flex gap-3", isUser && "flex-row-reverse")}>
          {!isUser && <Skeleton className="w-8 h-8 rounded-xl shrink-0" />}
          {isUser && <Skeleton className="w-8 h-8 rounded-xl shrink-0" />}
          <Skeleton
            className={cn("h-16 rounded-2xl", isUser ? "w-48" : "w-64")}
          />
        </div>
      ))}
    </div>
  );
}

export {
  Skeleton,
  TextSkeleton,
  AvatarSkeleton,
  StatCardSkeleton,
  PetCardSkeleton,
  TimelineSkeleton,
  CardSkeleton,
  PageHeaderSkeleton,
  ListSkeleton,
  ChatSkeleton,
};
