"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Syringe, Weight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Pet, HealthEvent } from "@/types";

const speciesGradient: Record<Pet["species"], string> = {
  dog: "from-teal/30 to-sage/30",
  cat: "from-lavender/30 to-peach/30",
  bird: "from-sage/30 to-teal/30",
  rabbit: "from-peach/30 to-lavender/30",
  fish: "from-teal/30 to-lavender/30",
  reptile: "from-sage/30 to-peach/30",
  other: "from-muted to-muted/50",
};

const speciesEmoji: Record<Pet["species"], string> = {
  dog: "🐕",
  cat: "🐈",
  bird: "🦜",
  rabbit: "🐇",
  fish: "🐟",
  reptile: "🦎",
  other: "🐾",
};

function getAge(dob?: string): string {
  if (!dob) return "?";
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

function getDaysUntil(dateStr?: string): number | null {
  if (!dateStr) return null;
  const diff = Math.ceil(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

function vaccineUrgency(days: number | null): { label: string; color: string } {
  if (days === null) return { label: "None scheduled", color: "text-muted-foreground" };
  if (days < 0) return { label: "Overdue!", color: "text-red-500 font-semibold" };
  if (days === 0) return { label: "Due today", color: "text-red-500 font-semibold" };
  if (days <= 7) return { label: `In ${days}d`, color: "text-peach font-semibold" };
  if (days <= 30) return { label: `In ${days}d`, color: "text-teal" };
  return { label: `In ${days}d`, color: "text-muted-foreground" };
}

interface PetDashboardCardProps {
  pet: Pet;
  nextVaccine?: HealthEvent;
  index?: number;
}

export function PetDashboardCard({ pet, nextVaccine, index = 0 }: PetDashboardCardProps) {
  const days = getDaysUntil(nextVaccine?.nextDueDate);
  const urgency = vaccineUrgency(days);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Link href={`/pets/${pet.id}`}>
        <div className="bg-card rounded-3xl border border-border/50 shadow-card overflow-hidden hover:shadow-card-hover hover:border-primary/20 transition-all duration-300">
          {/* Photo area */}
          <div
            className={cn(
              "relative h-44 bg-gradient-to-br",
              speciesGradient[pet.species]
            )}
          >
            {pet.photoUrl ? (
              <Image
                src={pet.photoUrl}
                alt={pet.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {speciesEmoji[pet.species]}
              </div>
            )}

            {/* Scrim + name overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white font-bold text-base leading-tight">{pet.name}</p>
                  <p className="text-white/70 text-xs mt-0.5 capitalize">
                    {pet.species} · {pet.breed ?? "Mixed"}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors mb-0.5" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Age</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{getAge(pet.dateOfBirth)}</p>
              </div>
              {pet.weight && (
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Weight</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Weight className="w-3 h-3 text-muted-foreground" />
                    <p className="text-sm font-semibold text-foreground">
                      {pet.weight} {pet.weightUnit}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Vaccine row */}
            <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2">
              <Syringe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground">Next vaccine</p>
                <p className="text-xs font-medium text-foreground truncate">
                  {nextVaccine?.title ?? "None on record"}
                </p>
              </div>
              <p className={cn("text-xs shrink-0", urgency.color)}>{urgency.label}</p>
            </div>

            {/* AI button */}
            <Link
              href={`/ai-assistant?petId=${pet.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 w-full h-8 rounded-xl bg-primary/8 hover:bg-primary/15 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Ask AI about {pet.name}</span>
            </Link>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
