"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import QuotaWarning from "@/components/dashboard/QuotaWarning";
import DailyChart from "@/components/dashboard/DailyChart";
import ModelBreakdown from "@/components/dashboard/ModelBreakdown";
import UserBreakdown from "@/components/dashboard/UserBreakdown";
import { createClient } from "@/lib/supabase/client";
import {
  DEFAULT_DATE_RANGE,
  dateRangeLabel,
  resolveDateRangeParams,
  type DateRangeValue,
} from "@/lib/dateRange";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRangeValue>(DEFAULT_DATE_RANGE);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const supabase = createClient();

  const rangeQuery = useMemo(
    () => resolveDateRangeParams(dateRange),
    [dateRange]
  );
  const rangeLabel = useMemo(() => dateRangeLabel(dateRange), [dateRange]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setAccountId(data.user.id);
    });
  }, [supabase]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    setIsRefreshing(false);
  };

  if (!accountId) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden pl-60">
          <Header title="Dashboard" subtitle="Loading your data..." />
          <main className="flex-1 bg-zinc-950 p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              <div className="h-32 w-full animate-pulse rounded-xl bg-zinc-900" />
              <div className="h-64 w-full animate-pulse rounded-xl bg-zinc-900" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden pl-60">
        <Header
          title="Overview"
          subtitle="AI traffic, spend, capture, and optimization"
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-6 transition-colors">
          <div className="mx-auto max-w-7xl space-y-6">
            <QuotaWarning />

            <p className="text-sm text-zinc-500">
              Metrics below are from your account only ({rangeLabel}). Empty values mean no captured traffic in this window.
            </p>

            <SummaryCards
              days={rangeQuery.days}
              from={rangeQuery.from}
              to={rangeQuery.to}
              rangeLabel={rangeLabel}
              accountId={accountId}
            />

            <DailyChart
              days={rangeQuery.days}
              from={rangeQuery.from}
              to={rangeQuery.to}
              accountId={accountId}
            />

            <div className="grid grid-cols-2 gap-6">
              <ModelBreakdown
                days={rangeQuery.days}
                from={rangeQuery.from}
                to={rangeQuery.to}
                accountId={accountId}
              />
              <UserBreakdown
                days={rangeQuery.days}
                from={rangeQuery.from}
                to={rangeQuery.to}
                accountId={accountId}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
