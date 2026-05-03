"use client";

import { useCallback } from "react";
import { type TraceDto } from "@/lib/api";
import { formatCost, formatLatency, formatDate, formatTokens } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Check, ArrowLeft, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TraceDetailProps {
  trace: TraceDto;
}

function JsonViewer({ content, label }: { content: string | null; label: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }, [content]);

  if (!content) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
        <p className="text-sm text-zinc-500">No {label.toLowerCase()} body available</p>
      </div>
    );
  }

  let formatted: string;
  try {
    formatted = JSON.stringify(JSON.parse(content), null, 2);
  } catch {
    formatted = content;
  }

  return (
    <div className="relative rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="absolute right-3 top-3 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 gap-1.5 text-xs text-zinc-400 hover:text-zinc-200"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      <ScrollArea className="h-[600px]">
        <pre className="p-4 font-mono text-sm leading-relaxed text-zinc-300">
          <code>{formatted}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}

export default function TraceDetail({ trace }: TraceDetailProps) {
  const router = useRouter();

  // Parse properties
  let properties: Record<string, string> = {};
  if (trace.propertiesJson) {
    try {
      properties = JSON.parse(trace.propertiesJson);
    } catch {
      // ignore parse errors
    }
  }

  const hasProperties = Object.keys(properties).length > 0;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/traces")}
        className="text-zinc-400 hover:text-zinc-200"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to Traces
      </Button>

      {/* Metadata & Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-200">
            {trace.model}
          </Badge>
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
            {trace.provider}
          </Badge>
          <Separator orientation="vertical" className="hidden h-5 bg-zinc-700 sm:block" />
          <Badge
            className={
              trace.statusCode >= 200 && trace.statusCode < 300
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            }
          >
            {trace.statusCode}
          </Badge>
          <Separator orientation="vertical" className="hidden h-5 bg-zinc-700 sm:block" />
          <span className="text-sm tabular-nums text-zinc-300">
            {formatLatency(trace.latencyMs)}
          </span>
          <Separator orientation="vertical" className="hidden h-5 bg-zinc-700 sm:block" />
          <span className="text-sm tabular-nums text-zinc-200 font-medium">
            {formatCost(trace.costUsd)}
          </span>
          <Separator orientation="vertical" className="hidden h-5 bg-zinc-700 sm:block" />
          <span className="text-sm text-zinc-500">
            {formatDate(trace.timestamp)}
          </span>
        </div>

        {trace.sessionId && (
          <Button
            size="sm"
            onClick={() => router.push(`/replay/${trace.sessionId}`)}
            className="bg-violet-600 text-white hover:bg-violet-500"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 rotate-180" />
            View Session Replay
          </Button>
        )}
      </div>

      {/* Compression Breakdown Card */}
      {trace.wasCompressed && (
        <div className="overflow-hidden rounded-xl border border-violet-500/20 bg-violet-500/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-violet-400">
              <Zap className="h-4 w-4" />
              Semantic Compression Breakdown
            </h4>
            <Badge className="bg-violet-500 text-white">
              {Math.round(((trace.originalTokens - trace.inputTokens) / trace.originalTokens) * 100)}% Savings
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Original Input</p>
              <p className="text-xl font-mono font-bold text-zinc-400">{formatTokens(trace.originalTokens)}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <ArrowLeft className="h-5 w-5 text-zinc-700 rotate-180" />
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Compressed Input</p>
              <p className="text-xl font-mono font-bold text-emerald-400">{formatTokens(trace.inputTokens)}</p>
            </div>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${(trace.inputTokens / trace.originalTokens) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Request / Response Tabs */}
      <Tabs defaultValue="request" className="w-full">
        <TabsList className="border-zinc-700 bg-zinc-900">
          <TabsTrigger
            value="request"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
          >
            Request
          </TabsTrigger>
          <TabsTrigger
            value="response"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
          >
            Response
          </TabsTrigger>
          {trace.wasCompressed && trace.originalRequestBody && (
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Comparison
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="request" className="mt-4">
          <JsonViewer content={trace.requestBody} label="Request" />
        </TabsContent>
        <TabsContent value="response" className="mt-4">
          <JsonViewer content={trace.responseBody} label="Response" />
        </TabsContent>
        {trace.wasCompressed && trace.originalRequestBody && (
          <TabsContent value="comparison" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Original Request</p>
                <JsonViewer content={trace.originalRequestBody} label="Original" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400">Compressed Request</p>
                  <Badge variant="outline" className="h-4 text-[9px] border-violet-500/30 text-violet-400">
                    {Math.round(((trace.originalTokens - trace.inputTokens) / trace.originalTokens) * 100)}% smaller
                  </Badge>
                </div>
                <JsonViewer content={trace.requestBody} label="Compressed" />
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Error Message */}
      {trace.errorMessage && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-red-400">
            Error
          </p>
          <p className="font-mono text-sm text-red-300">{trace.errorMessage}</p>
        </div>
      )}

      {/* Properties */}
      {hasProperties && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Properties
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(properties).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  {key}
                </span>
                <span className="truncate text-sm text-zinc-200" title={value}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
