"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubscription,
  getApiKeys,
  createApiKey,
  revokeApiKey,
  createCheckoutSession,
  openBillingPortal,
} from "@/lib/api";
import { Loader2, Copy, Trash2, KeyRound, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKeyData, setCreatedKeyData] = useState<{
    id: string;
    key: string;
    prefix: string;
  } | null>(null);

  // Initialize Auth
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUserId(user.id);
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  // Data Queries
  const { data: subStatus, isLoading: isLoadingSub } = useQuery({
    queryKey: ["subscription", userId],
    queryFn: () => getSubscription(userId!),
    enabled: !!userId,
  });

  const { data: apiKeys, isLoading: isLoadingKeys } = useQuery({
    queryKey: ["apiKeys", userId],
    queryFn: () => getApiKeys(userId!),
    enabled: !!userId,
  });

  // Mutations
  const createKeyMutation = useMutation({
    mutationFn: (name: string) => createApiKey(userId!, name),
    onSuccess: (data) => {
      setCreatedKeyData(data);
      setNewKeyName("");
      queryClient.invalidateQueries({ queryKey: ["apiKeys", userId] });
    },
  });

  const revokeKeyMutation = useMutation({
    mutationFn: (keyId: string) => revokeApiKey(keyId, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys", userId] });
    },
  });

  // Handlers
  const handleUpgrade = async () => {
    if (!userId) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const res = await createCheckoutSession(userId, user?.email || '', window.location.href);
      window.location.href = res.url;
    } catch (e) {
      console.error(e);
    }
  };

  const handleManageBilling = async () => {
    if (!userId) return;
    try {
      const res = await openBillingPortal(userId, window.location.href);
      window.location.href = res.url;
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isLoading = !userId || isLoadingSub || isLoadingKeys;

  const freeLimit = 1000;
  const freeUsedPct = Math.min(
    100,
    ((subStatus?.freeRequestsUsed || 0) / freeLimit) * 100
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden pl-60">
        <Header 
          title="Settings" 
          subtitle="Manage your account, billing, and API keys"
        />

        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-6 transition-colors">
          <div className="mx-auto max-w-4xl space-y-8">
            {isLoading ? (
            <div className="flex h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : (
            <>
              {/* SECTION 1: Usage & Billing */}
              <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-colors">
                {/* ... existing section 1 content ... */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-violet-500" />
                      Usage & Billing
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Manage your subscription and track current usage.
                    </p>
                  </div>
                  <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300 capitalize">
                    {subStatus?.status === 'free' ? 'Free Plan' : 'Pay As You Go'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Free requests used</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {subStatus?.freeRequestsUsed.toLocaleString()} / {freeLimit.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div 
                      className="h-full bg-violet-600 transition-all duration-500 ease-out"
                      style={{ width: `${freeUsedPct}%` }}
                    />
                  </div>

                  {subStatus?.status === "free" ? (
                    <div className="pt-4">
                      <button
                        onClick={handleUpgrade}
                        className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
                      >
                        Upgrade to pay as you go
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 flex items-center justify-between">
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Requests this month: <span className="font-medium text-zinc-900 dark:text-zinc-100">{subStatus?.requestsThisMonth.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={handleManageBilling}
                        className="inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-transparent px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
                      >
                        Manage billing
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* SECTION 2: API Keys */}
              <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-colors">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <KeyRound className="h-5 w-5 text-violet-500" />
                    API Keys
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Create keys to authenticate standard requests to the proxy.
                  </p>
                </div>

                {/* Create form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newKeyName.trim()) createKeyMutation.mutate(newKeyName);
                  }}
                  className="flex items-end gap-4 mb-8"
                >
                  <div className="flex-1 space-y-1.5">
                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Key Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g. Production Env"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={createKeyMutation.isPending || !newKeyName.trim()}
                    className="inline-flex h-[42px] items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50"
                  >
                    {createKeyMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create key"
                    )}
                  </button>
                </form>

                {/* New key revealed */}
                {createdKeyData && (
                  <div className="mb-8 rounded-lg border border-emerald-900/50 bg-emerald-950/30 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-400">
                        Save this key — it won't be shown again
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded border border-emerald-900/50 bg-black/20 px-3 py-2 text-sm text-emerald-300 overflow-x-auto font-mono">
                        {createdKeyData.key}
                      </code>
                      <button
                        onClick={() => navigator.clipboard.writeText(createdKeyData.key)}
                        className="flex shrink-0 items-center justify-center rounded-lg border border-emerald-800/50 bg-emerald-900/50 p-2 text-emerald-300 hover:bg-emerald-800/80"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => setCreatedKeyData(null)}
                      className="mt-4 text-sm font-medium text-emerald-500 hover:text-emerald-400"
                    >
                      I've saved my key
                    </button>
                  </div>
                )}

                {/* Keys list */}
                <div className="space-y-3">
                  {apiKeys?.length === 0 ? (
                    <div className="text-sm text-zinc-500 text-center py-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                      No API keys created yet
                    </div>
                  ) : (
                    apiKeys?.map((key: any) => (
                      <div
                        key={key.id}
                        className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                              {key.name}
                            </span>
                            {!key.isActive && (
                              <span className="rounded bg-red-100 dark:bg-red-950/50 px-2 py-0.5 text-xs text-red-600 dark:text-red-500">
                                Revoked
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-4 text-xs text-zinc-500">
                            <code className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 text-zinc-600 dark:text-zinc-400 rounded font-mono">
                              {key.prefix}...
                            </code>
                            <span>
                              Created {new Date(key.createdAt).toLocaleDateString()}
                            </span>
                            {key.lastUsedAt && (
                              <span>
                                Last used {new Date(key.lastUsedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        {key.isActive && (
                          <button
                            onClick={() => revokeKeyMutation.mutate(key.id)}
                            disabled={revokeKeyMutation.isPending}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                            title="Revoke key"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </section>
            </>
          )}
          </div>
        </main>

      </div>
    </div>
  );
}
