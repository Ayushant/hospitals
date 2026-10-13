import React, { useMemo, useState } from 'react';
import {
  FileDown,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Sparkles,
  CalendarCheck,
  Leaf,
  BadgeCheck,
  Loader2
} from 'lucide-react';
import { SERVICES_LIST, checkEmergencySafety } from '../data/knowledge';
import {
  VISIT_PREP_LIBRARY,
  WELLNESS_LIBRARY,
  WELLNESS_OPTIONS,
  MEMBERSHIP_SCENARIOS
} from '../data/toolkit-content';
import { scrubPhi } from '../lib/hipaa-guard';
import { generateToolkitPdf, ToolkitSection } from '../lib/pdf-generator';
import { AiComplianceModal } from './AiComplianceModal';

type ToolId = 'visit-prep' | 'wellness' | 'membership';

interface ToolDescriptor {
  id: ToolId;
  title: string;
  tagline: string;
  icon: React.ReactNode;
}

const TOOLS: ToolDescriptor[] = [
  {
    id: 'visit-prep',
    title: 'Visit Prep Checklist',
    tagline: 'A one-page list of what to bring and what to ask your doctor.',
    icon: <CalendarCheck className="w-4 h-4" />
  },
  {
    id: 'wellness',
    title: 'Wellness Habit Plan',
    tagline: 'Short, everyday habits around sleep, movement, nutrition or stress.',
    icon: <Leaf className="w-4 h-4" />
  },
  {
    id: 'membership',
    title: 'InstaCare Benefits Snapshot',
    tagline: 'A plain-English look at whether membership would make sense for you.',
    icon: <BadgeCheck className="w-4 h-4" />
  }
];

export const PatientToolkit: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>('visit-prep');
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [phiNotice, setPhiNotice] = useState<string | null>(null);
  const [emergency, setEmergency] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ---- Visit Prep state
  const [visitServiceId, setVisitServiceId] = useState<string>(SERVICES_LIST[0]?.id ?? 'primary-care');
  const [visitNote, setVisitNote] = useState('');

  // ---- Wellness state
  const [wellnessFocus, setWellnessFocus] = useState<string>(WELLNESS_OPTIONS[0].id);
  const [wellnessContext, setWellnessContext] = useState('');

  // ---- Membership state
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(['preventive']);

  const availablePrepServices = useMemo(
    () => SERVICES_LIST.filter((svc) => VISIT_PREP_LIBRARY[svc.id]),
    []
  );

  const runSafetyAndPhi = (text: string): { safe: boolean; cleaned: string } => {
    if (text.trim()) {
      if (checkEmergencySafety(text)) {
        setEmergency(true);
        setPhiNotice(null);
        setStatus(null);
        return { safe: false, cleaned: '' };
      }
    } else {
      setEmergency(false);
    }

    const phi = scrubPhi(text);
    if (phi.hasPhi) {
      setPhiNotice(
        phi.warningMessage ??
          'HIPAA Privacy Shield: Personal identifiers were automatically removed before this tool processed your note.'
      );
    } else {
      setPhiNotice(null);
    }
    return { safe: true, cleaned: phi.sanitizedText };
  };

  const generateVisitPrep = async () => {
    const service = SERVICES_LIST.find((s) => s.id === visitServiceId);
    const recipe = VISIT_PREP_LIBRARY[visitServiceId];
    if (!service || !recipe) return;

    const { safe, cleaned } = runSafetyAndPhi(visitNote);
    if (!safe) return;

    setLoading(true);
    setStatus(null);
    try {
      const sections: ToolkitSection[] = [
        {
          heading: 'What to bring',
          bullets: recipe.bringItems
        },
        {
          heading: 'Questions to ask Dr. Jain or your clinician',
          bullets: recipe.questionsForYourDoctor
        },
        {
          heading: 'The day of your visit',
          bullets: recipe.dayOfVisitNotes
        },
        {
          heading: 'After-visit follow-up',
          bullets: recipe.afterVisitFollowUp
        }
      ];
      if (cleaned) {
        sections.unshift({
          heading: 'Your note (sanitized, no PHI)',
          paragraphs: [cleaned]
        });
      }
      await generateToolkitPdf({
        toolName: 'Visit Prep Checklist',
        subtitle: `${service.name} · Scottsdale, AZ`,
        intro: `A small list to help you get the most out of your upcoming ${service.name.toLowerCase()} visit at Synergy Health 360. It isn’t a diagnosis or a treatment plan — bring it in, mark it up, and raise anything on it with your clinician in person.`,
        sections,
        generatedForLabel: 'Prepared for: You · No identifiers stored'
      });
      setStatus('Saved to your Downloads folder. Bring it to your appointment.');
    } catch (e) {
      setStatus('That didn’t go through. Call 480-553-6168 and the front desk will send you a printed copy.');
    } finally {
      setLoading(false);
    }
  };

  const generateWellness = async () => {
    const focus = WELLNESS_LIBRARY[wellnessFocus];
    if (!focus) return;

    const { safe, cleaned } = runSafetyAndPhi(wellnessContext);
    if (!safe) return;

    setLoading(true);
    setStatus(null);
    try {
      const sections: ToolkitSection[] = [
        {
          heading: `Why this focus: ${focus.focusName}`,
          paragraphs: [focus.rationale]
        },
        {
          heading: 'Daily habit checklist',
          bullets: focus.habits
        },
        {
          heading: 'What to track for 2–4 weeks',
          bullets: focus.trackMetrics
        },
        {
          heading: 'When to pause and call the clinic',
          bullets: focus.stopAndCallClinic
        }
      ];
      if (cleaned) {
        sections.unshift({
          heading: 'Your context (sanitized, no PHI)',
          paragraphs: [cleaned]
        });
      }
      await generateToolkitPdf({
        toolName: 'Wellness Habit Plan',
        subtitle: `${focus.focusName} · Non-diagnostic`,
        intro:
          'A short, everyday starter plan drawn from publicly available health guidance. It isn’t a diagnosis, a treatment plan, or a prescription. If you’re managing a chronic condition, are pregnant, or take prescription medications, run any new routine past your clinician first.',
        sections,
        generatedForLabel: 'Prepared for: You · No identifiers stored'
      });
      setStatus('Saved to your Downloads folder. Try one habit this week and tell us how it went.');
    } catch (e) {
      setStatus('That didn’t go through. Call 480-553-6168 and the front desk will send you a printed copy.');
    } finally {
      setLoading(false);
    }
  };

  const toggleScenario = (id: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const generateMembership = async () => {
    const chosen = MEMBERSHIP_SCENARIOS.filter((s) => selectedScenarios.includes(s.id));
    if (chosen.length === 0) {
      setStatus('Pick at least one situation so we can tailor the summary.');
      return;
    }
    setEmergency(false);
    setPhiNotice(null);

    setLoading(true);
    setStatus(null);
    try {
      const includedBenefits = [
        'Priority scheduling with your dedicated primary-care provider.',
        'Guaranteed same-week appointment with your provider.',
        'Longer, unhurried visits so there is time to listen.',
        'Direct access to the care team between visits.',
        'Advanced health screenings and diagnostic tests as clinically indicated.',
        '24-hour medical support line for members.',
        'Exclusive member savings on select services.'
      ];
      const standardBenefits = [
        'Call 480-553-6168 or book 24/7 through the Athenahealth patient portal.',
        'Walk-in availability during business hours (subject to capacity).',
        'Same-day appointments depending on provider schedule.',
        'Over 25 integrated services including Podiatry, Cardiology, Women’s Health, Men’s Health, Acute Care, Telehealth, and Clinical Aesthetics.',
        'Care from Dr. Vinamra Jain, MD and the licensed Synergy Health 360 team.'
      ];
      const fit = chosen
        .map((s) => `• ${s.label}`)
        .join('\n');

      const sections: ToolkitSection[] = [
        {
          heading: 'Situations you told us about',
          paragraphs: [fit]
        },
        {
          heading: 'Standard clinic access (available to everyone)',
          bullets: standardBenefits
        },
        {
          heading: 'InstaCare 360 membership — included benefits',
          bullets: includedBenefits
        },
        {
          heading: 'Pricing and terms (verified clinic data)',
          paragraphs: [
            'InstaCare 360 is offered at $99/month or $999/year as a limited-time, first-come-first-served offer. All medical decisions remain with the licensed Synergy Health 360 care team. Enrollment is voluntary and non-discriminatory.'
          ]
        },
        {
          heading: 'What to do next',
          bullets: [
            'Call 480-553-6168 to ask any specific question before enrolling.',
            'Compare your current primary-care access against the benefits above.',
            'Bring this PDF to your next visit if you want to discuss membership in person.'
          ]
        }
      ];

      await generateToolkitPdf({
        toolName: 'InstaCare Benefits Snapshot',
        subtitle: 'Membership vs. standard access · $99/mo or $999/yr',
        intro:
          'A side-by-side look at what every Synergy patient gets vs. what InstaCare 360 adds — so you can decide whether membership is worth it for your life right now. It isn’t a sales promise, a bill, or an insurance product. Pricing can change; please call 480-553-6168 to confirm before you enroll.',
        sections,
        generatedForLabel: 'Prepared for: You · No identifiers stored'
      });
      setStatus('Saved to your Downloads folder. Call 480-553-6168 with any membership question.');
    } catch (e) {
      setStatus('That didn’t go through. Call 480-553-6168 and the front desk will walk you through membership options.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-heading"
      className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#D9DED8] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="max-w-2xl space-y-3 mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
              04 / Patient Toolkit
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#245C50]/15 text-[#245C50] font-semibold border border-[#245C50]/20">
              Automated AI
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#245C50]/10 text-[#245C50] font-medium border border-[#245C50]/15 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Nothing you type leaves the browser
            </span>
          </div>
          <h2
            id="toolkit-heading"
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]"
          >
            Three small tools to help you walk into your next visit prepared.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
            Each one builds a Synergy-branded PDF on your own device so you can print it, bring it, or share it with family. Nothing you type is sent to Synergy or stored anywhere. The clinic logo, legal footer, and non-diagnostic framing are already built in — so you can hand the page to your doctor without second-guessing it.
          </p>
          <div className="flex items-center gap-3 pt-2 text-[12.5px]">
            <button
              type="button"
              onClick={() => setComplianceOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#245C50] font-medium hover:underline"
            >
              <ShieldCheck className="w-4 h-4" />
              View AI governance & legal disclosures
            </button>
          </div>
        </div>

        {/* Emergency banner intercept */}
        {emergency && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl border border-[#C47B60] bg-[#C47B60]/10 text-[#24332F] max-w-3xl"
          >
            <div className="flex items-center gap-2 font-semibold text-[#C47B60] text-sm">
              <AlertTriangle className="w-4 h-4" />
              EMTALA Emergency Clinical Directive
            </div>
            <p className="text-sm mt-1.5">
              Your note contained an emergency keyword. Call <strong>911</strong> immediately. For a mental-health crisis, call or text <strong>988</strong>. Do not wait for AI output.
            </p>
          </div>
        )}

        {/* Tool tabs */}
        <div
          role="tablist"
          aria-label="Patient Toolkit"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
        >
          {TOOLS.map((tool) => {
            const isActive = tool.id === activeTool;
            return (
              <button
                key={tool.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tool.id}`}
                id={`tab-${tool.id}`}
                onClick={() => {
                  setActiveTool(tool.id);
                  setStatus(null);
                  setPhiNotice(null);
                  setEmergency(false);
                }}
                className={`text-left p-4 rounded-xl border transition-all focus-visible:ring-2 focus-visible:ring-[#245C50] focus:outline-hidden cursor-pointer ${
                  isActive
                    ? 'border-[#245C50] bg-[#245C50]/5 shadow-xs'
                    : 'border-[#D9DED8] bg-[#F3F3EF]/40 hover:border-[#245C50]/60'
                }`}
              >
                <div className="flex items-center gap-2 text-[#245C50] font-medium text-[13px]">
                  <span
                    className={`w-6 h-6 rounded-md inline-flex items-center justify-center ${
                      isActive ? 'bg-[#245C50] text-white' : 'bg-[#245C50]/10 text-[#245C50]'
                    }`}
                  >
                    {tool.icon}
                  </span>
                  {tool.title}
                </div>
                <p className="text-xs text-[#66716C] mt-1.5 leading-relaxed">{tool.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* Tool panel */}
        <div
          role="tabpanel"
          id={`panel-${activeTool}`}
          aria-labelledby={`tab-${activeTool}`}
          className="rounded-2xl border border-[#D9DED8] bg-[#F3F3EF]/40 p-6 md:p-8 space-y-6"
        >
          {phiNotice && (
            <div
              role="status"
              className="p-3.5 rounded-lg bg-[#C47B60]/10 border border-[#C47B60]/40 text-[#24332F] text-xs flex items-start gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-[#C47B60] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-[#C47B60]">HIPAA Privacy Shield</p>
                <p className="text-[#66716C] leading-relaxed">{phiNotice}</p>
              </div>
            </div>
          )}

          {activeTool === 'visit-prep' && (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="toolkit-visit-service"
                  className="block text-[13px] font-medium text-[#24332F] mb-1.5"
                >
                  Which kind of visit are you getting ready for?
                </label>
                <select
                  id="toolkit-visit-service"
                  value={visitServiceId}
                  onChange={(e) => setVisitServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-[14px] rounded-lg bg-white border border-[#D9DED8] focus:border-[#245C50] focus:ring-2 focus:ring-[#245C50]/20 outline-hidden text-[#24332F]"
                >
                  {availablePrepServices.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="toolkit-visit-note"
                  className="block text-[13px] font-medium text-[#24332F] mb-1.5"
                >
                  One thing on your mind for this visit (optional)
                </label>
                <textarea
                  id="toolkit-visit-note"
                  value={visitNote}
                  onChange={(e) => setVisitNote(e.target.value.slice(0, 500))}
                  rows={3}
                  placeholder="e.g. I’d like to focus on preventive screenings this year."
                  className="w-full px-3.5 py-2.5 text-[14px] rounded-lg bg-white border border-[#D9DED8] focus:border-[#245C50] focus:ring-2 focus:ring-[#245C50]/20 outline-hidden text-[#24332F] placeholder:text-[#66716C]/60 resize-none"
                />
                <p className="text-[11px] text-[#66716C] mt-1">
                  Please leave out birthdays, SSNs, insurance IDs, and lab numbers. If any slip in, we scrub them before anything is written to the PDF.
                </p>
              </div>

              <button
                type="button"
                onClick={generateVisitPrep}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-[13.5px] font-medium text-white bg-[#245C50] hover:bg-[#1C493F] rounded-lg transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#245C50] focus-visible:ring-offset-2 cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                Build my prep sheet
              </button>
            </div>
          )}

          {activeTool === 'wellness' && (
            <div className="space-y-5">
              <fieldset>
                <legend className="block text-[13px] font-medium text-[#24332F] mb-2">
                  What would you like to work on first?
                </legend>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {WELLNESS_OPTIONS.map((opt) => {
                    const checked = wellnessFocus === opt.id;
                    return (
                      <label
                        key={opt.id}
                        className={`block cursor-pointer p-3 rounded-lg border transition-colors ${
                          checked
                            ? 'border-[#245C50] bg-[#245C50]/5'
                            : 'border-[#D9DED8] bg-white hover:border-[#245C50]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="wellness-focus"
                          value={opt.id}
                          checked={checked}
                          onChange={() => setWellnessFocus(opt.id)}
                          className="sr-only"
                        />
                        <div className="text-[13px] font-medium text-[#24332F]">{opt.label}</div>
                        <div className="text-[11.5px] text-[#66716C] mt-0.5">{opt.description}</div>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="toolkit-wellness-context"
                  className="block text-[13px] font-medium text-[#24332F] mb-1.5"
                >
                  Anything about your week we should know? (optional)
                </label>
                <textarea
                  id="toolkit-wellness-context"
                  value={wellnessContext}
                  onChange={(e) => setWellnessContext(e.target.value.slice(0, 500))}
                  rows={3}
                  placeholder="e.g. I work night shifts and want a sleep routine that fits."
                  className="w-full px-3.5 py-2.5 text-[14px] rounded-lg bg-white border border-[#D9DED8] focus:border-[#245C50] focus:ring-2 focus:ring-[#245C50]/20 outline-hidden text-[#24332F] placeholder:text-[#66716C]/60 resize-none"
                />
                <p className="text-[11px] text-[#66716C] mt-1">
                  Keep it general. If you include lab numbers or personal identifiers, we strip them before anything is written to the PDF.
                </p>
              </div>

              <button
                type="button"
                onClick={generateWellness}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-[13.5px] font-medium text-white bg-[#245C50] hover:bg-[#1C493F] rounded-lg transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#245C50] focus-visible:ring-offset-2 cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                Build my habit plan
              </button>
            </div>
          )}

          {activeTool === 'membership' && (
            <div className="space-y-5">
              <fieldset>
                <legend className="block text-[13px] font-medium text-[#24332F] mb-2">
                  Tell us a little about your situation (pick any that fit)
                </legend>
                <div className="space-y-2">
                  {MEMBERSHIP_SCENARIOS.map((s) => {
                    const checked = selectedScenarios.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          checked
                            ? 'border-[#245C50] bg-[#245C50]/5'
                            : 'border-[#D9DED8] bg-white hover:border-[#245C50]/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleScenario(s.id)}
                          className="mt-1 accent-[#245C50]"
                        />
                        <span className="text-[13.5px] text-[#24332F]">{s.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={generateMembership}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-[13.5px] font-medium text-white bg-[#245C50] hover:bg-[#1C493F] rounded-lg transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#245C50] focus-visible:ring-offset-2 cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                Build my snapshot
              </button>
            </div>
          )}

          {status && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-start gap-2 p-3 rounded-lg bg-[#245C50]/10 border border-[#245C50]/30 text-[12.5px] text-[#1C493F]"
            >
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#245C50]" />
              <span>{status}</span>
            </div>
          )}

          <p className="text-[11px] font-mono text-[#66716C] border-t border-[#D9DED8] pt-4">
            MANDATORY DISCLOSURE (CA AB 3030 · TX TRAIGA · UT AI Policy Act): You are interacting with an artificial intelligence system, not a human doctor. The output of this tool is not a diagnosis or prescription and is not a substitute for licensed clinical care from Dr. Vinamra Jain, MD or the Synergy Health 360 team. Call 480-553-6168 at any time to reach clinic staff.
          </p>
        </div>
      </div>

      <AiComplianceModal isOpen={complianceOpen} onClose={() => setComplianceOpen(false)} />
    </section>
  );
};
