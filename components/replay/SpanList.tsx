"use client";

import { useRef, createRef, useCallback } from "react";
import type { SpanDto } from "@/lib/api";
import SpanRow from "./SpanRow";

interface SpanListProps {
  spans: SpanDto[];
  expandedSpanId: string | null;
  highlightedSpanId: string | null;
  onToggleSpan: (spanId: string) => void;
  spanRefs: React.MutableRefObject<Record<string, React.RefObject<HTMLDivElement | null>>>;
}

export default function SpanList({
  spans,
  expandedSpanId,
  highlightedSpanId,
  onToggleSpan,
  spanRefs,
}: SpanListProps) {
  const maxDurationMs = Math.max(...spans.map((s) => s.durationMs), 1);

  // Ensure refs exist for all spans
  const getRef = useCallback(
    (id: string) => {
      if (!spanRefs.current[id]) {
        spanRefs.current[id] = createRef<HTMLDivElement>();
      }
      return spanRefs.current[id];
    },
    [spanRefs]
  );

  if (spans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 py-12">
        <p className="text-sm text-zinc-500">No spans recorded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-zinc-400">
        Steps ({spans.length})
      </h3>
      <div className="space-y-1.5">
        {spans.map((span) => (
          <SpanRow
            key={span.id}
            span={span}
            isExpanded={expandedSpanId === span.id}
            isHighlighted={highlightedSpanId === span.id}
            maxDurationMs={maxDurationMs}
            onToggle={() => onToggleSpan(span.id)}
            spanRef={getRef(span.id)}
          />
        ))}
      </div>
    </div>
  );
}
