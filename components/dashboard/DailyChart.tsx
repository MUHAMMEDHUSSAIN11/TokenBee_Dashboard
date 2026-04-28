"use client";

import { useQuery } from "@tanstack/react-query";
import { getDaily, type DailyDto } from "@/lib/api";
import { formatCost, formatTokens } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DailyChartProps {
  days: number;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
      <p className="mb-1 text-xs font-medium text-zinc-500 dark:text-zinc-300">{label}</p>
      {payload.map((entry: any) => {
        let val = "";
        if (entry.name === "requests") val = `Requests: ${Number(entry.value).toLocaleString()}`;
        else if (entry.name === "tokens") val = `Tokens: ${formatTokens(Number(entry.value))}`;
        else val = `Cost: ${formatCost(Number(entry.value))}`;
        
        return (
          <p
            key={String(entry.name)}
            className="text-xs font-semibold"
            style={{ color: entry.color }}
          >
            {val}
          </p>
        );
      })}
    </div>
  );
}

export default function DailyChart({ days }: DailyChartProps) {
  const { data, isLoading, isError, refetch } = useQuery<DailyDto[]>({
    queryKey: ["daily", { days }],
    queryFn: () => getDaily({ days }),
  });

  if (isLoading) {
    return (
      <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-zinc-200">Daily Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
        <CardContent className="flex items-center gap-3 py-8">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-300">Failed to load chart data.</p>
          <button
            onClick={() => refetch()}
            className="ml-auto text-sm font-medium text-red-600 underline hover:text-red-500"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80">
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-zinc-200">Daily Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-zinc-500">
            No daily data yet. Make requests through the proxy to see trends.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    requests: d.requests,
    costUsd: d.costUsd,
    tokens: d.inputTokens + d.outputTokens,
  }));

  return (
    <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 transition-colors shadow-sm">
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-200">Daily Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradTokens" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
            <XAxis
              dataKey="date"
              tick={{ fill: "currentColor", fontSize: 12 }}
              className="text-zinc-400 dark:text-zinc-600"
              axisLine={{ stroke: "currentColor" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "currentColor", fontSize: 12 }}
              className="text-zinc-400 dark:text-zinc-600"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "currentColor", fontSize: 12 }}
              className="text-zinc-400 dark:text-zinc-600"
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${v.toFixed(2)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="requests"
              name="requests"
              stroke="#8b5cf6"
              fill="url(#gradRequests)"
              strokeWidth={2}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="tokens"
              name="tokens"
              stroke="#f59e0b"
              fill="url(#gradTokens)"
              strokeWidth={2}
              hide // Hidden by default to avoid cluttering but available in tooltip
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="costUsd"
              name="cost"
              stroke="#06b6d4"
              fill="url(#gradCost)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-xs text-zinc-400">Requests</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-xs text-zinc-400">Tokens</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-500" />
            <span className="text-xs text-zinc-400">Cost (USD)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

