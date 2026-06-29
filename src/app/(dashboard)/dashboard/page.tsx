import type { Metadata } from "next";
import Link from "next/link";
import { Plus, HeartPulse, UtensilsCrossed, Calendar, Sparkles, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { PetCard } from "@/components/pets/pet-card";
import { PLACEHOLDER_PETS, PLACEHOLDER_REMINDERS } from "@/lib/placeholder-data";

export const metadata: Metadata = { title: "Home" };

export default function DashboardPage() {
  const upcomingReminders = PLACEHOLDER_REMINDERS.filter((r) => !r.completed).slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto md:max-w-none space-y-6">
      {/* Greeting */}
      <div className="petpal-gradient rounded-2xl p-5 text-foreground">
        <p className="text-sm font-medium opacity-75">Good morning,</p>
        <h2 className="text-xl font-semibold mt-0.5">Jane 👋</h2>
        <p className="text-sm opacity-70 mt-1">
          You have {upcomingReminders.length} upcoming reminders today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="My Pets" value={PLACEHOLDER_PETS.length} icon={PawPrint} color="teal" />
        <StatCard label="Health Events" value={3} icon={HeartPulse} color="sage" />
        <StatCard label="Feeding Logs" value={12} icon={UtensilsCrossed} color="peach" />
        <StatCard label="Reminders" value={upcomingReminders.length} icon={Calendar} color="lavender" />
      </div>

      {/* Pets */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">My Pets</h3>
          <Link href="/pets/new">
            <Button size="sm" variant="ghost" className="h-8 rounded-xl gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Add pet
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          {PLACEHOLDER_PETS.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Upcoming</h3>
          <Link href="/schedule">
            <Button size="sm" variant="ghost" className="h-8 rounded-xl">
              View all
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          {upcomingReminders.map((reminder) => (
            <Card key={reminder.id} className="p-4 flex items-center gap-3 border-border/50">
              <div className="w-9 h-9 rounded-xl bg-lavender-light flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-lavender" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{reminder.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(reminder.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  {reminder.recurring && (
                    <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0 capitalize">
                      {reminder.recurringInterval}
                    </Badge>
                  )}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* AI CTA */}
      <Link href="/ai-assistant">
        <Card className="p-5 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Ask your AI Pet Assistant</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get personalized advice, nutrition tips, and health insights.
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
