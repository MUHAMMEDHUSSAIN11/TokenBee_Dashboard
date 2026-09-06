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
  days?: number;
  from?: string;
  to?: string;
  rangeLabel?: string;
  accountId: string;
}

export default function SummaryCards({
  days,
  from,
  to,
  rangeLabel,
  accountId,
}: SummaryCardsProps) {
  const windowLabel = rangeLabel ?? (days ? `last ${days} days` : "selected range");

  const { data, isLoading, isError, refetch } = useQuery<SummaryDto>({
    queryKey: ["summary", { days, from, to, accountId }],
    queryFn: () => getSummary({ days, from, to, accountId }),
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

  const ratio =
    data.totalInputTokens > 0 && data.totalOriginalTokens > 0
      ? data.totalOriginalTokens / data.totalInputTokens
      : 0;

  const cards = [
    {
      title: "AI interactions",
      value: data.totalRequests.toLocaleString(),
      subtext: windowLabel,
      icon: Activity,
      color: "default" as const,
    },
    {
      title: "AI spend",
      value: formatCost(data.totalCostUsd),
      subtext: windowLabel,
      icon: DollarSign,
      color: "default" as const,
    },
    {
      title: "Estimated savings",
      value: formatCost(data.totalSavedUsd),
      subtext: "from context optimization",
      icon: PiggyBank,
      color: (data.totalSavedUsd > 0 ? "green" : "default") as
        | "green"
        | "default",
    },
    {
      title: "Tokens processed",
      value: formatTokens(totalTokens),
      subtext: `${formatTokens(data.totalInputTokens)} in · ${formatTokens(data.totalOutputTokens)} out`,
      icon: Coins,
      color: "default" as const,
    },
    {
      title: "Average compression",
      value: ratio > 1 ? `${ratio.toFixed(1)}x` : "—",
      subtext: ratio > 1 ? "original / compressed input" : "no compression yet",
      icon: PiggyBank,
      color: "default" as const,
    },
    {
      title: "Avg Latency",
      value: formatLatency(data.avgLatencyMs),
      subtext: `p95 ${formatLatency(data.p95LatencyMs)}`,
      icon: Clock,
      color: "default" as const,
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

