import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  color?: "teal" | "sage" | "lavender" | "peach";
  className?: string;
}

const colorMap = {
  teal: "bg-teal-light text-teal",
  sage: "bg-sage-light text-sage",
  lavender: "bg-lavender-light text-lavender",
  peach: "bg-peach-light text-peach",
} as const;

export function StatCard({ label, value, icon: Icon, trend, color = "teal", className }: StatCardProps) {
  return (
    <Card className={cn("p-4 border-border/50", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground">
              <span className={trend.value >= 0 ? "text-sage" : "text-destructive"}>
                {trend.value >= 0 ? "+" : ""}{trend.value}%
              </span>{" "}
              {trend.label}
            </p>
          )}
        </div>
        <div className={cn("p-2 rounded-xl shrink-0", colorMap[color])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </Card>
  );
}
