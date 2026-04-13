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

// Shadcn doesn't install Input by default, we'll manually define a minimal one
// Actually, let's check if it exists. If not, we'll use a standard input with styling.

interface TraceFiltersProps {
  userId: string;
  onUserIdChange: (v: string) => void;
  model: string;
  onModelChange: (v: string) => void;
  onlyErrors: boolean;
  onToggleErrors: () => void;
  onlyCompressed: boolean;
  onToggleCompressed: () => void;
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
  onClear,
  models,
}: TraceFiltersProps) {
  const hasFilters =
    userId !== "" || model !== "" || onlyErrors || onlyCompressed;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
      {/* User ID Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          id="trace-user-filter"
          type="text"
          placeholder="Search by User ID..."
          value={userId}
          onChange={(e) => onUserIdChange(e.target.value)}
          className="h-9 w-56 rounded-md border border-zinc-700 bg-zinc-800 pl-9 pr-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition-colors focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        />
      </div>

      {/* Model Select */}
      <Select value={model} onValueChange={(v) => onModelChange(v || "")}>
        <SelectTrigger
          id="trace-model-filter"
          className="w-48 border-zinc-700 bg-zinc-800 text-zinc-200"
        >
          <SelectValue placeholder="All Models" />
        </SelectTrigger>
        <SelectContent className="border-zinc-700 bg-zinc-900">
          <SelectItem value="all">All Models</SelectItem>
          {models.map((m) => (
            <SelectItem key={`${m.provider}-${m.model}`} value={m.model}>
              {m.model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Errors only toggle */}
      <button
        id="trace-errors-toggle"
        onClick={onToggleErrors}
        className={`flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors ${
          onlyErrors
            ? "border-red-500/50 bg-red-500/10 text-red-400"
            : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <div
          className={`h-2 w-2 rounded-full ${onlyErrors ? "bg-red-400" : "bg-zinc-600"}`}
        />
        Errors only
      </button>

      {/* Compressed only toggle */}
      <button
        id="trace-compressed-toggle"
        onClick={onToggleCompressed}
        className={`flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors ${
          onlyCompressed
            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
            : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <div
          className={`h-2 w-2 rounded-full ${onlyCompressed ? "bg-emerald-400" : "bg-zinc-600"}`}
        />
        Compressed only
      </button>

      {/* Clear */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-zinc-400 hover:text-zinc-200"
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}
