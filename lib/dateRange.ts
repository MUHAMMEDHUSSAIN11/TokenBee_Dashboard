"use client";

import {
  type DateRangeValue,
  startOfLocalDayIso,
  endOfLocalDayIso,
  localDateInputToStartIso,
  localDateInputToEndExclusiveIso,
  toDateInputValue,
} from "@/lib/utils";

// re-export helpers used with DateRangeValue from Header
export type { DateRangeValue } from "@/components/layout/Header";

export function resolveDateRangeParams(range: DateRangeValue): {
  days?: number;
  from?: string;
  to?: string;
} {
  if (range.preset === "today") {
    return {
      from: startOfLocalDayIso(),
      to: endOfLocalDayIso(),
    };
  }

  if (range.preset === "custom") {
    const fromDate = range.customFrom || toDateInputValue();
    const toDate = range.customTo || toDateInputValue();
    return {
      from: localDateInputToStartIso(fromDate),
      to: localDateInputToEndExclusiveIso(toDate),
    };
  }

  return { days: range.days ?? Number(range.preset) || 30 };
}

export function dateRangeLabel(range: DateRangeValue): string {
  if (range.preset === "today") return "today";
  if (range.preset === "custom") {
    return `${range.customFrom || "…"} → ${range.customTo || "…"}`;
  }
  return `last ${range.days ?? range.preset} days`;
}
