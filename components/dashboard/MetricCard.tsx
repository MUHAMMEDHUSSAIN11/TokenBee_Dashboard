"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  color?: "default" | "green" | "red";
}

export default function MetricCard({
  title,
  value,
  subtext,
  icon: Icon,
  color = "default",
}: MetricCardProps) {
  return (
    <Card className="border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:bg-zinc-900">
      <CardContent className="flex items-start justify-between pt-0">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400 uppercase">
            {title}
          </p>
          <p
            className={cn(
              "text-2xl font-bold tabular-nums tracking-tight transition-colors",
              color === "green" && "text-emerald-600 dark:text-emerald-400",
              color === "red" && "text-red-600 dark:text-red-400",
              color === "default" && "text-zinc-900 dark:text-zinc-50"
            )}
          >
            {value}
          </p>
          <p className="text-xs text-zinc-500">{subtext}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            color === "green" && "bg-emerald-500/10",
            color === "red" && "bg-red-500/10",
            color === "default" && "bg-violet-500/10"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5",
              color === "green" && "text-emerald-600 dark:text-emerald-400",
              color === "red" && "text-red-600 dark:text-red-400",
              color === "default" && "text-violet-600 dark:text-violet-400"
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
