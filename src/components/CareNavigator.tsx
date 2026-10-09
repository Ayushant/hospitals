import React, { useState } from 'react';
import { navigateToService, NavigationResult } from '../lib/rag';
import { scrubPhi } from '../lib/hipaa-guard';
import { ArrowRight, CornerDownLeft, Shield, AlertTriangle, Lock } from 'lucide-react';

export const CareNavigator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NavigationResult | null>(null);
  const [phiNotice, setPhiNotice] = useState<string | null>(null);

  const examples = [
    'Foot wound not healing',
    'Lose weight',
    'Annual physical',
    'Anxiety or stress',
    'Telehealth consultation'
  ];

  const handleSearch = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // 1. HIPAA PHI Check
    const phiCheck = scrubPhi(trimmed);
    if (phiCheck.hasPhi) {
      setPhiNotice('HIPAA Privacy Shield: Personal identifiers were automatically removed. Do not submit medical records or personal health identifiers.');
    } else {
      setPhiNotice(null);
    }

    setLoading(true);
    try {
      const match = await navigateToService(phiCheck.sanitizedText);
      setResult(match);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <section className="py-20 md:py-28 bg-[#E9ECE7] transition-colors border-t border-[#D9DED8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl space-y-3 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
              03 / Find Your Care
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#245C50]/15 text-[#245C50] font-semibold border border-[#245C50]/20">
              AI Administrative Tool
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
            Not sure where to start?
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
            Describe your health goal or appointment need. Our AI care matcher suggests the most appropriate clinic department for scheduling.
          </p>
        </div>

        {/* Input Form with WCAG Accessible Controls */}
        <div className="max-w-2xl space-y-4">
          <form onSubmit={onSubmit} className="relative flex items-center">
            <label htmlFor="care-navigator-input" className="sr-only">
              Describe your care or appointment need
            </label>
            <input
              id="care-navigator-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What can we help you with? (e.g. routine checkup, wound healing...)"
              className="w-full px-5 py-4 pr-32 text-[15px] rounded-lg bg-[#FFFFFF] text-[#24332F] border border-[#D9DED8] focus:border-[#245C50] focus:ring-2 focus:ring-[#245C50]/20 outline-hidden transition-all placeholder:text-[#66716C]/60 shadow-xs"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 px-4 py-2.5 text-[13px] font-medium text-white bg-[#245C50] hover:bg-[#1C493F] rounded-md transition-colors disabled:opacity-40 flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#245C50]"
              aria-label="Find clinical service starting point"
            >
              {loading ? 'Reviewing...' : 'Find Care'}
              <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />
            </button>
          </form>

          {/* PHI warning if detected */}
          {phiNotice && (
            <div
              role="alert"
              className="p-3 rounded-lg bg-[#C47B60]/10 border border-[#C47B60]/40 text-[#24332F] text-xs flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-[#C47B60] shrink-0" />
              <span>{phiNotice}</span>
            </div>
          )}

          {/* Suggested Examples */}
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#66716C]">
            <span className="text-xs font-mono">Suggested:</span>
            {examples.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
                className="px-3 py-1 rounded-md bg-[#FFFFFF] border border-[#D9DED8] text-[#24332F] hover:border-[#245C50] hover:text-[#245C50] transition-colors cursor-pointer text-xs focus-visible:ring-2 focus-visible:ring-[#245C50]"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Recommendation Area */}
          {result && (
            <div
              className="mt-8 p-6 sm:p-7 rounded-xl border border-[#D9DED8] bg-[#FFFFFF] shadow-sm space-y-3 animate-in fade-in duration-200"
              role="region"
              aria-label="AI Care Navigation Result"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#66716C]">
                  Administrative Routing Match
                </span>
                <span className="text-[10px] font-mono text-[#245C50] bg-[#245C50]/10 px-2 py-0.5 rounded">
                  Non-Binding Suggestion
                </span>
              </div>
              <h3 className="text-2xl font-serif font-normal text-[#245C50]">
                {result.serviceName}
              </h3>
              <p className="text-[14.5px] text-[#66716C] leading-relaxed">
                {result.reason}
              </p>
              <div className="pt-3 border-t border-[#D9DED8]/60 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#245C50] hover:underline"
                >
                  <span>View {result.serviceName} details</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://20314.portal.athenahealth.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#245C50] rounded-md hover:bg-[#1C493F] transition-colors"
                >
                  Schedule Appointment
                </a>
              </div>
            </div>
          )}

          {/* Multi-Law & HIPAA Safe Harbor Disclaimer */}
          <div className="pt-3 p-3 rounded-lg bg-white/60 border border-[#D9DED8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-[#66716C]">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#245C50] shrink-0" />
              <span>
                <strong>Administrative matching only:</strong> Does not provide medical diagnoses or prescriptions.
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#245C50] font-mono text-[11px]">
              <Lock className="w-3 h-3" />
              <span>Zero-PHI Stored</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
