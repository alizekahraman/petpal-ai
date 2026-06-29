import type { Metadata } from "next";
import Link from "next/link";
import { Plus, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { PetCard } from "@/components/pets/pet-card";
import { EmptyState } from "@/components/shared/empty-state";
import { PLACEHOLDER_PETS } from "@/lib/placeholder-data";

export const metadata: Metadata = { title: "My Pets" };

export default function PetsPage() {
  return (
    <div className="max-w-lg mx-auto md:max-w-none">
      <PageHeader
        title="My Pets"
        description="Manage all your furry, feathered, and scaly companions."
        action={
          <Link href="/pets/new">
            <Button className="rounded-xl gap-2">
              <Plus className="w-4 h-4" />
              Add pet
            </Button>
          </Link>
        }
      />

      {PLACEHOLDER_PETS.length === 0 ? (
        <EmptyState
          icon={PawPrint}
          title="No pets yet"
          description="Add your first pet to start tracking their health and wellbeing."
          action={
            <Link href="/pets/new">
              <Button className="rounded-xl gap-2">
                <Plus className="w-4 h-4" />
                Add your first pet
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {PLACEHOLDER_PETS.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}
