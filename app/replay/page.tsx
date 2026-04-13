"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SessionList from "@/components/replay/SessionList";

export default function ReplayPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden pl-60">
        <Header
          title="Replay"
          subtitle="Agent session recordings"
        />

        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <div className="mx-auto max-w-5xl">
            <SessionList />
          </div>
        </main>
      </div>
    </div>
  );
}
