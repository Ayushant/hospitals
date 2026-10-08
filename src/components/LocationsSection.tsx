import React from 'react';
import { ScottsdaleMapSvg } from './illustrations/ScottsdaleMapSvg';
import { ArrowUpRight } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  const clinics = [
    {
      name: 'Desert Cove Clinic',
      address1: '9070 E Desert Cove Ave',
      cityStateZip: 'Scottsdale, AZ 85260',
      directionsUrl: 'https://maps.google.com/?q=9070+E+Desert+Cove+Ave,+Scottsdale,+AZ+85260'
    },
    {
      name: 'Kierland Clinic',
      address1: '7190 E Kierland Blvd',
      cityStateZip: 'Scottsdale, AZ 85254',
      directionsUrl: 'https://maps.google.com/?q=7190+E+Kierland+Blvd,+Scottsdale,+AZ+85254'
    }
  ];

  return (
    <section id="locations" className="py-20 md:py-28 bg-[#E9ECE7] transition-colors border-t border-[#D9DED8]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#245C50]">
            07 / Locations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#24332F] tracking-[-0.02em]">
            Scottsdale clinics.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#66716C] leading-[1.65]">
            Two convenient Scottsdale offices serving the Greater Phoenix metropolitan area.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Stacked Location Blocks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="divide-y divide-[#D9DED8] border-t border-b border-[#D9DED8]">
              {clinics.map((loc, i) => (
                <div key={i} className="py-6 space-y-3">
                  <h3 className="text-2xl font-serif font-normal text-[#24332F]">
                    {loc.name}
                  </h3>
                  <div className="text-[14.5px] text-[#66716C] leading-relaxed">
                    <p>{loc.address1}</p>
                    <p>{loc.cityStateZip}</p>
                  </div>
                  <div className="pt-1">
                    <a
                      href={loc.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#245C50] hover:underline"
                    >
                      <span>Get directions</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Phone & Hours */}
            <div className="pt-2 text-[14px] text-[#24332F] space-y-1">
              <p>
                Clinic Telephone:{' '}
                <a href="tel:4805536168" className="font-mono font-medium text-[#245C50] hover:underline">
                  480-553-6168
                </a>
              </p>
              <p className="text-[#66716C] text-[13px]">
                Monday – Friday: 8:00 AM – 5:00 PM • Walk-in appointments available during clinic hours
              </p>
            </div>
          </div>

          {/* Right Column: Custom Static SVG Map Illustration */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-5 rounded-xl border border-[#D9DED8] bg-[#FFFFFF] shadow-xs">
              <div className="mb-2 text-[11px] font-mono text-[#66716C] tracking-wider uppercase">
                Location Map • Scottsdale & Greater Phoenix
              </div>
              <ScottsdaleMapSvg className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
