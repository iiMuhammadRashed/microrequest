import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

/**
 * Store shape used by built-in request context helpers.
 */
export interface RequestContextStore {
  requestId: string;
}

const requestContextStorage = new AsyncLocalStorage<RequestContextStore>();

/**
 * Get request ID from built-in AsyncLocalStorage context.
 */
export function getRequestId(): string | undefined {
  return requestContextStorage.getStore()?.requestId;
}

/**
 * Run a function within a request context.
 *
 * Useful for non-Express runtimes where middleware is not used.
 */
export function runWithRequestContext<T>(
  fn: () => T,
  requestId?: string
): T {
  const resolvedRequestId =
    typeof requestId === 'string' && requestId.trim().length > 0
      ? requestId
      : randomUUID();

  return requestContextStorage.run({ requestId: resolvedRequestId }, fn);
}

/**
 * Minimal middleware signature compatible with Express-style `app.use`.
 */
export type RequestContextMiddlewareFn = (
  req: { headers?: Record<string, unknown> },
  res: unknown,
  next: () => void
) => void;

/**
 * Built-in request context middleware.
 *
 * Reads `x-request-id` from incoming headers, falls back to a generated UUID,
 * then stores it in AsyncLocalStorage for `createAutoClient`.
 */
export const requestContextMiddleware: RequestContextMiddlewareFn = (
  req,
  _res,
  next
) => {
  const incoming = req?.headers?.['x-request-id'];

  const requestId =
    typeof incoming === 'string' && incoming.trim().length > 0
      ? incoming
      : randomUUID();

  requestContextStorage.run({ requestId }, next);
};
