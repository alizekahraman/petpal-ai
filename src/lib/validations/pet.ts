import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  species: z.enum(["dog", "cat", "bird", "rabbit", "fish", "reptile", "other"]),
  breed: z.string().max(100).optional(),
  gender: z.enum(["male", "female", "unknown"]),
  dateOfBirth: z.string().optional(),
  weight: z.number().positive().optional(),
  weightUnit: z.enum(["kg", "lbs"]).default("kg"),
  notes: z.string().max(500).optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;
