# Deploying to Vercel

This repository is pre-configured for seamless deployment to **Vercel** with full Vite Single Page App support and serverless API functions for the AI Care Assistant and Care Navigator.

---

### Why the previous build failed:
The build failed with `ERESOLVE could not resolve: Found: esbuild@0.25.12 ... peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.3.4` because an older version of `esbuild` was explicitly locked in `devDependencies`, clashing with Vite 8's newer peer optional requirements during Vercel's strict `npm install`.

### What has been fixed:
1. **Removed redundant `esbuild` from `package.json`**: Vite 8 and `tsx` manage their own internal esbuild binaries.
2. **Created `.npmrc` with `legacy-peer-deps=true`**: Tells npm to bypass peer dependency resolution locks during automated CI builds.
3. **Added `"installCommand": "npm install --legacy-peer-deps"` in `vercel.json`**: Ensures Vercel uses legacy peer dependency resolution.
4. **Cleaned up `.vercelignore`**: Avoids `.git` file stripping warnings.

---

### How to Deploy

1. Commit and push these changes to GitHub:
   ```bash
   git add .
   git commit -m "fix: resolve esbuild peer dependency conflict for Vercel"
   git push origin main
   ```
2. In the **Vercel Dashboard**, open your project (`hospitals`) and either:
   - Wait for the automatic redeploy triggered by your GitHub push, or
   - Click **Redeploy** on the failed deployment.
3. If you haven't yet, set `GEMINI_API_KEY` under **Project Settings > Environment Variables** on Vercel.
