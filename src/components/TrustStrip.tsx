import React from 'react';

/**
 * TrustStrip: Understated horizontal strip immediately after the hero
 * Uses small, elegant typography and hairline separators on #F3F3EF.
 * NOT four cards or badges.
 */
export const TrustStrip: React.FC = () => {
  return (
    <section className="border-t border-b border-[#D9DED8] bg-[#F3F3EF] py-5 sm:py-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-y-3 gap-x-6 text-[12px] sm:text-[13px] font-medium tracking-[0.14em] uppercase text-[#66716C] text-center">
          <span className="text-[#24332F]">Same-day appointments</span>
          <span className="hidden md:inline text-[#D9DED8] select-none">|</span>
          <span>Board-certified providers</span>
          <span className="hidden md:inline text-[#D9DED8] select-none">|</span>
          <span>Telehealth available</span>
          <span className="hidden md:inline text-[#D9DED8] select-none">|</span>
          <span>Serving Greater Phoenix</span>
        </div>
      </div>
    </section>
  );
};
