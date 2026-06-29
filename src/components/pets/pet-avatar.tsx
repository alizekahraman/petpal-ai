import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Pet } from "@/types";

const speciesEmoji: Record<Pet["species"], string> = {
  dog: "🐕",
  cat: "🐈",
  bird: "🦜",
  rabbit: "🐇",
  fish: "🐟",
  reptile: "🦎",
  other: "🐾",
};

interface PetAvatarProps {
  pet: Pet;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 rounded-xl text-base",
  md: "w-12 h-12 rounded-2xl text-xl",
  lg: "w-16 h-16 rounded-2xl text-2xl",
  xl: "w-24 h-24 rounded-3xl text-4xl",
};

export function PetAvatar({ pet, size = "md", className }: PetAvatarProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted shrink-0", sizeMap[size], className)}>
      {pet.photoUrl ? (
        <Image src={pet.photoUrl} alt={pet.name} fill className="object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {speciesEmoji[pet.species]}
        </div>
      )}
    </div>
  );
}
