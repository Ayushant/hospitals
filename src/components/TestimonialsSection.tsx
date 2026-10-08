import React from 'react';
import { VERIFIED_TESTIMONIALS } from '../data/knowledge';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F3F3EF] transition-colors border-t border-[#D9DED8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
            06 / Patient Voices
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
            Patient reflections.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
            Verified experiences from patients receiving care at Synergy Health 360 in Scottsdale.
          </p>
        </div>

        {/* Editorial Quote Section with Generous Whitespace & Thin Dividers (NO fake stars or counts) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-t border-b border-[#D9DED8] py-12 md:py-16">
          {VERIFIED_TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="space-y-6 flex flex-col justify-between">
              <p className="text-[18px] sm:text-[19px] font-serif font-normal italic text-[#24332F] leading-[1.6]">
                "{item.quote}"
              </p>

              <div className="pt-4 border-t border-[#D9DED8]">
                <p className="text-[14px] font-medium text-[#245C50]">
                  {item.author}
                </p>
                <p className="text-[12px] text-[#66716C]">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
