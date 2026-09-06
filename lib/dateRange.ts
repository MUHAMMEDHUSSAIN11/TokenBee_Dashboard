import {
  startOfLocalDayIso,
  endOfLocalDayIso,
  localDateInputToStartIso,
  localDateInputToEndExclusiveIso,
  toDateInputValue,
} from "@/lib/utils";

export type DatePreset = "today" | "7" | "30" | "90" | "custom";

export interface DateRangeValue {
  preset: DatePreset;
  /** Used when preset is 7 / 30 / 90 */
  days?: number;
  /** yyyy-mm-dd for custom inputs */
  customFrom?: string;
  customTo?: string;
}

/** Query params for dashboard metric APIs. */
export interface DateRangeQuery {
  days?: number;
  from?: string;
  to?: string;
}

export const DEFAULT_DATE_RANGE: DateRangeValue = {
  preset: "30",
  days: 30,
};

export function resolveDateRangeParams(range: DateRangeValue): DateRangeQuery {
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

  const presetDays = Number(range.preset);
  const days = range.days ?? (Number.isFinite(presetDays) && presetDays > 0 ? presetDays : 30);
  return { days };
}

export function dateRangeLabel(range: DateRangeValue): string {
  if (range.preset === "today") return "today";
  if (range.preset === "custom") {
    return `${range.customFrom || "…"} → ${range.customTo || "…"}`;
  }
  return `last ${range.days ?? range.preset} days`;
}
