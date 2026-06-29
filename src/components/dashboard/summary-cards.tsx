"use client";

import { motion } from "framer-motion";
import { Syringe, UtensilsCrossed, Bell, ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCard {
  id: string;
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color: "teal" | "sage" | "lavender" | "peach" | "rose";
  alert?: boolean;
}

const colorMap = {
  teal: {
    bg: "bg-teal-light dark:bg-teal/20",
    icon: "bg-teal text-white",
    label: "text-teal",
  },
  sage: {
    bg: "bg-sage-light dark:bg-sage/20",
    icon: "bg-sage text-white",
    label: "text-sage",
  },
  lavender: {
    bg: "bg-lavender-light dark:bg-lavender/20",
    icon: "bg-lavender text-white",
    label: "text-lavender",
  },
  peach: {
    bg: "bg-peach-light dark:bg-peach/20",
    icon: "bg-peach text-foreground",
    label: "text-foreground/70",
  },
  rose: {
    bg: "bg-red-50 dark:bg-red-950/30",
    icon: "bg-red-500 text-white",
    label: "text-red-500",
  },
};

interface SummaryCardsProps {
  cards: SummaryCard[];
}

export function SummaryCards({ cards }: SummaryCardsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const c = colorMap[card.color];
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className={cn(
              "relative shrink-0 w-44 md:w-auto rounded-2xl p-4 space-y-3",
              c.bg
            )}
          >
            {card.alert && (
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", c.icon)}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className={cn("text-[11px] font-semibold uppercase tracking-wide", c.label)}>
                {card.label}
              </p>
              <p className="text-[15px] font-bold text-foreground leading-tight mt-0.5">
                {card.value}
              </p>
              {card.sub && (
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{card.sub}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export type { SummaryCard };
