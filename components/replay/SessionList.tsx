"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSessions, searchSessions } from "@/lib/api";
import type { SessionSummaryDto } from "@/lib/api";
import SessionCard from "./SessionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Play } from "lucide-react";

export default function SessionList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [allSessions, setAllSessions] = useState<SessionSummaryDto[]>([]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== debouncedSearch) {
        setDebouncedSearch(search);
        setOffset(0);
        setAllSessions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);

  const isSearching = debouncedSearch.length > 0;

  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ["sessions", "search", debouncedSearch],
    queryFn: () => searchSessions(debouncedSearch, 20),
    enabled: isSearching,
    staleTime: 30_000,
  });

  const { data: listResults, isLoading: listLoading } = useQuery({
    queryKey: ["sessions", { limit: 20, offset }],
    queryFn: () => getSessions({ limit: 20, offset }),
    enabled: !isSearching,
    staleTime: 30_000,
  });

  // Accumulate sessions on pagination
  useEffect(() => {
    if (listResults && !isSearching) {
      setAllSessions((prev) => {
        if (offset === 0) return listResults;
        const existingIds = new Set(prev.map((s) => s.id));
        const newSessions = listResults.filter((s) => !existingIds.has(s.id));
        return [...prev, ...newSessions];
      });
    }
  }, [listResults, offset, isSearching]);

  const sessions = isSearching ? (searchResults ?? []) : allSessions;
  const isLoading = isSearching ? searchLoading : listLoading;

  const hasMore =
    !isSearching && listResults && listResults.length === 20;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sessions by name, ID, or agent type..."
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
        />
      </div>

      {/* Loading */}
      {isLoading && sessions.length === 0 && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[72px] w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Sessions */}
      {sessions.length > 0 && (
        <div className="space-y-2">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setOffset((prev) => prev + 20)}
            className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          >
            Load more sessions
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && sessions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 py-16">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
            <Play className="h-6 w-6 text-violet-400" />
          </div>
          <h3 className="text-base font-semibold text-zinc-200">
            {isSearching ? "No matching sessions" : "No agent sessions yet"}
          </h3>
          {!isSearching && (
            <>
              <p className="mt-1.5 max-w-sm text-center text-sm text-zinc-500">
                Add the <code className="text-violet-400">X-TS-Session-Id</code>{" "}
                header to your requests to start recording agent sessions.
              </p>
              <pre className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
                <span className="text-zinc-500">curl</span>{" "}
                <span className="text-violet-300">-H</span>{" "}
                <span className="text-emerald-300">
                  &quot;X-TS-Session-Id: my-agent-run-001&quot;
                </span>
                {" \\\n  "}
                <span className="text-zinc-500">{process.env.NEXT_PUBLIC_API_URL || "https://api.tokenbee.io"}/v1/chat/completions</span>
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}
