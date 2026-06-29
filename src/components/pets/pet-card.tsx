import Link from "next/link";
import Image from "next/image";
import { PawPrint, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Pet } from "@/types";

interface PetCardProps {
  pet: Pet;
  className?: string;
}

const speciesEmoji: Record<Pet["species"], string> = {
  dog: "🐕",
  cat: "🐈",
  bird: "🦜",
  rabbit: "🐇",
  fish: "🐟",
  reptile: "🦎",
  other: "🐾",
};

function getAge(dateOfBirth?: string): string {
  if (!dateOfBirth) return "Age unknown";
  const birth = new Date(dateOfBirth);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (months < 12) return `${months}mo`;
  const years = Math.floor(months / 12);
  return `${years}yr`;
}

export function PetCard({ pet, className }: PetCardProps) {
  return (
    <Link href={`/pets/${pet.id}`}>
      <Card
        className={cn(
          "group p-4 flex items-center gap-4 border-border/50 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer",
          className
        )}
      >
        {/* Avatar */}
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-muted shrink-0">
          {pet.photoUrl ? (
            <Image src={pet.photoUrl} alt={pet.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">
              {speciesEmoji[pet.species]}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-sm text-foreground">{pet.name}</p>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 capitalize">
              {pet.species}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {pet.breed ?? "Mixed"} · {getAge(pet.dateOfBirth)} · {pet.gender}
          </p>
          {pet.weight && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {pet.weight} {pet.weightUnit}
            </p>
          )}
        </div>

        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
      </Card>
    </Link>
  );
}
