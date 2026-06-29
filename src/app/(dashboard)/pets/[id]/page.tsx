import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeartPulse, UtensilsCrossed, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { PetAvatar } from "@/components/pets/pet-avatar";
import { PLACEHOLDER_PETS, PLACEHOLDER_HEALTH_EVENTS, PLACEHOLDER_FEEDING_SCHEDULES } from "@/lib/placeholder-data";

export const metadata: Metadata = { title: "Pet Profile" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PetDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pet = PLACEHOLDER_PETS.find((p) => p.id === id);
  if (!pet) notFound();

  const healthEvents = PLACEHOLDER_HEALTH_EVENTS.filter((e) => e.petId === id);
  const feedingSchedules = PLACEHOLDER_FEEDING_SCHEDULES.filter((s) => s.petId === id);

  return (
    <div className="max-w-xl mx-auto md:max-w-none">
      <PageHeader
        title={pet.name}
        action={
          <Button variant="outline" size="sm" className="rounded-xl gap-2">
            <Edit className="w-3.5 h-3.5" />
            Edit
          </Button>
        }
      />

      {/* Profile card */}
      <Card className="p-5 flex items-center gap-4 mb-5 border-border/50">
        <PetAvatar pet={pet} size="xl" />
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold">{pet.name}</h2>
            <Badge variant="secondary" className="capitalize">{pet.species}</Badge>
            <Badge variant="outline" className="capitalize">{pet.gender}</Badge>
          </div>
          {pet.breed && <p className="text-sm text-muted-foreground">{pet.breed}</p>}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {pet.dateOfBirth && (
              <span>Born {new Date(pet.dateOfBirth).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            )}
            {pet.weight && <span>{pet.weight} {pet.weightUnit}</span>}
          </div>
          {pet.notes && <p className="text-sm text-muted-foreground italic">{pet.notes}</p>}
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="health">
        <TabsList className="grid w-full grid-cols-3 rounded-xl mb-4">
          <TabsTrigger value="health" className="rounded-lg">Health</TabsTrigger>
          <TabsTrigger value="feeding" className="rounded-lg">Feeding</TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-lg">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-2">
          {healthEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No health records yet.</p>
          ) : (
            healthEvents.map((event) => (
              <Card key={event.id} className="p-4 flex items-start gap-3 border-border/50">
                <div className="w-9 h-9 rounded-xl bg-sage-light flex items-center justify-center shrink-0 mt-0.5">
                  <HeartPulse className="w-4 h-4 text-sage" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm">{event.title}</p>
                    <Badge variant="secondary" className="text-[10px] capitalize shrink-0">{event.type.replace("_", " ")}</Badge>
                  </div>
                  {event.description && <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>}
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    {event.vetName && ` · ${event.vetName}`}
                    {event.cost && ` · $${event.cost}`}
                  </p>
                  {event.nextDueDate && (
                    <p className="text-xs text-primary mt-0.5">
                      Next due: {new Date(event.nextDueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  )}
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="feeding" className="space-y-2">
          {feedingSchedules.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No feeding schedules yet.</p>
          ) : (
            feedingSchedules.map((schedule) => (
              <Card key={schedule.id} className="p-4 flex items-start gap-3 border-border/50">
                <div className="w-9 h-9 rounded-xl bg-peach-light flex items-center justify-center shrink-0 mt-0.5">
                  <UtensilsCrossed className="w-4 h-4 text-peach" />
                </div>
                <div>
                  <p className="font-medium text-sm">{schedule.foodName}</p>
                  {schedule.brand && <p className="text-xs text-muted-foreground">{schedule.brand}</p>}
                  <p className="text-xs text-muted-foreground mt-1">
                    {schedule.portionSize} {schedule.portionUnit} · {schedule.frequency.replace("_", " ")}
                  </p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {schedule.times.map((t) => (
                      <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="schedule">
          <p className="text-sm text-muted-foreground text-center py-8">No upcoming reminders for {pet.name}.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
