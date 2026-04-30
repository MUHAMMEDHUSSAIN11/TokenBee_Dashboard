"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import QuotaWarning from "@/components/dashboard/QuotaWarning";
import DailyChart from "@/components/dashboard/DailyChart";
import ModelBreakdown from "@/components/dashboard/ModelBreakdown";
import UserBreakdown from "@/components/dashboard/UserBreakdown";

export default function DashboardPage() {
  const [days, setDays] = useState(30);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    setIsRefreshing(false);
  };

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
            <SummaryCards days={days} />

            {/* Daily Activity Chart */}
            <DailyChart days={days} />

            {/* Model + User Breakdown — side by side */}
            <div className="grid grid-cols-2 gap-6">
              <ModelBreakdown days={days} />
              <UserBreakdown days={days} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
