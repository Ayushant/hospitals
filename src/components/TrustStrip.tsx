import React from 'react';

/**
 * TrustStrip: Understated horizontal strip immediately after the hero
 * Uses small, elegant typography and hairline separators on #F3F3EF.
 * NOT four cards or badges.
 */
export const TrustStrip: React.FC = () => {
  return (
    <section className="border-t border-b border-[#D9DED8] bg-[#F3F3EF] py-6 sm:py-7">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-5">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-y-3 gap-x-6 text-[12px] sm:text-[13px] font-medium tracking-[0.14em] uppercase text-[#66716C] text-center">
          <span className="text-[#24332F]">Same-day appointments</span>
          <span className="hidden md:inline text-[#D9DED8] select-none">|</span>
          <span>Board-certified providers</span>
          <span className="hidden md:inline text-[#D9DED8] select-none">|</span>
          <span>Telehealth available</span>
          <span className="hidden md:inline text-[#D9DED8] select-none">|</span>
          <span>Serving Greater Phoenix</span>
        </div>

        {/* Clinical Affiliations & Accreditations */}
        <div className="pt-3 border-t border-[#D9DED8]/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 grayscale hover:grayscale-0 transition-all">
          <img
            src="/images/accreditation_aafp.png"
            alt="American Academy of Family Physicians (AAFP)"
            className="h-7 sm:h-8 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <img
            src="/images/accreditation_acp.png"
            alt="American College of Physicians (ACP)"
            className="h-7 sm:h-8 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <img
            src="/images/accreditation_arizona.png"
            alt="Arizona Medical Association"
            className="h-7 sm:h-8 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <img
            src="/images/accreditation_swtrc.png"
            alt="Southwest Telehealth Resource Center"
            className="h-7 sm:h-8 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};
