import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 bg-[#F3F3EF] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (approximately 52% of space) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 max-w-[640px]">
            {/* Small eyebrow */}
            <div className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#245C50]">
              Personalized Primary Care · Scottsdale
            </div>

            {/* Headline (64–76px desktop, 2-3 intentional lines, deep forest charcoal text) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] leading-[1.08] font-serif font-normal text-[#24332F] tracking-[-0.03em]">
              Care that sees <br />
              the whole you.
            </h1>

            {/* Supporting copy (17–19px, calm, human) */}
            <p className="text-[17px] sm:text-[18px] md:text-[19px] text-[#66716C] leading-[1.65] max-w-[52ch]">
              Comprehensive primary care for individuals and families, with a doctor who listens.
            </p>

            {/* Actions: Primary button + Secondary text link */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href="https://20314.portal.athenahealth.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] text-[15px] font-medium tracking-wide text-white bg-[#245C50] hover:bg-[#1C493F] rounded-md hover-shift transition-all shadow-xs"
              >
                <span>Book a Visit</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </a>

              <a
                href="#approach"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#24332F] hover:text-[#245C50] transition-colors py-2"
              >
                <span>Explore our approach →</span>
              </a>
            </div>

            {/* Quiet care assistant helper link */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenChat}
                className="text-[13.5px] text-[#66716C] hover:text-[#245C50] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Have questions first? Ask our care assistant
              </button>
            </div>
          </div>

          {/* Right Column: Large, Authentic Healthcare Photography (48% space) */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-xl bg-[#E9ECE7] shadow-sm border border-[#D9DED8]">
              <img
                src="/images/clinic_consultation.jpg"
                alt="Doctor and patient in a thoughtful, unhurried consultation at Synergy Health 360 in Scottsdale"
                className="w-full h-auto aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] object-cover object-center filter saturate-[0.98]"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/92 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-[#D9DED8] text-[12.5px] text-[#24332F] flex items-center justify-between shadow-xs">
                <span className="font-medium">Dr. Vinamra Jain, MD & Care Team</span>
                <span className="text-[#245C50] font-mono text-[11px] uppercase tracking-wider">Scottsdale, AZ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
