"use client";

import { useQuery } from "@tanstack/react-query";
import { getByModel, type ModelDto } from "@/lib/api";
import { formatCost, formatTokens, formatLatency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";

interface ModelBreakdownProps {
  days: number;
}

export default function ModelBreakdown({ days }: ModelBreakdownProps) {
  const { data, isLoading, isError, refetch } = useQuery<ModelDto[]>({
    queryKey: ["by-model", { days }],
    queryFn: () => getByModel({ days }),
  });

  if (isLoading) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/80">
        <CardHeader>
          <CardTitle className="text-zinc-200">Model Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full bg-zinc-800" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/80">
        <CardContent className="flex items-center gap-3 py-8">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <p className="text-sm text-red-300">Failed to load model data.</p>
          <button
            onClick={() => refetch()}
            className="ml-auto text-sm font-medium text-red-400 underline hover:text-red-300"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/80">
        <CardHeader>
          <CardTitle className="text-zinc-200">Model Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center">
          <p className="text-sm text-zinc-500">No model data available yet.</p>
        </CardContent>
      </Card>
    );
  }

  const sorted = [...data].sort((a, b) => b.costUsd - a.costUsd);

  return (
    <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 transition-colors shadow-sm">
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-200">Model Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500 dark:text-zinc-400">Model</TableHead>
              <TableHead className="text-zinc-500 dark:text-zinc-400">Provider</TableHead>
              <TableHead className="text-right text-zinc-500 dark:text-zinc-400">
                Requests
              </TableHead>
              <TableHead className="text-right text-zinc-500 dark:text-zinc-400">
                Tokens
              </TableHead>
              <TableHead className="text-right text-zinc-500 dark:text-zinc-400">Cost</TableHead>
              <TableHead className="text-right text-zinc-500 dark:text-zinc-400">
                Avg Latency
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((m) => (
              <TableRow
                key={`${m.provider}-${m.model}`}
                className="border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
              >
                <TableCell className="font-medium text-zinc-900 dark:text-zinc-200">
                  {m.model}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                  >
                    {m.provider}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums text-zinc-600 dark:text-zinc-300">
                  {m.requests.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums text-zinc-600 dark:text-zinc-300">
                  {formatTokens(m.inputTokens + m.outputTokens)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-zinc-900 dark:text-zinc-200">
                  {formatCost(m.costUsd)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-zinc-600 dark:text-zinc-300">
                  {formatLatency(m.avgLatencyMs)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
