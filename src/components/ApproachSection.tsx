import React from 'react';
import { WindingPathSvg } from './illustrations/WindingPathSvg';

export const ApproachSection: React.FC = () => {
  return (
    <section id="approach" className="py-20 md:py-28 bg-[#F3F3EF] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Substantial Supporting Visual */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-[#D9DED8] bg-[#E9ECE7] p-8 sm:p-10 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#66716C] tracking-wider uppercase">
                <span>The 360° Care Journey</span>
                <span>Mind · Body · Longevity</span>
              </div>
              <WindingPathSvg className="w-full h-auto max-h-[360px]" />
              <div className="pt-2 text-center text-[12px] font-mono text-[#66716C]">
                Primary Care → Integrated Specialists → Prevention → Wellness
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
                04 / Our Approach
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
                A more connected <br />way to care.
              </h2>
            </div>

            <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
              At Synergy Health 360, your primary care physician acts as your dedicated clinical partner,
              coordinating a personalized wellness plan directly with an integrated network of on-site and
              telemedicine specialists.
            </p>

            <div className="space-y-4 border-l-2 border-[#245C50]/30 pl-5 text-[14.5px] text-[#66716C] leading-relaxed">
              <p>
                <strong className="text-[#24332F] font-medium">Preventive Health:</strong>{' '}
                Proactive screening and continuous baseline biomarker monitoring to detect health risks early.
              </p>
              <p>
                <strong className="text-[#24332F] font-medium">Chronic Disease Management:</strong>{' '}
                Structured protocols for hypertension, diabetes, and cardiovascular concerns with unhurried appointments.
              </p>
              <p>
                <strong className="text-[#24332F] font-medium">Whole-Person Wellness:</strong>{' '}
                Recognizing the interplay between physical vitality, emotional resilience, and lifestyle determinants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
