import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/knowledge';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F3F3EF] transition-colors border-t border-[#D9DED8]">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="mb-14 space-y-3">
          <div className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
            08 / Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
            Frequently asked questions.
          </h2>
        </div>

        {/* Accessible Accordion (Question + / - format) */}
        <div className="divide-y divide-[#D9DED8] border-t border-b border-[#D9DED8]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const btnId = `faq-q-${idx}`;
            const pnlId = `faq-a-${idx}`;

            return (
              <div key={idx} className="py-5 sm:py-6">
                <button
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={pnlId}
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C50] rounded-sm transition-colors cursor-pointer group"
                >
                  <span className="text-[18px] sm:text-[19px] font-serif font-normal text-[#24332F] group-hover:text-[#245C50] transition-colors">
                    {item.question}
                  </span>
                  <span className="text-[#245C50] shrink-0 text-xl font-mono font-light select-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={pnlId}
                    role="region"
                    aria-labelledby={btnId}
                    className="mt-3 pr-8 text-[15px] text-[#66716C] leading-relaxed animate-in fade-in duration-150"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-[13.5px] text-[#66716C]">
          Have additional questions? Call our clinic desk directly at{' '}
          <a href="tel:4805536168" className="text-[#245C50] font-medium hover:underline">
            480-553-6168
          </a>
          .
        </div>
      </div>
    </section>
  );
};
