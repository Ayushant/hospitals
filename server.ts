import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { processChatRequest, processNavigateRequest } from './src/server/ai-services.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// -------------------------------------------------------------
// 1. RAG CHAT ASSISTANT ENDPOINT (/api/chat)
// -------------------------------------------------------------
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { question } = req.body;
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
    const { need } = req.body;
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
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
