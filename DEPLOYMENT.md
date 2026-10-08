# Deploying to Vercel

This repository is pre-configured for one-click deployment to **Vercel** with full Vite Single Page App support and serverless API functions for the AI Care Assistant and Care Navigator.

---

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Vercel will automatically detect the settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables** (Optional but recommended):
   - Add `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API key)*
   *(If omitted, the app will gracefully fall back to verified clinical knowledge base chunks and semantic routing)*.
6. Click **Deploy**.

---

### Option 2: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI if you haven't already
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to preview
vercel

# 4. Deploy to production
vercel --prod
```

When prompted for environment variables:
- Add `GEMINI_API_KEY`: *(Your Gemini API key)*

---

### What's Configured:
- `vercel.json`: Handles SPA client-side routing fallback and preserves `/api/*` endpoints.
- `/api/chat.ts`: Serverless function for RAG chat with clinical triage safety guardrails.
- `/api/navigate.ts`: Serverless function mapping patient statements to medical services.
- `.vercelignore`: Excludes local build artifacts and environment files from deployment.
