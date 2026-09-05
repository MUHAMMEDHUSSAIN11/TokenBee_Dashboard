"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { getSavings, type SavingsDto } from "@/lib/api";
import { formatCost, formatTokens } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function OptimizationPage() {
  const [days, setDays] = useState(30);
  const [accountId, setAccountId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setAccountId(data.user.id);
    });
  }, [supabase]);

  const { data, isLoading } = useQuery<SavingsDto>({
    queryKey: ["savings", { days, accountId }],
    queryFn: () => getSavings({ days, accountId: accountId || undefined }),
    enabled: !!accountId,
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden pl-60">
        <Header title="Optimization" subtitle="Token usage, cost, and compression impact" />
        <main className="flex-1 overflow-y-auto bg-zinc-50 p-6 dark:bg-zinc-950">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex gap-2">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`rounded-md px-3 py-1.5 text-sm ${
                    days === d ? "bg-violet-600 text-white" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {d} days
                </button>
              ))}
            </div>

            {isLoading && <div className="h-40 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />}

            {!isLoading && data && data.totalRequests === 0 && (
              <div className="rounded-xl border border-zinc-200 p-10 text-center dark:border-zinc-800">
                <p className="font-medium text-zinc-200">No optimization data yet.</p>
                <p className="mt-2 text-sm text-zinc-500">
                  Capture traffic through TokenBee to see token reduction and estimated savings.
                </p>
                <Link href="/docs#quick-start" className="mt-4 inline-block text-sm text-violet-400">
                  View integration guide
                </Link>
              </div>
            )}

            {data && data.totalRequests > 0 && (
              <>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Metric label="Original input tokens" value={formatTokens(data.originalInputTokens)} />
                  <Metric label="Compressed input tokens" value={formatTokens(data.compressedInputTokens)} />
                  <Metric label="Tokens avoided" value={formatTokens(data.tokensAvoided)} />
                  <Metric label="Estimated savings" value={formatCost(data.estimatedSavingsUsd)} note="from recorded compression" />
                </div>
                <p className="text-sm text-zinc-500">
                  Average compression{" "}
                  {data.averageCompressionRatio > 1 ? `${data.averageCompressionRatio.toFixed(1)}x` : "—"}.
                  Savings are estimates from TokenBee cost tables, not invoices.
                </p>
                {data.opportunities.length > 0 && (
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="border-b border-zinc-200 px-5 py-3 text-sm font-medium dark:border-zinc-800">
                      Top optimization opportunities
                    </div>
                    <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {data.opportunities.map((opp) => (
                        <li key={opp.path} className="flex items-center justify-between px-5 py-4">
                          <div>
                            <p className="font-mono text-sm text-zinc-200">{opp.path || "/"}</p>
                            <p className="text-xs text-zinc-500">
                              {opp.reason} · {opp.requests} interactions · {formatTokens(opp.tokensAvoided)} avoided
                            </p>
                          </div>
                          <p className="text-sm text-emerald-400">{formatCost(opp.estimatedSavingsUsd)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
      {note && <p className="mt-1 text-xs text-zinc-500">{note}</p>}
    </div>
  );
}
