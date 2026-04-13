"use client";

import { useState, useRef, useCallback, createRef } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import SessionHeader from "@/components/replay/SessionHeader";
import TimelineBar from "@/components/replay/TimelineBar";
import SpanList from "@/components/replay/SpanList";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SessionDetailPage() {
  const params = useParams<{ id: string }>();
  const sessionId = params.id;

  const [expandedSpanId, setExpandedSpanId] = useState<string | null>(null);
  const [highlightedSpanId, setHighlightedSpanId] = useState<string | null>(null);

  const spanRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});

  const { data: session, isLoading, error } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSession(sessionId),
    staleTime: 10_000,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Auto-refetch every 5s if session is still running
      if (data && !data.endedAt) return 5_000;
      return false;
    },
  });

  const handleToggleSpan = useCallback((spanId: string) => {
    setExpandedSpanId((prev) => (prev === spanId ? null : spanId));
  }, []);

  const handleTimelineSpanClick = useCallback((spanId: string) => {
    // Expand the span
    setExpandedSpanId(spanId);

    // Ensure ref exists
    if (!spanRefs.current[spanId]) {
      spanRefs.current[spanId] = createRef<HTMLDivElement>();
    }

    // Smooth scroll to the span
    setTimeout(() => {
      spanRefs.current[spanId]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);

    // Highlight ring for 2 seconds
    setHighlightedSpanId(spanId);
    setTimeout(() => setHighlightedSpanId(null), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden pl-60">
          <div className="flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-950/80 px-6">
            <Link
              href="/replay"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Skeleton className="h-6 w-48" />
          </div>
          <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
              </div>
              <Skeleton className="h-20 rounded-lg" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col items-center justify-center pl-60">
          <p className="text-zinc-400">
            {error ? `Error: ${error.message}` : "Session not found"}
          </p>
          <Link
            href="/replay"
            className="mt-4 text-sm text-violet-400 hover:underline"
          >
            ← Back to sessions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden pl-60">
        {/* Minimal header bar */}
        <header className="flex h-14 shrink-0 items-center border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur-sm">
          <span className="text-sm text-zinc-500">
            Replay / <span className="text-zinc-300">{session.name || session.id}</span>
          </span>
        </header>

        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            {/* Section 1: Session Header + Metrics */}
            <SessionHeader session={session} />

            {/* Section 2: Timeline Bar */}
            <TimelineBar
              sessionId={sessionId}
              onSpanClick={handleTimelineSpanClick}
            />

            {/* Section 3: Step List */}
            <SpanList
              spans={session.spans}
              expandedSpanId={expandedSpanId}
              highlightedSpanId={highlightedSpanId}
              onToggleSpan={handleToggleSpan}
              spanRefs={spanRefs}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
