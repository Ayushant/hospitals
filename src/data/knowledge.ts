/**
 * Synergy Health 360 - Official Knowledge Base
 * Strictly adheres to verified clinic data.
 * No fabricated statistics, awards, pricing, or reviews.
 */

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: 'about' | 'services' | 'membership' | 'booking' | 'locations' | 'providers' | 'affiliations';
  content: string;
  keywords: string[];
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'about-synergy',
    title: 'About Synergy Health 360° Approach',
    category: 'about',
    keywords: ['about', 'philosophy', 'approach', 'integrative', 'primary care', 'holistic', 'mind body spirit'],
    content:
      'Synergy Health 360 is a primary care and integrative health clinic in Scottsdale, Arizona, serving Greater Phoenix. The clinic delivers personalized, patient-centered care for individuals and families, dedicated to preventive health, chronic disease management, and total wellness. Through a 360° approach addressing mind, body, and spirit, your primary care physician acts as a dedicated partner, coordinating a personalized health plan directly with an integrated network of on-site and telemedicine specialists.'
  },
  {
    id: 'primary-senior-care',
    title: 'Primary Care & Senior Care Services',
    category: 'services',
    keywords: ['primary care', 'senior care', 'annual physical', 'chronic disease', 'diabetes', 'blood pressure', 'sick visits', 'immunizations', 'screenings'],
    content:
      'Comprehensive primary and senior care covers routine annual physicals, chronic disease management (such as diabetes, hypertension, and high blood pressure), acute sick visits, immunizations, and preventive diagnostic screenings for patients of all ages. Providers dedicate unhurried time to listen and tailor continuous preventive health strategies.'
  },
  {
    id: 'wound-care',
    title: 'Wound Care (Chronic & Diabetic)',
    category: 'services',
    keywords: ['wound care', 'diabetic wound', 'chronic wound', 'foot wound', 'ulcer', 'healing', 'podiatry'],
    content:
      'Specialized clinical wound care designed specifically for non-healing chronic and diabetic wounds, vascular ulcers, and complex skin injuries. Our physicians combine advanced wound healing modalities with ongoing primary and podiatric oversight to restore skin integrity, reduce infection risks, and prevent hospitalizations.'
  },
  {
    id: 'weight-loss',
    title: 'Medical Weight Loss Program',
    category: 'services',
    keywords: ['weight loss', 'metabolic', 'diet', 'obesity', 'wellness plan', 'physician supervised'],
    content:
      'A physician-supervised medical weight loss program tailored to your metabolic profile and lifestyle. The clinic provides body composition evaluation, clinical nutrition guidance, chronic disease reduction strategies, and consistent medical oversight to achieve lasting, healthy weight management.'
  },
  {
    id: 'mental-wellness',
    title: 'Mental Wellness & Behavioral Health',
    category: 'services',
    keywords: ['mental wellness', 'mental health', 'anxiety', 'depression', 'stress', 'mind body', 'behavioral'],
    content:
      'Integrated mental wellness care supporting stress, mild-to-moderate anxiety, depression, and lifestyle health. As part of our 360° whole-person model, mental and physical health are treated collaboratively under your primary physician’s guidance.'
  },
  {
    id: 'specialty-network',
    title: 'Specialty Services & Diagnostics (25+ Services)',
    category: 'services',
    keywords: ['specialties', 'podiatry', 'cardiology', 'womens health', 'mens health', 'telehealth', 'aesthetics', 'acute care'],
    content:
      'In addition to primary medicine, Synergy Health 360 offers over 25 integrated services under one coordinated network. These include Podiatry (foot and ankle care), Cardiology screenings, Women’s Health, Men’s Health, Acute Care for minor illnesses or injuries, Telehealth consultations, and Clinical Aesthetics.'
  },
  {
    id: 'instacare-membership',
    title: 'InstaCare 360 Membership Plans',
    category: 'membership',
    keywords: ['membership', 'instacare', 'cost', 'pricing', '99', '999', 'benefits', 'priority', 'same week'],
    content:
      'InstaCare 360 is an exclusive clinic membership available for $99/month or $999/year (limited-time, first-come-first-served offer). Membership benefits include priority scheduling, a guaranteed same-week appointment with your provider, longer unhurried visits, direct access to the care team, advanced health screenings and diagnostic tests, 24-hour medical support, and exclusive member savings.'
  },
  {
    id: 'booking-appointments',
    title: 'Booking, Walk-ins & Patient Portal',
    category: 'booking',
    keywords: ['book', 'appointment', 'walk in', 'same day', 'phone', 'portal', 'athenahealth', 'bill pay', 'repeatmd', 'app'],
    content:
      'Patients can book appointments by calling 480-553-6168, using the 24/7 Athenahealth online patient portal at https://20314.portal.athenahealth.com/, or walking in during business hours (availability may vary). Same-day appointments are available. Patients can also pay bills online via the portal. A dedicated mobile app is available at https://synergyhealth360.repeatmd.app.'
  },
  {
    id: 'locations-hours',
    title: 'Clinic Locations in Scottsdale, AZ',
    category: 'locations',
    keywords: ['location', 'address', 'scottsdale', 'desert cove', 'kierland', 'directions', 'phoenix'],
    content:
      'Synergy Health 360 operates two premier Scottsdale clinics serving the Greater Phoenix area: 1) 9070 E Desert Cove Ave, Scottsdale, AZ 85260; 2) 7190 E Kierland Blvd, Scottsdale, AZ 85254. Contact both locations at 480-553-6168.'
  },
  {
    id: 'provider-dr-vin-jain',
    title: 'Physician Spotlight: Dr. Vin Jain, MD',
    category: 'providers',
    keywords: ['doctor', 'dr jain', 'vin jain', 'physician', 'provider', 'podcast', 'bob roth'],
    content:
      'Dr. Vin Jain, MD, is the leading board-certified physician at Synergy Health 360. Dr. Jain is recognized for his compassionate, patient-first philosophy and dedication to preventive medicine. He recently shared insights on personalized primary care on the "Health Future" podcast hosted by Bob Roth.'
  },
  {
    id: 'patient-testimonials',
    title: 'Verified Patient Experiences',
    category: 'about',
    keywords: ['reviews', 'testimonials', 'ratings', 'patients', 'feedback'],
    content:
      'Verified patient testimonials: Sylvia B. shares: "Dr. Jain was thorough, compassionate and provided me with treatments in line with my philosophy of care." Harry B. notes: "Dr. Jain and his staff were extremely professional, prompt and pleasant… Top notch experiences!" Russell B. writes: "The staff and MD was super efficient and knowledgeable… top notch."'
  },
  {
    id: 'affiliations',
    title: 'Professional Medical Affiliations',
    category: 'affiliations',
    keywords: ['affiliations', 'aafp', 'acp', 'arizona medical associations', 'credentials'],
    content:
      'Synergy Health 360 providers are affiliated with the American Academy of Family Physicians (AAFP), the American College of Physicians (ACP), and Arizona state medical associations.'
  }
];

export interface ServiceDetail {
  id: string;
  name: string;
  categoryNumber: string;
  tagline: string;
  description: string;
  included: string[];
  recommendedFor: string;
}

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'primary-care',
    name: 'Primary & Senior Care',
    categoryNumber: '01',
    tagline: 'Annual physicals, chronic illness management & unhurried visits',
    description:
      'Dedicated, long-term health stewardship. From preventative wellness panels to senior health maintenance, we partner with you to keep chronic illness managed and vitality optimized.',
    included: ['Annual wellness exams & lab panels', 'Hypertension & cardiovascular monitoring', 'Diabetic health coaching & care plans', 'Routine adult & senior immunizations'],
    recommendedFor: 'Routine yearly checkups, medication management, managing high blood pressure or diabetes.'
  },
  {
    id: 'wound-care',
    name: 'Wound Care (Chronic & Diabetic)',
    categoryNumber: '02',
    tagline: 'Advanced tissue healing and diabetic ulcer restoration',
    description:
      'Specialized care protocols for stubborn, non-healing wounds. Coordinated with podiatry to accelerate recovery, prevent tissue damage, and protect mobility.',
    included: ['Diabetic ulcer care & debridement', 'Venous & arterial wound management', 'Infection mitigation & monitoring', 'Direct coordination with podiatry'],
    recommendedFor: 'Sores or foot ulcers lingering for weeks, diabetic skin complications.'
  },
  {
    id: 'weight-loss',
    name: 'Medical Weight Loss',
    categoryNumber: '03',
    tagline: 'Metabolic health evaluation and physician-supervised plans',
    description:
      'A scientific, compassionate pathway to sustainable weight reduction. No fad diets; our physicians look into underlying hormonal, metabolic, and lifestyle determinants.',
    included: ['Comprehensive metabolic biomarker panels', 'Personalized nutrition & activity blueprints', 'Safe medication-assisted options where clinically indicated', 'Bi-weekly physician follow-ups'],
    recommendedFor: 'Patients seeking structured, medically sound guidance for healthy metabolic renewal.'
  },
  {
    id: 'mental-wellness',
    name: 'Mental Wellness',
    categoryNumber: '04',
    tagline: 'Integrated whole-person emotional & psychological support',
    description:
      'Mind and body are inextricably linked. We offer compassionate screening, lifestyle counseling, and collaborative behavioral health integrated directly into your primary care plan.',
    included: ['Anxiety & depression clinical screening', 'Stress resilience & sleep optimization', 'Mind-body lifestyle health plans', 'Specialist referral coordination'],
    recommendedFor: 'Persistent fatigue, burnout, elevated anxiety, mild depressive symptoms.'
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    categoryNumber: '05',
    tagline: 'Preventive screenings, hormone balance & lifespan care',
    description:
      'Thoughtful healthcare tailored to every stage of a woman’s life. From routine preventative checks to perimenopausal and postmenopausal wellness support.',
    included: ['Well-woman physicals & pap screenings', 'Hormonal assessment & bone density review', 'Cardiovascular risk evaluation', 'Integrative lifestyle guidance'],
    recommendedFor: 'Annual preventative checkups, hormonal transitions, bone and heart health.'
  },
  {
    id: 'podiatry',
    name: 'Podiatry',
    categoryNumber: '06',
    tagline: 'Foot and ankle clinical care, orthopedics & diabetic foot exams',
    description:
      'Comprehensive foot and ankle care seamlessly coordinated with our wound care and primary medicine teams. Protecting your gait, joint integrity, and daily mobility.',
    included: ['Diabetic foot evaluations & preventative checks', 'Nail & skin disorder management', 'Gait and biomechanical strain assessment', 'Orthotic consultations'],
    recommendedFor: 'Foot pain, diabetic neuropathy checks, persistent heel pain, non-healing sores.'
  },
  {
    id: 'telehealth',
    name: 'Telehealth Consultations',
    categoryNumber: '07',
    tagline: 'Convenient virtual appointments across Arizona',
    description:
      'Secure, high-definition virtual visits for follow-ups, medication reviews, lab interpretations, and acute non-emergency consultations from the comfort of home.',
    included: ['Secure HIPAA-compliant video portal', 'Prescription refills & lab result discussions', 'Ongoing chronic disease follow-ups', 'Quick triage for acute symptoms'],
    recommendedFor: 'Busy schedules, follow-up reviews, rural Arizona residents.'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How do I schedule an appointment with Synergy Health 360?',
    answer:
      'You can schedule by calling our clinic directly at 480-553-6168, booking online through our secure Athenahealth patient portal (https://20314.portal.athenahealth.com/), or walking in during business hours. Same-day appointments are available for urgent needs.'
  },
  {
    question: 'What is included in the InstaCare 360 Membership?',
    answer:
      'InstaCare 360 is our premier membership program priced at $99/month or $999/year. It includes priority scheduling, guaranteed same-week appointments with your physician, longer and unhurried visits, direct access to your care team, advanced health screenings and diagnostic tests, 24-hour medical support, and exclusive member savings.'
  },
  {
    question: 'Where are your Scottsdale clinic locations?',
    answer:
      'We have two convenient Scottsdale locations: 1) 9070 E Desert Cove Ave, Scottsdale, AZ 85260; 2) 7190 E Kierland Blvd, Scottsdale, AZ 85254. Both serve patients from throughout Scottsdale, Paradise Valley, and the Greater Phoenix area.'
  },
  {
    question: 'Who is the lead physician at Synergy Health 360?',
    answer:
      'Dr. Vin Jain, MD, is our lead board-certified physician. Known for his compassionate and thorough bedside manner, Dr. Jain specializes in preventive medicine and whole-person wellness, and was recently featured on the "Health Future" podcast discussing personalized primary care.'
  },
  {
    question: 'Do you treat non-healing or diabetic wounds?',
    answer:
      'Yes. Wound care (both chronic and diabetic) is one of our primary clinical specialties. We offer advanced wound therapy closely integrated with podiatry to accelerate tissue recovery and avoid complications.'
  },
  {
    question: 'How can I pay my bill or access my medical records?',
    answer:
      'Existing patients can easily pay bills online and review lab results through our Athenahealth patient portal at https://20314.portal.athenahealth.com/. You can also download our mobile app at https://synergyhealth360.repeatmd.app.'
  }
];

export const VERIFIED_TESTIMONIALS = [
  {
    quote: 'Dr. Jain was thorough, compassionate and provided me with treatments in line with my philosophy of care.',
    author: 'Sylvia B.',
    location: 'Scottsdale Patient',
    verified: true
  },
  {
    quote: 'Dr. Jain and his staff were extremely professional, prompt and pleasant… Top notch experiences!',
    author: 'Harry B.',
    location: 'Scottsdale Patient',
    verified: true
  },
  {
    quote: 'The staff and MD was super efficient and knowledgeable… top notch.',
    author: 'Russell B.',
    location: 'Phoenix Valley Patient',
    verified: true
  }
];

// Safety emergency word list for triage before LLM invocation
export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'heart attack',
  'cant breathe',
  "can't breathe",
  'difficulty breathing',
  'shortness of breath',
  'stroke',
  'numbness on one side',
  'slurred speech',
  'suicide',
  'kill myself',
  'end my life',
  'overdose',
  'poisoning',
  'severe bleeding',
  'unconscious',
  'passed out',
  'seizure'
];

export function checkEmergencySafety(message: string): boolean {
  const normalized = message.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => normalized.includes(kw));
}
