"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronRight,
  Terminal,
  List,
  Play,
  Sparkles,
  Shield,
  GitBranch,
  ArrowRight,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

function PanelChrome({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-2.5 dark:border-white/10">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </span>
        <span className="ml-2 font-mono text-[11px] text-zinc-500">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function InteractionsPanel() {
  return (
    <PanelChrome title="Interactions">
      <div className="space-y-2 font-mono text-[11px]">
        <div className="grid grid-cols-[1fr_1.2fr_0.7fr_0.6fr] gap-2 text-zinc-500">
          <span>Time</span>
          <span>Model</span>
          <span>Tokens</span>
          <span>Status</span>
        </div>
        {[
          ["12:41:08", "gpt-4o-mini", "in / out", "ok"],
          ["12:40:22", "claude-sonnet", "in / out", "ok"],
          ["12:38:55", "gemini-flash", "in / out", "err"],
        ].map(([t, m, tok, s]) => (
          <div
            key={t}
            className="grid grid-cols-[1fr_1.2fr_0.7fr_0.6fr] gap-2 rounded-lg bg-white px-2 py-2 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            <span className="text-zinc-500">{t}</span>
            <span className="truncate">{m}</span>
            <span className="text-zinc-500">{tok}</span>
            <span className={s === "ok" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}>
              {s}
            </span>
          </div>
        ))}
        <p className="pt-1 text-[10px] text-zinc-400">Schematic — your live data appears after capture</p>
      </div>
    </PanelChrome>
  );
}

function ReplayPanel() {
  const steps = [
    { label: "User message", detail: "What was asked" },
    { label: "Model", detail: "Provider + model id" },
    { label: "Tool call", detail: "If present in the request" },
    { label: "Assistant", detail: "What was returned" },
  ];
  return (
    <PanelChrome title="Replay · session timeline">
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 text-[10px] font-mono text-zinc-500 dark:border-zinc-600">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="mt-1 h-full w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              )}
            </div>
            <div className="pb-2">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{step.label}</p>
              <p className="text-xs text-zinc-500">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[10px] text-zinc-400">Shows recorded history — does not re-call the model</p>
    </PanelChrome>
  );
}

function OptimizationPanel() {
  return (
    <PanelChrome title="Optimization · compression">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">Before</p>
          <p className="mt-1 text-sm font-medium">Full context</p>
          <p className="text-xs text-zinc-500">original input tokens</p>
        </div>
        <ArrowRight className="mx-auto h-4 w-4 shrink-0 text-zinc-400 sm:mx-0" />
        <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">After</p>
          <p className="mt-1 text-sm font-medium">Compressed input</p>
          <p className="text-xs text-zinc-500">sent to provider</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-md border border-zinc-200 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          Smart · query-aware
        </span>
        <span className="rounded-md border border-zinc-200 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          Hive · general context
        </span>
        <span className="rounded-md border border-zinc-200 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          rate · on/off
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
        Spend and savings come from your account&apos;s traces — not demo numbers.
      </p>
    </PanelChrome>
  );
}

function CapturePanel() {
  return (
    <PanelChrome title="Settings · Capture">
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <div>
            <p className="text-sm font-medium">Capture interactions</p>
            <p className="text-xs text-zinc-500">On by default</p>
          </div>
          <span className="relative h-6 w-11 rounded-full bg-zinc-900 dark:bg-emerald-500">
            <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
          </span>
        </div>
        <div>
          <p className="mb-2 text-xs text-zinc-500">Retention (plan limits apply)</p>
          <div className="flex flex-wrap gap-2">
            {["3 days", "30 days", "90 days"].map((d) => (
              <span
                key={d}
                className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <p className="font-mono text-[11px] text-zinc-500">
          SDK: capture: false · Header: X-TokenBee-Capture
        </p>
      </div>
    </PanelChrome>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 antialiased selection:bg-zinc-900/10 dark:bg-black dark:text-zinc-50 dark:selection:bg-white/20">
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-black/80">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
          <Link href="/" className="relative flex items-center">
            <img src="/logo-dark.svg" alt="TokenBee" className="h-8 w-auto opacity-0 dark:opacity-100" />
            <img src="/logo-light.svg" alt="TokenBee" className="absolute left-0 top-0 h-8 w-auto opacity-100 dark:opacity-0" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#product" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Product
            </Link>
            <Link href="#compression" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Compression
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Docs
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="https://github.com/tokenBee/gateway" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
              <GitBranch className="h-5 w-5" />
            </Link>
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
              Sign in
            </Link>
            <Link
              href="/login?mode=signup"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black"
            >
              Start free
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-600 dark:text-zinc-400 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white px-6 py-8 dark:bg-black md:hidden">
          <div className="flex flex-col space-y-5">
            <Link href="#product" onClick={() => setMobileMenuOpen(false)}>Product</Link>
            <Link href="#compression" onClick={() => setMobileMenuOpen(false)}>Compression</Link>
            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/docs" onClick={() => setMobileMenuOpen(false)}>Docs</Link>
            <hr className="border-zinc-200 dark:border-white/10" />
            <Link href="/login">Sign in</Link>
            <Link href="/login?mode=signup" className="font-semibold">Start free</Link>
          </div>
        </div>
      )}

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="relative mx-auto max-w-[1100px] overflow-hidden px-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(24 24 27 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(24 24 27 / 0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-sm font-medium tracking-wide text-zinc-500">
              For AI teams shipping LLM features to production
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.08]">
              Your AI said it.
              <br />
              TokenBee remembers it.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Capture every AI interaction, inspect what happened, open session timelines, and reduce context with semantic compression — then see cost impact from your own traffic. Capture stays configurable globally or per request.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login?mode=signup"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Start free
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-7 py-3.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-white/15 dark:hover:bg-white/5"
              >
                Read the docs
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-[#0a0a0a] shadow-2xl shadow-zinc-900/10 dark:border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-500">sdk · capture + compression</span>
              </div>
              <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                TypeScript
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-zinc-300 sm:text-sm">
{`const res = await client.send({
  model: TokenBeeModel.OpenAIGPT4o,
  input: {
    messages: [...],
    compression: 'auto',   // semantic compression (default)
    rate: CompressionRate.Medium,
    strategy: CompressionStrategy.Smart,
    capture: true,         // retain interaction content
  }
});`}
            </pre>
          </div>
        </section>

        {/* Problem */}
        <section className="mx-auto mt-28 max-w-[720px] px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Production AI needs a memory — not another log dump.
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            When something goes wrong, teams need to know what the user asked, what the model saw, what it answered, which provider handled it, and what it cost. TokenBee keeps that history searchable — when you choose to capture it.
          </p>
        </section>

        {/* Product bento */}
        <section id="product" className="mx-auto mt-24 max-w-[1100px] scroll-mt-24 px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-zinc-500">Product</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Capture, inspect, compress, optimize — one layer.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article id="interactions" className="scroll-mt-24 space-y-5 rounded-3xl border border-zinc-200 p-6 dark:border-white/10 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <List className="h-4 w-4 text-zinc-500" />
                Interactions
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Route through TokenBee to OpenAI, Anthropic, Gemini, and others. Capture is on by default; turn it off in Settings or per request with{" "}
                <code className="rounded bg-zinc-100 px-1 font-mono text-[12px] dark:bg-zinc-800">capture: false</code>.
                Requests still reach the LLM — bodies are simply not retained.
              </p>
              <InteractionsPanel />
            </article>

            <article id="replay" className="scroll-mt-24 space-y-5 rounded-3xl border border-zinc-200 p-6 dark:border-white/10 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <Play className="h-4 w-4 text-zinc-500" />
                Replay
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Send a <code className="rounded bg-zinc-100 px-1 font-mono text-[12px] dark:bg-zinc-800">sessionId</code> to group interactions into a timeline.
                Replay shows what was recorded — it does not re-call the LLM.
              </p>
              <ReplayPanel />
            </article>

            <article id="optimization" className="scroll-mt-24 space-y-5 rounded-3xl border border-zinc-200 p-6 dark:border-white/10 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <Sparkles className="h-4 w-4 text-zinc-500" />
                Optimization
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Semantic compression shrinks input context before the provider call. Overview and Optimization then show spend, tokens, and compression impact from your account&apos;s traces — not simulated demos.
              </p>
              <OptimizationPanel />
            </article>

            <article id="settings" className="scroll-mt-24 space-y-5 rounded-3xl border border-zinc-200 p-6 dark:border-white/10 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <Shield className="h-4 w-4 text-zinc-500" />
                Capture control
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Turn capture on or off, set retention within your plan, and control whether messages are stored.
                Control and visibility for your traffic — not a legal certification.
              </p>
              <CapturePanel />
            </article>
          </div>
        </section>

        {/* Compression highlight */}
        <section id="compression" className="mx-auto mt-24 max-w-[1100px] scroll-mt-24 px-6">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950">
            <div className="grid lg:grid-cols-2">
              <div className="space-y-5 p-8 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <Zap className="h-3.5 w-3.5" />
                  Optimization capability
                </div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Semantic compression, on the path to your provider.
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  TokenBee can compress prompts before they reach OpenAI, Anthropic, Gemini, and other providers.
                  Choose strategy and rate per request — or turn compression off when you need the full context untouched.
                  Captured interactions record original vs compressed tokens so you can see the impact in Optimization.
                </p>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">Smart</strong> — query-aware compression that keeps what matters for the current turn
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">Hive</strong> — general-purpose compression for documents and long system context
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">Per-request control</strong> —{" "}
                      <code className="rounded bg-zinc-200/80 px-1 font-mono text-[12px] dark:bg-zinc-800">compression: &apos;auto&apos; | &apos;off&apos;</code>
                      {" "}and rate / strategy in the SDK
                    </span>
                  </li>
                </ul>
                <Link
                  href="/docs#compression"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
                >
                  Compression docs
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-t border-zinc-200 p-8 dark:border-white/10 lg:border-l lg:border-t-0 sm:p-10">
                <PanelChrome title="request · compression headers">
                  <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-700 dark:text-zinc-300">
{`compression: 'auto'
rate:       CompressionRate.Medium
strategy:   CompressionStrategy.Smart
context:    TokenBeeContext.Auto

// Bypass when needed:
compression: 'off'`}
                  </pre>
                </PanelChrome>
                <p className="mt-4 text-xs text-zinc-500">
                  Compression is an optimization feature — capture, audit, and replay remain the core product.
                  Savings shown in the dashboard are estimates from recorded traces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mx-auto mt-24 max-w-[720px] px-6">
          <div className="rounded-2xl border border-zinc-200 px-6 py-8 text-center dark:border-white/10">
            <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
              Your AI app
              <span className="mx-2 text-zinc-400">→</span>
              TokenBee
              <span className="mx-2 text-zinc-400">→</span>
              OpenAI / Anthropic / Gemini / …
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              BYOK — your provider key is forwarded with the request and is not stored by TokenBee.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto mt-28 max-w-[800px] scroll-mt-24 px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Why not just log this yourself?
          </h2>
          <div className="mt-10 divide-y divide-zinc-200 dark:divide-white/10">
            {[
              [
                "Multi-provider traffic in one place",
                "TokenBee normalizes requests across providers behind one SDK and API shape, so you are not maintaining separate logging pipelines per vendor.",
              ],
              [
                "Interaction explorer and session timelines",
                "Captured interactions land in a searchable explorer. With a session ID, you get a timeline of what was recorded — without building that UI yourself. Timelines show captured data; they do not re-run the model.",
              ],
              [
                "Cost and savings from real traces",
                "Optional semantic compression reduces context on the way to the provider. Spend, tokens, and compression impact are tracked from your account’s traffic — instead of a spreadsheet that drifts.",
              ],
              [
                "Capture you can turn off",
                "Global Settings and per-request capture: false skip body storage while the proxy still works.",
              ],
            ].map(([title, body]) => (
              <div key={title} className="py-6">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto mt-28 max-w-[1100px] scroll-mt-24 px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium tracking-wide text-zinc-500">
              Priced by captured AI interactions
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Plans scale by how many interactions you capture each month — not by seats.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900">
                <tr>
                  <th className="px-5 py-4 font-semibold">Plan</th>
                  <th className="px-5 py-4 font-semibold">Price</th>
                  <th className="px-5 py-4 font-semibold">Captured / month</th>
                  <th className="px-5 py-4 font-semibold">Retention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                <tr>
                  <td className="px-5 py-4 font-medium">Free</td>
                  <td className="px-5 py-4">$0</td>
                  <td className="px-5 py-4">1,000</td>
                  <td className="px-5 py-4">3 days</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Pro</td>
                  <td className="px-5 py-4">$19/mo</td>
                  <td className="px-5 py-4">25,000</td>
                  <td className="px-5 py-4">30 days</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Team</td>
                  <td className="px-5 py-4">$49/mo</td>
                  <td className="px-5 py-4">100,000</td>
                  <td className="px-5 py-4">90 days</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">Enterprise</td>
                  <td className="px-5 py-4">Custom</td>
                  <td className="px-5 py-4">—</td>
                  <td className="px-5 py-4">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Requests are never blocked — only new content storage pauses if you are over your plan&apos;s captured-interaction limit. Metadata such as tokens, cost, and latency can still be recorded.
          </p>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Enterprise: contact us for higher volume, longer retention, and custom terms.{" "}
            <a href="mailto:sales@tokenbee.io" className="font-medium underline-offset-2 hover:underline">
              Contact us
            </a>
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/login?mode=signup"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-bold text-white dark:bg-white dark:text-black"
            >
              Start free
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-zinc-500">
            TokenBee provides audit trail and governance tooling for your own AI interactions. It does not certify or guarantee legal or regulatory compliance.
          </p>
        </section>

        <section className="mx-auto mt-28 max-w-[720px] px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Give your AI application a memory.
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Start free. Capture your first interaction from the dashboard.
          </p>
          <Link
            href="/login?mode=signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-bold text-white dark:bg-white dark:text-black"
          >
            Start free
            <ChevronRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-12 text-sm text-zinc-500 dark:border-white/10">
        <div className="mx-auto grid max-w-[1100px] gap-8 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative mb-4 flex items-center">
              <img src="/logo-dark.svg" alt="TokenBee" className="h-7 w-auto opacity-0 dark:opacity-100" />
              <img src="/logo-light.svg" alt="TokenBee" className="absolute left-0 top-0 h-7 w-auto opacity-100 dark:opacity-0" />
            </div>
            <p className="max-w-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              AI interaction capture, audit, replay, and optimization for teams shipping LLM features to production.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#product" className="hover:text-zinc-900 dark:hover:text-white">Product</Link></li>
              <li><Link href="#compression" className="hover:text-zinc-900 dark:hover:text-white">Compression</Link></li>
              <li><Link href="#pricing" className="hover:text-zinc-900 dark:hover:text-white">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-zinc-900 dark:hover:text-white">Docs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Contact</h4>
            <ul className="space-y-3">
              <li><a href="mailto:founders@tokenbee.io" className="hover:text-zinc-900 dark:hover:text-white">founders@tokenbee.io</a></li>
              <li><a href="mailto:sales@tokenbee.io" className="hover:text-zinc-900 dark:hover:text-white">sales@tokenbee.io</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1100px] border-t border-zinc-200 px-6 pt-8 text-center dark:border-white/10">
          © {new Date().getFullYear()} TokenBee Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
