const BASE = ""; // Rewrites in next.config.ts handle the proxying to port 5137

// ─── DTOs ───────────────────────────────────────────────────────

export interface SummaryDto {
  totalRequests: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalOriginalTokens: number;
  totalCostUsd: number;
  totalSavedUsd: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  errorRequests: number;
  compressedRequests: number;
}

export interface DailyDto {
  date: string;
  requests: number;
  costUsd: number;
  inputTokens: number;
  outputTokens: number;
  errors: number;
}

export interface ModelDto {
  model: string;
  provider: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  avgLatencyMs: number;
}

export interface UserDto {
  userId: string | null;
  requests: number;
  totalTokens: number;
  costUsd: number;
  lastSeen: string;
}

export interface ApiKeyDto {
  id: string;
  prefix: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  lastUsedAt: string | null;
}

export interface SubscriptionStatus {
  userId: string;
  status: 'free' | 'paid' | 'past_due' | 'beta_premium';
  tokensThisMonth: number;
  freeTokensUsed: number;
  isOverFreeLimit: boolean;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
}

export interface TraceDto {
  id: string;
  timestamp: string;
  model: string;
  provider: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  originalTokens: number;
  costUsd: number;
  latencyMs: number;
  statusCode: number;
  userId: string | null;
  accountId: string | null;
  sessionId: string | null;
  wasCompressed: boolean;
  requestBody: string | null;
  originalRequestBody: string | null;
  responseBody: string | null;
  propertiesJson: string | null;
  errorMessage: string | null;
}

export interface ChatCompletionRequest {
  model: string;
  messages: { role: string; content: string }[];
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ─── Helpers ────────────────────────────────────────────────────

function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== "" && v !== false
  );
  if (entries.length === 0) return "";
  return "?" + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&");
}

async function fetcher<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${res.statusText || body}`);
  }
  return res.json() as Promise<T>;
}

// ─── API Functions ──────────────────────────────────────────────

export function getSummary(params: {
  days?: number;
  accountId?: string;
  userId?: string;
  property?: string;
  propertyValue?: string;
}): Promise<SummaryDto> {
  const query = buildQuery(params);
  return fetcher<SummaryDto>(`/api/dashboard/summary${query}`);
}

export function getDaily(params: {
  days?: number;
  accountId?: string;
  userId?: string;
}): Promise<DailyDto[]> {
  const query = buildQuery(params);
  return fetcher<DailyDto[]>(`/api/dashboard/daily${query}`);
}

export function getByModel(params: {
  days?: number;
  accountId?: string;
  userId?: string;
}): Promise<ModelDto[]> {
  const query = buildQuery(params);
  return fetcher<ModelDto[]>(`/api/dashboard/by-model${query}`);
}

export function getByUser(params: {
  days?: number;
  limit?: number;
  accountId?: string;
}): Promise<UserDto[]> {
  const query = buildQuery(params);
  return fetcher<UserDto[]>(`/api/dashboard/by-user${query}`);
}

export function getTraces(params: {
  limit?: number;
  offset?: number;
  accountId?: string;
  userId?: string;
  model?: string;
  onlyErrors?: boolean;
  onlyCompressed?: boolean;
}): Promise<TraceDto[]> {
  const query = buildQuery(params);
  return fetcher<TraceDto[]>(`/api/dashboard/traces${query}`);
}

export function getTrace(id: string): Promise<TraceDto> {
  return fetcher<TraceDto>(`/api/dashboard/traces/${encodeURIComponent(id)}`);
}

// ─── Settings API Functions ────────────────────────────────────

export function getApiKeys(userId: string): Promise<ApiKeyDto[]> {
  return fetcher<ApiKeyDto[]>(`/api/auth/keys/${encodeURIComponent(userId)}`);
}

export function createApiKey(userId: string, name: string): Promise<{ id: string; key: string; prefix: string }> {
  return fetcher<{ id: string; key: string; prefix: string }>('/api/auth/keys', {
    method: 'POST',
    body: JSON.stringify({ userId, name }),
  });
}

export function revokeApiKey(keyId: string, userId: string): Promise<void> {
  return fetcher<void>(`/api/auth/keys/${encodeURIComponent(keyId)}?userId=${encodeURIComponent(userId)}`, {
    method: 'DELETE',
  });
}

export function getSubscription(userId: string): Promise<SubscriptionStatus> {
  return fetcher<SubscriptionStatus>(`/api/auth/subscription/${encodeURIComponent(userId)}`);
}

export function createCheckoutSession(userId: string, email: string, returnUrl: string): Promise<{ url: string }> {
  return fetcher<{ url: string }>('/api/auth/subscription/checkout', {
    method: 'POST',
    body: JSON.stringify({ userId, email, returnUrl }),
  });
}

export function openBillingPortal(userId: string, returnUrl: string): Promise<{ url: string }> {
  return fetcher<{ url: string }>('/api/auth/subscription/portal', {
    method: 'POST',
    body: JSON.stringify({ userId, returnUrl }),
  });
}

// ─── Proxy Functions ──────────────────────────────────────────

export function chatCompletion(
  body: ChatCompletionRequest,
  metadata: {
    key: string;
    userId: string;
    feature?: string;
    env?: string;
  }
): Promise<ChatCompletionResponse> {
  return fetcher<ChatCompletionResponse>("/v1/chat/completions", {
    method: "POST",
    headers: {
      "X-LLM-Key": metadata.key,
      "X-TB-User-Id": metadata.userId,
      "X-TB-Property-Feature": metadata.feature || "chat",
      "X-TB-Property-Environment": metadata.env || "production",
    },
    body: JSON.stringify(body),
  });
}

// ─── Replay DTOs ────────────────────────────────────────────────

export interface SessionSummaryDto {
  id: string;
  name: string | null;
  agentType: string | null;
  startedAt: string;
  endedAt: string | null;
  spanCount: number;
  totalTokens: number;
  durationMs: number;
  lastActivity: string | null;
}

export interface SpanDto {
  id: string;
  step: number;
  type: "LlmCall" | "ToolCall" | "Decision" | "Custom";
  timestamp: string;
  offsetMs: number;
  durationMs: number;
  tokens: number;
  hasInput: boolean;
  hasOutput: boolean;
  parentSpanId: string | null;
  metadata: Record<string, unknown>;
}

export interface SessionDetailDto {
  id: string;
  name: string | null;
  agentType: string | null;
  startedAt: string;
  endedAt: string | null;
  durationMs: number;
  totalTokens: number;
  spanCount: number;
  spans: SpanDto[];
}

export interface TimelineSpanDto {
  id: string;
  step: number;
  type: string;
  offsetMs: number;
  durationMs: number;
  widthPct: number;
  offsetPct: number;
}

export interface TimelineDto {
  sessionDurationMs: number;
  spans: TimelineSpanDto[];
}

export interface SpanPayloadDto {
  input: {
    messages: { role: string; content: string }[];
    model: string;
  } | string | null;
  output: {
    content: string;
    model: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      [key: string]: unknown;
    };
  } | string | null;
  raw: {
    input: string | null;
    output: string | null;
  };
}

// ─── Replay API Functions ───────────────────────────────────────

export function getSessions(params: {
  limit?: number;
  offset?: number;
}): Promise<SessionSummaryDto[]> {
  const query = buildQuery(params);
  return fetcher<SessionSummaryDto[]>(`/api/replay/sessions${query}`);
}

export function getSession(id: string): Promise<SessionDetailDto> {
  return fetcher<SessionDetailDto>(`/api/replay/sessions/${encodeURIComponent(id)}`);
}

export function getSessionTimeline(id: string): Promise<TimelineDto> {
  return fetcher<TimelineDto>(`/api/replay/sessions/${encodeURIComponent(id)}/timeline`);
}

export function getSpanPayload(spanId: string): Promise<SpanPayloadDto> {
  return fetcher<SpanPayloadDto>(`/api/replay/spans/${encodeURIComponent(spanId)}/payload`);
}

export function searchSessions(q: string, limit?: number): Promise<SessionSummaryDto[]> {
  const query = buildQuery({ q, limit });
  return fetcher<SessionSummaryDto[]>(`/api/replay/sessions/search${query}`);
}

export function createSession(body: {
  sessionId: string;
  name?: string;
  agentType?: string;
}): Promise<{ sessionId: string }> {
  return fetcher<{ sessionId: string }>("/api/replay/sessions", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function recordSpan(body: {
  sessionId: string;
  type: string;
  durationMs: number;
  input?: string;
  output?: string;
  tokens?: number;
  parentSpanId?: string;
  metadata?: Record<string, unknown>;
}): Promise<{ spanId: string }> {
  return fetcher<{ spanId: string }>("/api/replay/spans", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function endSession(id: string): Promise<{ ended: boolean }> {
  return fetcher<{ ended: boolean }>(`/api/replay/sessions/${encodeURIComponent(id)}/end`, {
    method: "PATCH",
  });
}
