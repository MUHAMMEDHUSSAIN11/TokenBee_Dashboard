"use client";

import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: string;
  content: string;
}

const roleStyles: Record<string, string> = {
  system: "bg-zinc-700/50 border-zinc-600 italic",
  user: "bg-zinc-800/80 border-zinc-700",
  assistant: "bg-violet-900/30 border-violet-800/50",
};

const roleLabels: Record<string, string> = {
  system: "System",
  user: "User",
  assistant: "Assistant",
};

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const style = roleStyles[role] ?? "bg-zinc-800/50 border-zinc-700";
  const label = roleLabels[role] ?? role;

  return (
    <div className={cn("rounded-lg border p-3", style)}>
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </div>
      <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-200">
        {content}
      </div>
    </div>
  );
}
