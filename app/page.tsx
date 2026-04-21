"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BarChart2, Zap, Play, GitBranch, Menu, X, ChevronRight, Terminal, Box, Lock, Activity, Check } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

function ScrollFade({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"typescript" | "python" | "http">("typescript");

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-violet-500/30">
      <style dangerouslySetInnerHTML={{
        __html: `
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .delay-0 { animation-delay: 0ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        
        .glow-bg {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%);
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }
      ` }} />

      {/* SECTION 1 - Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-white/[0.05] bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/" className="relative flex items-center">
              <img 
                src="/logo-dark.svg" 
                alt="TokenBee" 
                className="h-8.5 w-auto opacity-0 dark:opacity-100" 
              />
              <img 
                src="/logo-light.svg" 
                alt="TokenBee" 
                className="absolute left-0 top-0 h-8.5 w-auto opacity-100 dark:opacity-0" 
              />
            </Link>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              Docs
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="#"  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              <GitBranch className="h-5 w-5" />
            </Link>
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors">
              Sign in
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] z-40 bg-white dark:bg-black px-6 py-8 md:hidden">
          <div className="flex flex-col space-y-6">
            <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-700 dark:text-zinc-300">Features</Link>
            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-700 dark:text-zinc-300">Pricing</Link>
            <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-700 dark:text-zinc-300">Docs</Link>
            <hr className="border-zinc-100 dark:border-white/10" />
            <Link href="/login" className="text-lg font-medium text-zinc-700 dark:text-zinc-300">Sign in</Link>
          </div>
        </div>
      )}

      <main className="relative pt-32 pb-20">
        <div className="glow-bg" />

        {/* SECTION 2 - Hero */}
        <section className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
          <div className="fade-up delay-0 mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Observability, Replays & Compression for App Builders
          </div>

          <h1 className="fade-up delay-100 text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-[5.5rem] leading-[1.1]">
            Observe, Replay and<br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Compress LLM traffic.
            </span>
          </h1>

          <p className="fade-up delay-200 mx-auto mt-8 max-w-2xl text-xl text-zinc-400 leading-relaxed">
            TokenBee sits between your RAG applications and your LLM providers. Get high-fidelity query-aware compression, session replays, and complete observability with our unified SDKs.
          </p>

          <div className="fade-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-base font-bold text-white transition-all hover:scale-[1.02] active:scale-95 sm:w-auto shadow-xl dark:bg-white dark:text-black dark:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <span>Get started for free</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 px-8 py-4 text-base font-medium text-zinc-900 dark:text-white backdrop-blur-md transition-colors hover:bg-zinc-50 dark:hover:bg-white/10 sm:w-auto"
            >
              <Terminal className="h-4 w-4" />
              Read the docs
            </Link>
          </div>
        </section>

        {/* SECTION 3 - How it works (SDK Examples) */}
        <section id="builders" className="relative z-10 mx-auto mt-32 max-w-[1200px] px-6">
          <div className="mb-12 text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-violet-400">App or Agent</h2>
            <p className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">One gateway, many providers.</p>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-400">
              Your application sends requests to TokenBee, where we can compress your prompts and reduce token usage automatically, then forward them to the LLM provider of your choice.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left side: Context */}
            <div className="space-y-8">
              <ul className="space-y-6 text-lg text-zinc-400">
                <li className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                    <Zap className="h-3 w-3" />
                  </div>
                  <span>Normalize responses across models so you can switch providers easily</span>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                    <Activity className="h-3 w-3" />
                  </div>
                  <span>Observe and debug production AI traffic end-to-end</span>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                    <GitBranch className="h-3 w-3" />
                  </div>
                  <span>Control costs with query-aware token compression and caching</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-zinc-200 dark:border-white/10">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Supported Providers</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">OpenAI</div>
                  <div className="rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">Anthropic</div>
                  <div className="rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">Gemini</div>
                  <div className="rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">xAI</div>
                  <div className="rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">Mistral</div>
                </div>
              </div>
            </div>

            {/* Right side: Code */}
            <div className="group relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden ring-1 ring-white/5 transition-all hover:ring-violet-500/20">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)]"></div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-black/40 p-1 border border-white/5">
                  <button
                    onClick={() => setActiveTab("typescript")}
                    className={`rounded-full px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${activeTab === "typescript"
                        ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                      }`}
                  >
                    TypeScript
                  </button>
                  <button
                    onClick={() => setActiveTab("python")}
                    className={`rounded-full px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${activeTab === "python"
                        ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                      }`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setActiveTab("http")}
                    className={`rounded-full px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${activeTab === "http"
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                      }`}
                  >
                    cURL
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="p-7 font-mono text-[13px] sm:text-sm leading-relaxed overflow-x-auto min-h-[360px]">
                <div className="mb-8 flex items-center justify-between gap-2 rounded-xl bg-white/[0.03] p-4 border border-white/5 group-hover:border-violet-500/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <Terminal className="h-4 w-4 text-violet-400" />
                    <span className="text-zinc-500 select-none">$</span>
                    <span className="text-zinc-200">
                      {activeTab === "typescript" ? "npm install @tokenbee/sdk" :
                        activeTab === "python" ? "pip install tokenbee-sdk" :
                          "curl -X POST https://api.tokenbee.dev/v1/..."}
                    </span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse"></div>
                </div>

                {activeTab === "typescript" && (
                  <div className="text-zinc-300">
                    <span className="text-fuchsia-400">import</span> {'{ TokenBee, TokenBeeModel, CompressionRate }'} <span className="text-fuchsia-400">from</span> <span className="text-emerald-400">'@tokenbee/sdk'</span>;<br/><br/>
                    <span className="text-zinc-500">{'// Initialize with your TokenBee key + provider key (BYOK)'}</span><br/>
                    <span className="text-fuchsia-400">const</span> bee = <span className="text-fuchsia-400">new</span> TokenBee({'{'}<br/>
                    &nbsp;&nbsp;apiKey: <span className="text-emerald-400">'tb_live_...'</span>,<br/>
                    &nbsp;&nbsp;llmKey: <span className="text-orange-400">'sk-your-provider-key'</span><br/>
                    {'}'});<br/><br/>
                    <span className="text-fuchsia-400">const</span> res = <span className="text-fuchsia-400">await</span> bee.send({'{'}<br/>
                    &nbsp;&nbsp;model: TokenBeeModel.OpenAIGPT4o,<br/>
                    &nbsp;&nbsp;input: {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;messages: [{'{'} role: <span className="text-emerald-400">'user'</span>, content: <span className="text-emerald-400">'Explain token compression'</span> {'}'}],<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;compression: <span className="text-emerald-400">'auto'</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;rate: CompressionRate.High,<br/>
                    &nbsp;&nbsp;{'}'}<br/>
                    {'}'});<br/><br/>
                    <span className="text-emerald-500">console</span>.log(res);
                  </div>
                )}
                {activeTab === "python" && (
                  <div className="text-zinc-300">
                    <span className="text-fuchsia-400">from</span> tokenbee <span className="text-fuchsia-400">import</span> TokenBee, TokenBeeModel, CompressionRate<br/><br/>
                    <span className="text-zinc-500">{'# Initialize with your keys (BYOK)'}</span><br/>
                    bee = TokenBee(<br/>
                    &nbsp;&nbsp;api_key=<span className="text-emerald-400">'tb_live_...'</span>,<br/>
                    &nbsp;&nbsp;llm_key=<span className="text-orange-400">'sk-your-provider-key'</span><br/>
                    )<br/><br/>
                    res = bee.send(<br/>
                    &nbsp;&nbsp;model=TokenBeeModel.OPENAI_GPT_4O,<br/>
                    &nbsp;&nbsp;input={'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">'messages'</span>: [{'{'} <span className="text-emerald-400">'role'</span>: <span className="text-emerald-400">'user'</span>, <span className="text-emerald-400">'content'</span>: <span className="text-emerald-400">'Explain token compression'</span> {'}'}],<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">'compression'</span>: <span className="text-emerald-400">'auto'</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">'rate'</span>: CompressionRate.MEDIUM<br/>
                    &nbsp;&nbsp;{'}'}<br/>
                    )<br/><br/>
                    <span className="text-emerald-500">print</span>(res)
                  </div>
                )}
                {activeTab === "http" && (
                  <div className="text-zinc-300">
                    curl -X POST https://api.tokenbee.io/v1/chat/completions \<br />
                    &nbsp;&nbsp;-H <span className="text-emerald-400">"Authorization: Bearer tb_live_..."</span> \<br />
                    &nbsp;&nbsp;-H <span className="text-orange-400">"X-LLM-Key: sk-your-provider-key"</span> \<br />
                    &nbsp;&nbsp;-H <span className="text-emerald-400">"X-TokenBee-Provider: mistral"</span> \<br />
                    &nbsp;&nbsp;-H <span className="text-emerald-400">"X-TokenBee-Model: mistral-large-latest"</span> \<br />
                    &nbsp;&nbsp;-H <span className="text-emerald-400">"X-TokenBee-Compression: auto"</span> \<br />
                    &nbsp;&nbsp;-H <span className="text-emerald-400">"X-TokenBee-Rate: 0.33"</span> \<br />
                    &nbsp;&nbsp;-d <span className="text-emerald-400">{`'{"messages": [{"role":"user", "content":"Explain..."}]}'`}</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4 - Stats */}
        <section className="relative z-10 mx-auto mt-20 max-w-[1000px] border-y border-white/10 px-6 py-10 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text text-transparent">~50%</span>
              <span className="mt-2 text-sm font-medium text-zinc-400 uppercase tracking-wider">Token Savings</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text text-transparent">~2ms</span>
              <span className="mt-2 text-sm font-medium text-zinc-400 uppercase tracking-wider">Gateway Latency</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text text-transparent">Unified</span>
              <span className="mt-2 text-sm font-medium text-zinc-400 uppercase tracking-wider">SDK Experience</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text text-transparent">BYOK</span>
              <span className="mt-2 text-sm font-medium text-zinc-400 uppercase tracking-wider">Your Keys, Your Control</span>
            </div>
          </div>
        </section>

        {/* SECTION 5 - Features */}
        <section id="features" className="relative z-10 mx-auto mt-32 max-w-[1200px] px-6">
          <div className="mb-20 text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-violet-400">Why TokenBee?</h2>
            <p className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Intelligence at the edge.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ScrollFade delay={0} className="group relative rounded-3xl bg-zinc-50 dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-white/10 hover:border-violet-500/50 transition-colors shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="relative z-10">
                <Box className="mb-6 h-8 w-8 text-violet-600 dark:text-violet-400" />
                <h3 className="mb-4 text-2xl font-bold">Query-Aware Compression</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  We use a proprietary semantic compression engine optimized for LLM calls. It detects and removes redundant semantic tokens without degrading output quality.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Unlike dumb token removal, TokenBee extracts your actual intent and compresses surrounding context dynamically. Save up to 50% without losing reasoning quality.
                </p>
              </div>
            </ScrollFade>

            <ScrollFade delay={100} className="group relative rounded-3xl bg-zinc-50 dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-white/10 hover:border-emerald-500/50 transition-colors shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="relative z-10">
                <Play className="mb-6 h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                <h3 className="mb-4 text-2xl font-bold">App Session Replays</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  RAG pipelines often fail silently. TokenBee records every step, prompt, and tool call. Play back any session frame-by-frame (opt-out anytime with strict privacy controls).
                </p>
              </div>
            </ScrollFade>

            <ScrollFade delay={200} className="group relative rounded-3xl bg-zinc-50 dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-white/10 hover:border-blue-500/50 transition-colors shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="relative z-10">
                <Lock className="mb-6 h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h3 className="mb-4 text-2xl font-bold">BYOK Architecture</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Bring Your Own Key. Your provider API keys pass through the SDK and are forwarded directly to the LLM. TokenBee never stores them.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Maintain full control over your provider billing, rate limits, and security posture.
                </p>
              </div>
            </ScrollFade>
          </div>

          <ScrollFade delay={300} className="mt-12">
            <div className="p-8 rounded-3xl border border-violet-500/30 bg-violet-500/5 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-500 text-white shadow-lg shadow-violet-500/25">
                  <Zap className="h-8 w-8 fill-white" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Upcoming: Semantic Agent Compression</h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-lg">
                    We are building a specialized compression mode for autonomous coding agents. Minimize context bloat in deep RAG loops without losing reasoning precision.
                  </p>
                </div>
                <div className="md:ml-auto shrink-0">
                  <span className="px-4 py-2 rounded-full border border-violet-500/50 text-violet-600 dark:text-violet-400 font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </ScrollFade>
        </section>

        {/* SECTION 6 - Pricing */}
        <section id="pricing" className="relative z-10 mx-auto mt-32 max-w-[1200px] px-6">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Free while in Beta
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Simple, transparent pricing</h2>
            <p className="mt-4 text-xl text-zinc-500 dark:text-zinc-400">Choose the plan that's right for your traffic. All paid features are currently unlocked for early adopters.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Free */}
            <div className="group rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-8 shadow-sm flex flex-col h-full hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Free</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">$0</span>
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wide">/ mo</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 min-h-[40px]">Start optimizing your LLM costs</p>

              <div className="mt-6 font-bold text-xl text-zinc-900 dark:text-white">1M <span className="text-xs font-medium text-zinc-500">tokens/mo</span></div>

              <ul className="mt-8 space-y-3 flex-1">
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Automatic prompt compression
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Multi-provider routing
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Basic observability
                </li>
              </ul>

              <Link href="/login" className="mt-10 block w-full rounded-xl border border-zinc-200 dark:border-white/20 bg-white dark:bg-transparent py-3 text-center text-sm font-bold text-zinc-900 dark:text-white transition-colors hover:bg-zinc-50 dark:hover:bg-white/5">
                Current Plan
              </Link>
            </div>

            {/* Starter */}
            <div className="group rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-8 shadow-sm flex flex-col h-full hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Starter</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">$9</span>
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wide">/ mo</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 min-h-[40px]">For indie developers</p>

              <div className="mt-6 font-bold text-xl text-zinc-900 dark:text-white">20M <span className="text-xs font-medium text-zinc-500">tokens/mo</span></div>

              <ul className="mt-8 space-y-3 flex-1">
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Automatic compression (balanced)
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Multi-provider support
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  30-day log retention
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Cost & token savings insights
                </li>
              </ul>

              <Link href="/login" className="mt-10 block w-full rounded-xl bg-zinc-900 dark:bg-white py-3 text-center text-sm font-bold text-white dark:text-black transition-transform hover:scale-[1.02]">
                Claim Free Beta Access
              </Link>
            </div>

            {/* Pro */}
            <div className="relative rounded-3xl border border-purple-500/50 bg-white dark:bg-purple-950/10 p-8 shadow-xl flex flex-col h-full overflow-hidden hover:shadow-purple-500/10 transition-shadow">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-purple-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                ⭐ Popular
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Pro</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">$29</span>
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wide">/ mo</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 min-h-[40px]">For growing apps</p>

              <div className="mt-6 font-bold text-xl text-zinc-900 dark:text-white">100M <span className="text-xs font-medium text-zinc-500">tokens/mo</span></div>

              <ul className="mt-8 space-y-3 flex-1">
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Advanced compression (aggressive)
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Full observability dashboard
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Priority support
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Detailed savings analytics
                </li>
              </ul>

              <Link href="/login" className="mt-10 block w-full rounded-xl bg-purple-600 py-3 text-center text-sm font-bold text-white transition-transform hover:scale-[1.02] shadow-lg shadow-purple-500/20">
                Claim Free Beta Access
              </Link>
            </div>

            {/* Scale */}
            <div className="group rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-8 shadow-sm flex flex-col h-full hover:border-red-500/50 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Scale</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">Custom</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 min-h-[40px]">Pay as you grow</p>

              <div className="mt-6 font-bold text-xl text-zinc-900 dark:text-white">$0.20 <span className="text-xs font-medium text-zinc-500">/ 1M tokens</span></div>

              <ul className="mt-8 space-y-3 flex-1">
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-red-600 dark:text-red-400" />
                  </div>
                  Unlimited usage
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-red-600 dark:text-red-400" />
                  </div>
                  Volume discounts
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-red-600 dark:text-red-400" />
                  </div>
                  Dedicated support
                </li>
              </ul>

              <Link href="mailto:sales@tokenbee.dev" className="mt-10 block w-full rounded-xl border border-zinc-200 dark:border-white/20 bg-white dark:bg-transparent py-3 text-center text-sm font-bold text-zinc-900 dark:text-white transition-colors hover:bg-zinc-50 dark:hover:bg-white/5">
                Contact sales
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 7 - CTA */}
        <section className="relative z-10 mx-auto mt-32 max-w-[800px] text-center px-6">
          <h2 className="text-4xl font-bold sm:text-6xl tracking-tight text-zinc-900 dark:text-white">Ready to ship faster?</h2>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">Join developers saving money and debugging easier with TokenBee.</p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-4 text-lg font-bold text-white dark:text-black transition-all hover:scale-[1.02] shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Start saving tokens now
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#050505] py-12 text-sm text-zinc-500">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative flex items-center mb-4">
              <img 
                src="/logo-dark.svg" 
                alt="TokenBee" 
                className="h-7 w-auto opacity-0 dark:opacity-100" 
              />
              <img 
                src="/logo-light.svg" 
                alt="TokenBee" 
                className="absolute left-0 top-0 h-7 w-auto opacity-100 dark:opacity-0" 
              />
            </div>
            <p className="max-w-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              The intelligence layer for your LLM traffic. Compression, replays, and routing in one gateway.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white uppercase tracking-wider text-xs">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#builders" className="hover:text-white transition-colors">App Builders</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="mailto:founders@tokenbee.io" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-[1200px] border-t border-white/10 px-6 pt-8 text-center">
          © {new Date().getFullYear()} TokenBee Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
