"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TraceDetail from "@/components/traces/TraceDetail";
import { getTrace, type TraceDto } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TracePageProps {
  params: Promise<{ id: string }>;
}

export default function TraceDetailPage({ params }: TracePageProps) {
  const { id } = use(params);

  const { data, isLoading, isError, refetch } = useQuery<TraceDto>({
    queryKey: ["trace", id],
    queryFn: () => getTrace(id),
    staleTime: 5 * 60 * 1000, // 5 min — trace details don't change
    refetchInterval: false,
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden pl-60">
        <Header
          title="Trace Details"
          subtitle={id}
        />

        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <div className="mx-auto max-w-5xl">
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-xl bg-zinc-800" />
                <Skeleton className="h-10 w-64 rounded-lg bg-zinc-800" />
                <Skeleton className="h-[600px] w-full rounded-xl bg-zinc-800" />
              </div>
            )}

            {isError && (
              <div className="flex flex-col items-center gap-4 py-20">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <p className="text-sm text-zinc-400">
                  Failed to load trace. It may not exist or the backend is
                  unavailable.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="border-zinc-700 text-zinc-300"
                >
                  Retry
                </Button>
              </div>
            )}

            {data && <TraceDetail trace={data} />}
          </div>
        </main>
      </div>
    </div>
  );
}
