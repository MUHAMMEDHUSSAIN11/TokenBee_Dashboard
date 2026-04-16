"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Terminal, Key, Zap, Info } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("python");

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

        <nav className="flex flex-1 flex-col space-y-1">
          <Link href="/" className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-200">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Getting Started</div>
          <a href="#quick-start" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Quick Start</a>
          <a href="#authentication" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Authentication</a>
          
          <div className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Features</div>
          <a href="#headers" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Header Reference</a>
          <a href="#compression" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Prompt Compression</a>
          <a href="#metadata" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors">Custom Metadata</a>
        </nav>

        <div className="mt-auto pt-4">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 pl-0 md:pl-64">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-20 lg:px-12">
          
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Documentation</h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Integrate TokenBee into your application in seconds with no external SDKs. Just one URL change and custom headers.
            </p>
          </div>

          <section id="quick-start" className="mb-16 scroll-mt-24">
            <div className="mb-6 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Quick Start</h2>
            </div>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              TokenBee provides ultra-lightweight SDKs to seamlessly multiplex across AI providers while granting you robust observability and dynamic token compression out of the box.
            </p>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex border-b border-zinc-200 bg-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-950/50">
                <button 
                  onClick={() => setActiveTab("typescript")} 
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 'typescript' ? 'border-b-2 border-violet-600 text-zinc-900 dark:border-violet-500 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'}`}
                >
                  TypeScript
                </button>
                <button 
                  onClick={() => setActiveTab("python")} 
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 'python' ? 'border-b-2 border-violet-600 text-zinc-900 dark:border-violet-500 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'}`}
                >
                  Python
                </button>
              </div>
              <div className="p-4 bg-zinc-950">
                {activeTab === "typescript" ? (
                  <pre className="font-mono text-[13px] sm:text-sm text-zinc-300 overflow-x-auto">
                    <code className="text-violet-400">import</code> {"{ TokenBee, TokenBeeModel, CompressionRate }"} <code className="text-violet-400">from</code> <span className="text-emerald-400">'@tokenbee/sdk'</span>;{"\n\n"}
                    <code className="text-violet-400">const</code> client = <code className="text-violet-400">new</code> TokenBee({"{"} apiKey: <span className="text-emerald-400">'tb_live_key'</span> {"}"});{"\n\n"}
                    <code className="text-violet-400">const</code> response = <code className="text-violet-400">await</code> client.send({"{"}{"\n"}
                    {"  "}model: TokenBeeModel.AnthropicClaude3_5_Sonnet,{"\n"}
                    {"  "}input: {"{"}{"\n"}
                    {"    "}messages: [{"{"} role: <span className="text-emerald-400">'user'</span>, content: <span className="text-emerald-400">'Hello world'</span> {"}"}],{"\n"}
                    {"    "}compression: <span className="text-emerald-400">'auto'</span>,{"\n"}
                    {"    "}rate: CompressionRate.High,{"\n"}
                    {"    "}privacy: <span className="text-emerald-400">true</span> <span className="text-zinc-500">{"// Disable logging"}</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"}"});
                  </pre>
                ) : (
                  <pre className="font-mono text-[13px] sm:text-sm text-zinc-300 overflow-x-auto">
                    <code className="text-violet-400">from</code> tokenbee <code className="text-violet-400">import</code> TokenBee, TokenBeeModel, CompressionRate{"\n\n"}
                    client = TokenBee(api_key=<span className="text-emerald-400">'tb_live_key'</span>){"\n\n"}
                    response = client.send({"("}{"\n"}
                    {"  "}model=TokenBeeModel.ANTHROPIC_CLAUDE_3_5_SONNET,{"\n"}
                    {"  "}input={"{"}{"\n"}
                    {"    "}<span className="text-emerald-400">'messages'</span>: [{"{"}<span className="text-emerald-400">'role'</span>: <span className="text-emerald-400">'user'</span>, <span className="text-emerald-400">'content'</span>: <span className="text-emerald-400">'Hello World'</span>{"}"}],{"\n"}
                    {"    "}<span className="text-emerald-400">'compression'</span>: <span className="text-emerald-400">'auto'</span>,{"\n"}
                    {"    "}<span className="text-emerald-400">'rate'</span>: CompressionRate.HIGH,{"\n"}
                    {"    "}<span className="text-emerald-400">'privacy'</span>: <code className="text-emerald-400">True</code> <span className="text-zinc-500">{"# Disable logging"}</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {")"}
                  </pre>
                )}
              </div>
            </div>
          </section>

          <hr className="my-16 border-zinc-200 dark:border-zinc-800" />

          <section id="compression" className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Controlling AI Settings</h2>
            
            <div className="space-y-8">
              <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">1. Explicit Models</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  The <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">TokenBeeModel</code> Enum abstracts everything. We route strictly on value matches:
                </p>
                <ul className="text-sm text-zinc-500 list-disc pl-5 space-y-2 font-mono">
                  <li>TokenBeeModel.OpenAIGPT4o / .OpenAIO1</li>
                  <li>TokenBeeModel.AnthropicClaude3_5_Sonnet / .AnthropicClaude4_6_Opus</li>
                  <li>TokenBeeModel.Gemini3_1_Pro / .Gemini2Flash</li>
                  <li>TokenBeeModel.MistralLarge</li>
                  <li>TokenBeeModel.PerplexitySonarReasoning</li>
                  <li>TokenBeeModel.GroqLlama3_3_70b</li>
                </ul>
              </div>

              <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">2. Toggle Prompt Compression</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 italic">
                  We use a proprietary semantic compression engine optimized for LLM calls. It detects and removes redundant semantic tokens without degrading output quality.
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  By default, compression applies <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">auto</code> context extraction to save you tokens smoothly. To switch it off for exact inference pipelines, simply pass <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">compression: "off"</code> or <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">"false"</code> in your payload.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">3. Strict Data Privacy</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  TokenBee records request payloads to enable UI session replays and query debugging out of the box. <br/><br/>
                  If you are processing PII or sensitive data, you can pass <code className="text-emerald-500 font-mono">privacy: true</code>. We instantly intercept this boolean at the proxy-level and completely drop the payload from all database traces. Metadata hits remain for tracking spend.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
