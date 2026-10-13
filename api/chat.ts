import type { IncomingMessage, ServerResponse } from 'http';
import { processChatRequest } from '../src/server/ai-services.ts';
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
  // CORS lockdown — only approved origins may call this endpoint from a browser.
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Per-IP rate limiting (defense in depth; see http-guard.ts).
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
    const question = enforceLength(body?.question);
    if (!question) {
      return res
        .status(400)
        .json({ error: 'A short question is required (max 500 characters).' });
    }
    const result = await processChatRequest(question);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error('Error in Vercel /api/chat:', error);
    return res.status(200).json({
      text: 'Synergy Health 360 is here to assist you with primary care, wound care, weight loss, and InstaCare membership. For immediate assistance or to schedule an appointment, please call 480-553-6168 or visit https://20314.portal.athenahealth.com/.',
      sources: ['Synergy Clinic Directory'],
      isEmergency: false,
    });
  }
}
