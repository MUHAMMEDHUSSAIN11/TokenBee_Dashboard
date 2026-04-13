"use client";

import { formatLatency, formatTokens, formatDate } from "@/lib/utils";
import { ArrowLeft, Clock, Layers, Coins, Calendar } from "lucide-react";
import Link from "next/link";
import type { SessionDetailDto } from "@/lib/api";
import SpanTypeBadge from "./SpanTypeBadge";

interface SessionHeaderProps {
  session: SessionDetailDto;
}

export default function SessionHeader({ session }: SessionHeaderProps) {
  const isRunning = !session.endedAt;

  return (
    <div className="space-y-4">
      {/* Back + title row */}
      <div className="flex items-center gap-4">
        <Link
          href="/replay"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-50">
              {session.name || session.id}
            </h1>
            {session.agentType && (
              <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                {session.agentType}
              </span>
            )}
            <span
              className={
                isRunning
                  ? "inline-flex items-center gap-1.5 rounded-full bg-amber-900/40 px-2.5 py-0.5 text-xs font-medium text-amber-300"
                  : "inline-flex items-center gap-1.5 rounded-full bg-emerald-900/40 px-2.5 py-0.5 text-xs font-medium text-emerald-300"
              }
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${isRunning ? "animate-pulse bg-amber-400" : "bg-emerald-400"}`}
              />
              {isRunning ? "Running" : "Completed"}
            </span>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          icon={Layers}
          label="Total Steps"
          value={String(session.spanCount)}
        />
        <MetricCard
          icon={Clock}
          label="Duration"
          value={formatLatency(session.durationMs)}
        />
        <MetricCard
          icon={Coins}
          label="Total Tokens"
          value={formatTokens(session.totalTokens)}
        />
        <MetricCard
          icon={Calendar}
          label="Started"
          value={formatDate(session.startedAt)}
        />
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition-all hover:bg-zinc-900/60 group">
      <div className="absolute -right-2 -bottom-2 opacity-5 transition-transform group-hover:scale-110 group-hover:rotate-12">
        <Icon className="h-16 w-16 text-zinc-400" />
      </div>
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
        <Icon className="h-3.5 w-3.5 text-violet-500" />
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold tracking-tight text-zinc-100">{value}</div>
    </div>
  );
}
