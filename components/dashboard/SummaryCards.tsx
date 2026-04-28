"use client";

import { useQuery } from "@tanstack/react-query";
import { getSummary, type SummaryDto } from "@/lib/api";
import { formatCost, formatTokens, formatLatency } from "@/lib/utils";
import MetricCard from "./MetricCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  DollarSign,
  Coins,
  PiggyBank,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface SummaryCardsProps {
  days: number;
}

export default function SummaryCards({ days }: SummaryCardsProps) {
  const { data, isLoading, isError, refetch } = useQuery<SummaryDto>({
    queryKey: ["summary", { days }],
    queryFn: () => getSummary({ days }),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <p className="text-sm text-red-300">Failed to load summary data.</p>
        <button
          onClick={() => refetch()}
          className="ml-auto text-sm font-medium text-red-400 underline hover:text-red-300"
        >
          Retry
        </button>
      </div>
    );
  }

  const totalTokens = data.totalInputTokens + data.totalOutputTokens;
  const errorRate =
    data.totalRequests > 0
      ? (data.errorRequests / data.totalRequests) * 100
      : 0;

  const cards = [
    {
      title: "Total Requests",
      value: data.totalRequests.toLocaleString(),
      subtext: `last ${days} days`,
      icon: Activity,
      color: "default" as const,
    },
    {
      title: "Total Tokens",
      value: formatTokens(totalTokens),
      subtext: `${formatTokens(data.totalInputTokens)} in · ${formatTokens(data.totalOutputTokens)} out`,
      icon: Coins,
      color: "default" as const,
    },
    {
      title: "Total Cost",
      value: formatCost(data.totalCostUsd),
      subtext: `last ${days} days`,
      icon: DollarSign,
      color: "default" as const,
    },
    {
      title: "Cost Saved",
      value: formatCost(data.totalSavedUsd),
      subtext: "via compression",
      icon: PiggyBank,
      color: (data.totalSavedUsd > 0 ? "green" : "default") as
        | "green"
        | "default",
    },
    {
      title: "Avg Latency",
      value: formatLatency(data.avgLatencyMs),
      subtext: `p95 ${formatLatency(data.p95LatencyMs)}`,
      icon: Clock,
      color: "default" as const,
    },
    {
      title: "Error Rate",
      value: `${errorRate.toFixed(1)}%`,
      subtext: `${data.errorRequests} errors / ${data.totalRequests} requests`,
      icon: AlertTriangle,
      color: (errorRate > 5 ? "red" : "default") as "red" | "default",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card) => (
        <MetricCard key={card.title} {...card} />
      ))}
    </div>
  );
}

