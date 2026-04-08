import type { HttpClient, HttpClientOptions } from './http-forwarder.types.js';
import { createClient } from './create-client.js';
import { getRequestId } from './request-context.js';

/**
 * Create client with automatic request-id resolver.
 *
 * This removes the need for users to manually pass `getReqId` in common setups.
 * If request context middleware is not installed, the client still works and
 * falls back to generated IDs per request.
 */
export function createAutoClient(options: HttpClientOptions): HttpClient {
  return createClient({
    ...options,
    getReqId: options.getReqId ?? getRequestId,
  });
}
