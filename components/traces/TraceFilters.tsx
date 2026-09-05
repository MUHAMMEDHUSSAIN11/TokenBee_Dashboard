"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search } from "lucide-react";
import { type ModelDto } from "@/lib/api";

interface TraceFiltersProps {
  userId: string;
  onUserIdChange: (v: string) => void;
  model: string;
  onModelChange: (v: string) => void;
  onlyErrors: boolean;
  onToggleErrors: () => void;
  onlyCompressed: boolean;
  onToggleCompressed: () => void;
  provider: string;
  onProviderChange: (v: string) => void;
  sessionId: string;
  onSessionIdChange: (v: string) => void;
  q: string;
  onQChange: (v: string) => void;
  onClear: () => void;
  models: ModelDto[];
}

export default function TraceFilters({
  userId,
  onUserIdChange,
  model,
  onModelChange,
  onlyErrors,
  onToggleErrors,
  onlyCompressed,
  onToggleCompressed,
  provider,
  onProviderChange,
  sessionId,
  onSessionIdChange,
  q,
  onQChange,
  onClear,
  models,
}: TraceFiltersProps) {
  const hasFilters =
    userId !== "" || model !== "" || onlyErrors || onlyCompressed || provider !== "" || sessionId !== "" || q !== "";
  const providers = Array.from(new Set(models.map((m) => m.provider).filter(Boolean)));

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Search session, request, user, model..."
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          className="h-9 w-72 rounded-md border border-zinc-700 bg-zinc-800 pl-9 pr-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-violet-500"
        />
      </div>

      <input
        type="text"
        placeholder="User / app ID"
        value={userId}
        onChange={(e) => onUserIdChange(e.target.value)}
        className="h-9 w-40 rounded-md border border-zinc-700 bg-zinc-800 px-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-violet-500"
      />

      <input
        type="text"
        placeholder="Session ID"
        value={sessionId}
        onChange={(e) => onSessionIdChange(e.target.value)}
        className="h-9 w-40 rounded-md border border-zinc-700 bg-zinc-800 px-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-violet-500"
      />

      <Select value={model} onValueChange={(v) => onModelChange(v || "")}>
        <SelectTrigger className="w-48 border-zinc-700 bg-zinc-800 text-zinc-200">
          <SelectValue placeholder="All models" />
        </SelectTrigger>
        <SelectContent className="border-zinc-700 bg-zinc-900">
          <SelectItem value="all">All models</SelectItem>
          {models.map((m) => (
            <SelectItem key={`${m.provider}-${m.model}`} value={m.model}>
              {m.model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={provider} onValueChange={(v) => onProviderChange(v || "")}>
        <SelectTrigger className="w-40 border-zinc-700 bg-zinc-800 text-zinc-200">
          <SelectValue placeholder="All providers" />
        </SelectTrigger>
        <SelectContent className="border-zinc-700 bg-zinc-900">
          <SelectItem value="all">All providers</SelectItem>
          {providers.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        onClick={onToggleErrors}
        className={`flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium ${
          onlyErrors
            ? "border-red-500/50 bg-red-500/10 text-red-400"
            : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Errors
      </button>

      <button
        onClick={onToggleCompressed}
        className={`flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium ${
          onlyCompressed
            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
            : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Optimized
      </button>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClear} className="text-zinc-400 hover:text-zinc-200">
          <X className="mr-1 h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}
