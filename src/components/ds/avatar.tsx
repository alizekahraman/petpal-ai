"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarStatus = "online" | "offline" | "away" | "busy";

const sizeMap: Record<AvatarSize, { container: string; text: string; status: string; statusPos: string }> = {
  xs:  { container: "w-6 h-6 rounded-lg",    text: "text-[9px]",  status: "w-1.5 h-1.5", statusPos: "-bottom-0 -right-0" },
  sm:  { container: "w-8 h-8 rounded-xl",    text: "text-xs",     status: "w-2 h-2",     statusPos: "-bottom-0.5 -right-0.5" },
  md:  { container: "w-10 h-10 rounded-xl",  text: "text-sm",     status: "w-2.5 h-2.5", statusPos: "-bottom-0.5 -right-0.5" },
  lg:  { container: "w-12 h-12 rounded-2xl", text: "text-base",   status: "w-3 h-3",     statusPos: "-bottom-0.5 -right-0.5" },
  xl:  { container: "w-16 h-16 rounded-2xl", text: "text-xl",     status: "w-3.5 h-3.5", statusPos: "-bottom-1 -right-1" },
  "2xl": { container: "w-20 h-20 rounded-3xl", text: "text-2xl",  status: "w-4 h-4",     statusPos: "-bottom-1 -right-1" },
};

const statusColorMap: Record<AvatarStatus, string> = {
  online:  "bg-sage",
  offline: "bg-muted-foreground/40",
  away:    "bg-peach",
  busy:    "bg-destructive",
};

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const colorPalette = [
  "bg-teal-light text-teal",
  "bg-sage-light text-sage",
  "bg-lavender-light text-lavender",
  "bg-peach-light text-peach",
];

function getColorFromName(name?: string): string {
  if (!name) return colorPalette[0];
  const sum = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colorPalette[sum % colorPalette.length];
}

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  badge?: number;
  className?: string;
  alt?: string;
}

export function Avatar({ src, name, size = "md", status, badge, className, alt }: AvatarProps) {
  const s = sizeMap[size];
  const fallbackColor = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <div className={cn("relative shrink-0", s.container, className)}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? name ?? "Avatar"}
          fill
          className="object-cover rounded-[inherit]"
          sizes="80px"
        />
      ) : (
        <div className={cn("w-full h-full flex items-center justify-center font-semibold rounded-[inherit]", fallbackColor, s.text)}>
          {initials}
        </div>
      )}

      {/* Status dot */}
      {status && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-background",
            s.status,
            s.statusPos,
            statusColorMap[status]
          )}
        />
      )}

      {/* Notification badge */}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full bg-destructive text-white text-[9px] font-bold flex items-center justify-center px-1 border-2 border-background">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </div>
  );
}

/* ── AvatarGroup ── */
export interface AvatarGroupProps {
  avatars: Array<{ src?: string | null; name?: string }>;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({ avatars, max = 4, size = "sm", className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visible.map((a, i) => (
        <div key={i} className="ring-2 ring-background rounded-[inherit]">
          <Avatar src={a.src} name={a.name} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "ring-2 ring-background flex items-center justify-center bg-muted text-muted-foreground font-semibold rounded-xl",
            sizeMap[size].container,
            sizeMap[size].text
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
