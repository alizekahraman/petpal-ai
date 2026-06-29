"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Syringe } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 17) return "Good afternoon";
  if (h >= 17 && h < 21) return "Good evening";
  return "Good night";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

interface GreetingSectionProps {
  nextVaccine?: { petName: string; vaccine: string; daysUntil: number };
}

export function GreetingSection({ nextVaccine }: GreetingSectionProps) {
  const { user } = useAuth();
  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "there";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal via-teal/80 to-sage p-6 text-white"
    >
      {/* Background decoration */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative">
        <p className="text-sm font-medium text-white/70">{getFormattedDate()}</p>
        <h2 className="text-2xl font-bold mt-1 tracking-tight">
          {getGreeting()}, {firstName} 👋
        </h2>

        {nextVaccine && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 flex items-center gap-2.5 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2.5 w-fit"
          >
            <Syringe className="w-4 h-4 text-white/80 shrink-0" />
            <p className="text-sm text-white/90">
              <span className="font-semibold text-white">{nextVaccine.petName}</span>
              {"'s "}
              {nextVaccine.vaccine}
              {" in "}
              <span className="font-semibold text-white">
                {nextVaccine.daysUntil === 0
                  ? "today"
                  : nextVaccine.daysUntil === 1
                  ? "1 day"
                  : `${nextVaccine.daysUntil} days`}
              </span>
            </p>
          </motion.div>
        )}

        {!nextVaccine && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 flex items-center gap-2.5 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2.5 w-fit"
          >
            <Sparkles className="w-4 h-4 text-white/80" />
            <p className="text-sm text-white/90">All caught up — your pets are doing great!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
