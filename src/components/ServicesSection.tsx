import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Primary & Senior Care',
    description: 'Routine physicals, chronic illness management (hypertension, diabetes), and unhurried clinical visits.'
  },
  {
    number: '02',
    name: 'Wound Care',
    description: 'Advanced clinical care and tissue healing protocols for stubborn, chronic, and diabetic wounds.'
  },
  {
    number: '03',
    name: 'Weight Loss',
    description: 'Physician-supervised medical weight management addressing metabolic factors and lifestyle guidance.'
  },
  {
    number: '04',
    name: 'Mental Wellness',
    description: 'Integrated behavioral health support coordinated directly with your primary care physician.'
  },
  {
    number: '05',
    name: "Women's Health",
    description: 'Preventive wellness screenings, well-woman evaluations, and hormonal health support.'
  },
  {
    number: '06',
    name: "Men's Health",
    description: 'Cardiovascular screening, metabolic assessments, and proactive preventive physicals.'
  },
  {
    number: '07',
    name: 'Podiatry',
    description: 'Foot and ankle clinical care, diabetic foot evaluations, and gait coordination.'
  },
  {
    number: '08',
    name: 'Cardiology',
    description: 'Preventive cardiovascular screenings, diagnostic evaluations, and ongoing blood pressure care.'
  },
  {
    number: '09',
    name: 'Acute Care',
    description: 'Same-day appointments for acute illness, respiratory infections, and minor health concerns.'
  },
  {
    number: '10',
    name: 'Telehealth',
    description: 'Secure virtual video consultations for medication reviews, lab interpretations, and follow-ups.'
  },
  {
    number: '11',
    name: 'Aesthetics',
    description: 'Clinical skin therapies and aesthetic wellness delivered in a physician-supervised clinic.'
  }
];

export const ServicesSection: React.FC = () => {
  const [activeNumber, setActiveNumber] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#E9ECE7] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18 space-y-3">
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
