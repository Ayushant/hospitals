import type { IncomingMessage, ServerResponse } from 'http';
import { processNavigateRequest } from '../src/server/ai-services.ts';
import {
  applyCors,
  getClientIp,
  isRateLimited,
  enforceLength,
} from '../src/server/http-guard.ts';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  method?: string;
}

interface ExtendedResponse extends ServerResponse {
  status: (statusCode: number) => ExtendedResponse;
  json: (data: any) => ExtendedResponse;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please slow down and try again shortly.',
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    const need = enforceLength(body?.need);
    if (!need) {
      return res
        .status(400)
        .json({ error: 'A short description is required (max 500 characters).' });
    }
    const result = await processNavigateRequest(need);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error('Error in Vercel /api/navigate:', error);
    return res.status(200).json({
      serviceId: 'primary-care',
      serviceName: 'Primary & Senior Care',
      reason: 'Our primary care team will evaluate your needs during an unhurried consultation and coordinate with specialists as needed.',
      link: '#services',
    });
  }
}
