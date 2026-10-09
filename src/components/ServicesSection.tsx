import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
  image?: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Primary & Senior Care',
    description: 'Routine physicals, chronic illness management (hypertension, diabetes), and unhurried clinical visits.',
    image: '/images/clinic_consultation.jpg'
  },
  {
    number: '02',
    name: 'Wound Care (Chronic & Diabetic)',
    description: 'Advanced clinical care and tissue healing protocols for stubborn, chronic, and diabetic wounds.',
    image: '/images/service_wound_care.jpg'
  },
  {
    number: '03',
    name: 'Medical Weight Loss',
    description: 'Physician-supervised medical weight management addressing metabolic factors and lifestyle guidance.',
    image: '/images/service_weight_loss.jpg'
  },
  {
    number: '04',
    name: 'Mental Wellness',
    description: 'Integrated behavioral health support coordinated directly with your primary care physician.',
    image: '/images/service_mental_wellness.jpg'
  },
  {
    number: '05',
    name: "Women's Health & HRT",
    description: 'Preventive wellness screenings, well-woman evaluations, and hormonal health support.',
    image: '/images/service_womens_health.jpg'
  },
  {
    number: '06',
    name: "Men's Health & Lifestyle",
    description: 'Cardiovascular screening, metabolic assessments, and proactive preventive physicals.'
  },
  {
    number: '07',
    name: 'Podiatry & Foot Care',
    description: 'Foot and ankle clinical care, diabetic foot evaluations, and gait coordination.'
  },
  {
    number: '08',
    name: 'Integrative Wellness & Aesthetics',
    description: 'Advanced non-invasive regenerative modalities, Emsella, and physician-supervised med-spa longevity.',
    image: '/images/service_integrative_wellness.jpg'
  },
  {
    number: '09',
    name: 'Acute & Same-Day Care',
    description: 'Same-day appointments for acute illness, respiratory infections, and minor health concerns.',
    image: '/images/service_acute_care.jpg'
  },
  {
    number: '10',
    name: 'Telehealth Consultations',
    description: 'Secure virtual video consultations for medication reviews, lab interpretations, and follow-ups.'
  }
];

export const ServicesSection: React.FC = () => {
  const [activeNumber, setActiveNumber] = useState<string | null>(null);

  const featuredHighlights = [
    {
      title: 'Wound Care',
      desc: 'Advanced tissue debridement & diabetic healing',
      image: '/images/service_wound_care.jpg',
      tag: 'Specialty Care'
    },
    {
      title: 'Medical Weight Loss',
      desc: 'Physician-supervised metabolic & nutrition plans',
      image: '/images/service_weight_loss.jpg',
      tag: 'Metabolic Health'
    },
    {
      title: 'Mental Wellness',
      desc: 'Integrated emotional health connected with primary care',
      image: '/images/service_mental_wellness.jpg',
      tag: 'Whole-Person'
    },
    {
      title: 'Integrative Wellness',
      desc: 'Longevity, regenerative therapy & med-spa',
      image: '/images/service_integrative_wellness.jpg',
      tag: 'Mind & Body'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-[#E9ECE7] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16 space-y-3">
          <div className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
            01 / Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
            Care for every stage of life.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
            Comprehensive primary care coordinated with integrated specialties under one network,
            ensuring unhurried attention and seamless continuity.
          </p>
        </div>

        {/* Featured Specialties Visual Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredHighlights.map((item, idx) => (
            <a
              key={idx}
              href="https://20314.portal.athenahealth.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl overflow-hidden border border-[#D9DED8] shadow-xs hover-shift transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#D9DED8]/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter saturate-[0.98]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#24332F]/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#24332F] group-hover:text-[#245C50] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#66716C] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D9DED8]/60 flex items-center justify-between text-xs font-medium text-[#245C50]">
                  <span>Book Consult</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Complete Spectrum of Care Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#66716C]">
            Full 360° Spectrum of Care
          </h3>
          <span className="text-xs text-[#66716C]">Scottsdale Clinics</span>
        </div>

        {/* Editorial Service Index (Stacked rows with thin dividers) */}
        <div className="border-t border-[#D9DED8] divide-y divide-[#D9DED8]">
          {SERVICES_DATA.map((service) => {
            const isHovered = activeNumber === service.number;

            return (
              <a
                key={service.number}
                href="https://20314.portal.athenahealth.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveNumber(service.number)}
                onMouseLeave={() => setActiveNumber(null)}
                className="group block py-5 sm:py-6.5 transition-colors hover:bg-white/50 -mx-4 px-4 rounded-md"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8">
                  {/* Service Number & Title */}
                  <div className="flex items-baseline gap-4 sm:gap-6 min-w-[280px]">
                    <span className="text-[13px] font-mono text-[#86A99A]">
                      {service.number}
                    </span>
                    <h3 className="text-[20px] sm:text-[22px] font-serif font-normal text-[#24332F] group-hover:text-[#245C50] transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  {/* Description & Restrained Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-6 flex-1 pl-7 md:pl-0">
                    <p className="text-[14px] sm:text-[15px] text-[#66716C] leading-relaxed max-w-xl">
                      {service.description}
                    </p>

                    <div className="shrink-0 text-[#245C50] pl-4 flex items-center">
                      <span className="text-[12px] font-medium hidden lg:inline mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Book
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[2px]" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 pt-6 border-t border-[#D9DED8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[#66716C]">
          <span>Over 25 clinical services available across our Scottsdale locations.</span>
          <a
            href="tel:4805536168"
            className="text-[#245C50] font-medium hover:underline"
          >
            Clinical questions: 480-553-6168 →
          </a>
        </div>
      </div>
    </section>
  );
};
