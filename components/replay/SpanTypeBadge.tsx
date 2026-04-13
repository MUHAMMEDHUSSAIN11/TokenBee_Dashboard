"use client";

import { Cpu, Wrench, GitBranch, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SpanDto } from "@/lib/api";

type SpanType = SpanDto["type"];

const typeConfig: Record<
  SpanType,
  { bg: string; text: string; bar: string; icon: typeof Cpu; label: string }
> = {
  LlmCall: {
    bg: "bg-violet-900/60",
    text: "text-violet-300",
    bar: "bg-violet-600",
    icon: Cpu,
    label: "LLM Call",
  },
  ToolCall: {
    bg: "bg-blue-900/60",
    text: "text-blue-300",
    bar: "bg-blue-600",
    icon: Wrench,
    label: "Tool Call",
  },
  Decision: {
    bg: "bg-amber-900/60",
    text: "text-amber-300",
    bar: "bg-amber-600",
    icon: GitBranch,
    label: "Decision",
  },
  Custom: {
    bg: "bg-zinc-800",
    text: "text-zinc-300",
    bar: "bg-zinc-600",
    icon: Zap,
    label: "Custom",
  },
};

export function getSpanTypeConfig(type: SpanType) {
  return typeConfig[type] ?? typeConfig.Custom;
}

export default function SpanTypeBadge({
  type,
  className,
}: {
  type: SpanType;
  className?: string;
}) {
  const config = getSpanTypeConfig(type);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
