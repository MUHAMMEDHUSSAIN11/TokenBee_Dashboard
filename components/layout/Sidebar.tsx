"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  List,
  Play,
  Settings,
  Telescope,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Traces", href: "/traces", icon: List },
  { label: "Replay", href: "/replay", icon: Play },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
    };
    fetchUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-zinc-200 bg-white transition-colors dark:border-zinc-800 dark:bg-zinc-950">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-zinc-200 px-5 dark:border-zinc-800">
        <Link href="/dashboard" className="relative flex items-center gap-2.5">
          <img 
            src="/logo-dark.svg" 
            alt="TokenBee" 
            className="h-8 w-auto opacity-0 dark:opacity-100" 
          />
          <img 
            src="/logo-light.svg" 
            alt="TokenBee" 
            className="absolute left-0 top-0 h-8 w-auto opacity-100 dark:opacity-0" 
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-violet-600/10 text-violet-600 dark:bg-violet-600/15 dark:text-violet-400"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
              )}
            >
              <item.icon
                className={cn(
                  "h-4.5 w-4.5 shrink-0 transition-colors",
                  isActive
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
        {userEmail ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 overflow-hidden px-1">
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {userEmail}
                </span>
                <span className="text-xs text-zinc-500">Free Tier</span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        ) : (
          <span className="text-xs text-zinc-500">v0.1.0</span>
        )}
      </div>
    </aside>
  );
}
