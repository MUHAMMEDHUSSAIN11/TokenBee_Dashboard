"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubscription } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuotaWarning() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, [supabase.auth]);

  const { data: sub } = useQuery({
    queryKey: ["subscription", userId],
    queryFn: () => getSubscription(userId!),
    enabled: !!userId,
  });

  if (!sub || !sub.isOverFreeLimit) return null;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Free Tier Limit Reached
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          You've exceeded 1M tokens this month. Compression and Session Replays are currently disabled.
        </p>
      </div>
      <Link
        href="/settings"
        className="flex items-center gap-2 rounded-lg bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Upgrade Plan
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
