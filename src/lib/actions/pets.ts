"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Pet } from "@/types";

function toRow(values: Record<string, unknown>, userId?: string) {
  const row: Record<string, unknown> = {
    name: values.name,
    species: values.species,
    breed: values.breed || null,
    gender: values.gender || "unknown",
    date_of_birth: values.dateOfBirth || null,
    weight: values.weight || null,
    weight_unit: values.weightUnit || "kg",
    color: values.color || null,
    microchip_id: values.microchipId || null,
    allergies: values.allergies || null,
    medical_conditions: values.medicalConditions || null,
    current_medications: values.currentMedications || null,
    insurance_carrier: values.insuranceCarrier || null,
    insurance_policy: values.insurancePolicy || null,
    vet_name: values.vetName || null,
    vet_phone: values.vetPhone || null,
    emergency_contact_name: values.emergencyContactName || null,
    emergency_contact_phone: values.emergencyContactPhone || null,
    favorite_food: values.favoriteFood || null,
    favorite_treats: values.favoriteTreats || null,
    notes: values.notes || null,
  };
  if (userId) row.user_id = userId;
  return row;
}

function fromRow(row: Record<string, unknown>): Pet {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    name: row.name as string,
    species: row.species as Pet["species"],
    breed: (row.breed as string) ?? undefined,
    gender: (row.gender as Pet["gender"]) ?? "unknown",
    dateOfBirth: (row.date_of_birth as string) ?? undefined,
    weight: (row.weight as number) ?? undefined,
    weightUnit: (row.weight_unit as "kg" | "lbs") ?? "kg",
    photoUrl: (row.photo_url as string) ?? undefined,
    color: (row.color as string) ?? undefined,
    microchipId: (row.microchip_id as string) ?? undefined,
    allergies: (row.allergies as string) ?? undefined,
    medicalConditions: (row.medical_conditions as string) ?? undefined,
    currentMedications: (row.current_medications as string) ?? undefined,
    insuranceCarrier: (row.insurance_carrier as string) ?? undefined,
    insurancePolicy: (row.insurance_policy as string) ?? undefined,
    vetName: (row.vet_name as string) ?? undefined,
    vetPhone: (row.vet_phone as string) ?? undefined,
    emergencyContactName: (row.emergency_contact_name as string) ?? undefined,
    emergencyContactPhone: (row.emergency_contact_phone as string) ?? undefined,
    favoriteFood: (row.favorite_food as string) ?? undefined,
    favoriteTreats: (row.favorite_treats as string) ?? undefined,
    notes: (row.notes as string) ?? undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function getPets(): Promise<Pet[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map(fromRow);
}

export async function getPetById(id: string): Promise<Pet | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) return null;
  return fromRow(data);
}

export async function createPet(values: Record<string, unknown>, photoUrl?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const row = { ...toRow(values, user.id), photo_url: photoUrl ?? null };

  const { data, error } = await supabase.from("pets").insert(row).select().single();
  if (error) return { error: error.message };

  revalidatePath("/pets");
  revalidatePath("/dashboard");
  redirect(`/pets/${data.id}`);
}

export async function updatePet(id: string, values: Record<string, unknown>, photoUrl?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const row: Record<string, unknown> = { ...toRow(values), updated_at: new Date().toISOString() };
  if (photoUrl !== undefined) row.photo_url = photoUrl;

  const { error } = await supabase.from("pets").update(row).eq("id", id).eq("user_id", user.id);
  if (error) return { error: error.message };

  revalidatePath(`/pets/${id}`);
  revalidatePath("/pets");
  revalidatePath("/dashboard");
  redirect(`/pets/${id}`);
}

export async function deletePet(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("pets").delete().eq("id", id).eq("user_id", user.id);
  if (error) return { error: error.message };

  revalidatePath("/pets");
  revalidatePath("/dashboard");
  redirect("/pets");
}
