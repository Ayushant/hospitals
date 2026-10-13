import { GoogleGenAI, Type } from '@google/genai';
import { KNOWLEDGE_CHUNKS, checkEmergencySafety } from '../data/knowledge.ts';
import { scrubPhi } from '../lib/hipaa-guard.ts';

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function processChatRequest(question: string) {
  if (!question || typeof question !== 'string') {
    return { status: 400, data: { error: 'Question is required' } };
  }

  // 1. HIPAA & Arizona Privacy: Immediate Server-Side PHI Scrubbing
  const phiCheck = scrubPhi(question);
  const cleanQuestion = phiCheck.sanitizedText;

  // 2. Safety Layer: Emergency Triage Check BEFORE calling model
  if (checkEmergencySafety(cleanQuestion)) {
    return {
      status: 200,
      data: {
        text: 'EMERGENCY NOTICE: Call 911 immediately. For a mental health crisis or suicide distress, call or text 988. Immediate clinical intervention is required for critical symptoms. Do not wait for AI assistance.',
        sources: ['Emergency Triage Protocol (911 / 988)'],
        isEmergency: true,
        phiRedacted: phiCheck.hasPhi,
      },
    };
  }

  // Simple RAG context assembly from knowledge chunks
  const qLower = cleanQuestion.toLowerCase();
  const relevantChunks = KNOWLEDGE_CHUNKS.filter((chunk) => {
    return (
      chunk.keywords.some((kw) => qLower.includes(kw.toLowerCase())) ||
      chunk.content.toLowerCase().includes(qLower) ||
      chunk.title.toLowerCase().includes(qLower)
    );
  });

  const contextChunks = relevantChunks.length > 0 ? relevantChunks.slice(0, 3) : KNOWLEDGE_CHUNKS.slice(0, 3);
  const contextText = contextChunks
    .map((c) => `[Source: ${c.title}]\n${c.content}`)
    .join('\n\n');

  const primarySource = contextChunks[0]?.title || 'Synergy Health 360 Knowledge Base';

  const ai = getAiClient();

  // If Gemini client is not initialized, return verified chunk response directly
  if (!ai) {
    let summary = contextChunks[0]?.content.split('. ').slice(0, 3).join('. ') + '.';
    if (phiCheck.hasPhi) {
      summary = `[HIPAA Shield: Sensitive identifiers were automatically redacted.]\n\n` + summary;
    }
    return {
      status: 200,
      data: {
        text: summary,
        sources: [primarySource],
        isEmergency: false,
        phiRedacted: phiCheck.hasPhi,
      },
    };
  }

  // Server-side call to Gemini with full regulatory compliance guardrails
  const systemInstruction = `You are Synergy Health 360's calm, helpful AI clinic assistant in Scottsdale, Arizona.
COMPLIANCE & LEGAL INSTRUCTIONS (HIPAA, FTC Act, HHS Section 1557, Texas HB 2060, California AB 3030, Utah AI Act):
1. MANDATORY AI IDENTIFICATION: You are an Artificial Intelligence assistant, NOT a doctor or clinician.
2. ZERO-DIAGNOSIS RULE: Never diagnose medical conditions, recommend dosages, interpret personal symptoms, or prescribe medication. All medical evaluations are conducted by Dr. Vinamra Jain, MD and licensed clinic providers.
3. ZERO-PHI RETENTION: Never solicit, acknowledge, or store patient identifiers (DOBs, SSNs, medical record numbers, full names, insurance IDs). If a user mentions personal health details, remind them: "For your privacy and HIPAA compliance, please do not share personal health records here. Our clinic staff can assist at 480-553-6168 or via the Athenahealth portal."
4. NONDISCRIMINATION (HHS 1557): Provide equal, respectful assistance to all users regardless of race, national origin, sex, age, or disability. If the user asks in Spanish, provide a warm, accurate response in Spanish.
5. CONTEXT BOUNDARY: Answer ONLY from the provided clinic context below. If the answer is not in the context, say: "I don't have that information. Please call our clinic directly at 480-553-6168." and offer the booking link (https://20314.portal.athenahealth.com/).
6. CONCISE TONE: Keep answers strictly to 2–4 sentences, warm, restrained, and in plain English (or Spanish if asked in Spanish).
End your answer with a small line: "Source: ${primarySource}".

CLINIC CONTEXT:
${contextText}`;

  try {
    const generatePromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: cleanQuestion,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 4000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);
    let responseText = (response.text || '').trim();
    if (phiCheck.hasPhi) {
      responseText = `[HIPAA Shield: Sensitive personal identifiers were redacted.]\n\n${responseText}`;
    }
    return {
      status: 200,
      data: {
        text: responseText,
        sources: [primarySource],
        isEmergency: false,
        phiRedacted: phiCheck.hasPhi,
      },
    };
  } catch (genAiError) {
    const verifiedText = contextChunks[0]?.content.split('. ').slice(0, 3).join('. ') + '.';
    return {
      status: 200,
      data: {
        text: (phiCheck.hasPhi ? `[HIPAA Shield: Sensitive identifiers redacted]\n\n` : '') + verifiedText + `\n\nSource: ${primarySource}`,
        sources: [primarySource],
        isEmergency: false,
        phiRedacted: phiCheck.hasPhi,
      },
    };
  }
}

export async function processNavigateRequest(need: string) {
  if (!need || typeof need !== 'string') {
    return { status: 400, data: { error: 'Need description is required' } };
  }

  // HIPAA scrubbing on navigate request as well
  const phiCheck = scrubPhi(need);
  const cleanNeed = phiCheck.sanitizedText;

  const nLower = cleanNeed.toLowerCase();
  const getSemanticFallback = () => {
    if (nLower.includes('wound') || nLower.includes('ulcer') || nLower.includes('sore') || nLower.includes('not healing')) {
      return {
        serviceId: 'wound-care',
        serviceName: 'Wound Care (Chronic & Diabetic)',
        reason: 'Our physicians specialize in tissue debridement, infection mitigation, and accelerated healing protocols for chronic and diabetic wounds.',
        link: '#services',
        disclaimer: 'Administrative routing suggestion only. Not a medical diagnosis.'
      };
    }
    if (nLower.includes('weight') || nLower.includes('diet') || nLower.includes('fat') || nLower.includes('metabol')) {
      return {
        serviceId: 'weight-loss',
        serviceName: 'Medical Weight Loss',
        reason: 'Our physician-supervised program evaluates metabolic indicators and creates a structured, medically backed nutrition and wellness plan.',
        link: '#services',
        disclaimer: 'Administrative routing suggestion only. Not a medical diagnosis.'
      };
    }
    if (nLower.includes('foot') || nLower.includes('feet') || nLower.includes('ankle') || nLower.includes('heel') || nLower.includes('toe')) {
      return {
        serviceId: 'podiatry',
        serviceName: 'Podiatry',
        reason: 'Our podiatric team handles diabetic foot exams, chronic foot pain, biomechanics, and joint alignment in coordination with primary care.',
        link: '#services',
        disclaimer: 'Administrative routing suggestion only. Not a medical diagnosis.'
      };
    }
    if (nLower.includes('anxiety') || nLower.includes('depress') || nLower.includes('stress') || nLower.includes('burnout') || nLower.includes('mental')) {
      return {
        serviceId: 'mental-wellness',
        serviceName: 'Mental Wellness',
        reason: 'We provide integrated emotional and behavioral health support directly connected to your primary physician’s care plan.',
        link: '#services',
        disclaimer: 'Administrative routing suggestion only. Not a medical diagnosis.'
      };
    }
    if (nLower.includes('woman') || nLower.includes('women') || nLower.includes('pap') || nLower.includes('perimenopause') || nLower.includes('menopause')) {
      return {
        serviceId: 'womens-health',
        serviceName: "Women's Health",
        reason: 'Tailored preventative exams, well-woman screenings, and hormone health support across every stage of life.',
        link: '#services',
        disclaimer: 'Administrative routing suggestion only. Not a medical diagnosis.'
      };
    }
    if (nLower.includes('virtual') || nLower.includes('telehealth') || nLower.includes('video') || nLower.includes('home')) {
      return {
        serviceId: 'telehealth',
        serviceName: 'Telehealth Consultations',
        reason: 'Secure video consultations for medication reviews, lab interpretations, and acute non-emergency symptoms from anywhere in Arizona.',
        link: '#services',
        disclaimer: 'Administrative routing suggestion only. Not a medical diagnosis.'
      };
    }
    return {
      serviceId: 'primary-care',
      serviceName: 'Primary & Senior Care',
      reason: 'Coordinated preventive care, wellness physicals, and dedicated listening with Dr. Vin Jain and team.',
      link: '#services',
      disclaimer: 'Administrative routing suggestion only. Not a medical diagnosis.'
    };
  };

  const ai = getAiClient();
  if (!ai) {
    return { status: 200, data: getSemanticFallback() };
  }

  const prompt = `Map the following patient statement to one of Synergy Health 360's services for scheduling coordination only:
Services available:
- Primary & Senior Care (annual physicals, hypertension, diabetes, sick visits)
- Wound Care (chronic & diabetic)
- Medical Weight Loss
- Mental Wellness
- Women's Health
- Podiatry (foot, ankle, heel, diabetic foot care)
- Telehealth Consultations

Patient Statement: "${cleanNeed}"

CRITICAL LEGAL COMPLIANCE:
- You are an automated administrative routing aid, NOT a clinical diagnostician.
- Do NOT provide a medical diagnosis or medical prognosis.
- Explain in 1-2 calm sentences which clinic service appointment fits best.`;

  try {
    const generatePromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            serviceId: { type: Type.STRING },
            serviceName: { type: Type.STRING },
            reason: { type: Type.STRING, description: '1-2 warm sentences explaining administrative appointment matching.' },
            link: { type: Type.STRING },
          },
          required: ['serviceId', 'serviceName', 'reason', 'link'],
        },
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 3500)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const parsed = JSON.parse(response.text || '{}');
    parsed.link = '#services';
    parsed.disclaimer = 'Administrative care routing only. Not a medical diagnosis.';
    return { status: 200, data: parsed };
  } catch (genAiError) {
    return { status: 200, data: getSemanticFallback() };
  }
}
