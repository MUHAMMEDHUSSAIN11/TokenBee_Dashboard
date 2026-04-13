"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TraceFilters from "@/components/traces/TraceFilters";
import TraceTable from "@/components/traces/TraceTable";
import { getTraces, getByModel, type TraceDto, type ModelDto } from "@/lib/api";

const PAGE_SIZE = 50;

export default function TracesPage() {
  const [offset, setOffset] = useState(0);
  const [userId, setUserId] = useState("");
  const [model, setModel] = useState("");
  const [onlyErrors, setOnlyErrors] = useState(false);
  const [onlyCompressed, setOnlyCompressed] = useState(false);

  const resetPagination = useCallback(() => setOffset(0), []);

  const handleUserIdChange = (v: string) => {
    setUserId(v);
    resetPagination();
  };
  const handleModelChange = (v: string) => {
    setModel(v === "all" ? "" : v);
    resetPagination();
  };
  const handleToggleErrors = () => {
    setOnlyErrors((prev) => !prev);
    resetPagination();
  };
  const handleToggleCompressed = () => {
    setOnlyCompressed((prev) => !prev);
    resetPagination();
  };
  const handleClear = () => {
    setUserId("");
    setModel("");
    setOnlyErrors(false);
    setOnlyCompressed(false);
    setOffset(0);
  };

  const tracesQuery = useQuery<TraceDto[]>({
    queryKey: [
      "traces",
      { limit: PAGE_SIZE, offset, userId, model, onlyErrors, onlyCompressed },
    ],
    queryFn: () =>
      getTraces({
        limit: PAGE_SIZE,
        offset,
        userId: userId || undefined,
        model: model || undefined,
        onlyErrors: onlyErrors || undefined,
        onlyCompressed: onlyCompressed || undefined,
      }),
  });

  const modelsQuery = useQuery<ModelDto[]>({
    queryKey: ["by-model", { days: 30 }],
    queryFn: () => getByModel({ days: 30 }),
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden pl-60">
        <Header
          title="Traces"
          subtitle="Inspect every LLM request"
        />

        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <div className="mx-auto max-w-7xl space-y-4">
            <TraceFilters
              userId={userId}
              onUserIdChange={handleUserIdChange}
              model={model}
              onModelChange={handleModelChange}
              onlyErrors={onlyErrors}
              onToggleErrors={handleToggleErrors}
              onlyCompressed={onlyCompressed}
              onToggleCompressed={handleToggleCompressed}
              onClear={handleClear}
              models={modelsQuery.data ?? []}
            />

            <TraceTable
              traces={tracesQuery.data ?? []}
              offset={offset}
              limit={PAGE_SIZE}
              onOffsetChange={setOffset}
              isLoading={tracesQuery.isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
