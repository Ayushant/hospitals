import { KNOWLEDGE_CHUNKS, KnowledgeChunk, checkEmergencySafety, SERVICES_LIST } from '../data/knowledge';
import { scrubPhi } from './hipaa-guard';

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  sources?: string[];
  isEmergency?: boolean;
  timestamp: number;
}

export interface NavigationResult {
  serviceId: string;
  serviceName: string;
  reason: string;
  link: string;
}

/**
 * Clean text tokenizer for robust keyword & semantic scoring
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

/**
 * In-memory BM25/Cosine ranking fallback to guarantee instant, hermetic RAG matching
 * even if the network or API key is restricted.
 */
export function rankKnowledgeChunks(query: string, topK = 3, threshold = 0.55): KnowledgeChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [KNOWLEDGE_CHUNKS[0]];

  const scores: { chunk: KnowledgeChunk; score: number }[] = KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const chunkTokens = tokenize(`${chunk.title} ${chunk.content} ${chunk.keywords.join(' ')}`);
    const chunkTokenSet = new Set(chunkTokens);

    // Exact phrase match bonus
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();
    const lowerQuery = query.toLowerCase();

    if (lowerContent.includes(lowerQuery) || lowerTitle.includes(lowerQuery)) {
      score += 2.0;
    }

    // Keyword match
    for (const kw of chunk.keywords) {
      if (lowerQuery.includes(kw.toLowerCase())) {
        score += 1.8;
      }
    }

    // Token overlap
    for (const token of queryTokens) {
      if (chunkTokenSet.has(token)) {
        score += 0.8;
      }
    }

    // Normalized score
    const normScore = Math.min(score / (queryTokens.length * 1.5), 1.0);
    return { chunk, score: normScore };
  });

  scores.sort((a, b) => b.score - a.score);

  // Filter top matches
  const filtered = scores.filter((s) => s.score >= 0.35).slice(0, topK);
  if (filtered.length > 0) {
    return filtered.map((s) => s.chunk);
  }

  // Default to top scored chunk or about chunk
  return [scores[0]?.chunk || KNOWLEDGE_CHUNKS[0]];
}

/**
 * Client query dispatcher: Calls backend `/api/chat` first, with graceful local RAG fallback.
 */
export async function askSynergyCareAssistant(
  question: string
): Promise<{ text: string; sources: string[]; isEmergency: boolean }> {
  // 1. Mandatory Safety check runs BEFORE calling any LLM
  if (checkEmergencySafety(question)) {
    return {
      text: 'EMERGENCY NOTICE: Call 911 immediately. For a mental health crisis or suicide distress, call or text 988. Immediate medical intervention is required for critical symptoms.',
      sources: ['Emergency Triage Protocol (911 / 988)'],
      isEmergency: true
    };
  }

  // 2. Client-Side HIPAA & Arizona Data Privacy Scrubbing
  const phiResult = scrubPhi(question);
  const cleanQuestion = phiResult.sanitizedText;

  // 3. Try server endpoint
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: cleanQuestion })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.text) {
        return {
          text: data.text,
          sources: data.sources || ['Synergy Knowledge Base'],
          isEmergency: data.isEmergency || false
        };
      }
    }
  } catch (err) {
    // Graceful fallback to client-side RAG logic
  }

  // 3. Client RAG synthesis fallback
  const topChunks = rankKnowledgeChunks(question, 3, 0.55);
  const primaryChunk = topChunks[0];
  const sources = topChunks.map((c) => c.title);

  // Curate response based on top chunk category
  let answer = '';
  if (primaryChunk.category === 'membership') {
    answer =
      'InstaCare 360 is our clinic membership at $99/month or $999/year. It includes priority scheduling, guaranteed same-week visits with your physician, longer unhurried appointments, direct care team access, and 24-hour medical support.';
  } else if (primaryChunk.category === 'booking') {
    answer =
      'You can schedule a visit by calling 480-553-6168, booking online through the Athenahealth patient portal (https://20314.portal.athenahealth.com/), or walking in during clinic hours. Same-day appointments are available daily.';
  } else if (primaryChunk.category === 'locations') {
    answer =
      'We have two Scottsdale locations: 9070 E Desert Cove Ave (85260) and 7190 E Kierland Blvd (85254). Both provide comprehensive primary and specialty care for Greater Phoenix.';
  } else if (primaryChunk.category === 'providers') {
    answer =
      'Dr. Vin Jain, MD, is our lead board-certified physician. He emphasizes personalized preventive care and patient-first medicine, and was featured discussing integrative health on the "Health Future" podcast with Bob Roth.';
  } else {
    answer = primaryChunk.content.split('. ').slice(0, 3).join('. ') + '.';
  }

  return {
    text: answer,
    sources: [primaryChunk.title],
    isEmergency: false
  };
}

/**
 * Care Navigator logic: maps user need or symptoms to structured service
 */
export async function navigateToService(userNeed: string): Promise<NavigationResult> {
  const normalized = userNeed.toLowerCase();

  // Try server endpoint first
  try {
    const res = await fetch('/api/navigate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ need: userNeed })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.serviceId && data.serviceName && data.reason) {
        return data;
      }
    }
  } catch (e) {
    // Fallback to local deterministic mapping
  }

  if (normalized.includes('wound') || normalized.includes('ulcer') || normalized.includes('sore') || normalized.includes('not healing')) {
    return {
      serviceId: 'wound-care',
      serviceName: 'Wound Care (Chronic & Diabetic)',
      reason: 'Our physicians specialize in tissue debridement, infection prevention, and accelerated recovery for chronic and diabetic wounds.',
      link: '#services'
    };
  }

  if (normalized.includes('weight') || normalized.includes('diet') || normalized.includes('fat') || normalized.includes('metabol')) {
    return {
      serviceId: 'weight-loss',
      serviceName: 'Medical Weight Loss',
      reason: 'Our physician-supervised program evaluates metabolic indicators and creates a structured, medically backed nutrition and wellness plan.',
      link: '#services'
    };
  }

  if (normalized.includes('foot') || normalized.includes('feet') || normalized.includes('ankle') || normalized.includes('heel') || normalized.includes('toe')) {
    return {
      serviceId: 'podiatry',
      serviceName: 'Podiatry',
      reason: 'Our podiatric team handles diabetic foot exams, chronic foot pain, biomechanics, and joint alignment in coordination with primary care.',
      link: '#services'
    };
  }

  if (normalized.includes('anxiety') || normalized.includes('depress') || normalized.includes('stress') || normalized.includes('burnout') || normalized.includes('mental')) {
    return {
      serviceId: 'mental-wellness',
      serviceName: 'Mental Wellness',
      reason: 'We provide integrated emotional and behavioral health support directly connected to your primary physician’s care plan.',
      link: '#services'
    };
  }

  if (normalized.includes('woman') || normalized.includes('women') || normalized.includes('pap') || normalized.includes('perimenopause') || normalized.includes('menopause')) {
    return {
      serviceId: 'womens-health',
      serviceName: "Women's Health",
      reason: 'Tailored preventative exams, well-woman screenings, and hormone health support across every stage of life.',
      link: '#services'
    };
  }

  if (normalized.includes('virtual') || normalized.includes('telehealth') || normalized.includes('video') || normalized.includes('home')) {
    return {
      serviceId: 'telehealth',
      serviceName: 'Telehealth Consultations',
      reason: 'Secure video consultations for medication reviews, lab interpretations, and acute non-emergency symptoms from anywhere in Arizona.',
      link: '#services'
    };
  }

  return {
    serviceId: 'primary-care',
    serviceName: 'Primary & Senior Care',
    reason: 'Comprehensive annual physicals, chronic condition management (blood pressure, diabetes), and unhurried care with Dr. Jain and staff.',
    link: '#services'
  };
}
