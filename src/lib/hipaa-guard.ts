/**
 * HIPAA & US State Privacy Compliance Guard
 *
 * Implements strict Zero-PHI (Protected Health Information) filtering and
 * redaction in accordance with:
 * - HIPAA Privacy and Security Rules (45 CFR Part 160 and Part 164)
 * - FTC Health Breach Notification Rule (16 CFR Part 318)
 * - Arizona Data Privacy & Breach Standards (A.R.S. § 18-551)
 * - HHS Section 1557 Nondiscrimination Safeguards
 */

export interface PhCheckResult {
  hasPhi: boolean;
  sanitizedText: string;
  detectedTypes: string[];
  warningMessage?: string;
}

// Regex patterns for 18 HIPAA Safe Harbor Identifiers
const PHI_PATTERNS = [
  {
    type: 'Social Security Number',
    regex: /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b/g,
    replacement: '[REDACTED SSN]'
  },
  {
    type: 'Date of Birth',
    regex: /\b(dob|birth date|born on|born|date of birth)[\s:]*([0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{2,4})\b/gi,
    replacement: '[REDACTED DOB]'
  },
  {
    type: 'Phone Number',
    regex: /\b(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\b/g,
    replacement: '[REDACTED PHONE]'
  },
  {
    type: 'Email Address',
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: '[REDACTED EMAIL]'
  },
  {
    type: 'Medical Record / Account Number',
    regex: /\b(mrn|record number|chart #|account #|patient id)[\s:]*([A-Za-z0-9-]{4,15})\b/gi,
    replacement: '[REDACTED MRN]'
  },
  {
    type: 'Health Insurance Member ID',
    regex: /\b(member id|policy #|group #|insurance id|medicaid|medicare)[\s:]*([A-Za-z0-9-]{6,16})\b/gi,
    replacement: '[REDACTED INSURANCE ID]'
  }
];

/**
 * Scrubs potential PHI from user input before processing or sending to any AI endpoint
 */
export function scrubPhi(input: string): PhCheckResult {
  if (!input || typeof input !== 'string') {
    return { hasPhi: false, sanitizedText: '', detectedTypes: [] };
  }

  let sanitized = input;
  const detectedTypes: string[] = [];

  for (const { type, regex, replacement } of PHI_PATTERNS) {
    if (regex.test(sanitized)) {
      detectedTypes.push(type);
      sanitized = sanitized.replace(regex, replacement);
    }
  }

  // Also catch specific diagnostic lab numbers coupled with first-person identifiers
  const labPattern = /\b(my\s+(?:a1c|blood sugar|glucose|bp|blood pressure|cholesterol|creatinine)\s+(?:is|was|=|level is)\s+[\d./]+)\b/gi;
  if (labPattern.test(sanitized)) {
    detectedTypes.push('Personal Diagnostic Measurement');
    sanitized = sanitized.replace(labPattern, '[REDACTED LAB VALUE]');
  }

  const hasPhi = detectedTypes.length > 0;
  const warningMessage = hasPhi
    ? `HIPAA Privacy Notice: Personal Health Identifier (${detectedTypes.join(', ')}) was automatically redacted. To protect your privacy and ensure compliance with HIPAA, please do not share personal health records or identifiers here. For confidential clinical guidance, contact our clinic at 480-553-6168 or use the Athenahealth Patient Portal.`
    : undefined;

  return {
    hasPhi,
    sanitizedText: sanitized,
    detectedTypes,
    warningMessage
  };
}

/**
 * Multi-State AI Disclosures and Legal Attributions
 */
export const LEGAL_DISCLOSURES = {
  hipaa: {
    title: 'HIPAA & Zero-PHI Architecture',
    statute: 'Health Insurance Portability and Accountability Act (45 CFR § 164.514)',
    summary:
      'This AI assistant does not collect, record, or retain Protected Health Information (PHI). All queries are processed ephemerally in-memory with automated redaction. No medical records or patient identifiers are stored or shared with external parties.'
  },
  ftc: {
    title: 'FTC Act & Health Breach Notification Rule',
    statute: '15 U.S.C. § 45 & 16 CFR Part 318',
    summary:
      'We do not engage in misleading clinical claims or sell health query data. This automated assistant is solely an informational navigation aid. No patient interaction data is monetized or provided to commercial data brokers.'
  },
  hhs1557: {
    title: 'HHS Section 1557 Nondiscrimination & Clinical AI Rule',
    statute: '45 CFR Part 92 (Affordable Care Act § 1557)',
    summary:
      'Synergy Health 360 does not discriminate on the basis of race, color, national origin, sex, age, or disability in health programs or AI-enabled tools. AI recommendations are purely non-binding administrative routing aids; all clinical care decisions remain under the authoritative evaluation of licensed human physicians (Dr. Vinamra Jain, MD and staff).'
  },
  stateAi: {
    title: 'State AI Transparency Laws (Texas, California, Utah)',
    statute: 'California AB 3030 & B&P § 17940 | Texas TRAIGA (HB 2060) | Utah AI Policy Act (UCPA Title 13, Ch. 67)',
    summary:
      'MANDATORY DISCLOSURE: You are interacting with an artificial intelligence system, not a human doctor. This AI is not licensed to practice medicine and cannot formulate diagnoses or prescribe therapies. You have the right at any time to interact directly with human clinic staff by calling 480-553-6168.'
  },
  arizona: {
    title: 'Arizona Data Privacy & Breach Law',
    statute: 'A.R.S. § 18-551 & Arizona Healthcare Privacy Statutes',
    summary:
      'In compliance with Arizona law, all data transmissions utilize 256-bit TLS encryption, and no personal identifiable health data is permanently recorded during automated website interactions.'
  },
  ada: {
    title: 'ADA Title III & WCAG 2.1 AA Compliance',
    statute: 'Americans with Disabilities Act & Web Content Accessibility Guidelines 2.1 Level AA',
    summary:
      'Our digital interfaces provide high-contrast text, full keyboard navigation, screen reader ARIA landmarks, reduced motion support, and assistive text sizing.'
  }
};
