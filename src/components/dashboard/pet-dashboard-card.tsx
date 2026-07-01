"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Syringe, Weight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPECIES_EMOJI, SPECIES_GRADIENT, getAge, getDaysUntil, vaccineUrgency } from "@/lib/pet-utils";
import type { Pet, HealthEvent } from "@/types";

interface PetDashboardCardProps {
  pet: Pet;
  nextVaccine?: HealthEvent;
  index?: number;
}

export const PetDashboardCard = React.memo(function PetDashboardCard({ pet, nextVaccine, index = 0 }: PetDashboardCardProps) {
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
              SPECIES_GRADIENT[pet.species]
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
                {SPECIES_EMOJI[pet.species]}
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
              <p className={cn("text-xs shrink-0", urgency.colorClass)}>{urgency.label}</p>
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
});
