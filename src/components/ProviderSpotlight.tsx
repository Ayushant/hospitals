import React from 'react';
import { Headphones, ArrowRight } from 'lucide-react';

export const ProviderSpotlight: React.FC = () => {
  return (
    <section id="provider" className="py-20 md:py-28 bg-[#E9ECE7] transition-colors border-t border-[#D9DED8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Doctor Photography & Credentials */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[#D9DED8] bg-[#FFFFFF] overflow-hidden shadow-xs">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] bg-[#E9ECE7]">
                <img
                  src="/images/dr_vin_jain_doctor.jpg"
                  alt="Dr. Vinamra Jain, MD - Integrative Wellness and Primary Care Physician at Synergy Health 360"
                  className="w-full h-full object-cover object-top filter saturate-[0.98]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#245C50] text-white text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded">
                  Lead Physician
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-2xl font-serif font-normal text-[#24332F]">
                    Dr. Vinamra Jain, MD
                  </h3>
                  <p className="text-[14px] text-[#245C50] font-medium">
                    Integrative Wellness & Primary Care Physician
                  </p>
                </div>
                <p className="text-[13px] text-[#66716C] leading-relaxed">
                  Trained under Dr. Andrew Weil at the University of Arizona Integrative Medicine Fellowship.
                </p>
                <div className="text-[11px] font-mono text-[#66716C] tracking-wider pt-3 border-t border-[#D9DED8]">
                  BOARD-CERTIFIED • ABFM • ACP • AAFP
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Podcast Link */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
                05 / Provider Spotlight
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
                Dr. Vin Jain, MD
              </h2>
            </div>

            <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
              Dr. Vin Jain leads the clinical team at Synergy Health 360, practicing comprehensive
              primary care with an unhurried, patient-centered focus on chronic disease management,
              preventive screenings, and whole-person wellness.
            </p>

            <p className="text-[15px] text-[#66716C] leading-relaxed">
              Dr. Jain was featured discussing personalized primary medicine, the value of deep clinical listening,
              and proactive wellness on the:
            </p>

            <div className="pt-2">
              <a
                href="https://20314.portal.athenahealth.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-[#245C50] hover:text-[#1C493F] underline underline-offset-4 transition-colors"
              >
                <Headphones className="w-4 h-4" />
                <span>Health Future podcast with Bob Roth →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
