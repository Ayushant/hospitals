import React, { useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { MembershipSection } from './components/MembershipSection';
import { CareNavigator } from './components/CareNavigator';
import { PatientToolkit } from './components/PatientToolkit';
import { ApproachSection } from './components/ApproachSection';
import { ProviderSpotlight } from './components/ProviderSpotlight';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationsSection } from './components/LocationsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ChatAssistant } from './components/ChatAssistant';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F3EF] text-[#24332F] font-sans antialiased selection:bg-[#245C50]/15 selection:text-[#245C50]">
      {/* Skip link for keyboard & screen-reader users (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#245C50] focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* 06. Header */}
      <Nav onOpenChat={() => setChatOpen(true)} />

      <main id="main-content" tabIndex={-1}>
        {/* 05. Redesigned Hero with Large Authentic Clinic Consultation Photography */}
        <Hero onOpenChat={() => setChatOpen(true)} />

        {/* 07. Trust Indicators */}
        <TrustStrip />

        {/* 08. Services (Editorial List on #E9ECE7) */}
        <ServicesSection />

        {/* 09. InstaCare 360 Membership on White Content Surface */}
        <MembershipSection />

        {/* 10. Care Navigator */}
        <CareNavigator />

        {/* 10.5. AI Patient Toolkit — HIPAA/§1557/state-AI compliant PDF generators */}
        <PatientToolkit />

        {/* 11. Our Approach (360° model & winding path) */}
        <ApproachSection />

        {/* 12. Provider Spotlight (Dr. Vin Jain, MD & media placeholder) */}
        <ProviderSpotlight />

        {/* 12. Testimonials (3 verified patient quotes) */}
        <TestimonialsSection />

        {/* 12. Locations (Scottsdale addresses & static map) */}
        <LocationsSection />

        {/* 12. FAQ Accordion */}
        <FaqSection />
      </main>

      {/* 12. Footer (Deep forest green contrast) */}
      <Footer />

      {/* 13. AI Chat Assistant (Subordinate "Ask Synergy" rectangular button) */}
      <ChatAssistant
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpen={() => setChatOpen(true)}
      />
    </div>
  );
}
