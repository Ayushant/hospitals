import React from 'react';

interface SvgProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * ScottsdaleMapSvg: Static editorial map illustration for Scottsdale, AZ
 * Highlights the two clinic locations:
 * 1) 9070 E Desert Cove Ave (Desert Cove clinic)
 * 2) 7190 E Kierland Blvd (Kierland Commons clinic)
 * Updated to light palette: #F3F3EF, #FFFFFF, #24332F, #245C50, #86A99A, #C47B60.
 */
export const ScottsdaleMapSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto',
  width = '100%',
  height = '100%'
}) => {
  return (
    <svg
      viewBox="0 0 600 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      aria-label="Map illustration showing the two Synergy Health 360 clinic locations in Scottsdale, Arizona"
      role="img"
    >
      <defs>
        <pattern id="grid-light" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="30" y2="0" stroke="#D9DED8" strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2="30" stroke="#D9DED8" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Map background canvas */}
      <rect width="600" height="440" rx="8" fill="#FFFFFF" stroke="#D9DED8" strokeWidth="1" />
      <rect width="600" height="440" fill="url(#grid-light)" />

      {/* Mountain outline on east side (McDowell Mountain Preserve) */}
      <path
        d="M480 30 C 520 80, 500 150, 540 220 C 560 270, 530 350, 570 410 L 600 440 L 600 0 L 460 0 Z"
        fill="#E9ECE7"
      />
      <text x="510" y="90" fill="#66716C" fontSize="10" fontFamily="sans-serif" letterSpacing="0.1em" transform="rotate(70 510 90)">
        MCDOWELL SONORAN PRESERVE
      </text>

      {/* Major Freeway: AZ Loop 101 Pima Fwy */}
      <path
        d="M340 0 L 340 240 C 340 280, 360 300, 420 310 L 600 320"
        stroke="#86A99A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M340 0 L 340 240 C 340 280, 360 300, 420 310 L 600 320"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeDasharray="5 3"
      />
      <text x="350" y="60" fill="#24332F" fontSize="9" fontWeight="600" letterSpacing="0.05em">
        LOOP 101 PIMA FREEWAY
      </text>

      {/* Major Arterial Roads */}
      {/* Scottsdale Road (North-South) */}
      <line x1="180" y1="0" x2="180" y2="440" stroke="#24332F" strokeWidth="1.8" strokeOpacity="0.3" />
      <text x="186" y="420" fill="#24332F" fontSize="10" fontWeight="500">
        Scottsdale Rd
      </text>

      {/* Hayden Road (North-South) */}
      <line x1="260" y1="0" x2="260" y2="440" stroke="#24332F" strokeWidth="1.2" strokeOpacity="0.2" />
      <text x="265" y="420" fill="#66716C" fontSize="9">
        Hayden Rd
      </text>

      {/* Frank Lloyd Wright Blvd (East-West / diagonal) */}
      <path d="M60 110 L 480 110" stroke="#24332F" strokeWidth="1.2" strokeOpacity="0.25" />
      <text x="70" y="104" fill="#66716C" fontSize="9">
        Frank Lloyd Wright Blvd
      </text>

      {/* Cactus Road (East-West) */}
      <line x1="40" y1="210" x2="520" y2="210" stroke="#24332F" strokeWidth="1.2" strokeOpacity="0.2" />
      <text x="70" y="204" fill="#66716C" fontSize="9">
        Cactus Rd
      </text>

      {/* Shea Blvd (East-West) */}
      <line x1="40" y1="300" x2="420" y2="300" stroke="#24332F" strokeWidth="1.2" strokeOpacity="0.25" />
      <text x="70" y="294" fill="#66716C" fontSize="9">
        Shea Blvd
      </text>

      {/* LOCATION 1: 7190 E Kierland Blvd (North Clinic) */}
      <g transform="translate(180, 140)">
        {/* Pin base */}
        <path d="M0 -22 C-9 -22 -14 -15 -14 -7 C-14 4 0 20 0 20 C0 20 14 4 14 -7 C14 -15 9 -22 0 -22 Z" fill="#245C50" />
        <circle cx="0" cy="-7" r="5" fill="#FFFFFF" />
        <circle cx="0" cy="-7" r="2.5" fill="#C47B60" />
        {/* Callout box */}
        <rect x="22" y="-32" width="180" height="48" rx="6" fill="#FFFFFF" stroke="#245C50" strokeWidth="1.2" />
        <text x="32" y="-18" fill="#245C50" fontSize="11" fontWeight="600">
          Kierland Clinic
        </text>
        <text x="32" y="-4" fill="#66716C" fontSize="9.5">
          7190 E Kierland Blvd · 85254
        </text>
      </g>

      {/* LOCATION 2: 9070 E Desert Cove Ave (Central Scottsdale Clinic) */}
      <g transform="translate(320, 260)">
        {/* Pin base */}
        <path d="M0 -22 C-9 -22 -14 -15 -14 -7 C-14 4 0 20 0 20 C0 20 14 4 14 -7 C14 -15 9 -22 0 -22 Z" fill="#245C50" />
        <circle cx="0" cy="-7" r="5" fill="#FFFFFF" />
        <circle cx="0" cy="-7" r="2.5" fill="#245C50" />
        {/* Callout box */}
        <rect x="20" y="-32" width="186" height="48" rx="6" fill="#FFFFFF" stroke="#245C50" strokeWidth="1.2" />
        <text x="30" y="-18" fill="#245C50" fontSize="11" fontWeight="600">
          Desert Cove Clinic
        </text>
        <text x="30" y="-4" fill="#66716C" fontSize="9.5">
          9070 E Desert Cove Ave · 85260
        </text>
      </g>

      {/* Compass rose in bottom corner */}
      <g transform="translate(60, 380)">
        <circle cx="0" cy="0" r="15" fill="#FFFFFF" stroke="#D9DED8" strokeWidth="1" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#24332F" strokeWidth="1.2" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#24332F" strokeWidth="1" strokeOpacity="0.4" />
        <polygon points="0,-10 2.5,-2 -2.5,-2" fill="#245C50" />
        <text x="-3.5" y="-14" fill="#24332F" fontSize="8" fontWeight="700">N</text>
      </g>
    </svg>
  );
};
