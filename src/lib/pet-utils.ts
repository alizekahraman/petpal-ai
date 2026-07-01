/**
 * Shared utilities for pet-related display logic.
 * Single source of truth — import these instead of copy-pasting.
 */
import type { Species } from "@/types";

// ── Species display maps ──────────────────────────────────────────────────────

export const SPECIES_EMOJI: Record<Species, string> = {
  dog: "🐕",
  cat: "🐈",
  bird: "🦜",
  rabbit: "🐇",
  fish: "🐟",
  reptile: "🦎",
  other: "🐾",
};

export const SPECIES_LABEL: Record<Species, string> = {
  dog: "Dog",
  cat: "Cat",
  bird: "Bird",
  rabbit: "Rabbit",
  fish: "Fish",
  reptile: "Reptile",
  other: "Other",
};

export const SPECIES_GRADIENT: Record<Species, string> = {
  dog: "from-teal/25 to-sage/25",
  cat: "from-lavender/25 to-peach/25",
  bird: "from-sage/25 to-teal/25",
  rabbit: "from-peach/25 to-lavender/25",
  fish: "from-teal/25 to-lavender/25",
  reptile: "from-sage/25 to-peach/25",
  other: "from-muted to-muted/50",
};

// ── Date & age utilities ─────────────────────────────────────────────────────

/** Returns a human-readable age string (e.g. "2y 3m", "4 mo", "<1 mo"). */
export function getAge(dob?: string | null): string | null {
  if (!dob) return null;
  const months =
    (new Date().getFullYear() - new Date(dob).getFullYear()) * 12 +
    new Date().getMonth() -
    new Date(dob).getMonth();
  if (months < 1) return "<1 mo";
  if (months < 12) return `${months} mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y}y ${m}m` : `${y}y`;
}

/** Returns the number of whole days until a date (negative = past). */
export function getDaysUntil(dateStr?: string | null): number | null {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

/** Formats a date string to a short human label (e.g. "Jun 14"). */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...options,
  });
}

/** Returns a relative label and CSS colour class for a vaccine due-date distance. */
export function vaccineUrgency(days: number | null): { label: string; colorClass: string } {
  if (days === null) return { label: "None scheduled", colorClass: "text-muted-foreground" };
  if (days < 0) return { label: "Overdue!", colorClass: "text-red-500 font-semibold" };
  if (days === 0) return { label: "Due today", colorClass: "text-red-500 font-semibold" };
  if (days <= 7) return { label: `In ${days}d`, colorClass: "text-peach font-semibold" };
  if (days <= 30) return { label: `In ${days}d`, colorClass: "text-teal" };
  return { label: `In ${days}d`, colorClass: "text-muted-foreground" };
}

/** Returns a weight string with unit (e.g. "4.5 kg"). */
export function formatWeight(weight?: number | null, unit?: string | null): string | null {
  if (!weight) return null;
  return `${weight} ${unit ?? "kg"}`;
}
