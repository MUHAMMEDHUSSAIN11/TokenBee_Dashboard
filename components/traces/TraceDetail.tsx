"use client";

import { useCallback } from "react";
import { type TraceDto } from "@/lib/api";
import { formatCost, formatLatency, formatDate, formatTokens } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Check, ArrowLeft } from "lucide-react";
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

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
        <Badge variant="secondary" className="bg-zinc-800 text-zinc-200">
          {trace.model}
        </Badge>
        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
          {trace.provider}
        </Badge>
        <Separator orientation="vertical" className="h-5 bg-zinc-700" />
        <Badge
          className={
            trace.statusCode >= 200 && trace.statusCode < 300
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-red-500/15 text-red-400"
          }
        >
          {trace.statusCode}
        </Badge>
        <Separator orientation="vertical" className="h-5 bg-zinc-700" />
        <span className="text-sm tabular-nums text-zinc-300">
          {formatLatency(trace.latencyMs)}
        </span>
        <Separator orientation="vertical" className="h-5 bg-zinc-700" />
        <span className="text-sm tabular-nums text-zinc-200">
          {formatCost(trace.costUsd)}
        </span>
        <Separator orientation="vertical" className="h-5 bg-zinc-700" />
        <span className="text-sm text-zinc-400">
          {formatDate(trace.timestamp)}
        </span>
        <Separator orientation="vertical" className="h-5 bg-zinc-700" />
        <span className="text-sm text-zinc-400">
          Tokens: {formatTokens(trace.inputTokens)} in / {formatTokens(trace.outputTokens)} out
        </span>
        {trace.wasCompressed && (
          <>
            <Separator orientation="vertical" className="h-5 bg-zinc-700" />
            <Badge className="bg-emerald-500/15 text-emerald-400">
              Compressed
            </Badge>
          </>
        )}
      </div>

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
        </TabsList>
        <TabsContent value="request" className="mt-4">
          <JsonViewer content={trace.requestBody} label="Request" />
        </TabsContent>
        <TabsContent value="response" className="mt-4">
          <JsonViewer content={trace.responseBody} label="Response" />
        </TabsContent>
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
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(properties).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-2 rounded-md bg-zinc-800/50 px-3 py-2"
              >
                <span className="text-xs font-medium text-zinc-400">
                  {key}:
                </span>
                <span className="text-sm text-zinc-200">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
