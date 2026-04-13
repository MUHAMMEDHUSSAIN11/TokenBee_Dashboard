"use client";

import { cn } from "@/lib/utils";
import { formatLatency, formatTokens } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { SpanDto } from "@/lib/api";
import SpanTypeBadge, { getSpanTypeConfig } from "./SpanTypeBadge";
import SpanPayloadViewer from "./SpanPayloadViewer";

interface SpanRowProps {
  span: SpanDto;
  isExpanded: boolean;
  isHighlighted: boolean;
  maxDurationMs: number;
  onToggle: () => void;
  spanRef: React.RefObject<HTMLDivElement | null>;
}

export default function SpanRow({
  span,
  isExpanded,
  isHighlighted,
  maxDurationMs,
  onToggle,
  spanRef,
}: SpanRowProps) {
  const config = getSpanTypeConfig(span.type);
  const durationBarWidth =
    maxDurationMs > 0 ? Math.max(2, (span.durationMs / maxDurationMs) * 100) : 0;

  const modelName =
    span.type === "LlmCall" && span.metadata?.model
      ? String(span.metadata.model)
      : null;

  const toolName =
    span.type === "ToolCall" && span.metadata?.tool
      ? String(span.metadata.tool)
      : span.type === "ToolCall" && span.metadata?.toolName
        ? String(span.metadata.toolName)
        : null;

  return (
    <div
      ref={spanRef}
      className={cn(
        "group relative ml-4 pl-8 transition-all duration-300",
        isExpanded ? "mb-4" : "mb-2"
      )}
    >
      {/* Vertical timeline line */}
      <div className="absolute left-0 top-0 h-full w-px bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
      
      {/* Timeline dot */}
      <div 
        className={cn(
          "absolute -left-1.5 top-6 h-3 w-3 rounded-full border-2 transition-all duration-300",
          isExpanded ? "scale-125 border-violet-500 bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" : "border-zinc-700 bg-zinc-950 group-hover:border-zinc-500"
        )} 
      />

      <div
        className={cn(
          "overflow-hidden rounded-xl border transition-all duration-300",
          isHighlighted
            ? "border-violet-500 ring-2 ring-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
            : "border-zinc-800/60 hover:border-zinc-700",
          isExpanded ? "bg-zinc-900 shadow-xl" : "bg-zinc-950 hover:bg-zinc-900/40"
        )}
      >
        {/* Collapsed row */}
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-5 py-4 text-left transition-all"
        >
          {/* Step indicator */}
          <div className="flex h-6 min-w-[32px] items-center justify-center rounded bg-zinc-800/50 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            S{String(span.step).padStart(2, "0")}
          </div>

          {/* Type badge */}
          <SpanTypeBadge type={span.type} className="h-6" />

          {/* Model/Tool name */}
          <div className="flex flex-col">
            {modelName && (
              <span className="text-xs font-medium text-zinc-300">
                {modelName}
              </span>
            )}
            {toolName && (
              <span className="text-xs font-semibold text-emerald-400">
                {toolName}
              </span>
            )}
            {!modelName && !toolName && (
              <span className="text-xs font-medium text-zinc-400">
                Processing Step
              </span>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Tokens and Latency */}
          <div className="flex items-center gap-6">
            {span.tokens > 0 && (
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-tighter text-zinc-500">Tokens</span>
                <span className="text-xs font-mono text-zinc-300">{formatTokens(span.tokens)}</span>
              </div>
            )}

            <div className="flex flex-col items-end min-w-[60px]">
              <span className="text-[10px] uppercase tracking-tighter text-zinc-500">Latency</span>
              <span className="text-xs font-mono text-zinc-300">{formatLatency(span.durationMs)}</span>
            </div>
            
            <div className="h-6 w-px bg-zinc-800" />

            {/* Expand chevron */}
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300",
                isExpanded && "rotate-180 text-violet-400"
              )}
            />
          </div>
        </button>

        {/* Expanded payload */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
             <SpanPayloadViewer span={span} />
          </div>
        )}
      </div>
    </div>
  );
}
