// Factory
export { createClient } from './http/create-client.js';
export { createAutoClient } from './http/create-auto-client.js';

// Types
export type {
  HttpClient,
  HttpClientOptions,
  ReqInput,
  RetryPolicy,
  HttpClientHooks,
  HookPayload,
  HttpClientLogger,
} from './http/http-forwarder.types.js';

// Correlation helpers (for NestJS integration)
export { CORRELATION_HEADER, resolveRequestId } from './http/correlation.js';
export {
  getRequestId,
  runWithRequestContext,
  requestContextMiddleware,
} from './http/request-context.js';

// Retry policy (for extending defaults)
export { DEFAULT_RETRY_POLICY } from './http/retry-policy.js';
