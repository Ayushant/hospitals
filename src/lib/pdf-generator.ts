/**
 * Branded PDF Generator for Synergy Health 360 AI Patient Toolkit
 *
 * Every PDF emitted through this module carries the clinic logo header, an
 * "Automated AI Tool — NOT medical advice" banner, page numbers, and a full
 * US-law compliance footer so each document is self-attesting:
 *   - HIPAA Privacy & Security Rules (45 CFR §§ 160, 164) — Zero-PHI
 *   - HHS Section 1557 of the ACA (45 CFR Part 92) — Nondiscrimination
 *   - FTC Act §5 and Health Breach Notification Rule (16 CFR Part 318)
 *   - California AB 3030, Texas TRAIGA (HB 2060), Utah AI Policy Act
 *   - Arizona A.R.S. § 18-551 breach / data protection standards
 *   - Americans with Disabilities Act Title III & WCAG 2.1 AA
 *
 * All content is composed in-memory in the user's browser. No request leaves
 * the device; nothing is logged, persisted, or transmitted to Synergy or any
 * third party as part of PDF composition.
 */

import { jsPDF } from 'jspdf';

export interface ToolkitSection {
  heading: string;
  bullets?: string[];
  paragraphs?: string[];
}

export interface ToolkitPdfInput {
  toolName: string;
  subtitle: string;
  intro: string;
  sections: ToolkitSection[];
  generatedForLabel?: string;
}

const PRIMARY_HEX = '#245C50';
const PRIMARY_DARK_HEX = '#1C493F';
const INK_HEX = '#24332F';
const MUTED_HEX = '#66716C';
const ACCENT_HEX = '#C47B60';
const SURFACE_HEX = '#F3F3EF';
const RULE_HEX = '#D9DED8';

const PAGE_MARGIN_X = 54;
const PAGE_TOP = 54;
const PAGE_BOTTOM = 54;

const LOGO_URL = '/images/synergy_logo.png';

let cachedLogo: string | null = null;

async function loadLogoDataUrl(): Promise<string | null> {
  if (cachedLogo) return cachedLogo;
  try {
    const res = await fetch(LOGO_URL);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = typeof reader.result === 'string' ? reader.result : null;
        if (result) cachedLogo = result;
        resolve(result);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function wrap(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

function drawHeader(doc: jsPDF, toolName: string, subtitle: string, logo: string | null) {
  const pageW = doc.internal.pageSize.getWidth();

  // Header separator rule
  doc.setDrawColor(RULE_HEX);
  doc.setLineWidth(0.5);
  doc.line(PAGE_MARGIN_X, PAGE_TOP + 36, pageW - PAGE_MARGIN_X, PAGE_TOP + 36);

  // Logo (left) — fall back to typographic wordmark when fetch fails
  if (logo) {
    try {
      doc.addImage(logo, 'PNG', PAGE_MARGIN_X, PAGE_TOP - 8, 44, 44, undefined, 'FAST');
    } catch {
      // graceful: silent
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(INK_HEX);
  doc.text('Synergy Health 360', PAGE_MARGIN_X + 54, PAGE_TOP + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(MUTED_HEX);
  doc.text(
    'Scottsdale, Arizona  ·  480-553-6168  ·  synergyhealth360.com',
    PAGE_MARGIN_X + 54,
    PAGE_TOP + 19
  );

  // Right-aligned tool badge
  doc.setFontSize(7.5);
  doc.setTextColor(PRIMARY_HEX);
  const badge = toolName.toUpperCase();
  const badgeW = doc.getTextWidth(badge);
  doc.text(badge, pageW - PAGE_MARGIN_X - badgeW, PAGE_TOP + 6);

  doc.setFontSize(8);
  doc.setTextColor(MUTED_HEX);
  const subtitleW = doc.getTextWidth(subtitle);
  doc.text(subtitle, pageW - PAGE_MARGIN_X - subtitleW, PAGE_TOP + 19);
}

function drawAiBanner(doc: jsPDF, y: number): number {
  const pageW = doc.internal.pageSize.getWidth();
  const width = pageW - PAGE_MARGIN_X * 2;
  const padX = 10;
  const padY = 10;

  doc.setFillColor(ACCENT_HEX);
  doc.setDrawColor(ACCENT_HEX);
  // Translucent-effect: use alpha simulation via lighter fill
  // jsPDF has no alpha for shapes without GState; use rounded rect with light fill.
  doc.setFillColor(249, 231, 221); // soft terracotta
  doc.setDrawColor(196, 123, 96);
  doc.setLineWidth(0.6);
  doc.roundedRect(PAGE_MARGIN_X, y, width, 44, 6, 6, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(ACCENT_HEX);
  doc.text('AUTOMATED AI TOOL — NOT MEDICAL ADVICE', PAGE_MARGIN_X + padX, y + padY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(INK_HEX);
  const msg =
    'You are reading output from an artificial intelligence system. This document is a non-binding administrative aid. It is NOT a diagnosis, prescription, or substitute for licensed clinical judgment. For emergencies call 911. For a mental-health crisis call or text 988. All medical decisions remain with Dr. Vinamra Jain, MD and the licensed Synergy Health 360 care team.';
  const lines = wrap(doc, msg, width - padX * 2);
  doc.text(lines, PAGE_MARGIN_X + padX, y + padY + 15);

  return y + 44 + 14;
}

function drawFooter(doc: jsPDF, pageIndex: number, totalPages: number) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const footerTop = pageH - PAGE_BOTTOM + 6;

  doc.setDrawColor(RULE_HEX);
  doc.setLineWidth(0.5);
  doc.line(PAGE_MARGIN_X, footerTop, pageW - PAGE_MARGIN_X, footerTop);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(MUTED_HEX);

  const complianceLine1 =
    'HIPAA Zero-PHI (45 CFR §§ 160, 164)  ·  HHS Section 1557 (45 CFR Part 92)  ·  FTC Act §5 (15 U.S.C. §45)  ·  FTC Health Breach Notification (16 CFR Part 318)';
  const complianceLine2 =
    'California AB 3030 & B&P §17940  ·  Texas TRAIGA HB 2060  ·  Utah AI Policy Act (UCPA)  ·  Arizona A.R.S. §18-551  ·  ADA Title III & WCAG 2.1 AA';

  doc.text(complianceLine1, PAGE_MARGIN_X, footerTop + 10);
  doc.text(complianceLine2, PAGE_MARGIN_X, footerTop + 20);

  // Page X of Y, right-aligned
  const pageLabel = `Page ${pageIndex} of ${totalPages}`;
  const labelW = doc.getTextWidth(pageLabel);
  doc.text(pageLabel, pageW - PAGE_MARGIN_X - labelW, footerTop + 30);

  // Non-discrimination tagline (left)
  doc.setTextColor(PRIMARY_HEX);
  doc.text(
    'Services available without discrimination (race, color, national origin, sex, age, disability).',
    PAGE_MARGIN_X,
    footerTop + 30
  );
}

function ensureSpace(
  doc: jsPDF,
  y: number,
  needed: number,
  onBreak: () => void
): number {
  const pageH = doc.internal.pageSize.getHeight();
  const limit = pageH - PAGE_BOTTOM - 20;
  if (y + needed > limit) {
    doc.addPage();
    onBreak();
    return PAGE_TOP + 56;
  }
  return y;
}

export async function generateToolkitPdf(input: ToolkitPdfInput): Promise<void> {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const contentWidth = pageW - PAGE_MARGIN_X * 2;

  const logo = await loadLogoDataUrl();

  const paintChrome = () => {
    drawHeader(doc, input.toolName, input.subtitle, logo);
  };

  paintChrome();
  let y = PAGE_TOP + 56;

  // Mandatory AI identification banner (CA AB 3030, TX TRAIGA, UT AI Policy Act)
  y = drawAiBanner(doc, y);

  // Document title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(INK_HEX);
  doc.text(input.toolName, PAGE_MARGIN_X, y);
  y += 22;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(PRIMARY_HEX);
  doc.text(input.subtitle, PAGE_MARGIN_X, y);
  y += 16;

  if (input.generatedForLabel) {
    doc.setFontSize(9);
    doc.setTextColor(MUTED_HEX);
    doc.text(input.generatedForLabel, PAGE_MARGIN_X, y);
    y += 14;
  }

  // Generated-at line (local time, no PHI)
  doc.setFontSize(9);
  doc.setTextColor(MUTED_HEX);
  const now = new Date();
  const generatedAt = `Generated ${now.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })} · Local device · No PHI stored or transmitted`;
  doc.text(generatedAt, PAGE_MARGIN_X, y);
  y += 20;

  // Intro paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(INK_HEX);
  const introLines = wrap(doc, input.intro, contentWidth);
  y = ensureSpace(doc, y, introLines.length * 14 + 10, paintChrome);
  doc.text(introLines, PAGE_MARGIN_X, y);
  y += introLines.length * 14 + 10;

  // Rule under intro
  doc.setDrawColor(RULE_HEX);
  doc.setLineWidth(0.5);
  doc.line(PAGE_MARGIN_X, y, pageW - PAGE_MARGIN_X, y);
  y += 18;

  for (const section of input.sections) {
    y = ensureSpace(doc, y, 60, paintChrome);

    // Section heading
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_DARK_HEX);
    doc.text(section.heading, PAGE_MARGIN_X, y);
    y += 10;

    doc.setDrawColor(PRIMARY_HEX);
    doc.setLineWidth(1);
    doc.line(PAGE_MARGIN_X, y, PAGE_MARGIN_X + 28, y);
    y += 14;

    if (section.paragraphs) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(INK_HEX);
      for (const para of section.paragraphs) {
        const lines = wrap(doc, para, contentWidth);
        y = ensureSpace(doc, y, lines.length * 14 + 8, paintChrome);
        doc.text(lines, PAGE_MARGIN_X, y);
        y += lines.length * 14 + 6;
      }
      y += 4;
    }

    if (section.bullets) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(INK_HEX);
      for (const bullet of section.bullets) {
        const lines = wrap(doc, bullet, contentWidth - 16);
        y = ensureSpace(doc, y, lines.length * 13 + 6, paintChrome);
        // Bullet marker
        doc.setFillColor(PRIMARY_HEX);
        doc.circle(PAGE_MARGIN_X + 4, y - 3, 1.6, 'F');
        doc.text(lines, PAGE_MARGIN_X + 14, y);
        y += lines.length * 13 + 4;
      }
      y += 6;
    }
    y += 6;
  }

  // Closing contact card
  y = ensureSpace(doc, y, 80, paintChrome);
  doc.setFillColor(SURFACE_HEX);
  doc.setDrawColor(RULE_HEX);
  doc.setLineWidth(0.6);
  doc.roundedRect(PAGE_MARGIN_X, y, contentWidth, 68, 6, 6, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(PRIMARY_DARK_HEX);
  doc.text('Prefer a human clinician?', PAGE_MARGIN_X + 14, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(INK_HEX);
  doc.text(
    'Call Synergy Health 360 at 480-553-6168 during clinic hours, book 24/7 through the Athenahealth patient portal (https://20314.portal.athenahealth.com/), or walk in to our Scottsdale location at 9070 E Desert Cove Ave, 85260. Same-day visits are available.',
    PAGE_MARGIN_X + 14,
    y + 36,
    { maxWidth: contentWidth - 28 }
  );
  y += 84;

  // Draw footers across all pages now that total page count is known
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    drawFooter(doc, i, total);
  }

  const safeName = input.toolName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
    now.getDate()
  ).padStart(2, '0')}`;
  doc.save(`synergy-health-360_${safeName}_${stamp}.pdf`);
}
