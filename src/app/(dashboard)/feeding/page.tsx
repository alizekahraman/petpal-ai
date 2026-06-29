import type { Metadata } from "next";
import { Plus, UtensilsCrossed, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { PetAvatar } from "@/components/pets/pet-avatar";
import { PLACEHOLDER_FEEDING_SCHEDULES, PLACEHOLDER_PETS } from "@/lib/placeholder-data";

export const metadata: Metadata = { title: "Feeding" };

export default function FeedingPage() {
  return (
    <div className="max-w-2xl mx-auto md:max-w-none">
      <PageHeader
        title="Feeding"
        description="Manage meal schedules and log daily feedings."
        action={
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            Add schedule
          </Button>
        }
      />

      {/* Today's meals — placeholder */}
      <section className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Today&apos;s meals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { time: "07:30", pet: "Luna", food: "Royal Canin", done: true },
            { time: "08:00", pet: "Mochi", food: "Hills Science Diet", done: true },
            { time: "18:00", pet: "Luna", food: "Royal Canin", done: false },
            { time: "19:00", pet: "Mochi", food: "Hills Science Diet", done: false },
          ].map((meal, i) => (
            <Card key={i} className="p-4 flex items-center gap-3 border-border/50">
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${meal.done ? "text-sage" : "text-muted-foreground/30"}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{meal.pet}</p>
                <p className="text-xs text-muted-foreground">{meal.food} · {meal.time}</p>
              </div>
              {!meal.done && (
                <Button size="sm" variant="outline" className="rounded-lg h-7 text-xs">
                  Log
                </Button>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Schedules */}
      <section>
        <h3 className="font-semibold text-sm mb-3">Feeding schedules</h3>
        <div className="space-y-3">
          {PLACEHOLDER_FEEDING_SCHEDULES.map((schedule) => {
            const pet = PLACEHOLDER_PETS.find((p) => p.id === schedule.petId);
            return (
              <Card key={schedule.id} className="p-4 flex items-start gap-4 border-border/50">
                {pet && <PetAvatar pet={pet} size="sm" className="mt-0.5" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{schedule.foodName}</p>
                    {schedule.brand && (
                      <Badge variant="secondary" className="text-[10px]">{schedule.brand}</Badge>
                    )}
                  </div>
                  {pet && <p className="text-xs text-muted-foreground mb-1">{pet.name}</p>}
                  <p className="text-xs text-muted-foreground">
                    {schedule.portionSize} {schedule.portionUnit} · {schedule.frequency.replace("_", " ")}
                  </p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {schedule.times.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
