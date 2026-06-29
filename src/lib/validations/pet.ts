import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  species: z.enum(["dog", "cat", "bird", "rabbit", "fish", "reptile", "other"]),
  breed: z.string().max(100).optional(),
  gender: z.enum(["male", "female", "unknown"]).optional(),
  dateOfBirth: z.string().optional(),
  weight: z.preprocess((v) => (v === "" || v == null ? undefined : Number(v)), z.number().positive("Must be positive").optional()),
  weightUnit: z.enum(["kg", "lbs"]).optional(),
  color: z.string().max(80).optional(),
  microchipId: z.string().max(30).optional(),
  allergies: z.string().max(500).optional(),
  medicalConditions: z.string().max(500).optional(),
  currentMedications: z.string().max(500).optional(),
  insuranceCarrier: z.string().max(100).optional(),
  insurancePolicy: z.string().max(100).optional(),
  vetName: z.string().max(100).optional(),
  vetPhone: z.string().max(30).optional(),
  emergencyContactName: z.string().max(100).optional(),
  emergencyContactPhone: z.string().max(30).optional(),
  favoriteFood: z.string().max(200).optional(),
  favoriteTreats: z.string().max(200).optional(),
  notes: z.string().max(1000).optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;
