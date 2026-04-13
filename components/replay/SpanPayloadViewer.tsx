"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSpanPayload } from "@/lib/api";
import type { SpanDto, SpanPayloadDto } from "@/lib/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Check } from "lucide-react";
import MessageBubble from "./MessageBubble";

interface SpanPayloadViewerProps {
  span: SpanDto;
}

export default function SpanPayloadViewer({ span }: SpanPayloadViewerProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("request");

  const { data, isLoading } = useQuery<SpanPayloadDto>({
    queryKey: ["span", "payload", span.id],
    queryFn: () => getSpanPayload(span.id),
    staleTime: Infinity,
  });

  const handleCopy = async () => {
    if (!data) return;
    const text =
      activeTab === "request"
        ? data.raw?.input ?? ""
        : data.raw?.output ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 text-sm text-zinc-500">No payload data available</div>
    );
  }

  const inputParsed =
    data.input && typeof data.input === "object" && "messages" in data.input
      ? data.input
      : null;

  const outputParsed =
    data.output && typeof data.output === "object" && "content" in data.output
      ? data.output
      : null;

  return (
    <div className="border-t border-zinc-800 bg-zinc-900/50">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as string)}>
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <TabsList variant="line" className="h-8">
            <TabsTrigger value="request" className="text-xs">
              Request
            </TabsTrigger>
            <TabsTrigger value="response" className="text-xs">
              Response
            </TabsTrigger>
          </TabsList>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Request tab */}
        <TabsContent value="request" className="p-4">
          {inputParsed ? (
            <div className="space-y-3">
              <div className="space-y-2">
                {inputParsed.messages.map((msg, i) => (
                  <MessageBubble key={i} role={msg.role} content={msg.content} />
                ))}
              </div>
              {inputParsed.model && (
                <div className="mt-3 text-xs text-zinc-500">
                  Model: <span className="text-zinc-300">{inputParsed.model}</span>
                </div>
              )}
              {Object.keys(span.metadata).length > 0 && (
                <div className="mt-2 rounded-md bg-zinc-800/50 p-2 text-xs text-zinc-400">
                  <div className="mb-1 font-medium text-zinc-300">Metadata</div>
                  {Object.entries(span.metadata).map(([k, v]) => (
                    <div key={k}>
                      {k}: <span className="text-zinc-200">{String(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-mono rounded-md bg-zinc-800/50 p-3 text-xs text-zinc-300">
              {typeof data.input === "string"
                ? data.input
                : data.raw?.input ?? "No input data"}
            </pre>
          )}
        </TabsContent>

        {/* Response tab */}
        <TabsContent value="response" className="p-4">
          {outputParsed ? (
            <div className="space-y-3">
              <div className="relative overflow-hidden whitespace-pre-wrap font-mono rounded-xl border border-violet-500/30 bg-violet-500/5 p-4 text-sm leading-relaxed text-zinc-200 shadow-[inset_0_0_20px_rgba(139,92,246,0.05)]">
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full bg-violet-600/10 blur-3xl" />
                {outputParsed.content}
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                {outputParsed.model && (
                  <span>
                    Model: <span className="text-zinc-300">{outputParsed.model}</span>
                  </span>
                )}
                {outputParsed.usage && (
                  <>
                    <span>
                      Prompt tokens:{" "}
                      <span className="text-zinc-300">
                        {outputParsed.usage.prompt_tokens}
                      </span>
                    </span>
                    <span>
                      Completion tokens:{" "}
                      <span className="text-zinc-300">
                        {outputParsed.usage.completion_tokens}
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-mono rounded-md bg-zinc-800/50 p-3 text-xs text-zinc-300">
              {typeof data.output === "string"
                ? data.output
                : data.raw?.output ?? "No output data"}
            </pre>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
