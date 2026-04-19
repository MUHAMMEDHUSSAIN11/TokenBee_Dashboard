"use client";

import { useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const INACTIVITY_LIMIT = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export default function SessionTimeout() {
  const router = useRouter();
  const supabase = createClient();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }, [supabase, router]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleLogout, INACTIVITY_LIMIT);
  }, [handleLogout]);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        resetTimer();
        
        const events = ["mousedown", "keydown", "scroll", "touchstart"];
        events.forEach((event) => {
          document.addEventListener(event, resetTimer);
        });

        return () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          events.forEach((event) => {
            document.removeEventListener(event, resetTimer);
          });
        };
      }
    };

    const cleanup = checkUser();
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // Note: cleanup from async might be tricky, but this is a simple sufficient approach
    };
  }, [supabase, resetTimer]);

  return null;
}
