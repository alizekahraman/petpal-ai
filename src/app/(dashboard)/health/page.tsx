import type { Metadata } from "next";
import { Plus, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { PetAvatar } from "@/components/pets/pet-avatar";
import { PLACEHOLDER_HEALTH_EVENTS, PLACEHOLDER_PETS } from "@/lib/placeholder-data";

export const metadata: Metadata = { title: "Health" };

export default function HealthPage() {
  return (
    <div className="max-w-2xl mx-auto md:max-w-none">
      <PageHeader
        title="Health Records"
        description="Track vaccinations, vet visits, medications, and more."
        action={
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            Add record
          </Button>
        }
      />

      <div className="space-y-3">
        {PLACEHOLDER_HEALTH_EVENTS.map((event) => {
          const pet = PLACEHOLDER_PETS.find((p) => p.id === event.petId);
          return (
            <Card key={event.id} className="p-4 flex items-start gap-4 border-border/50">
              {pet && <PetAvatar pet={pet} size="sm" className="mt-0.5" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="font-medium text-sm">{event.title}</p>
                  <Badge variant="secondary" className="text-[10px] capitalize shrink-0">
                    {event.type.replace("_", " ")}
                  </Badge>
                </div>
                {pet && <p className="text-xs text-muted-foreground mb-1">{pet.name}</p>}
                {event.description && <p className="text-xs text-muted-foreground">{event.description}</p>}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  {event.vetName && <span>· {event.vetName}</span>}
                  {event.cost && <span>· ${event.cost}</span>}
                </div>
                {event.nextDueDate && (
                  <p className="text-xs text-primary mt-1">
                    Next due: {new Date(event.nextDueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
