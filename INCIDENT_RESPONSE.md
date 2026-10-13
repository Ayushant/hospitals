# Incident Response Runbook — Synergy Health 360

Short, operational checklist for a suspected data breach or privacy incident
on the website or AI assistant. Keeps us inside the Arizona Data Breach
Notification Law (A.R.S. § 18-551 et seq.), the FTC Health Breach Notification
Rule (16 CFR Part 318), and HIPAA Breach Notification standards (45 CFR
§§ 164.400–414).

## 0. Severity Decision (first 15 minutes)

| Signal | Severity |
|---|---|
| Logs show PHI leaving the server, or a database/API key leak | **P0 — Confirmed breach** |
| Unusual API traffic, repeated rate-limit hits, suspicious payloads | **P1 — Suspicious** |
| User complaint about missing / wrong info with no data exposure | **P2 — Non-security** |

## 1. Contain (within 1 hour)

- [ ] Rotate `GEMINI_API_KEY` in Vercel → Project Settings → Environment Variables.
- [ ] Rotate any credentials visible in the affected logs (Vercel token, GitHub token, etc.).
- [ ] If abuse-driven: tighten `MAX_REQUESTS_PER_WINDOW` in [src/server/http-guard.ts](src/server/http-guard.ts) and redeploy.
- [ ] If payload-driven: temporarily set a stricter `MAX_INPUT_LENGTH` in [src/lib/hipaa-guard.ts](src/lib/hipaa-guard.ts).
- [ ] Preserve logs: download the Vercel function logs for the affected window before they roll off (default retention is short).

## 2. Investigate (within 24 hours)

- [ ] Determine **what** data left the system. The AI assistant is Zero-PHI by design, so most incidents should surface *attempted* submissions, not actual PHI exposure.
- [ ] Determine **how many individuals** are affected (unique IPs/sessions in logs).
- [ ] Determine the **window** (start/end timestamps).
- [ ] Identify the vector: scrubber bypass, model prompt-injection, dependency vuln, misconfig, credential leak, insider.
- [ ] Open a dated incident file in `incidents/YYYY-MM-DD-slug.md` with evidence links.

## 3. Notify (statutory deadlines)

**Arizona A.R.S. § 18-552** — if more than 1,000 Arizona residents are affected OR the breach includes sensitive personal information:

- [ ] Notify affected individuals within **45 days** of discovery (email + postal where applicable).
- [ ] Notify the **Arizona Attorney General** within **45 days** if more than 1,000 Arizona residents are affected.
- [ ] Notify the **three largest nationwide consumer reporting agencies** when more than 1,000 residents are affected.

**FTC Health Breach Notification Rule** — if the clinic is treated as a vendor of personal-health-record information:

- [ ] Notify affected individuals **without unreasonable delay** and no later than **60 days** after discovery.
- [ ] Notify the **FTC** within **10 business days** if more than 500 individuals are affected; otherwise annually.

**HIPAA Breach Notification (if PHI was actually exposed)** — covered entities only:

- [ ] Notify affected individuals within **60 days**.
- [ ] Notify **HHS Office for Civil Rights (OCR)** — within 60 days if ≥500, annually if <500.
- [ ] Notify **prominent local media** if ≥500 Arizona residents affected.

Clinic point of contact for all regulator correspondence: **Dr. Vinamra Jain, MD** (clinic owner) via `480-553-6168`.

## 4. Communicate

- [ ] Prepare a plain-language notice stating: what happened, what data, when, what we did, what the user should do, how to reach us.
- [ ] Do **not** publish technical post-mortems that reveal exploit mechanics until patched everywhere.

## 5. Remediate & Learn

- [ ] Patch the specific vector; add a regression test under `tests/`.
- [ ] If scrubber missed a PHI pattern, add it to `PHI_PATTERNS` in [src/lib/hipaa-guard.ts](src/lib/hipaa-guard.ts).
- [ ] If the AI returned something it should not have, tighten the system prompt in [src/server/ai-services.ts](src/server/ai-services.ts).
- [ ] Within **7 days** of containment, write a short internal post-mortem (what, timeline, root cause, fix, prevention) and store in `incidents/`.

## Contact Tree

| Role | Person | Reach |
|---|---|---|
| Clinic owner / Privacy Officer | Dr. Vinamra Jain, MD | 480-553-6168 |
| Technical lead | (fill in — Ayushant) | (fill in email) |
| Legal counsel | (fill in — healthcare attorney, AZ-barred) | — |
| Vercel account owner | (fill in) | — |

> This runbook does not replace legal counsel. For any confirmed breach,
> engage a healthcare attorney within 24 hours.
