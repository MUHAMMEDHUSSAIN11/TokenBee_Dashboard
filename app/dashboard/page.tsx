"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import QuotaWarning from "@/components/dashboard/QuotaWarning";
import DailyChart from "@/components/dashboard/DailyChart";
import ModelBreakdown from "@/components/dashboard/ModelBreakdown";
import UserBreakdown from "@/components/dashboard/UserBreakdown";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [days, setDays] = useState(30);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const supabase = createClient();

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
          title="Dashboard"
          subtitle="LLM usage overview"
          days={days}
          onDaysChange={setDays}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-6 transition-colors">
          <div className="mx-auto max-w-7xl space-y-6">
            <QuotaWarning />

            {/* Summary Cards — 3x2 grid */}
            <SummaryCards days={days} accountId={accountId} />

            {/* Daily Activity Chart */}
            <DailyChart days={days} accountId={accountId} />

            {/* Model + User Breakdown — side by side */}
            <div className="grid grid-cols-2 gap-6">
              <ModelBreakdown days={days} accountId={accountId} />
              <UserBreakdown days={days} accountId={accountId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
