"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, PawPrint, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLACEHOLDER_PETS } from "@/lib/placeholder-data";
import type { Pet } from "@/types";

const speciesEmoji: Record<Pet["species"], string> = {
  dog: "🐕", cat: "🐈", bird: "🦜", rabbit: "🐇",
  fish: "🐟", reptile: "🦎", other: "🐾",
};

const speciesGradient: Record<Pet["species"], string> = {
  dog: "from-teal/25 to-sage/25",
  cat: "from-lavender/25 to-peach/25",
  bird: "from-sage/25 to-teal/25",
  rabbit: "from-peach/25 to-lavender/25",
  fish: "from-teal/25 to-lavender/25",
  reptile: "from-sage/25 to-peach/25",
  other: "from-muted to-muted/50",
};

function getAge(dob?: string) {
  if (!dob) return null;
  const months =
    (new Date().getFullYear() - new Date(dob).getFullYear()) * 12 +
    new Date().getMonth() - new Date(dob).getMonth();
  if (months < 12) return `${months}mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y}y ${m}m` : `${y}y`;
}

export default function PetsPage() {
  const pets = PLACEHOLDER_PETS;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">My Pets</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {pets.length} companion{pets.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/pets/new">
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            Add pet
          </Button>
        </Link>
      </div>

      {pets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 gap-4 text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center text-4xl">🐾</div>
          <div>
            <p className="font-semibold text-foreground">No pets yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add your first companion to get started.</p>
          </div>
          <Link href="/pets/new">
            <Button className="rounded-xl gap-2 mt-2">
              <Plus className="w-4 h-4" />
              Add your first pet
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet, i) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -2 }}
            >
              <Link href={`/pets/${pet.id}`}>
                <div className="group bg-card rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-200 overflow-hidden">
                  {/* Photo strip */}
                  <div className={`relative h-36 bg-gradient-to-br ${speciesGradient[pet.species]}`}>
                    {pet.photoUrl ? (
                      <Image src={pet.photoUrl} alt={pet.name} fill className="object-cover" sizes="400px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        {speciesEmoji[pet.species]}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <p className="text-white font-bold text-base leading-tight drop-shadow">{pet.name}</p>
                      <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="capitalize text-[11px]">{pet.species}</Badge>
                      {pet.gender !== "unknown" && (
                        <Badge variant="outline" className="capitalize text-[11px]">{pet.gender}</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      {pet.breed && <p>{pet.breed}</p>}
                      <div className="flex items-center gap-3">
                        {getAge(pet.dateOfBirth) && <span>{getAge(pet.dateOfBirth)} old</span>}
                        {pet.weight && <span>{pet.weight} {pet.weightUnit}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Add card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: pets.length * 0.07 }}
          >
            <Link href="/pets/new">
              <div className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-border/60 hover:border-primary/40 hover:bg-primary/3 transition-all duration-200 flex flex-col items-center justify-center gap-3 group p-6">
                <div className="w-12 h-12 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  Add a pet
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
