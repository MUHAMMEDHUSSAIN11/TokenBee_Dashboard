"use client";

import { useRouter } from "next/navigation";
import { type TraceDto } from "@/lib/api";
import {
  formatCost,
  formatTokens,
  formatLatency,
  relativeTime,
  formatDate,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TraceTableProps {
  traces: TraceDto[];
  offset: number;
  limit: number;
  onOffsetChange: (offset: number) => void;
  isLoading: boolean;
}

export default function TraceTable({
  traces,
  offset,
  limit,
  onOffsetChange,
  isLoading,
}: TraceTableProps) {
  const router = useRouter();

  const hasNext = traces.length === limit;
  const hasPrev = offset > 0;
  const showingFrom = offset + 1;
  const showingTo = offset + traces.length;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400">Timestamp</TableHead>
            <TableHead className="text-zinc-400">Model</TableHead>
            <TableHead className="text-right text-zinc-400">Tokens</TableHead>
            <TableHead className="text-right text-zinc-400">Cost</TableHead>
            <TableHead className="text-right text-zinc-400">Latency</TableHead>
            <TableHead className="text-zinc-400">User</TableHead>
            <TableHead className="text-center text-zinc-400">Status</TableHead>
            <TableHead className="text-center text-zinc-400">
              Savings
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i} className="border-zinc-800/50">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : traces.map((trace) => (
                <TableRow
                  key={trace.id}
                  className="cursor-pointer border-zinc-800/50 transition-colors hover:bg-zinc-800/40"
                  onClick={() => router.push(`/traces/${trace.id}`)}
                >
                  <TableCell className="text-zinc-300">
                    <Tooltip>
                      <TooltipTrigger className="cursor-default text-left">
                        {relativeTime(trace.timestamp)}
                      </TooltipTrigger>
                      <TooltipContent className="border-zinc-700 bg-zinc-800 text-zinc-200">
                        {formatDate(trace.timestamp)}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-200">
                        {trace.model}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-zinc-800 text-xs text-zinc-400"
                      >
                        {trace.provider}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-zinc-300">
                    <span className="text-zinc-400">
                      {formatTokens(trace.inputTokens)}
                    </span>
                    <span className="mx-1 text-zinc-600">/</span>
                    <span>{formatTokens(trace.outputTokens)}</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-zinc-200">
                    {formatCost(trace.costUsd)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-zinc-300">
                    {formatLatency(trace.latencyMs)}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {trace.userId ?? (
                      <span className="text-zinc-600">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip>
                      <TooltipTrigger className="inline-flex items-center justify-center">
                        <span
                          className={`inline-block h-2.5 w-2.5 rounded-full ${
                            trace.statusCode >= 200 && trace.statusCode < 300
                              ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]"
                              : "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.4)]"
                          }`}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="border-zinc-700 bg-zinc-800 text-zinc-200">
                        {trace.statusCode}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-center">
                    {trace.wasCompressed ? (
                      <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/20 hover:bg-violet-500/30">
                        {Math.round(((trace.originalTokens - trace.inputTokens) / trace.originalTokens) * 100)}%
                      </Badge>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          {!isLoading && traces.length === 0 && (
            <TableRow className="border-zinc-800/50">
              <TableCell colSpan={8} className="py-12 text-center">
                <p className="text-sm text-zinc-500">
                  No traces found. Make your first request through the proxy to
                  see data here.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
        <p className="text-sm text-zinc-500">
          {traces.length > 0
            ? `Showing ${showingFrom}–${showingTo}`
            : "No results"}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!hasPrev}
            onClick={() => onOffsetChange(Math.max(0, offset - limit))}
            className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasNext}
            onClick={() => onOffsetChange(offset + limit)}
            className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
