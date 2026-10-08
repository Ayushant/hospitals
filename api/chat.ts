import type { IncomingMessage, ServerResponse } from 'http';
import { processChatRequest } from '../src/server/ai-services.ts';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  method?: string;
}

interface ExtendedResponse extends ServerResponse {
  status: (statusCode: number) => ExtendedResponse;
  json: (data: any) => ExtendedResponse;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // Enable CORS if accessed directly
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
    const question = body?.question;
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
