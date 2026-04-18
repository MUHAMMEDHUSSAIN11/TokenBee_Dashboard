"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Terminal, Key, Zap, Info, Lock, ShieldCheck, Activity, Database, Play, Eye } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("typescript");

  return (
    <div className="flex min-h-screen bg-white font-sans text-zinc-900 transition-colors selection:bg-violet-500/30 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Sidebar */}
      <aside className="fixed bottom-0 left-0 top-0 hidden w-64 flex-col border-r border-zinc-200 bg-zinc-50/50 p-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/50 md:flex">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">TokenBee Docs</span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col space-y-1 overflow-y-auto">
          <Link href="/" className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-200">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Getting Started</div>
          <a href="#quick-start" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Quick Start</a>
          <a href="#authentication" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Authentication & BYOK</a>
          <a href="#models" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Supported Models</a>
          
          <div className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Feature Guide</div>
          <a href="#compression" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Compression Engine</a>
          <a href="#coding-agent" className="rounded-md px-3 py-2 text-sm font-medium text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/30 transition-colors flex items-center gap-2">
            <Zap className="h-3 w-3" />
            Agent Compression
          </a>
          <a href="#sessions" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Sessions & Replays</a>
          <a href="#observability" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Observability</a>
          <a href="#metadata" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Custom Metadata</a>
          <a href="#privacy" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Data Privacy</a>
        </nav>

        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 pl-0 md:pl-64">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-20 lg:px-12">
          
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
              Version 1.2.0
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">Engineering Documentation</h1>
            <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              TokenBee is a stateless LLM proxy that adds a layer of intelligence between your apps and cloud LLM providers. 
              Compress prompts, replay sessions, and observe production AI traffic — all through lightweight SDKs.
            </p>
          </div>

          {/* ── QUICK START ─────────────────────────────────────────── */}
          <section id="quick-start" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Terminal className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Quick Start</h2>
            </div>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              Install our SDK, initialize the client with your keys, and start sending requests. The SDK handles all header orchestration, provider routing, and compression configuration for you.
            </p>

            {/* Step 1 - Install */}
            <div className="mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Step 1 — Install the SDK</div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm mb-8">
              <div className="flex border-b border-zinc-200 bg-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-950/50">
                <button 
                  onClick={() => setActiveTab("typescript")} 
                  className={`px-6 py-3 text-sm font-bold transition-all ${activeTab === 'typescript' ? 'bg-white dark:bg-zinc-900 text-violet-600 dark:text-violet-400 border-b-2 border-violet-500' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'}`}
                >
                  TypeScript
                </button>
                <button 
                  onClick={() => setActiveTab("python")} 
                  className={`px-6 py-3 text-sm font-bold transition-all ${activeTab === 'python' ? 'bg-white dark:bg-zinc-900 text-violet-600 dark:text-violet-400 border-b-2 border-violet-500' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'}`}
                >
                  Python
                </button>
              </div>
              <div className="p-6 bg-[#0d0d0d]">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-zinc-500">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span>Terminal</span>
                </div>
                <pre className="font-mono text-sm text-zinc-200 overflow-x-auto">
                  <span className="text-zinc-500 select-none">$ </span>{activeTab === 'typescript' ? 'npm install @tokenbee/sdk' : 'pip install tokenbee-sdk'}
                </pre>
              </div>
            </div>

            {/* Step 2 - Initialize & Send */}
            <div className="mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Step 2 — Initialize Client & Send Requests</div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="p-6 bg-[#0d0d0d]">
                {activeTab === "typescript" ? (
                  <pre className="font-mono text-[13px] sm:text-sm text-zinc-300 overflow-x-auto leading-relaxed">
                    <code className="text-violet-400">import</code>{" { TokenBee, TokenBeeModel, CompressionRate } "}<code className="text-violet-400">from</code> <span className="text-emerald-400">&apos;@tokenbee/sdk&apos;</span>;{"\n\n"}
                    <span className="text-zinc-500">{"// Initialize — pass your TokenBee key AND your provider key"}</span>{"\n"}
                    <code className="text-violet-400">const</code> client = <code className="text-violet-400">new</code> TokenBee({"{"}{"\n"}
                    {"  "}apiKey: <span className="text-emerald-400">&apos;tb_live_your_key&apos;</span>,{"\n"}
                    {"  "}llmKey: <span className="text-orange-400">&apos;sk-your-openai-or-anthropic-key&apos;</span>{"\n"}
                    {"}"});{"\n\n"}
                    <span className="text-zinc-500">{"// Send — model enum handles routing automatically"}</span>{"\n"}
                    <code className="text-violet-400">const</code> res = <code className="text-violet-400">await</code> client.send({"{"}{"\n"}
                    {"  "}model: TokenBeeModel.AnthropicClaude3_5_Sonnet,{"\n"}
                    {"  "}input: {"{"}{"\n"}
                    {"    "}messages: [{"{"} role: <span className="text-emerald-400">&apos;user&apos;</span>, content: <span className="text-emerald-400">&apos;Explain token compression&apos;</span> {"}"}],{"\n"}
                    {"    "}compression: <span className="text-emerald-400">&apos;auto&apos;</span>,{"\n"}
                    {"    "}rate: CompressionRate.High,{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"}"});{"\n\n"}
                    <span className="text-emerald-500">console</span>.log(res);
                  </pre>
                ) : (
                  <pre className="font-mono text-[13px] sm:text-sm text-zinc-300 overflow-x-auto leading-relaxed">
                    <code className="text-violet-400">from</code> tokenbee <code className="text-violet-400">import</code> TokenBee, TokenBeeModel, CompressionRate{"\n\n"}
                    <span className="text-zinc-500">{"# Initialize — pass your TokenBee key AND your provider key (BYOK)"}</span>{"\n"}
                    client = TokenBee({"\n"}
                    {"  "}api_key=<span className="text-emerald-400">&apos;tb_live_your_key&apos;</span>,{"\n"}
                    {"  "}llm_key=<span className="text-orange-400">&apos;sk-your-openai-or-anthropic-key&apos;</span>{"\n"}
                    ){"\n\n"}
                    <span className="text-zinc-500">{"# Send — model enum handles provider routing automatically"}</span>{"\n"}
                    response = client.send({"\n"}
                    {"  "}model=TokenBeeModel.ANTHROPIC_CLAUDE_3_5_SONNET,{"\n"}
                    {"  "}input={"{"}{"\n"}
                    {"    "}<span className="text-emerald-400">&apos;messages&apos;</span>: [{"{"}<span className="text-emerald-400">&apos;role&apos;</span>: <span className="text-emerald-400">&apos;user&apos;</span>, <span className="text-emerald-400">&apos;content&apos;</span>: <span className="text-emerald-400">&apos;Explain token compression&apos;</span>{"}"}],{"\n"}
                    {"    "}<span className="text-emerald-400">&apos;compression&apos;</span>: <span className="text-emerald-400">&apos;auto&apos;</span>,{"\n"}
                    {"    "}<span className="text-emerald-400">&apos;rate&apos;</span>: CompressionRate.HIGH,{"\n"}
                    {"  "}{"}"}{"\n"}
                    ){"\n\n"}
                    <span className="text-emerald-500">print</span>(response)
                  </pre>
                )}
              </div>
            </div>
          </section>

          <hr className="my-16 border-zinc-200 dark:border-zinc-800" />

          {/* ── AUTHENTICATION & BYOK ─────────────────────────────── */}
          <section id="authentication" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Authentication & BYOK</h2>
            </div>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              TokenBee uses a two-key architecture. Both keys are passed through the SDK — you never construct raw headers yourself.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-violet-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                    <Key className="h-4 w-4 text-violet-500" />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">TokenBee API Key</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Generated in your <Link href="/settings" className="text-violet-500 hover:text-violet-400 underline">dashboard settings</Link>. 
                  Identifies your account for billing, observability, and usage tracking. Format: <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded">tb_live_...</code>
                </p>
              </div>
              <div className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">Provider Key (BYOK)</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Your own OpenAI, Anthropic, or other provider key. Passed through the SDK as a header (<code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded">X-LLM-Key</code>). 
                  <strong className="text-zinc-200"> Never stored on our servers.</strong>
                </p>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
              <div className="flex gap-4">
                <Info className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-1">What is BYOK?</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <strong>Bring Your Own Key</strong> means TokenBee never manages your LLM provider billing. Your provider API key is encrypted in transit and forwarded directly to the LLM endpoint. 
                    It is never persisted in our database. You maintain 100% control over your provider relationship, rate limits, and spending.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="my-16 border-zinc-200 dark:border-zinc-800" />

          {/* ── SUPPORTED MODELS ──────────────────────────────────── */}
          <section id="models" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Database className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Supported Models</h2>
            </div>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The <code className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">TokenBeeModel</code> enum abstracts provider routing. 
              Pass the enum value as the model — the SDK handles the rest.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { provider: "OpenAI", models: ["GPT-4o", "GPT-4o Mini", "O1", "O1 Mini", "O3 Mini"], color: "emerald" },
                { provider: "Anthropic", models: ["Claude 4.6 Sonnet", "Claude 4.6 Opus", "Claude 3.5 Sonnet", "Claude 3.5 Haiku", "Claude 3 Opus"], color: "orange" },
                { provider: "Google", models: ["Gemini 3.1 Pro", "Gemini 3.1 Flash", "Gemini 2.0 Flash", "Gemini 2.0 Pro", "Gemini 1.5 Pro"], color: "blue" },
                { provider: "Mistral", models: ["Large", "Small", "Pixtral Large", "Nemo"], color: "red" },
                { provider: "Perplexity", models: ["Sonar", "Sonar Pro", "Sonar Reasoning"], color: "cyan" },
                { provider: "Groq", models: ["Llama 3.3 70B", "Llama 3.1 8B", "Mixtral 8x7B", "Gemma2 9B"], color: "pink" },
              ].map((group) => (
                <div key={group.provider} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full bg-${group.color}-500`}></div>
                    {group.provider}
                  </h4>
                  <ul className="space-y-1.5">
                    {group.models.map((m) => (
                      <li key={m} className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{m}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <hr className="my-16 border-zinc-200 dark:border-zinc-800" />

          {/* ── COMPRESSION ENGINE ────────────────────────────────── */}
          <section id="compression" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400">
                <Zap className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Compression Engine</h2>
            </div>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg italic">
              A proprietary semantic compression engine optimized for LLM calls.
            </p>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike simple truncation, TokenBee extracts the core intent of your prompt and compresses surrounding context using semantic folding. 
              It detects and removes redundant tokens without degrading output quality.
            </p>

            <div className="space-y-6">
              {/* Compression Rates */}
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">Compression Rates</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[
                    { name: "Low", value: "0.75x", desc: "~25% savings", rec: false },
                    { name: "Medium", value: "0.50x", desc: "~50% savings", rec: false },
                    { name: "High", value: "0.33x", desc: "~67% savings", rec: true },
                    { name: "Extreme", value: "0.20x", desc: "~80% savings", rec: false },
                  ].map((rate) => (
                    <div key={rate.name} className={`text-center p-4 rounded-xl border ${rate.rec ? 'border-violet-500/50 bg-violet-500/5' : 'border-zinc-200 dark:border-zinc-800'}`}>
                      <div className={`text-xs mb-1 uppercase tracking-wider ${rate.rec ? 'text-violet-500 font-bold' : 'text-zinc-500'}`}>
                        {rate.name} {rate.rec && "★"}
                      </div>
                      <div className={`font-mono text-xl font-bold ${rate.rec ? 'text-violet-500' : 'text-zinc-900 dark:text-white'}`}>{rate.value}</div>
                      <div className="text-xs text-zinc-500 mt-1">{rate.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggle compression */}
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Controlling Compression</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Compression defaults to <code className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs">auto</code>. 
                  Disable for exact-inference pipelines:
                </p>
                <pre className="bg-[#0d0d0d] p-4 rounded-xl font-mono text-sm text-zinc-300 overflow-x-auto">
                  <span className="text-zinc-500">{"// Disable compression for this call"}</span>{"\n"}
                  compression: <span className="text-emerald-400">&apos;off&apos;</span>{"\n\n"}
                  <span className="text-zinc-500">{"// Or set an explicit rate"}</span>{"\n"}
                  rate: CompressionRate.Low
                </pre>
              </div>
            </div>
          </section>

          {/* ── CODING AGENT COMPRESSION — COMING SOON ────────────── */}
          <section id="coding-agent" className="mb-20 scroll-mt-24">
            <div className="p-8 rounded-3xl border-2 border-dashed border-violet-500/30 bg-violet-500/5 relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                Coming Soon
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500 text-white shadow-lg shrink-0">
                  <Zap className="h-6 w-6 fill-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Semantic Coding Agent Compression</h2>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    We are building a specialized compression mode dedicated to <strong>Autonomous Coding Agents</strong> — tools like Devin, Cursor, and custom RAG agents that send large, multi-turn code contexts to LLMs.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {[
                  "Codebase-aware context pruning",
                  "Diff-optimized semantic summarization",
                  "Tool-call history compression",
                  "Deep RAG loop optimization",
                  "AST-aware token reduction",
                  "Multi-file context deduplication",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0"></div>
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Interested in early access? Contact us at <a href="mailto:founders@tokenbee.io" className="text-violet-500 hover:text-violet-400 underline">founders@tokenbee.io</a>
              </p>
            </div>
          </section>

          <hr className="my-16 border-zinc-200 dark:border-zinc-800" />

          {/* ── SESSIONS & REPLAYS ────────────────────────────────── */}
          <section id="sessions" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Play className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Sessions & Replays</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 text-lg">
              Group multi-step AI agent interactions into replay-able sessions. TokenBee records every span — LLM calls, tool calls, and decisions — so you can debug production failures frame-by-frame.
            </p>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Session Tracking via SDK</span>
                </div>
                <div className="p-6 bg-[#0d0d0d]">
                  <pre className="font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
                    <span className="text-zinc-500">{"// Automatically group traces into a session"}</span>{"\n"}
                    <code className="text-violet-400">const</code> res = <code className="text-violet-400">await</code> client.send({"{"}{"\n"}
                    {"  "}model: TokenBeeModel.OpenAIGPT4o,{"\n"}
                    {"  "}input: {"{"}{"\n"}
                    {"    "}messages: [{"{"} role: <span className="text-emerald-400">&apos;user&apos;</span>, content: <span className="text-emerald-400">&apos;Fix the login bug&apos;</span> {"}"}],{"\n"}
                    {"    "}<span className="text-orange-400">sessionId</span>: <span className="text-emerald-400">&apos;debug-session-42&apos;</span>,{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"}"});
                  </pre>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { type: "LlmCall", desc: "Auto-recorded for every request through the gateway" },
                  { type: "ToolCall", desc: "Record tool/function calls in your agent pipeline" },
                  { type: "Decision", desc: "Log branching decisions in multi-step workflows" },
                ].map((span) => (
                  <div key={span.type} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="font-mono text-sm font-bold text-emerald-500 mb-1">{span.type}</div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{span.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <hr className="my-16 border-zinc-200 dark:border-zinc-800" />

          {/* ── OBSERVABILITY ─────────────────────────────────────── */}
          <section id="observability" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Observability</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              Every request through TokenBee is logged as a trace with full metadata. Use the <Link href="/dashboard" className="text-violet-500 hover:text-violet-400 underline">Dashboard</Link> to explore your AI traffic.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Per-request trace", desc: "Model, tokens, latency, status code, cost" },
                { label: "Compression analytics", desc: "Original vs compressed tokens, savings in USD" },
                { label: "By-model breakdown", desc: "Compare costs and latency across providers" },
                { label: "By-user breakdown", desc: "Track per-user spending and usage patterns" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">{item.label}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="my-16 border-zinc-200 dark:border-zinc-800" />

          {/* ── CUSTOM METADATA ───────────────────────────────────── */}
          <section id="metadata" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-500/10 text-zinc-600 dark:text-zinc-400">
                <Database className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Custom Metadata</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Attach arbitrary key-value properties to any request for segmented dashboard analytics. 
              These properties are searchable and filterable in the traces view.
            </p>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">HTTP Header Format</span>
              </div>
              <div className="p-6 bg-[#0d0d0d]">
                <pre className="font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
                  <span className="text-zinc-500">{"// Properties are passed as X-TB-Property-* headers"}</span>{"\n"}
                  <span className="text-emerald-400">X-TB-Property-Environment</span>: production{"\n"}
                  <span className="text-emerald-400">X-TB-Property-User-Email</span>: user@example.com{"\n"}
                  <span className="text-emerald-400">X-TB-Property-Experiment</span>: v2-prompt-optimization{"\n"}
                  <span className="text-emerald-400">X-TB-Property-Pipeline</span>: rag-summarizer
                </pre>
              </div>
            </div>
          </section>

          <hr className="my-16 border-zinc-200 dark:border-zinc-800" />

          {/* ── DATA PRIVACY ──────────────────────────────────────── */}
          <section id="privacy" className="mb-20 scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Data Privacy</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              TokenBee records request/response payloads by default to enable session replays and trace debugging. 
              For PII-sensitive data, you can opt out at the request level.
            </p>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="p-6 bg-[#0d0d0d]">
                  <pre className="font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
                    <span className="text-zinc-500">{"// Disable payload logging for this request"}</span>{"\n"}
                    <code className="text-violet-400">const</code> res = <code className="text-violet-400">await</code> client.send({"{"}{"\n"}
                    {"  "}model: TokenBeeModel.OpenAIGPT4o,{"\n"}
                    {"  "}input: {"{"}{"\n"}
                    {"    "}messages: [...],{"\n"}
                    {"    "}<span className="text-red-400">privacy</span>: <span className="text-emerald-400">true</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"}"});
                  </pre>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                <div className="flex gap-4">
                  <ShieldCheck className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-1">What happens with privacy: true?</h4>
                    <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-2 leading-relaxed">
                      <li className="flex gap-2"><span className="text-red-500 shrink-0">✕</span> RequestBody and ResponseBody are dropped — never stored</li>
                      <li className="flex gap-2"><span className="text-red-500 shrink-0">✕</span> Session replay payloads are not recorded</li>
                      <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Token counts, latency, cost, and model metadata are still tracked</li>
                      <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Compression still works normally</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-32 pt-12 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} TokenBee Inc. All rights reserved. <a href="mailto:founders@tokenbee.io" className="hover:text-zinc-300">Contact</a></p>
          </footer>
        </div>
      </main>
    </div>
  );
}
