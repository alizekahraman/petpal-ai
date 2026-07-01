"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Bell, Syringe, UtensilsCrossed, ShieldCheck } from "lucide-react";
import { GreetingSection } from "@/components/dashboard/greeting-section";
import { SummaryCards, type SummaryCard } from "@/components/dashboard/summary-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { PetDashboardCard } from "@/components/dashboard/pet-dashboard-card";
import { SectionHeader } from "@/components/shared/section-header";
import { getDaysUntil } from "@/lib/pet-utils";
import {
  PLACEHOLDER_PETS,
  PLACEHOLDER_HEALTH_EVENTS,
  PLACEHOLDER_FEEDING_SCHEDULES,
  PLACEHOLDER_REMINDERS,
} from "@/lib/placeholder-data";

function buildSummaryCards(): SummaryCard[] {
  const futureVaccines = PLACEHOLDER_HEALTH_EVENTS.filter(
    (e) => e.type === "vaccination" && e.nextDueDate
  ).sort(
    (a, b) =>
      new Date(a.nextDueDate!).getTime() - new Date(b.nextDueDate!).getTime()
  );
  const nextVacc = futureVaccines[0];
  const vaccDays = getDaysUntil(nextVacc?.nextDueDate);
  const vaccPet = nextVacc
    ? PLACEHOLDER_PETS.find((p) => p.id === nextVacc.petId)
    : undefined;

  const totalMeals = PLACEHOLDER_FEEDING_SCHEDULES.reduce(
    (sum, s) => sum + s.times.length,
    0
  );

  const nextReminder = PLACEHOLDER_REMINDERS.filter((r) => !r.completed).sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )[0];

  return [
    {
      id: "vaccine",
      icon: Syringe,
      label: "Next Vaccine",
      value:
        vaccDays === null
          ? "None due"
          : vaccDays <= 0
          ? "Due today"
          : `${vaccDays}d`,
      sub: nextVacc
        ? `${vaccPet?.name ?? "Pet"} · ${nextVacc.title}`
        : "All vaccines up to date",
      color: vaccDays !== null && vaccDays <= 7 ? "rose" : "teal",
      alert: vaccDays !== null && vaccDays <= 0,
    },
    {
      id: "feeding",
      icon: UtensilsCrossed,
      label: "Feeding Today",
      value: `0 / ${totalMeals}`,
      sub: `${totalMeals} meals scheduled`,
      color: "sage",
    },
    {
      id: "reminder",
      icon: Bell,
      label: "Next Reminder",
      value: nextReminder
        ? new Date(nextReminder.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "None",
      sub: nextReminder?.title ?? "All clear",
      color: "lavender",
    },
    {
      id: "health",
      icon: ShieldCheck,
      label: "Health Alerts",
      value: "All Good",
      sub: "No active alerts",
      color: "sage",
    },
  ];
}

function getNextVaccineForGreeting() {
  const future = PLACEHOLDER_HEALTH_EVENTS.filter(
    (e) => e.type === "vaccination" && e.nextDueDate
  ).sort(
    (a, b) =>
      new Date(a.nextDueDate!).getTime() - new Date(b.nextDueDate!).getTime()
  );
  const e = future[0];
  if (!e) return undefined;
  const days = getDaysUntil(e.nextDueDate);
  if (days === null || days > 14) return undefined;
  const pet = PLACEHOLDER_PETS.find((p) => p.id === e.petId);
  return { petName: pet?.name ?? "Pet", vaccine: e.title, daysUntil: days };
}

function getNextVaccineForPet(petId: string) {
  return PLACEHOLDER_HEALTH_EVENTS.find(
    (e) => e.petId === petId && e.type === "vaccination" && e.nextDueDate
  );
}

export default function DashboardPage() {
  const summaryCards = React.useMemo(buildSummaryCards, []);
  const nextVaccine = React.useMemo(getNextVaccineForGreeting, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-4">
      <GreetingSection nextVaccine={nextVaccine} />

      <section>
        <SectionHeader label="Today's Summary" />
        <SummaryCards cards={summaryCards} />
      </section>

      <section>
        <SectionHeader label="Quick Actions" />
        <QuickActions />
      </section>

      <section>
        <SectionHeader label="My Pets" href="/pets" linkLabel="See all" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {PLACEHOLDER_PETS.map((pet, i) => (
            <PetDashboardCard
              key={pet.id}
              pet={pet}
              nextVaccine={getNextVaccineForPet(pet.id)}
              index={i}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: PLACEHOLDER_PETS.length * 0.1 }}
          >
            <Link href="/pets/new">
              <div className="h-full min-h-[280px] rounded-3xl border-2 border-dashed border-border/70 hover:border-primary/40 hover:bg-primary/3 transition-all duration-300 flex flex-col items-center justify-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  Add a pet
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
