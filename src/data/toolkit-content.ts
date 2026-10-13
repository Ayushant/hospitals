/**
 * Non-diagnostic, non-prescriptive content library for the AI Patient Toolkit.
 *
 * Every string here is a general wellness or clinic-navigation statement — the
 * sort of information a clinic receptionist or health educator can share without
 * practicing medicine. Nothing in this file suggests dosages, diagnoses,
 * individualized clinical decisions, or substitutions for licensed care, so the
 * resulting PDF stays inside HHS Section 1557, FTC Act, and state AI act limits
 * for AI-generated healthcare content.
 */

export interface VisitPrepRecipe {
  serviceId: string;
  bringItems: string[];
  questionsForYourDoctor: string[];
  dayOfVisitNotes: string[];
  afterVisitFollowUp: string[];
}

export const VISIT_PREP_LIBRARY: Record<string, VisitPrepRecipe> = {
  'primary-care': {
    serviceId: 'primary-care',
    bringItems: [
      'Photo ID and your current insurance card.',
      'A written list of every medication, supplement, and vitamin you take, including dose and how often.',
      'A list of any allergies to medications, foods, or environmental triggers.',
      'A short summary of your family medical history for first-degree relatives (parents, siblings, children).',
      'Any recent lab or imaging reports from outside providers (printed or on a portal).'
    ],
    questionsForYourDoctor: [
      'Based on my age and history, which preventive screenings are due this year?',
      'Are my current vaccinations up to date (flu, Tdap, shingles, pneumococcal, COVID-19, HPV)?',
      'What routine blood work would you recommend and when should it be drawn?',
      'If I feel tired or stressed, what lifestyle, sleep, and movement changes would you suggest first?',
      'How can I best coordinate care if I see specialists outside the clinic?'
    ],
    dayOfVisitNotes: [
      'Arrive 15 minutes early for check-in and insurance verification.',
      'Wear comfortable clothing that allows blood-pressure measurement on the upper arm.',
      'If fasting labs are planned, confirm with the clinic the night before.',
      'Bring a trusted family member or caregiver if you would like a second set of ears.'
    ],
    afterVisitFollowUp: [
      'Review the after-visit summary in your Athenahealth portal within 24 hours.',
      'Add any recommended screenings or follow-up appointments to your calendar.',
      'Fill or refill any prescribed items at your pharmacy and confirm instructions.',
      'Call the clinic at 480-553-6168 if anything in the summary is unclear.'
    ]
  },

  'wound-care': {
    serviceId: 'wound-care',
    bringItems: [
      'Photo ID and your current insurance card.',
      'A list of medications, especially blood thinners, insulin, or diabetes medications.',
      'Any wound-care supplies you have been using at home (dressings, ointments, offloading shoes).',
      'A short written timeline: when the wound started, any changes in size, odor, or drainage.',
      'Prior wound-related imaging, cultures, or lab reports if you have them.'
    ],
    questionsForYourDoctor: [
      'What is the most likely reason my wound is not healing on its own?',
      'How often should the dressing be changed, and what technique should I use at home?',
      'Which signs would mean I need to call the clinic sooner rather than wait?',
      'How should I protect the area from pressure, moisture, or re-injury between visits?',
      'If I have diabetes, how can I better coordinate blood-sugar goals with wound healing?'
    ],
    dayOfVisitNotes: [
      'Leave the wound covered unless the clinic has instructed you otherwise.',
      'Wear loose clothing or an easily removable shoe over the affected area.',
      'Bring a current list of your home blood-sugar readings if you check them.',
      'Avoid applying creams, powders, or lotions on the wound the morning of the visit.'
    ],
    afterVisitFollowUp: [
      'Follow the written dressing-change schedule exactly as given.',
      'Keep a daily photo log so changes are easy to describe at the next visit.',
      'Elevate and offload the affected area as directed.',
      'Call 480-553-6168 immediately for new fever, spreading redness, worsening pain, or heavy drainage.'
    ]
  },

  'weight-loss': {
    serviceId: 'weight-loss',
    bringItems: [
      'Photo ID and your current insurance card.',
      'A 3-day written food and drink log, including portion sizes and timings.',
      'A list of medications and supplements that may affect weight or appetite.',
      'Recent lab work if available (metabolic panel, lipid panel, A1C, thyroid studies).',
      'A note about your typical sleep hours and stress level for the past month.'
    ],
    questionsForYourDoctor: [
      'What is a reasonable, medically sound weight range for me and over what time horizon?',
      'Are there metabolic, hormonal, or medication factors worth checking before setting a plan?',
      'What everyday movement goals would be realistic for my current baseline?',
      'Which eating patterns are evidence-based and sustainable rather than restrictive?',
      'How will we measure progress other than the scale (energy, strength, lab markers)?'
    ],
    dayOfVisitNotes: [
      'Wear light clothing and shoes that are easy to slip off for body-composition measurements.',
      'Avoid heavy meals in the hour before the appointment if measurements will be taken.',
      'Bring a water bottle and arrive hydrated unless specifically asked to fast.',
      'Prepare one specific lifestyle change you would be willing to try first.'
    ],
    afterVisitFollowUp: [
      'Track food, movement, and sleep for the first two weeks after the visit.',
      'Schedule the recommended bi-weekly or monthly follow-up before you leave the clinic.',
      'Share your Athenahealth portal access with a family member for accountability if you want.',
      'Call the clinic if any new medication side effects or appetite changes occur.'
    ]
  },

  'mental-wellness': {
    serviceId: 'mental-wellness',
    bringItems: [
      'Photo ID and your current insurance card.',
      'A short description, in your own words, of what you have been feeling and for how long.',
      'A list of medications, including over-the-counter sleep aids and supplements.',
      'Notes about typical sleep hours, caffeine, alcohol, and screen-time patterns.',
      'The names of any therapists, counselors, or psychiatrists you have seen in the past.'
    ],
    questionsForYourDoctor: [
      'Which standardized screening tools (such as PHQ-9 or GAD-7) can we review together?',
      'What non-medication steps often help with sleep, mood, and stress first?',
      'If medication becomes relevant, what are the risks, benefits, and timelines to discuss?',
      'How can my primary care, mental wellness, and specialist referrals stay coordinated?',
      'What is the fastest route to help if I ever feel unsafe between appointments?'
    ],
    dayOfVisitNotes: [
      'Allow extra time; mental-wellness intake appointments usually run longer than a routine visit.',
      'Choose a quiet space before the visit to settle your thoughts.',
      'Bring a notebook — writing down what matters most to you helps the clinician listen.',
      'Have the 988 Suicide & Crisis Lifeline saved in your phone before the visit.'
    ],
    afterVisitFollowUp: [
      'Review the after-visit summary and clarify any medication or follow-up instructions.',
      'Add the next appointment to your calendar before you leave the clinic.',
      'Use the clinic portal to message your care team between visits for non-urgent questions.',
      'Call or text 988 immediately for any thought of self-harm. Call 911 for a life-threatening emergency.'
    ]
  },

  'womens-health': {
    serviceId: 'womens-health',
    bringItems: [
      'Photo ID and your current insurance card.',
      'The date of your most recent menstrual period, if applicable.',
      'A list of medications, hormonal therapies, and contraception you currently use.',
      'Prior mammogram, pap, bone-density, or hormonal panel reports if you have them.',
      'A short note about family history of breast, ovarian, uterine, or cardiovascular disease.'
    ],
    questionsForYourDoctor: [
      'Which preventive screenings are appropriate for my age and risk profile this year?',
      'If I am in perimenopause or menopause, what evidence-based options do we have for symptoms?',
      'How does cardiovascular risk shift at my stage of life and what should we monitor?',
      'What questions should I prepare for a reproductive-health or fertility conversation?',
      'How can bone, breast, and cardiovascular health be followed over time in one plan?'
    ],
    dayOfVisitNotes: [
      'Avoid using vaginal creams, douches, or spermicides for 24 hours before a pap exam.',
      'Wear comfortable, easily removable clothing.',
      'Bring a trusted companion to the visit if that will help you feel at ease.',
      'If a mammogram is planned, skip deodorant, lotion, and powder on the chest and underarms.'
    ],
    afterVisitFollowUp: [
      'Read the after-visit summary and confirm any next-screening dates.',
      'Add future screening reminders (annual well-woman, mammogram, bone density) to your calendar.',
      'Share results of outside labs or imaging with the clinic through your portal.',
      'Call the clinic promptly for any unexpected bleeding, lumps, or breast-skin changes.'
    ]
  },

  telehealth: {
    serviceId: 'telehealth',
    bringItems: [
      'Photo ID and your current insurance card ready to show on camera.',
      'A list of medications, supplements, and allergies.',
      'A home blood pressure, pulse oximeter, or thermometer reading if available.',
      'A clear question or goal written down to open the visit.',
      'Pen and paper for notes during the visit.'
    ],
    questionsForYourDoctor: [
      'Is my current issue appropriate to handle via telehealth or should I be seen in-clinic?',
      'What home measurements should I take and share before the next virtual visit?',
      'Are there over-the-counter options or lifestyle steps you would try first?',
      'When should I escalate from telehealth to an in-person or urgent-care visit?',
      'How do we route prescriptions, imaging orders, or lab orders securely to me?'
    ],
    dayOfVisitNotes: [
      'Test your camera, microphone, and portal login at least 15 minutes before the visit.',
      'Pick a quiet, well-lit, private room so the clinician can see and hear clearly.',
      'Keep your phone nearby in case the connection drops and the clinician calls you back.',
      'Have your prescription-filling pharmacy name and address handy.'
    ],
    afterVisitFollowUp: [
      'Download the after-visit summary from the Athenahealth portal.',
      'Fill or renew any prescriptions and confirm instructions with the pharmacy.',
      'Schedule any lab, imaging, or in-person follow-up before ending the virtual visit.',
      'Message the care team through the portal for non-urgent follow-up questions.'
    ]
  },

  podiatry: {
    serviceId: 'podiatry',
    bringItems: [
      'Photo ID and your current insurance card.',
      'The shoes you wear most often, including walking or athletic shoes.',
      'Any custom orthotics, braces, or offloading devices you use.',
      'Prior foot imaging or vascular studies if available.',
      'A list of medications, especially blood thinners and diabetes medications.'
    ],
    questionsForYourDoctor: [
      'What footwear or orthotic strategy would best fit my foot shape and daily activity?',
      'If I have diabetes, how often should my feet be inspected clinically?',
      'What home foot-check routine would catch problems early?',
      'How can podiatry, wound care, and primary care coordinate for my situation?',
      'What rehabilitation or activity schedule should I follow after this visit?'
    ],
    dayOfVisitNotes: [
      'Wear loose socks that are easy to remove.',
      'Trim toenails straight across the week before the visit, unless advised otherwise.',
      'Note any pain triggers (walking distance, specific shoes, surfaces).',
      'Bring a current list of blood-sugar readings if you track them.'
    ],
    afterVisitFollowUp: [
      'Follow the written offloading and footwear plan exactly.',
      'Inspect your feet daily and record any changes with a photo.',
      'Attend scheduled wound-care appointments without gaps if coordinated.',
      'Call the clinic for new redness, swelling, warmth, or any new wound.'
    ]
  }
};

export interface WellnessPlanContent {
  focusId: string;
  focusName: string;
  rationale: string;
  habits: string[];
  trackMetrics: string[];
  stopAndCallClinic: string[];
}

export const WELLNESS_LIBRARY: Record<string, WellnessPlanContent> = {
  sleep: {
    focusId: 'sleep',
    focusName: 'Restorative Sleep Habits',
    rationale:
      'Consistent sleep supports cardiovascular, metabolic, cognitive, and mood health. This checklist reflects general evidence-based sleep hygiene (CDC and American Academy of Sleep Medicine public guidance) and is not individualized medical advice.',
    habits: [
      'Choose a fixed wake-up time 7 days a week and keep it within a 30-minute window.',
      'Target 7–9 hours of sleep opportunity for most adults; adjust for your own baseline.',
      'Reserve the bedroom for sleep; move screens, work, and food elsewhere.',
      'Dim bright and blue-rich light in the final hour before bedtime.',
      'Avoid caffeine after early afternoon and limit alcohol close to bedtime.',
      'Keep the sleeping room cool, dark, and quiet; use blackout curtains or an eye mask if needed.',
      'Try a short wind-down ritual: shower, stretch, light reading, or breathing exercise.'
    ],
    trackMetrics: [
      'Lights-out time and wake-up time each day for 2 weeks.',
      'Caffeine and alcohol timing and quantity.',
      'How rested you feel on waking (1–5 scale).',
      'Daytime energy at midday (1–5 scale).'
    ],
    stopAndCallClinic: [
      'Loud snoring, witnessed pauses in breathing, or morning headaches that persist.',
      'Daytime sleepiness that affects driving, work, or school.',
      'Insomnia lasting more than 3 nights per week for over 3 weeks.',
      'New-onset nightmares, panic awakenings, or persistent low mood.'
    ]
  },

  movement: {
    focusId: 'movement',
    focusName: 'Daily Movement & Activity',
    rationale:
      'For most adults, regular activity reduces cardiovascular, metabolic, and mental-health risk. This checklist mirrors the U.S. Physical Activity Guidelines for Americans (2nd Edition, HHS) at a general-wellness level and is not a prescription or personalized clinical plan.',
    habits: [
      'Aim for 150 minutes of moderate activity each week, or 75 minutes of vigorous activity, spread across most days.',
      'Add muscle-strengthening activity for all major muscle groups on 2 or more days per week.',
      'Break up long sitting with 2–3 minute movement snacks every hour.',
      'Build in balance work (single-leg stance, heel-toe walk) 2 days per week if 65 or older.',
      'Walk briskly outside, use stairs when safe, and park farther from entrances.',
      'Choose activities you enjoy enough to repeat for at least 8 weeks.',
      'Progress by 10% per week; back off and recover if soreness is sharp or lasts over 48 hours.'
    ],
    trackMetrics: [
      'Weekly minutes of moderate and vigorous activity.',
      'Days per week with any strength training.',
      'Average daily steps or active minutes.',
      'Resting heart rate on waking, once per week.'
    ],
    stopAndCallClinic: [
      'Chest pain, pressure, or tightness with exertion — stop and call 911.',
      'Unusual shortness of breath, dizziness, or fainting with activity.',
      'Joint pain that worsens with each session or does not improve with rest.',
      'A fall with injury, or increasing fear of falling.'
    ]
  },

  nutrition: {
    focusId: 'nutrition',
    focusName: 'Balanced Everyday Nutrition',
    rationale:
      'This is general nutrition information drawn from the Dietary Guidelines for Americans. It is not a weight-loss prescription, elimination diet, or medical nutrition therapy. Individualized plans belong with your physician and, when needed, a registered dietitian.',
    habits: [
      'Fill about half of each plate with vegetables and fruit.',
      'Choose whole grains more often than refined grains.',
      'Include a lean protein source at most meals (fish, poultry, beans, tofu, eggs).',
      'Favor water as your default beverage; limit sugar-sweetened drinks.',
      'Watch sodium intake; aim for under 2,300 mg per day for most adults.',
      'Plan simple, repeatable breakfasts and lunches to reduce decision fatigue.',
      'Keep two shelf-stable fallback meals at home for busy weeknights.'
    ],
    trackMetrics: [
      'Vegetable and fruit servings per day.',
      'Sugar-sweetened beverages per week.',
      'Approximate daily water intake.',
      'Hunger and energy level before and after meals (1–5 scale).'
    ],
    stopAndCallClinic: [
      'Unintentional weight loss of more than 5% of body weight in 6 months.',
      'Difficulty swallowing, early fullness, or persistent abdominal pain.',
      'Fainting, lightheadedness, or heart palpitations with normal eating.',
      'A new or worsening chronic condition (diabetes, kidney, heart) that may need medical nutrition therapy.'
    ]
  },

  stress: {
    focusId: 'stress',
    focusName: 'Stress & Resilience Routines',
    rationale:
      'Short daily practices can help regulate the stress response. This is a general resilience checklist, not treatment for an anxiety or trauma-related disorder, and does not replace care with a licensed mental-health professional.',
    habits: [
      'Protect 10–15 quiet minutes each day for slow breathing, prayer, meditation, or journaling.',
      'Spend 20+ minutes outside in daylight when possible.',
      'Keep one weekly social contact that is purely for connection, not errands.',
      'Set a daily "shutdown" time for work notifications.',
      'Pair hard tasks with brief recovery (90 min focus, 10 min reset).',
      'Limit doomscrolling by removing news apps from the home screen or using screen-time limits.',
      'Make sleep the first lever you adjust during a stressful stretch.'
    ],
    trackMetrics: [
      'Daily stress rating in the morning and evening (1–5 scale).',
      'Minutes of outside or screen-free time per day.',
      'Weekly count of social connection moments.',
      'How well you slept the previous night (1–5 scale).'
    ],
    stopAndCallClinic: [
      'Persistent low mood, loss of interest, or hopelessness for 2+ weeks.',
      'Panic episodes that disrupt daily function.',
      'Any thought of self-harm or harming others — call or text 988 immediately. Call 911 if there is a safety risk.',
      'Increased reliance on alcohol, substances, or binge eating to cope.'
    ]
  }
};

export const WELLNESS_OPTIONS = [
  { id: 'sleep', label: 'Restorative sleep', description: 'Build a consistent, higher-quality sleep routine.' },
  { id: 'movement', label: 'Daily movement', description: 'Add realistic activity most days of the week.' },
  { id: 'nutrition', label: 'Balanced nutrition', description: 'General plate-shape and beverage habits.' },
  { id: 'stress', label: 'Stress & resilience', description: 'Short practices that regulate the stress response.' }
];

export const MEMBERSHIP_SCENARIOS = [
  { id: 'frequent', label: 'I visit the clinic several times a year.' },
  { id: 'chronic', label: 'I manage an ongoing condition such as high blood pressure or diabetes.' },
  { id: 'preventive', label: 'I want same-week preventive and screening visits.' },
  { id: 'telehealth', label: 'I need secure virtual visits plus the option of in-person care.' },
  { id: 'family', label: 'I coordinate care for a parent or dependent.' }
];
