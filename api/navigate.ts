import type { IncomingMessage, ServerResponse } from 'http';
import { processNavigateRequest } from '../src/server/ai-services.ts';

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
    const need = body?.need;
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
