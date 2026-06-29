"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Pencil, Trash2, HeartPulse, UtensilsCrossed,
  Calendar, Syringe, Pill, ShieldCheck, Phone, AlertTriangle,
  MapPin, Cpu, Palette, Weight, Cake, Venus, Mars, HelpCircle,
  Sparkles, X,
} from "lucide-react";
import Image_ from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deletePet } from "@/lib/actions/pets";
import {
  PLACEHOLDER_PETS,
  PLACEHOLDER_HEALTH_EVENTS,
  PLACEHOLDER_FEEDING_SCHEDULES,
  PLACEHOLDER_REMINDERS,
} from "@/lib/placeholder-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Pet } from "@/types";

const speciesGradient: Record<Pet["species"], string> = {
  dog: "from-teal/40 to-sage/40",
  cat: "from-lavender/40 to-peach/40",
  bird: "from-sage/40 to-teal/40",
  rabbit: "from-peach/40 to-lavender/40",
  fish: "from-teal/40 to-lavender/40",
  reptile: "from-sage/40 to-peach/40",
  other: "from-muted to-muted/50",
};

const speciesEmoji: Record<Pet["species"], string> = {
  dog: "🐕", cat: "🐈", bird: "🦜", rabbit: "🐇",
  fish: "🐟", reptile: "🦎", other: "🐾",
};

function getAge(dob?: string) {
  if (!dob) return null;
  const months =
    (new Date().getFullYear() - new Date(dob).getFullYear()) * 12 +
    new Date().getMonth() - new Date(dob).getMonth();
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""}`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y} yr ${m} mo` : `${y} year${y !== 1 ? "s" : ""}`;
}

function InfoRow({ icon: Icon, label, value, color = "text-muted-foreground" }: {
  icon: React.ElementType; label: string; value?: string | null; color?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 py-2.5 border-b border-border/40 last:border-0">
      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", color)} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <Card className="p-4 border-border/50 shadow-card">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{icon}</span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div>{children}</div>
    </Card>
  );
}

function DeleteModal({ name, onConfirm, onClose }: {
  name: string; onConfirm: () => void; onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm bg-card rounded-3xl border border-border/50 shadow-modal p-6 space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-base">Remove {name}?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This will permanently delete {name}&apos;s profile and all associated records. This cannot be undone.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" className="flex-1 rounded-xl" onClick={onConfirm}>
              Delete {name}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const pet = PLACEHOLDER_PETS.find((p) => p.id === id);
  const healthEvents = PLACEHOLDER_HEALTH_EVENTS.filter((e) => e.petId === id);
  const feedingSchedules = PLACEHOLDER_FEEDING_SCHEDULES.filter((s) => s.petId === id);
  const reminders = PLACEHOLDER_REMINDERS.filter((r) => r.petId === id);

  if (!pet) {
    return (
      <div className="text-center py-24">
        <p className="text-muted-foreground">Pet not found.</p>
        <Link href="/pets">
          <Button variant="outline" className="mt-4 rounded-xl">Back to pets</Button>
        </Link>
      </div>
    );
  }

  async function handleDelete() {
    setDeleting(true);
    const result = await deletePet(id);
    if (result?.error) {
      toast.error(result.error);
      setDeleting(false);
      setShowDelete(false);
    }
  }

  const genderIcon = pet.gender === "male" ? Mars : pet.gender === "female" ? Venus : HelpCircle;

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Top nav */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/pets">
          <Button variant="ghost" size="sm" className="rounded-xl gap-1.5 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Pets
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Link href={`/pets/${id}/edit`}>
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setShowDelete(true)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative h-64 rounded-3xl overflow-hidden mb-4 bg-gradient-to-br",
          speciesGradient[pet.species]
        )}
      >
        {pet.photoUrl ? (
          <Image src={pet.photoUrl} alt={pet.name} fill className="object-cover" sizes="768px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl">
            {speciesEmoji[pet.species]}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{pet.name}</h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <Badge className="bg-white/20 text-white border-white/20 capitalize backdrop-blur-sm">
                  {pet.species}
                </Badge>
                {pet.breed && (
                  <span className="text-white/80 text-sm">{pet.breed}</span>
                )}
              </div>
            </div>
            <Link href={`/ai-assistant?petId=${pet.id}`}>
              <button className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-xl hover:bg-white/30 transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-4"
      >
        {[
          { icon: Cake, label: "Age", value: getAge(pet.dateOfBirth) ?? "Unknown" },
          { icon: Weight, label: "Weight", value: pet.weight ? `${pet.weight} ${pet.weightUnit}` : "—" },
          { icon: genderIcon, label: "Sex", value: pet.gender === "unknown" ? "—" : pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-card rounded-2xl border border-border/50 shadow-card p-3 text-center">
            <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
            <p className="text-sm font-semibold mt-0.5 capitalize">{value}</p>
          </div>
        ))}
      </motion.div>

      {/* Info grid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"
      >
        <InfoCard title="Identity" icon="🪪">
          <InfoRow icon={Palette} label="Color" value={pet.color} />
          <InfoRow icon={Cpu} label="Microchip ID" value={pet.microchipId} />
          <InfoRow icon={Cake} label="Date of birth" value={pet.dateOfBirth ? new Date(pet.dateOfBirth).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : undefined} />
          {!pet.color && !pet.microchipId && !pet.dateOfBirth && (
            <p className="text-xs text-muted-foreground py-2">No identity info recorded.</p>
          )}
        </InfoCard>

        <InfoCard title="Health" icon="🏥">
          <InfoRow icon={AlertTriangle} label="Allergies" value={pet.allergies} color="text-peach" />
          <InfoRow icon={HeartPulse} label="Conditions" value={pet.medicalConditions} />
          <InfoRow icon={Pill} label="Medications" value={pet.currentMedications} />
          <InfoRow icon={ShieldCheck} label="Insurance" value={
            pet.insuranceCarrier
              ? `${pet.insuranceCarrier}${pet.insurancePolicy ? ` · ${pet.insurancePolicy}` : ""}`
              : undefined
          } />
          {!pet.allergies && !pet.medicalConditions && !pet.currentMedications && !pet.insuranceCarrier && (
            <p className="text-xs text-muted-foreground py-2">No health info recorded.</p>
          )}
        </InfoCard>

        <InfoCard title="Veterinarian" icon="🩺">
          <InfoRow icon={MapPin} label="Vet Name" value={pet.vetName} />
          <InfoRow icon={Phone} label="Vet Phone" value={pet.vetPhone} />
          {!pet.vetName && !pet.vetPhone && (
            <p className="text-xs text-muted-foreground py-2">No vet info recorded.</p>
          )}
        </InfoCard>

        <InfoCard title="Emergency Contact" icon="🚨">
          <InfoRow icon={Phone} label="Name" value={pet.emergencyContactName} />
          <InfoRow icon={Phone} label="Phone" value={pet.emergencyContactPhone} color="text-destructive" />
          {!pet.emergencyContactName && !pet.emergencyContactPhone && (
            <p className="text-xs text-muted-foreground py-2">No emergency contact recorded.</p>
          )}
        </InfoCard>
      </motion.div>

      {/* Favorites */}
      {(pet.favoriteFood || pet.favoriteTreats) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mb-4"
        >
          <InfoCard title="Favorites & Preferences" icon="❤️">
            <InfoRow icon={UtensilsCrossed} label="Favorite food" value={pet.favoriteFood} />
            <InfoRow icon={UtensilsCrossed} label="Favorite treats" value={pet.favoriteTreats} />
          </InfoCard>
        </motion.div>
      )}

      {/* Notes */}
      {pet.notes && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22 }}
          className="mb-4"
        >
          <Card className="p-4 border-border/50 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📝</span>
              <h3 className="text-sm font-semibold">Notes</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{pet.notes}</p>
          </Card>
        </motion.div>
      )}

      {/* Records tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
      >
        <Tabs defaultValue="health">
          <TabsList className="grid w-full grid-cols-3 rounded-xl mb-3">
            <TabsTrigger value="health" className="rounded-lg text-xs">Health Records</TabsTrigger>
            <TabsTrigger value="feeding" className="rounded-lg text-xs">Feeding</TabsTrigger>
            <TabsTrigger value="schedule" className="rounded-lg text-xs">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="space-y-2">
            {healthEvents.length === 0 ? (
              <EmptyTab icon="💉" label="No health records yet" />
            ) : (
              healthEvents.map((event) => (
                <Card key={event.id} className="p-4 flex items-start gap-3 border-border/50">
                  <div className="w-9 h-9 rounded-xl bg-sage-light flex items-center justify-center shrink-0 mt-0.5">
                    <HeartPulse className="w-4 h-4 text-sage" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm">{event.title}</p>
                      <Badge variant="secondary" className="text-[10px] capitalize shrink-0">
                        {event.type.replace("_", " ")}
                      </Badge>
                    </div>
                    {event.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {event.vetName && ` · ${event.vetName}`}
                      {event.cost && ` · $${event.cost}`}
                    </p>
                    {event.nextDueDate && (
                      <p className="text-xs text-primary mt-0.5 font-medium">
                        Next: {new Date(event.nextDueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    )}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="feeding" className="space-y-2">
            {feedingSchedules.length === 0 ? (
              <EmptyTab icon="🍽️" label="No feeding schedules yet" />
            ) : (
              feedingSchedules.map((s) => (
                <Card key={s.id} className="p-4 flex items-start gap-3 border-border/50">
                  <div className="w-9 h-9 rounded-xl bg-peach-light flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="w-4 h-4 text-peach" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{s.foodName}</p>
                    {s.brand && <p className="text-xs text-muted-foreground">{s.brand}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      {s.portionSize} {s.portionUnit} · {s.frequency.replace("_", " ")}
                    </p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {s.times.map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-2">
            {reminders.length === 0 ? (
              <EmptyTab icon="📅" label="No reminders for this pet yet" />
            ) : (
              reminders.map((r) => (
                <Card key={r.id} className="p-4 flex items-start gap-3 border-border/50">
                  <div className="w-9 h-9 rounded-xl bg-lavender-light flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-lavender" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{r.title}</p>
                    {r.description && <p className="text-xs text-muted-foreground">{r.description}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(r.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {r.recurring && ` · ${r.recurringInterval}`}
                    </p>
                  </div>
                  <Badge variant={r.completed ? "secondary" : "outline"} className="text-[10px] shrink-0">
                    {r.completed ? "Done" : "Pending"}
                  </Badge>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {showDelete && (
        <DeleteModal
          name={pet.name}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

function EmptyTab({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="text-center py-12 space-y-2">
      <span className="text-3xl">{icon}</span>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
