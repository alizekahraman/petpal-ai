"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhotoUpload } from "@/components/pets/photo-upload";
import { petSchema, type PetFormValues } from "@/lib/validations/pet";
import { cn } from "@/lib/utils";
import type { Pet } from "@/types";

interface PetFormProps {
  defaultValues?: Partial<Pet>;
  onSubmit: (values: PetFormValues, photoUrl?: string) => Promise<{ error?: string } | void>;
  submitLabel?: string;
  onCancel?: () => void;
}

/* ── Section wrapper with collapse ── */
function Section({
  title,
  icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{icon}</span>
          <span className="font-semibold text-sm text-foreground">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-border/40 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Field row ── */
function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

/* ── Field wrapper ── */
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

/* ── Age display from DOB ── */
function AgeDisplay({ dob }: { dob?: string }) {
  if (!dob) return null;
  const months =
    (new Date().getFullYear() - new Date(dob).getFullYear()) * 12 +
    new Date().getMonth() -
    new Date(dob).getMonth();
  const label =
    months < 1
      ? "< 1 month"
      : months < 12
      ? `${months} month${months !== 1 ? "s" : ""}`
      : (() => {
          const y = Math.floor(months / 12);
          const m = months % 12;
          return m > 0 ? `${y} yr ${m} mo` : `${y} year${y !== 1 ? "s" : ""}`;
        })();
  return (
    <p className="text-xs text-muted-foreground mt-1">
      Age: <span className="font-medium text-foreground">{label}</span>
    </p>
  );
}

export function PetForm({ defaultValues, onSubmit, submitLabel = "Save pet", onCancel }: PetFormProps) {
  const [photoUrl, setPhotoUrl] = React.useState<string | undefined>(defaultValues?.photoUrl);
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PetFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(petSchema) as any,
    defaultValues: {
      name: defaultValues?.name ?? "",
      species: defaultValues?.species ?? "dog",
      breed: defaultValues?.breed ?? "",
      gender: defaultValues?.gender ?? "unknown",
      dateOfBirth: defaultValues?.dateOfBirth ?? "",
      weight: defaultValues?.weight as number | undefined,
      weightUnit: defaultValues?.weightUnit ?? "kg",
      color: defaultValues?.color ?? "",
      microchipId: defaultValues?.microchipId ?? "",
      allergies: defaultValues?.allergies ?? "",
      medicalConditions: defaultValues?.medicalConditions ?? "",
      currentMedications: defaultValues?.currentMedications ?? "",
      insuranceCarrier: defaultValues?.insuranceCarrier ?? "",
      insurancePolicy: defaultValues?.insurancePolicy ?? "",
      vetName: defaultValues?.vetName ?? "",
      vetPhone: defaultValues?.vetPhone ?? "",
      emergencyContactName: defaultValues?.emergencyContactName ?? "",
      emergencyContactPhone: defaultValues?.emergencyContactPhone ?? "",
      favoriteFood: defaultValues?.favoriteFood ?? "",
      favoriteTreats: defaultValues?.favoriteTreats ?? "",
      notes: defaultValues?.notes ?? "",
    },
  });

  const species = watch("species");
  const dob = watch("dateOfBirth");

  async function handleFormSubmit(values: PetFormValues) {
    setSubmitting(true);
    try {
      const result = await onSubmit(values, photoUrl);
      if (result?.error) {
        toast.error(result.error);
        setSubmitting(false);
      }
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

      {/* Photo */}
      <div className="bg-card rounded-2xl border border-border/50 p-5 flex justify-center">
        <PhotoUpload value={photoUrl} species={species} onChange={setPhotoUrl} />
      </div>

      {/* Basic Info */}
      <Section title="Basic Info" icon="🐾" defaultOpen>
        <Field label="Name" required error={errors.name?.message}>
          <Input placeholder="Luna" {...register("name")} />
        </Field>

        <Row>
          <Field label="Species" required error={errors.species?.message}>
            <Controller
              name="species"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {["dog","cat","bird","rabbit","fish","reptile","other"].map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase()+s.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field label="Sex" error={errors.gender?.message}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </Row>

        <Row>
          <Field label="Breed" error={errors.breed?.message}>
            <Input placeholder="Golden Retriever" {...register("breed")} />
          </Field>
          <Field label="Color / Coat" error={errors.color?.message}>
            <Input placeholder="Golden, fluffy" {...register("color")} />
          </Field>
        </Row>

        <Row>
          <div>
            <Field label="Date of birth" error={errors.dateOfBirth?.message}>
              <Input type="date" {...register("dateOfBirth")} />
            </Field>
            <AgeDisplay dob={dob} />
          </div>

          <Field label="Weight" error={errors.weight?.message}>
            <div className="flex gap-2">
              <Input
                type="number"
                step="0.1"
                placeholder="28"
                className="flex-1"
                {...register("weight")}
              />
              <Controller
                name="weightUnit"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </Field>
        </Row>

        <Field label="Microchip ID" error={errors.microchipId?.message}>
          <Input placeholder="985112345678901" {...register("microchipId")} />
        </Field>
      </Section>

      {/* Health & Medical */}
      <Section title="Health & Medical" icon="🏥" defaultOpen={false}>
        <Field label="Allergies" error={errors.allergies?.message}>
          <Textarea
            placeholder="e.g. chicken, pollen, dust mites..."
            rows={2}
            {...register("allergies")}
          />
        </Field>

        <Field label="Medical Conditions" error={errors.medicalConditions?.message}>
          <Textarea
            placeholder="e.g. hip dysplasia, hypothyroidism..."
            rows={2}
            {...register("medicalConditions")}
          />
        </Field>

        <Field label="Current Medications" error={errors.currentMedications?.message}>
          <Textarea
            placeholder="e.g. NexGard monthly, Apoquel 16mg daily..."
            rows={2}
            {...register("currentMedications")}
          />
        </Field>

        <Row>
          <Field label="Insurance Carrier" error={errors.insuranceCarrier?.message}>
            <Input placeholder="Trupanion" {...register("insuranceCarrier")} />
          </Field>
          <Field label="Policy Number" error={errors.insurancePolicy?.message}>
            <Input placeholder="TRU-123456" {...register("insurancePolicy")} />
          </Field>
        </Row>
      </Section>

      {/* Veterinarian */}
      <Section title="Veterinarian" icon="🩺" defaultOpen={false}>
        <Row>
          <Field label="Vet Name" error={errors.vetName?.message}>
            <Input placeholder="Dr. Sarah Chen" {...register("vetName")} />
          </Field>
          <Field label="Vet Phone" error={errors.vetPhone?.message}>
            <Input type="tel" placeholder="+1 555 000 0000" {...register("vetPhone")} />
          </Field>
        </Row>
      </Section>

      {/* Emergency */}
      <Section title="Emergency Contact" icon="🚨" defaultOpen={false}>
        <Row>
          <Field label="Contact Name" error={errors.emergencyContactName?.message}>
            <Input placeholder="Jane Doe" {...register("emergencyContactName")} />
          </Field>
          <Field label="Contact Phone" error={errors.emergencyContactPhone?.message}>
            <Input type="tel" placeholder="+1 555 000 0000" {...register("emergencyContactPhone")} />
          </Field>
        </Row>
      </Section>

      {/* Preferences */}
      <Section title="Favorites & Preferences" icon="❤️" defaultOpen={false}>
        <Field label="Favorite Food" error={errors.favoriteFood?.message}>
          <Input placeholder="Royal Canin Golden Retriever Adult" {...register("favoriteFood")} />
        </Field>
        <Field label="Favorite Treats" error={errors.favoriteTreats?.message}>
          <Input placeholder="Zuke's Mini Naturals, carrots" {...register("favoriteTreats")} />
        </Field>
      </Section>

      {/* Notes */}
      <Section title="Notes" icon="📝" defaultOpen={false}>
        <Field label="Additional Notes" error={errors.notes?.message}>
          <Textarea
            placeholder="Anything else you'd like to remember about your pet..."
            rows={4}
            {...register("notes")}
          />
        </Field>
      </Section>

      {/* Actions */}
      <div className="flex gap-3 pb-6">
        <Button type="submit" className="flex-1 rounded-xl h-11" disabled={submitting}>
          {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" className="rounded-xl h-11 px-6" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
