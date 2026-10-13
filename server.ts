import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { processChatRequest, processNavigateRequest } from './src/server/ai-services.ts';
import {
  applyCors,
  getClientIp,
  isRateLimited,
  enforceLength,
} from './src/server/http-guard.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Hard cap on JSON body size to prevent oversized payload abuse.
app.use(express.json({ limit: '16kb' }));

// Share one CORS + rate-limit guard across every /api route.
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  if (applyCors(req as any, res as any)) return;
  const ip = getClientIp(req as any);
  if (isRateLimited(ip)) {
    res.status(429).json({
      error: 'Too many requests. Please slow down and try again shortly.',
    });
    return;
  }
  next();
});

const PORT = process.env.PORT || 3000;

// -------------------------------------------------------------
// 1. RAG CHAT ASSISTANT ENDPOINT (/api/chat)
// -------------------------------------------------------------
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const question = enforceLength(req.body?.question);
    if (!question) {
      res.status(400).json({ error: 'A short question is required (max 500 characters).' });
      return;
    }
    const result = await processChatRequest(question);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.json({
      text: 'Synergy Health 360 is here to assist you with primary care, wound care, weight loss, and InstaCare membership. For immediate assistance or to schedule an appointment, please call 480-553-6168 or visit https://20314.portal.athenahealth.com/.',
      sources: ['Synergy Clinic Directory'],
      isEmergency: false,
    });
  }
});

// -------------------------------------------------------------
// 2. AI CARE NAVIGATOR ENDPOINT (/api/navigate)
// -------------------------------------------------------------
app.post('/api/navigate', async (req: Request, res: Response): Promise<void> => {
  try {
    const need = enforceLength(req.body?.need);
    if (!need) {
      res.status(400).json({ error: 'A short description is required (max 500 characters).' });
      return;
    }
    const result = await processNavigateRequest(need);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error('Error in /api/navigate:', err);
    res.json({
      serviceId: 'primary-care',
      serviceName: 'Primary & Senior Care',
      reason: 'Our primary care team will evaluate your needs during an unhurried consultation and coordinate with specialists as needed.',
      link: '#services',
    });
  }
});

// -------------------------------------------------------------
// 3. SERVER SETUP (VITE SPA IN DEV, STATIC IN PROD)
// -------------------------------------------------------------
async function startServer() {
  const server = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
