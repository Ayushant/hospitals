import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavProps {
  onOpenChat: () => void;
}

export const Nav: React.FC<NavProps> = ({ onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F3F3EF]/95 backdrop-blur-md border-b border-[#D9DED8] transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-20 md:h-[84px] flex items-center justify-between">
        {/* Left: Wordmark */}
        <a
          href="#"
          className="text-2xl md:text-[1.65rem] font-serif font-normal tracking-[-0.02em] text-[#24332F] hover:opacity-85 transition-opacity"
        >
          Synergy Health 360°
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-medium text-[#24332F]/80">
          <a
            href="#services"
            className="hover:text-[#245C50] transition-colors"
          >
            Services
          </a>
          <a
            href="#membership"
            className="hover:text-[#245C50] transition-colors"
          >
            Membership
          </a>
          <a
            href="#approach"
            className="hover:text-[#245C50] transition-colors"
          >
            Our Approach
          </a>
          <a
            href="#provider"
            className="hover:text-[#245C50] transition-colors"
          >
            Providers
          </a>
          <a
            href="#locations"
            className="hover:text-[#245C50] transition-colors"
          >
            Locations
          </a>
        </nav>

        {/* Right: Primary Booking Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://20314.portal.athenahealth.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] text-[14px] font-medium tracking-wide text-white bg-[#245C50] hover:bg-[#1C493F] rounded-md hover-shift transition-all shadow-xs"
          >
            <span>Book a Visit</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="https://20314.portal.athenahealth.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-medium text-white bg-[#245C50] rounded-md"
          >
            Book
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#24332F]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[#F3F3EF] border-b border-[#D9DED8] space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-[#24332F]">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#245C50]"
            >
              Services
            </a>
            <a
              href="#membership"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#245C50]"
            >
              Membership
            </a>
            <a
              href="#approach"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#245C50]"
            >
              Our Approach
            </a>
            <a
              href="#provider"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#245C50]"
            >
              Providers
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#245C50]"
            >
              Locations
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="https://20314.portal.athenahealth.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 min-h-[44px] text-sm font-semibold text-white bg-[#245C50] rounded-md text-center"
            >
              Book a Visit
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-2.5 px-4 min-h-[44px] text-sm font-medium text-[#245C50] border border-[#245C50]/30 rounded-md text-center"
            >
              Ask our care assistant
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
