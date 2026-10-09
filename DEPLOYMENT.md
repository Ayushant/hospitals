# Deploying to Vercel

This repository is pre-configured for seamless deployment to **Vercel** with full Vite Single Page App support, verified clinic photography, and serverless API functions for the AI Care Assistant and Care Navigator.

---

### Why images were previously not visible on Vercel:
1. **Unbundled `/src/assets/images/...` path strings**: In Vite development, referencing `/src/assets/images/...` as a raw string works because the local dev server intercepts `/src/`. But when building for production (`vite build`), Vite emits only to `dist/`, and there is no `/src` folder in `dist/`. On Vercel, requests to `/src/assets/images/...` returned 404 or got rewritten to `index.html`.
2. **SPA catch-all rewrite rule**: The previous rewrite rule `/:path* -> /index.html` could intercept static assets if not exempted.

### How it is fixed:
1. **Placed all verified photography in `public/images/`**: Vite automatically copies `public/images/` into `dist/images/` during `npm run build`.
2. **Updated all component image paths to `/images/...`**: Consistent across local dev, Express production, and Vercel CDN.
3. **Protected static assets in `vercel.json`**:
   ```json
   {
     "source": "/((?!images/|assets/|.*\\..*).*)",
     "destination": "/index.html"
   }
   ```
   This guarantees Vercel never intercepts requests for images, fonts, or stylesheets.
4. **Added authentic imagery and analysis from synergyhealth360.com**:
   - Official Synergy Health 360 header & footer logos
   - Authentic physician-patient consultation photography
   - Authentic portrait and credentials of Dr. Vinamra Jain, MD (Board-Certified ABFM, University of Arizona Integrative Medicine Fellow under Dr. Andrew Weil)
   - Scottsdale clinic outpatient pavilion photography
   - Real clinical photography for Wound Care, Medical Weight Loss, Mental Wellness, Integrative Wellness, Acute Care, and Women's Health
   - Medical association accreditation badges (AAFP, ACP, Arizona Medical Association, SWTRC)

---

### How to Deploy to Vercel

1. Commit and push the changes:
   ```bash
   git add .
   git commit -m "feat: add verified clinic imagery and fix static asset paths for Vercel"
   git push origin main
   ```
2. In the **Vercel Dashboard**, open your project (`hospitals`) and either wait for the automatic deployment or click **Redeploy**.
3. Verify your environment variable:
   - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API key)* under **Project Settings > Environment Variables**.
