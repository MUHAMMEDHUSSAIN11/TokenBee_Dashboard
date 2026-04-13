"use client";

import { useQuery } from "@tanstack/react-query";
import { getByUser, type UserDto } from "@/lib/api";
import { formatCost, relativeTime, formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { AlertTriangle } from "lucide-react";

interface UserBreakdownProps {
  days: number;
}

export default function UserBreakdown({ days }: UserBreakdownProps) {
  const { data, isLoading, isError, refetch } = useQuery<UserDto[]>({
    queryKey: ["by-user", { days }],
    queryFn: () => getByUser({ days }),
  });

  if (isLoading) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/80">
        <CardHeader>
          <CardTitle className="text-zinc-200">Top Users</CardTitle>
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
          <p className="text-sm text-red-300">Failed to load user data.</p>
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
    return null; // Only show if data exists
  }

  const sorted = [...data].sort((a, b) => b.costUsd - a.costUsd);

  return (
    <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 transition-colors shadow-sm">
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-200">Top Users</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500 dark:text-zinc-400">User ID</TableHead>
              <TableHead className="text-right text-zinc-500 dark:text-zinc-400">
                Requests
              </TableHead>
              <TableHead className="text-right text-zinc-500 dark:text-zinc-400">Cost</TableHead>
              <TableHead className="text-right text-zinc-500 dark:text-zinc-400">
                Last Seen
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((u, i) => (
              <TableRow
                key={u.userId ?? `anon-${i}`}
                className="border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
              >
                <TableCell className="font-medium text-zinc-900 dark:text-zinc-200">
                  {u.userId ?? (
                    <span className="text-zinc-500 italic">Anonymous</span>
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums text-zinc-600 dark:text-zinc-300">
                  {u.requests.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums text-zinc-900 dark:text-zinc-200">
                  {formatCost(u.costUsd)}
                </TableCell>
                <TableCell className="text-right text-zinc-600 dark:text-zinc-300">
                  <Tooltip>
                    <TooltipTrigger className="cursor-default">
                      {relativeTime(u.lastSeen)}
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 shadow-lg"
                    >
                      {formatDate(u.lastSeen)}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
