"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PetForm } from "@/components/pets/pet-form";
import { updatePet } from "@/lib/actions/pets";
import { PLACEHOLDER_PETS } from "@/lib/placeholder-data";
import type { PetFormValues } from "@/lib/validations/pet";

export default function EditPetPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // In production this would be fetched from Supabase via getPetById
  const pet = PLACEHOLDER_PETS.find((p) => p.id === id);

  if (!pet) {
    return (
      <div className="max-w-xl mx-auto text-center py-24">
        <p className="text-muted-foreground">Pet not found.</p>
        <Link href="/pets">
          <Button variant="outline" className="mt-4 rounded-xl">Back to pets</Button>
        </Link>
      </div>
    );
  }

  async function handleSubmit(values: PetFormValues, photoUrl?: string) {
    return await updatePet(id, values as Record<string, unknown>, photoUrl);
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/pets/${id}`}>
          <Button variant="ghost" size="icon" className="rounded-xl w-9 h-9">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Edit {pet.name}</h1>
          <p className="text-sm text-muted-foreground">Update your companion's info</p>
        </div>
      </div>

      <PetForm
        defaultValues={pet}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        onCancel={() => router.push(`/pets/${id}`)}
      />
    </div>
  );
}
