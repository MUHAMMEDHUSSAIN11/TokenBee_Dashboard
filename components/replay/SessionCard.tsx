"use client";

import Link from "next/link";
import type { SessionSummaryDto } from "@/lib/api";
import { formatLatency, formatTokens, relativeTime } from "@/lib/utils";
import { ChevronRight, Layers } from "lucide-react";

interface SessionCardProps {
  session: SessionSummaryDto;
}

export default function SessionCard({ session }: SessionCardProps) {
  const isRunning = !session.endedAt;

  return (
    <Link
      href={`/replay/${encodeURIComponent(session.id)}`}
      className="group flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900"
    >
      {/* Left: Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600/15">
        <Layers className="h-5 w-5 text-violet-400" />
      </div>

      {/* Middle: Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-zinc-100">
            {session.name || session.id}
          </span>
          {session.agentType && (
            <span className="shrink-0 rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
              {session.agentType}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
          <span>{relativeTime(session.startedAt)}</span>
          <span>·</span>
          <span>{formatLatency(session.durationMs)}</span>
          <span>·</span>
          <span>{session.spanCount} steps</span>
        </div>
      </div>

      {/* Right: Tokens + Status + Arrow */}
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-xs text-zinc-400">
          {formatTokens(session.totalTokens)} tokens
        </span>
        <span
          className={
            isRunning
              ? "inline-flex items-center gap-1.5 rounded-full bg-amber-900/40 px-2 py-0.5 text-[10px] font-medium text-amber-300"
              : "inline-flex items-center gap-1.5 rounded-full bg-emerald-900/40 px-2 py-0.5 text-[10px] font-medium text-emerald-300"
          }
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isRunning ? "animate-pulse bg-amber-400" : "bg-emerald-400"}`}
          />
          {isRunning ? "Running" : "Completed"}
        </span>
        <ChevronRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-zinc-400" />
      </div>
    </Link>
  );
}
