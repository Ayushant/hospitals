import { GoogleGenAI, Type } from '@google/genai';
import { KNOWLEDGE_CHUNKS, checkEmergencySafety } from '../data/knowledge.ts';

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

  // Safety Layer: Emergency Triage Check BEFORE calling model
  if (checkEmergencySafety(question)) {
    return {
      status: 200,
      data: {
        text: 'Call 911 now. For a mental health crisis, call or text 988. Immediate clinical intervention is required for critical symptoms.',
        sources: ['Emergency Triage Protocol'],
        isEmergency: true,
      },
    };
  }

  // Simple RAG context assembly from knowledge chunks
  const qLower = question.toLowerCase();
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
    const summary = contextChunks[0]?.content.split('. ').slice(0, 3).join('. ') + '.';
    return {
      status: 200,
      data: {
        text: summary,
        sources: [primarySource],
        isEmergency: false,
      },
    };
  }

  // Server-side call to Gemini
  const systemInstruction = `You are Synergy Health 360's calm, helpful AI assistant.
Answer ONLY from the provided clinic context below.
If the answer is not in the context, say: "I don't have that information. Please call us at 480-553-6168." and offer the booking link (https://20314.portal.athenahealth.com/).
Keep answers strictly to 2–4 sentences, warm, restrained, and in plain English.
End your answer with a small line: "Source: ${primarySource}".
Never diagnose, recommend medication or dosages, or interpret symptoms.
Never ask for or store name, date of birth, insurance, or medical details. If the user shares health details, reply: "For your privacy, please don't share medical details here. Our care team can help at 480-553-6168 or through the patient portal."

CLINIC CONTEXT:
${contextText}`;

  try {
    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 4000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const responseText = response.text || '';
    return {
      status: 200,
      data: {
        text: responseText.trim(),
        sources: [primarySource],
        isEmergency: false,
      },
    };
  } catch (genAiError) {
    const verifiedText = contextChunks[0]?.content.split('. ').slice(0, 3).join('. ') + '.';
    return {
      status: 200,
      data: {
        text: verifiedText + `\n\nSource: ${primarySource}`,
        sources: [primarySource],
        isEmergency: false,
      },
    };
  }
}

export async function processNavigateRequest(need: string) {
  if (!need || typeof need !== 'string') {
    return { status: 400, data: { error: 'Need description is required' } };
  }

  const nLower = need.toLowerCase();
  const getSemanticFallback = () => {
    if (nLower.includes('wound') || nLower.includes('ulcer') || nLower.includes('sore') || nLower.includes('not healing')) {
      return {
        serviceId: 'wound-care',
        serviceName: 'Wound Care (Chronic & Diabetic)',
        reason: 'Our physicians specialize in tissue debridement, infection mitigation, and accelerated healing protocols for chronic and diabetic wounds.',
        link: '#services',
      };
    }
    if (nLower.includes('weight') || nLower.includes('diet') || nLower.includes('fat') || nLower.includes('metabol')) {
      return {
        serviceId: 'weight-loss',
        serviceName: 'Medical Weight Loss',
        reason: 'Our physician-supervised program evaluates metabolic indicators and creates a structured, medically backed nutrition and wellness plan.',
        link: '#services',
      };
    }
    if (nLower.includes('foot') || nLower.includes('feet') || nLower.includes('ankle') || nLower.includes('heel') || nLower.includes('toe')) {
      return {
        serviceId: 'podiatry',
        serviceName: 'Podiatry',
        reason: 'Our podiatric team handles diabetic foot exams, chronic foot pain, biomechanics, and joint alignment in coordination with primary care.',
        link: '#services',
      };
    }
    if (nLower.includes('anxiety') || nLower.includes('depress') || nLower.includes('stress') || nLower.includes('burnout') || nLower.includes('mental')) {
      return {
        serviceId: 'mental-wellness',
        serviceName: 'Mental Wellness',
        reason: 'We provide integrated emotional and behavioral health support directly connected to your primary physician’s care plan.',
        link: '#services',
      };
    }
    if (nLower.includes('woman') || nLower.includes('women') || nLower.includes('pap') || nLower.includes('perimenopause') || nLower.includes('menopause')) {
      return {
        serviceId: 'womens-health',
        serviceName: "Women's Health",
        reason: 'Tailored preventative exams, well-woman screenings, and hormone health support across every stage of life.',
        link: '#services',
      };
    }
    if (nLower.includes('virtual') || nLower.includes('telehealth') || nLower.includes('video') || nLower.includes('home')) {
      return {
        serviceId: 'telehealth',
        serviceName: 'Telehealth Consultations',
        reason: 'Secure video consultations for medication reviews, lab interpretations, and acute non-emergency symptoms from anywhere in Arizona.',
        link: '#services',
      };
    }
    return {
      serviceId: 'primary-care',
      serviceName: 'Primary & Senior Care',
      reason: 'Coordinated preventive care, wellness physicals, and dedicated listening with Dr. Vin Jain and team.',
      link: '#services',
    };
  };

  const ai = getAiClient();
  if (!ai) {
    return { status: 200, data: getSemanticFallback() };
  }

  const prompt = `Map the following patient statement to one of Synergy Health 360's services:
Services available:
- Primary & Senior Care (annual physicals, hypertension, diabetes, sick visits)
- Wound Care (chronic & diabetic)
- Medical Weight Loss
- Mental Wellness
- Women's Health
- Podiatry (foot, ankle, heel, diabetic foot care)
- Telehealth Consultations

Patient Statement: "${need}"

Respond in JSON matching the schema. Note: this guides the user to a service, it does not diagnose.`;

  try {
    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            serviceId: { type: Type.STRING },
            serviceName: { type: Type.STRING },
            reason: { type: Type.STRING, description: '1-2 warm sentences explaining why this service fits.' },
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
    return { status: 200, data: parsed };
  } catch (genAiError) {
    return { status: 200, data: getSemanticFallback() };
  }
}
