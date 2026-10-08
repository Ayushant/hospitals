import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const MembershipSection: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number>(3);

  const benefits = [
    'Priority scheduling with expedited calendar access',
    'Guaranteed same-week appointment with your provider',
    'Longer, extended visits with unhurried clinical listening',
    'Direct access to your dedicated care team',
    'Advanced health screenings and diagnostic tests included',
    '24-hour medical support for after-hours clinical guidance',
    'Exclusive member savings across all specialized clinic services'
  ];

  // Standard non-member fee-for-service ~$210 per unhurried appointment & lab coordination
  const feeForServiceCost = visitCount * 210;
  const annualMembershipCost = 999;
  const savings = feeForServiceCost - annualMembershipCost;

  return (
    <section id="membership" className="py-20 md:py-28 bg-[#F3F3EF] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18 space-y-3">
          <div className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
            02 / InstaCare 360
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
            More access. <br />More continuity.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
            An ongoing relationship designed for patients who prioritize direct physician access,
            extended consultation times, and proactive preventive stewardship.
          </p>
        </div>

        {/* White Content Surface Box (Refined Contrast against Light Grey) */}
        <div className="bg-[#FFFFFF] rounded-xl border border-[#D9DED8] p-8 sm:p-12 shadow-xs space-y-12">
          {/* Editorial Split Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Pricing & Enrollment Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Annual Plan (Featured) */}
              <div className="p-6 sm:p-7 rounded-lg bg-[#F3F3EF] border border-[#D9DED8] space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
                  <span className="text-[#245C50] font-semibold">Annual Plan</span>
                  <span className="text-[#66716C]">Limited-time offer</span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-serif font-normal text-[#24332F]">
                      $999
                    </span>
                    <span className="text-[14px] text-[#66716C]">/ year</span>
                  </div>
                  <p className="text-[13px] text-[#66716C] pt-1">
                    First-come, first-served. Complete peace of mind with guaranteed same-week booking and advanced screenings.
                  </p>
                </div>

                <a
                  href="https://20314.portal.athenahealth.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 min-h-[44px] text-[14px] font-medium text-white bg-[#245C50] hover:bg-[#1C493F] rounded-md transition-colors text-center"
                >
                  <span>Enroll in Annual Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Monthly Plan */}
              <div className="p-6 rounded-lg border border-[#D9DED8] space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#66716C]">
                  <span className="uppercase">Monthly Plan</span>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-serif font-normal text-[#24332F]">
                    $99
                  </span>
                  <span className="text-[13px] text-[#66716C]">/ month</span>
                </div>
                <p className="text-[13px] text-[#66716C]">
                  Flexible month-to-month access to our dedicated care team and priority booking.
                </p>
                <div className="pt-1">
                  <a
                    href="https://20314.portal.athenahealth.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-[#245C50] hover:underline"
                  >
                    <span>Enroll Monthly →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Benefits Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-5 lg:pl-2">
              <h3 className="text-2xl font-serif font-normal text-[#24332F]">
                Included Membership Privileges
              </h3>

              <div className="divide-y divide-[#D9DED8] border-t border-b border-[#D9DED8]">
                {benefits.map((benefit, i) => (
                  <div key={i} className="py-3.5 flex items-start gap-3.5">
                    <Check className="w-4 h-4 text-[#245C50] shrink-0 mt-0.5" />
                    <span className="text-[14.5px] text-[#24332F]/85 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[12px] text-[#66716C] pt-1 italic">
                *InstaCare 360 is a direct clinic membership program. Specialized surgical procedures and outside hospital care may be billed separately to insurance.
              </p>
            </div>
          </div>

          {/* Interactive Membership Estimator Utility */}
          <div className="pt-8 border-t border-[#D9DED8]">
            <div className="max-w-2xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h4 className="text-[18px] font-serif font-normal text-[#24332F]">
                    Is membership worth it for me?
                  </h4>
                  <p className="text-[13.5px] text-[#66716C]">
                    How many visits do you expect per year?
                  </p>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#66716C] bg-[#F3F3EF] px-2.5 py-1 rounded-sm self-start sm:self-auto">
                  Estimate only
                </span>
              </div>

              {/* Selector Buttons: 1, 2, 3, 4, 5+ */}
              <div className="flex items-center gap-2.5">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setVisitCount(count)}
                    className={`w-12 h-10 rounded-md text-[13px] font-mono transition-all cursor-pointer ${
                      visitCount === count
                        ? 'bg-[#245C50] text-white font-medium'
                        : 'bg-[#F3F3EF] text-[#24332F] border border-[#D9DED8] hover:border-[#245C50]'
                    }`}
                  >
                    {count === 5 ? '5+' : count}
                  </button>
                ))}
              </div>

              {/* Comparison Output (Understandable in < 5 seconds) */}
              <div className="p-4 rounded-md bg-[#F3F3EF] border border-[#D9DED8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13.5px]">
                <div>
                  <p className="text-[#24332F]">
                    Estimated standard cost ({visitCount} visits):{' '}
                    <strong className="font-mono">${feeForServiceCost}</strong>
                  </p>
                  <p className="text-[12.5px] text-[#66716C] pt-0.5">
                    {visitCount >= 4 ? (
                      <span className="text-[#245C50] font-medium">
                        Annual membership saves approx. ${savings} while adding guaranteed same-week access.
                      </span>
                    ) : (
                      <span>
                        Membership provides priority calendar reservations, extended visit times, and 24h support.
                      </span>
                    )}
                  </p>
                </div>

                <a
                  href="https://20314.portal.athenahealth.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-[#245C50] hover:underline whitespace-nowrap"
                >
                  Join InstaCare →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
