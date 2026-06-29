"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Sparkles, FileUp, CalendarPlus, Bluetooth } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const actions = [
  {
    id: "add-pet",
    label: "Add Pet",
    icon: Plus,
    href: "/pets/new",
    color: "bg-teal text-white",
  },
  {
    id: "ask-ai",
    label: "Ask AI",
    icon: Sparkles,
    href: "/ai-assistant",
    color: "bg-lavender text-white",
  },
  {
    id: "upload",
    label: "Upload Record",
    icon: FileUp,
    href: null,
    color: "bg-sage text-white",
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: CalendarPlus,
    href: "/schedule",
    color: "bg-peach text-foreground",
  },
  {
    id: "connect",
    label: "Connect Device",
    icon: Bluetooth,
    href: null,
    color: "bg-muted text-foreground",
  },
];

export function QuickActions() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
      {actions.map((action, i) => {
        const Icon = action.icon;

        const inner = (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center gap-2 shrink-0 cursor-pointer"
          >
            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm",
                action.color
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight w-14">
              {action.label}
            </span>
          </motion.div>
        );

        if (action.href) {
          return (
            <Link key={action.id} href={action.href}>
              {inner}
            </Link>
          );
        }

        return (
          <button
            key={action.id}
            onClick={() =>
              toast.info(
                action.id === "upload"
                  ? "Medical record upload coming soon"
                  : "Device connection coming soon"
              )
            }
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
