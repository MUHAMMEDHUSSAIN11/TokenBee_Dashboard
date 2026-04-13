"use client";

import { useQuery } from "@tanstack/react-query";
import { getSessionTimeline } from "@/lib/api";
import type { TimelineSpanDto } from "@/lib/api";
import { getSpanTypeConfig } from "./SpanTypeBadge";
import { formatLatency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface TimelineBarProps {
  sessionId: string;
  onSpanClick: (spanId: string) => void;
}

export default function TimelineBar({ sessionId, onSpanClick }: TimelineBarProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["session", sessionId, "timeline"],
    queryFn: () => getSessionTimeline(sessionId),
    staleTime: 10_000,
  });

  if (isLoading || !data) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Timeline</h3>
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    );
  }

  const { sessionDurationMs, spans } = data;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-zinc-400">Timeline</h3>
      <div className="relative h-20 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        {/* Span bars */}
        <div className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 px-2">
          {spans.map((span) => {
            const config = getSpanTypeConfig(
              span.type as "LlmCall" | "ToolCall" | "Decision" | "Custom"
            );
            const widthPx = Math.max(span.widthPct, 0.15); // minimum visible width

            return (
              <Tooltip key={span.id}>
              <TooltipTrigger
                    render={
                      <button
                        onClick={() => onSpanClick(span.id)}
                        className={cn(
                          "absolute top-0 h-full rounded-sm transition-all hover:brightness-125 hover:ring-1 hover:ring-white/30",
                          config.bar
                        )}
                        style={{
                          left: `${span.offsetPct}%`,
                          width: `${widthPx}%`,
                          minWidth: "3px",
                        }}
                      />
                    }
                  />
                <TooltipContent
                  sideOffset={8}
                  className="border-zinc-700 bg-zinc-800 text-zinc-200"
                >
                  <div className="space-y-0.5 text-xs">
                    <div className="font-medium">
                      Step {span.step} · {span.type}
                    </div>
                    <div className="text-zinc-400">
                      Duration: {formatLatency(span.durationMs)}
                    </div>
                    <div className="text-zinc-400">
                      Offset: {formatLatency(span.offsetMs)}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Time markers */}
        <div className="absolute inset-x-0 bottom-1 flex justify-between px-3">
          <span className="text-[10px] text-zinc-600">0ms</span>
          <span className="text-[10px] text-zinc-600">25%</span>
          <span className="text-[10px] text-zinc-600">50%</span>
          <span className="text-[10px] text-zinc-600">75%</span>
          <span className="text-[10px] text-zinc-600">
            {formatLatency(sessionDurationMs)}
          </span>
        </div>
      </div>
    </div>
  );
}
