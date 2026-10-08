import React, { useState } from 'react';
import { navigateToService, NavigationResult } from '../lib/rag';
import { ArrowRight, CornerDownLeft, Shield } from 'lucide-react';

export const CareNavigator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NavigationResult | null>(null);

  const examples = [
    'Foot wound not healing',
    'Lose weight',
    'Annual physical'
  ];

  const handleSearch = async (text: string) => {
    if (!text.trim() || loading) return;
    setLoading(true);
    try {
      const match = await navigateToService(text);
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
          <div className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
            03 / Find Your Care
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
            Not sure where to start?
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
            Tell us what kind of care you're looking for.
          </p>
        </div>

        {/* Input Form with White Surface & Deep Green Action Button */}
        <div className="max-w-2xl space-y-4">
          <form onSubmit={onSubmit} className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What can we help you with?"
              className="w-full px-5 py-4 pr-32 text-[15px] rounded-md bg-[#FFFFFF] text-[#24332F] border border-[#D9DED8] focus:border-[#245C50] outline-none transition-colors placeholder:text-[#66716C]/60 shadow-xs"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2.5 px-4 py-2.5 text-[13px] font-medium text-white bg-[#245C50] hover:bg-[#1C493F] rounded-md transition-colors disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? 'Reviewing...' : 'Find Care'}
              <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />
            </button>
          </form>

          {/* Suggested Examples */}
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#66716C]">
            <span>Suggested:</span>
            {examples.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
                className="px-3 py-1 rounded-md bg-[#FFFFFF] border border-[#D9DED8] text-[#24332F] hover:border-[#245C50] transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Clean Recommendation Area */}
          {result && (
            <div className="mt-8 p-6 sm:p-7 rounded-md border border-[#D9DED8] bg-[#FFFFFF] shadow-xs space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#66716C]">
                Recommended Clinical Starting Point
              </span>
              <h3 className="text-2xl font-serif font-normal text-[#245C50]">
                {result.serviceName}
              </h3>
              <p className="text-[14.5px] text-[#66716C] leading-relaxed">
                {result.reason}
              </p>
              <div className="pt-2">
                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#245C50] hover:underline"
                >
                  <span>View {result.serviceName} details</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Visible Persistent Medical Disclaimer */}
          <div className="pt-3 flex items-center gap-2 text-[12px] text-[#66716C]">
            <Shield className="w-3.5 h-3.5 text-[#245C50] shrink-0" />
            <span>This guides you to a service. It does not diagnose.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
