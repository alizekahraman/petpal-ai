import type { Metadata } from "next";
import { Plus, Calendar, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { PLACEHOLDER_REMINDERS, PLACEHOLDER_PETS } from "@/lib/placeholder-data";

export const metadata: Metadata = { title: "Schedule" };

export default function SchedulePage() {
  const upcoming = PLACEHOLDER_REMINDERS.filter((r) => !r.completed);
  const completed = PLACEHOLDER_REMINDERS.filter((r) => r.completed);

  return (
    <div className="max-w-2xl mx-auto md:max-w-none">
      <PageHeader
        title="Schedule"
        description="Reminders and recurring care tasks for your pets."
        action={
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            Add reminder
          </Button>
        }
      />

      {upcoming.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No upcoming reminders"
          description="Add reminders for vaccinations, vet visits, grooming, and more."
        />
      ) : (
        <section className="mb-6">
          <h3 className="font-semibold text-sm mb-3">Upcoming</h3>
          <div className="space-y-2">
            {upcoming.map((reminder) => {
              const pet = PLACEHOLDER_PETS.find((p) => p.id === reminder.petId);
              return (
                <Card key={reminder.id} className="p-4 flex items-center gap-3 border-border/50">
                  <button className="shrink-0">
                    <Circle className="w-5 h-5 text-muted-foreground/40 hover:text-primary transition-colors" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{reminder.title}</p>
                      {reminder.recurring && (
                        <Badge variant="secondary" className="text-[10px] capitalize">
                          {reminder.recurringInterval}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {pet?.name} · {new Date(reminder.dueDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h3 className="font-semibold text-sm mb-3 text-muted-foreground">Completed</h3>
          <div className="space-y-2">
            {completed.map((reminder) => (
              <Card key={reminder.id} className="p-4 flex items-center gap-3 border-border/50 opacity-60">
                <CheckCircle2 className="w-5 h-5 text-sage shrink-0" />
                <p className="text-sm line-through text-muted-foreground">{reminder.title}</p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
