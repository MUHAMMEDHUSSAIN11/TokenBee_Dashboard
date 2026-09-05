"use client";

import { cn, toDateInputValue } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DatePreset = "today" | "7" | "30" | "90" | "custom";

export interface DateRangeValue {
  preset: DatePreset;
  /** Used when preset is 7 / 30 / 90 */
  days?: number;
  /** ISO bounds when preset is today or custom */
  from?: string;
  to?: string;
  /** yyyy-mm-dd for custom inputs */
  customFrom?: string;
  customTo?: string;
}

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
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white/80 px-6 py-4 backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-950/80">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
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
                className="w-[150px] border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            {dateRange.preset === "custom" && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateRange.customFrom || toDateInputValue()}
                  max={dateRange.customTo || toDateInputValue()}
                  onChange={(e) =>
                    onDateRangeChange!({
                      ...dateRange,
                      preset: "custom",
                      customFrom: e.target.value,
                    })
                  }
                  className="h-9 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
                <span className="text-xs text-zinc-500">to</span>
                <input
                  type="date"
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
                  className="h-9 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
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
              className="w-[130px] border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
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
            className="border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
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
