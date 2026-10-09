import React from 'react';
import { X, ShieldCheck, FileText, AlertCircle, Phone, Lock, EyeOff } from 'lucide-react';
import { LEGAL_DISCLOSURES } from '../lib/hipaa-guard';

interface AiComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiComplianceModal: React.FC<AiComplianceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compliance-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-[#D9DED8] shadow-2xl flex flex-col overflow-hidden text-[#24332F]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#D9DED8] bg-[#F3F3EF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#245C50]/10 flex items-center justify-center text-[#245C50]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="compliance-modal-title" className="text-xl font-serif font-normal text-[#24332F]">
                AI Governance & Legal Disclosures
              </h2>
              <p className="text-xs text-[#66716C] font-mono">
                HIPAA · FTC · HHS §1557 · TX/CA/UT AI Acts · ADA · AZ A.R.S. § 18-551
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close legal disclosures modal"
            className="p-2 rounded-lg text-[#66716C] hover:text-[#24332F] hover:bg-[#D9DED8]/50 focus-visible:ring-2 focus-visible:ring-[#245C50] focus-visible:outline-hidden transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed">
          {/* Urgent Medical Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-[#C47B60]/10 border border-[#C47B60]/30 text-[#24332F] space-y-2">
            <div className="flex items-center gap-2 font-medium text-[#C47B60]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Medical & Emergency Disclaimer</span>
            </div>
            <p className="text-xs text-[#66716C]">
              This automated system is an informational clinic navigation aid. It is <strong>NOT a doctor or healthcare provider</strong> and cannot provide medical diagnoses, treatment plans, or emergency triage. For medical emergencies, call <strong>911</strong> immediately. For mental health distress or crisis, call or text <strong>988</strong>.
            </p>
          </div>

          {/* Detailed Legal Disclosures Accordion/Cards */}
          <div className="space-y-4">
            {/* 1. HIPAA & Zero-PHI */}
            <div className="p-4 rounded-xl border border-[#D9DED8] bg-[#F3F3EF]/50 space-y-1.5">
              <div className="flex items-center gap-2 text-[#245C50] font-medium">
                <Lock className="w-4 h-4" />
                <span>{LEGAL_DISCLOSURES.hipaa.title}</span>
              </div>
              <div className="text-[11px] font-mono text-[#66716C]">
                {LEGAL_DISCLOSURES.hipaa.statute}
              </div>
              <p className="text-xs text-[#66716C] pt-1">
                {LEGAL_DISCLOSURES.hipaa.summary}
              </p>
            </div>

            {/* 2. State AI Disclosures (TX, CA, UT) */}
            <div className="p-4 rounded-xl border border-[#D9DED8] bg-[#F3F3EF]/50 space-y-1.5">
              <div className="flex items-center gap-2 text-[#245C50] font-medium">
                <EyeOff className="w-4 h-4" />
                <span>{LEGAL_DISCLOSURES.stateAi.title}</span>
              </div>
              <div className="text-[11px] font-mono text-[#66716C]">
                {LEGAL_DISCLOSURES.stateAi.statute}
              </div>
              <p className="text-xs text-[#66716C] pt-1">
                {LEGAL_DISCLOSURES.stateAi.summary}
              </p>
            </div>

            {/* 3. HHS Section 1557 Rule */}
            <div className="p-4 rounded-xl border border-[#D9DED8] bg-[#F3F3EF]/50 space-y-1.5">
              <div className="flex items-center gap-2 text-[#245C50] font-medium">
                <FileText className="w-4 h-4" />
                <span>{LEGAL_DISCLOSURES.hhs1557.title}</span>
              </div>
              <div className="text-[11px] font-mono text-[#66716C]">
                {LEGAL_DISCLOSURES.hhs1557.statute}
              </div>
              <p className="text-xs text-[#66716C] pt-1">
                {LEGAL_DISCLOSURES.hhs1557.summary}
              </p>
            </div>

            {/* 4. FTC Act & Health Breach Notification Rule */}
            <div className="p-4 rounded-xl border border-[#D9DED8] bg-[#F3F3EF]/50 space-y-1.5">
              <div className="flex items-center gap-2 text-[#245C50] font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{LEGAL_DISCLOSURES.ftc.title}</span>
              </div>
              <div className="text-[11px] font-mono text-[#66716C]">
                {LEGAL_DISCLOSURES.ftc.statute}
              </div>
              <p className="text-xs text-[#66716C] pt-1">
                {LEGAL_DISCLOSURES.ftc.summary}
              </p>
            </div>

            {/* 5. Arizona Privacy Law & ADA WCAG 2.1 AA */}
            <div className="p-4 rounded-xl border border-[#D9DED8] bg-[#F3F3EF]/50 space-y-1.5">
              <div className="flex items-center gap-2 text-[#245C50] font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{LEGAL_DISCLOSURES.arizona.title} & {LEGAL_DISCLOSURES.ada.title}</span>
              </div>
              <div className="text-[11px] font-mono text-[#66716C]">
                {LEGAL_DISCLOSURES.arizona.statute} · {LEGAL_DISCLOSURES.ada.statute}
              </div>
              <p className="text-xs text-[#66716C] pt-1">
                {LEGAL_DISCLOSURES.arizona.summary} {LEGAL_DISCLOSURES.ada.summary}
              </p>
            </div>
          </div>

          {/* Human Clinician Access Directive */}
          <div className="p-4 rounded-xl border border-[#245C50]/30 bg-[#245C50]/5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#245C50]">Prefer to speak with our clinical staff?</p>
              <p className="text-xs text-[#66716C]">Call our Scottsdale clinic during office hours or book online.</p>
            </div>
            <a
              href="tel:4805536168"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#245C50] rounded-md hover:bg-[#1C493F] transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>480-553-6168</span>
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#D9DED8] bg-[#F3F3EF] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-[#245C50] hover:bg-[#1C493F] rounded-md transition-colors"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};
