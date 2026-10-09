import React, { useState } from 'react';
import { ArrowUpRight, Phone, ShieldCheck } from 'lucide-react';
import { AiComplianceModal } from './AiComplianceModal';

export const Footer: React.FC = () => {
  const [complianceOpen, setComplianceOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#1C2C28] text-[#F3F3EF] pt-16 pb-12 transition-colors">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-12">
          {/* Urgent Emergency & Crisis Banner */}
          <div className="p-4 sm:p-5 rounded-lg border border-white/15 bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13.5px] text-[#F3F3EF]/90">
            <div>
              <strong>Emergency?</strong> Call 911.{' '}
              <span className="opacity-40 mx-2">|</span>
              <strong>Crisis?</strong> Call or text 988.
            </div>
            <span className="text-[12px] font-mono text-white/50">
              24/7 National Emergency Services (EMTALA)
            </span>
          </div>

          {/* Main Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
            {/* Brand & Narrative */}
            <div className="md:col-span-5 space-y-4">
              <img
                src="/images/synergy_footer_logo.png"
                alt="Synergy Health 360"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
                referrerPolicy="no-referrer"
              />
              <p className="text-[14px] text-white/70 max-w-sm leading-relaxed">
                Personalized, patient-centered primary care and integrative health in Scottsdale, Arizona.
                Dedicated to unhurried consultations, preventive longevity, and patient data confidentiality.
              </p>
              <div className="pt-1 text-[12.5px] font-mono text-[#86A99A]">
                Scottsdale (Desert Cove & Kierland) • Greater Phoenix
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-3 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                Clinic
              </p>
              <ul className="space-y-1.5 text-[14px] text-white/80">
                <li>
                  <a href="#services" className="hover:text-[#86A99A] transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#membership" className="hover:text-[#86A99A] transition-colors">
                    Membership
                  </a>
                </li>
                <li>
                  <a href="#approach" className="hover:text-[#86A99A] transition-colors">
                    Our Approach
                  </a>
                </li>
                <li>
                  <a href="#provider" className="hover:text-[#86A99A] transition-colors">
                    Providers
                  </a>
                </li>
                <li>
                  <a href="#locations" className="hover:text-[#86A99A] transition-colors">
                    Locations
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct Portals & Phone */}
            <div className="md:col-span-4 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                Patient Access & Legal
              </p>
              <ul className="space-y-2 text-[14px] text-white/80">
                <li>
                  <a
                    href="https://20314.portal.athenahealth.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#86A99A] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Athenahealth Patient Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setComplianceOpen(true)}
                    className="hover:text-[#86A99A] text-left transition-colors inline-flex items-center gap-1.5 cursor-pointer text-[#86A99A]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AI Governance & Legal Disclosures</span>
                  </button>
                </li>
                <li className="pt-2 text-white/70 font-mono text-[13px] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#86A99A]" />
                  <a href="tel:4805536168" className="hover:underline">
                    480-553-6168
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/50">
            <p>© 2026 Synergy Health 360°. All rights reserved. Zero-PHI Architecture.</p>
            <div className="flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => setComplianceOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                HIPAA & Privacy Notice
              </button>
              <button
                type="button"
                onClick={() => setComplianceOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                State AI Disclosures
              </button>
              <button
                type="button"
                onClick={() => setComplianceOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                HHS 1557 & ADA
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AiComplianceModal
        isOpen={complianceOpen}
        onClose={() => setComplianceOpen(false)}
      />
    </>
  );
};
