"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PetForm } from "@/components/pets/pet-form";
import { createPet } from "@/lib/actions/pets";
import type { PetFormValues } from "@/lib/validations/pet";

export default function NewPetPage() {
  const router = useRouter();

  async function handleSubmit(values: PetFormValues, photoUrl?: string) {
    return await createPet(values as Record<string, unknown>, photoUrl);
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/pets">
          <Button variant="ghost" size="icon" className="rounded-xl w-9 h-9">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Add a pet</h1>
          <p className="text-sm text-muted-foreground">Tell us about your companion</p>
        </div>
      </div>

      <PetForm
        onSubmit={handleSubmit}
        submitLabel="Add pet"
        onCancel={() => router.push("/pets")}
      />
    </div>
  );
}
