"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Pet } from "@/types";

type PetAvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const sizeMap: Record<PetAvatarSize, { container: string; text: string; radius: string }> = {
  xs:  { container: "w-7 h-7",   text: "text-base",  radius: "rounded-xl" },
  sm:  { container: "w-9 h-9",   text: "text-lg",    radius: "rounded-xl" },
  md:  { container: "w-12 h-12", text: "text-2xl",   radius: "rounded-2xl" },
  lg:  { container: "w-16 h-16", text: "text-3xl",   radius: "rounded-2xl" },
  xl:  { container: "w-20 h-20", text: "text-4xl",   radius: "rounded-3xl" },
  "2xl": { container: "w-28 h-28", text: "text-5xl", radius: "rounded-3xl" },
};

const speciesEmoji: Record<Pet["species"], string> = {
  dog:     "🐕",
  cat:     "🐈",
  bird:    "🦜",
  rabbit:  "🐇",
  fish:    "🐟",
  reptile: "🦎",
  other:   "🐾",
};

const speciesGradient: Record<Pet["species"], string> = {
  dog:     "from-teal-light to-sage-light",
  cat:     "from-lavender-light to-peach-light",
  bird:    "from-peach-light to-teal-light",
  rabbit:  "from-sage-light to-lavender-light",
  fish:    "from-teal-light to-lavender-light",
  reptile: "from-sage-light to-teal-light",
  other:   "from-muted to-muted",
};

export interface PetAvatarProps {
  pet: Pet;
  size?: PetAvatarSize;
  animate?: boolean;
  className?: string;
  badge?: React.ReactNode;
}

export function PetAvatar({ pet, size = "md", animate = false, className, badge }: PetAvatarProps) {
  const s = sizeMap[size];

  const inner = (
    <div className={cn("relative shrink-0", s.container, s.radius, "overflow-hidden", className)}>
      {pet.photoUrl ? (
        <Image
          src={pet.photoUrl}
          alt={pet.name}
          fill
          className="object-cover"
          sizes="112px"
        />
      ) : (
        <div
          className={cn(
            "w-full h-full flex items-center justify-center bg-gradient-to-br",
            speciesGradient[pet.species],
            s.text
          )}
        >
          {speciesEmoji[pet.species]}
        </div>
      )}

      {badge && (
        <div className="absolute -bottom-1 -right-1">{badge}</div>
      )}
    </div>
  );

  if (!animate) return inner;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {inner}
    </motion.div>
  );
}

/* ── Species badge ── */
export function SpeciesBadge({ species, className }: { species: Pet["species"]; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center justify-center text-sm w-6 h-6 rounded-full bg-muted",
      className
    )}>
      {speciesEmoji[species]}
    </span>
  );
}
