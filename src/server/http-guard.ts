/**
 * Shared HTTP safety guards for all /api endpoints.
 *
 * - CORS lockdown: refuses browser calls from any origin that is not an
 *   approved production domain or an explicit localhost dev origin.
 * - In-memory per-IP rate limiter: slows automated abuse of the Gemini API
 *   on a single Vercel lambda instance. (For a horizontally scaled fleet,
 *   swap the Map for Upstash Redis — see DEPLOYMENT.md.)
 * - Input length cap: a second line of defense in addition to scrubPhi().
 */

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

export function resolveAllowedOrigins(): string[] {
  const extra = [
    process.env.APP_URL,
    process.env.ALLOWED_ORIGIN,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter((v): v is string => !!v && typeof v === 'string');
  return [...DEFAULT_ALLOWED_ORIGINS, ...extra];
}

/**
 * Sets CORS headers only when the incoming Origin is on the allowlist.
 * Returns `true` when the request is a preflight that has been handled.
 */
export function applyCors(req: any, res: any): boolean {
  const origin = typeof req?.headers?.origin === 'string' ? req.headers.origin : '';
  const allowed = resolveAllowedOrigins();
  if (origin && allowed.includes(origin)) {
    res.setHeader?.('Access-Control-Allow-Origin', origin);
    res.setHeader?.('Vary', 'Origin');
    res.setHeader?.('Access-Control-Allow-Credentials', 'true');
    res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader?.(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept'
    );
  }
  if (req?.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end?.();
    return true;
  }
  return false;
}

// ---------------------------------------------------------------
// In-memory sliding-window rate limiter
// Per-lambda instance; sufficient to deter casual scraping.
// ---------------------------------------------------------------
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;
const requestLog = new Map<string, number[]>();

export function getClientIp(req: any): string {
  const fwd = req?.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  if (Array.isArray(fwd) && fwd.length > 0) {
    return String(fwd[0]).split(',')[0].trim();
  }
  return (
    (req?.socket && req.socket.remoteAddress) ||
    (req?.connection && req.connection.remoteAddress) ||
    'unknown'
  );
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const previous = requestLog.get(ip) ?? [];
  const recent = previous.filter((t) => t > windowStart);
  recent.push(now);
  requestLog.set(ip, recent);

  // Opportunistic sweep so the map does not grow unbounded
  if (requestLog.size > 2000) {
    for (const [key, times] of requestLog) {
      const trimmed = times.filter((t) => t > windowStart);
      if (trimmed.length === 0) {
        requestLog.delete(key);
      } else {
        requestLog.set(key, trimmed);
      }
    }
  }

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export const MAX_QUESTION_LENGTH = 500;

export function enforceLength(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, MAX_QUESTION_LENGTH);
}
