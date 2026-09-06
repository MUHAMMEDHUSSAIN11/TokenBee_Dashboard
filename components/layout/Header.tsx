"use client";

import { cn, toDateInputValue } from "@/lib/utils";
import {
  type DatePreset,
  type DateRangeValue,
} from "@/lib/dateRange";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type { DatePreset, DateRangeValue };

const PRESET_LABELS: Record<DatePreset, string> = {
  today: "Today",
  "7": "Last 7 days",
  "30": "Last 30 days",
  "90": "Last 90 days",
  custom: "Custom range",
};

interface HeaderProps {
  title: string;
  subtitle?: string;
  /** @deprecated prefer dateRange */
  days?: number;
  onDaysChange?: (days: number) => void;
  dateRange?: DateRangeValue;
  onDateRangeChange?: (range: DateRangeValue) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function Header({
  title,
  subtitle,
  days,
  onDaysChange,
  dateRange,
  onDateRangeChange,
  onRefresh,
  isRefreshing,
}: HeaderProps) {
  const useRange = !!onDateRangeChange && !!dateRange;

  return (
    <header className="flex flex-col gap-3 border-b border-zinc-200 bg-white/80 px-6 py-4 backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-950/80 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        {useRange && (
          <>
            <Select
              value={dateRange.preset}
              onValueChange={(v) => {
                const preset = (v || "7") as DatePreset;
                if (preset === "today") {
                  onDateRangeChange!({ preset: "today" });
                } else if (preset === "custom") {
                  const today = toDateInputValue();
                  onDateRangeChange!({
                    preset: "custom",
                    customFrom: dateRange.customFrom || today,
                    customTo: dateRange.customTo || today,
                  });
                } else {
                  onDateRangeChange!({
                    preset,
                    days: Number(preset),
                  });
                }
              }}
            >
              <SelectTrigger
                id="days-filter"
                className="h-9 w-[160px] shrink-0 border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              >
                <SelectValue placeholder="Select range">
                  {PRESET_LABELS[dateRange.preset]}
                </SelectValue>
              </SelectTrigger>
              {/* alignItemWithTrigger=false keeps Today/90/Custom all visible in the list */}
              <SelectContent
                alignItemWithTrigger={false}
                align="end"
                side="bottom"
                className="min-w-[180px] border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
              >
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            {dateRange.preset === "custom" && (
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="date"
                  aria-label="From date"
                  value={dateRange.customFrom || toDateInputValue()}
                  max={dateRange.customTo || toDateInputValue()}
                  onChange={(e) =>
                    onDateRangeChange!({
                      ...dateRange,
                      preset: "custom",
                      customFrom: e.target.value,
                    })
                  }
                  className="h-9 min-w-[9.5rem] rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
                <span className="text-xs text-zinc-500">to</span>
                <input
                  type="date"
                  aria-label="To date"
                  value={dateRange.customTo || toDateInputValue()}
                  min={dateRange.customFrom}
                  max={toDateInputValue()}
                  onChange={(e) =>
                    onDateRangeChange!({
                      ...dateRange,
                      preset: "custom",
                      customTo: e.target.value,
                    })
                  }
                  className="h-9 min-w-[9.5rem] rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </div>
            )}
          </>
        )}

        {!useRange && onDaysChange && (
          <Select
            value={String(days)}
            onValueChange={(v) => onDaysChange(Number(v || days))}
          >
            <SelectTrigger
              id="days-filter"
              className="h-9 w-[160px] shrink-0 border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={false}
              align="end"
              className="min-w-[180px] border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
            >
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        )}

        {onRefresh && (
          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-9 w-9 shrink-0 border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <RefreshCw
              className={cn("h-4 w-4", isRefreshing && "animate-spin")}
            />
          </Button>
        )}
      </div>
    </header>
  );
}
