import React from 'react';

interface SvgProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * ClinicDoorwaySvg: Hand-drawn line art of an inviting, unhurried clinic entryway
 * with desert potted plants and warm light.
 * 1.5px stroke, two-color fills (#0B4F4A deep teal + #F5EFE6 warm sand).
 */
export const ClinicDoorwaySvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto',
  width = '100%',
  height = '100%'
}) => {
  return (
    <svg
      viewBox="0 0 380 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      aria-label="Hand-drawn line illustration of an open, welcoming Scottsdale medical clinic doorway"
      role="img"
    >
      <defs>
        <pattern id="door-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.6" fill="#0B4F4A" fillOpacity="0.08" />
        </pattern>
      </defs>

      {/* Exterior wall with light stucco texture */}
      <rect x="20" y="20" width="340" height="300" fill="#F5EFE6" stroke="#8FA89B" strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="20" y="20" width="340" height="300" fill="url(#door-dots)" />

      {/* Elegant Spanish-revival / Arizona modern arched entrance */}
      <path
        d="M100 320 L100 130 C100 80, 280 80, 280 130 L280 320"
        fill="#FAF6F0"
        stroke="#0B4F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Inner doorway frame */}
      <path
        d="M115 320 L115 140 C115 100, 265 100, 265 140 L265 320"
        stroke="#0B4F4A"
        strokeWidth="1.5"
        fill="#0B4F4A"
        fillOpacity="0.04"
      />

      {/* Door opened inward slightly, inviting entry */}
      <path
        d="M125 320 L125 145 C125 115, 230 115, 240 145 L240 320"
        stroke="#0B4F4A"
        strokeWidth="1.5"
        fill="#FAF6F0"
      />

      {/* Door window panes with clean lines */}
      <g stroke="#0B4F4A" strokeWidth="1.2" strokeLinecap="round" fill="#8FA89B" fillOpacity="0.15">
        <rect x="145" y="150" width="35" height="50" rx="3" />
        <rect x="188" y="150" width="35" height="50" rx="3" />
        <rect x="145" y="210" width="35" height="50" rx="3" />
        <rect x="188" y="210" width="35" height="50" rx="3" />
      </g>

      {/* Door handle */}
      <circle cx="230" cy="235" r="3" fill="#C8643B" />
      <line x1="230" y1="235" x2="230" y2="245" stroke="#0B4F4A" strokeWidth="1.5" strokeLinecap="round" />

      {/* Welcoming lantern above doorway */}
      <path d="M190 70 L190 85" stroke="#0B4F4A" strokeWidth="1.5" />
      <polygon points="182,85 198,85 194,98 186,98" fill="#F5EFE6" stroke="#0B4F4A" strokeWidth="1.5" />
      <circle cx="190" cy="91" r="2.5" fill="#C8643B" />

      {/* Terra-cotta potted desert plant (left) */}
      <polygon points="50,320 80,320 76,280 54,280" fill="#C8643B" fillOpacity="0.25" stroke="#C8643B" strokeWidth="1.5" />
      <path d="M65 280 C60 250, 48 240, 45 235 C52 245, 62 260, 66 280" stroke="#0B4F4A" strokeWidth="1.5" fill="#8FA89B" fillOpacity="0.3" />
      <path d="M66 280 C68 250, 78 240, 85 235 C80 248, 74 265, 68 280" stroke="#0B4F4A" strokeWidth="1.5" fill="#8FA89B" fillOpacity="0.3" />
      <path d="M65 280 C65 245, 65 230, 65 225" stroke="#0B4F4A" strokeWidth="1.5" />

      {/* Ground threshold lines */}
      <line x1="10" y1="320" x2="370" y2="320" stroke="#0B4F4A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="90" y1="327" x2="290" y2="327" stroke="#0B4F4A" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
};
