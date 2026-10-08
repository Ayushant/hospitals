import React from 'react';

interface SvgProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * WindingPathSvg: Hand-drawn line art of a winding desert wellness path
 * representing the 360° patient journey through primary care and specialty health.
 * 1.5px stroke, using #245C50 deep green, #86A99A muted sage, #F3F3EF mineral grey, and #C47B60 warm accent.
 */
export const WindingPathSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto',
  width = '100%',
  height = '100%'
}) => {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      aria-label="Illustration of a winding path representing the coordinated health journey"
      role="img"
    >
      <defs>
        <pattern id="path-sand-light" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.75" fill="#245C50" fillOpacity="0.08" />
        </pattern>
      </defs>

      {/* Gentle landscape contours */}
      <path
        d="M-20 180 C 80 160, 160 190, 240 170 C 320 150, 400 180, 500 160 L 500 380 L -20 380 Z"
        fill="#FFFFFF"
        stroke="#86A99A"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <rect x="0" y="160" width="480" height="200" fill="url(#path-sand-light)" />

      {/* Winding path left border */}
      <path
        d="M240 70 C 230 110, 310 130, 320 170 C 330 210, 160 210, 150 260 C 140 310, 210 330, 200 360"
        stroke="#245C50"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Winding path right border */}
      <path
        d="M260 70 C 255 110, 350 130, 360 170 C 370 210, 195 210, 190 260 C 185 310, 270 330, 260 360"
        stroke="#245C50"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Inner footsteps along the path */}
      <g stroke="#245C50" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.35">
        <line x1="248" y1="85" x2="254" y2="85" />
        <line x1="270" y1="115" x2="280" y2="117" />
        <line x1="330" y1="150" x2="342" y2="152" />
        <line x1="335" y1="185" x2="348" y2="187" />
        <line x1="240" y1="215" x2="255" y2="216" />
        <line x1="175" y1="245" x2="188" y2="246" />
        <line x1="165" y1="285" x2="180" y2="286" />
        <line x1="210" y1="320" x2="225" y2="322" />
        <line x1="230" y1="345" x2="245" y2="346" />
      </g>

      {/* Milestones / Waypoints */}
      {/* Waypoint 1: Primary Care */}
      <circle cx="250" cy="70" r="7" fill="#FFFFFF" stroke="#245C50" strokeWidth="1.5" />
      <circle cx="250" cy="70" r="3" fill="#C47B60" />

      {/* Waypoint 2: Specialists */}
      <circle cx="340" cy="170" r="7" fill="#FFFFFF" stroke="#245C50" strokeWidth="1.5" />
      <circle cx="340" cy="170" r="3" fill="#245C50" />

      {/* Waypoint 3: Prevention */}
      <circle cx="170" cy="260" r="7" fill="#FFFFFF" stroke="#245C50" strokeWidth="1.5" />
      <circle cx="170" cy="260" r="3" fill="#86A99A" />

      {/* Waypoint 4: Longevity */}
      <circle cx="230" cy="360" r="7" fill="#FFFFFF" stroke="#245C50" strokeWidth="1.5" />
      <circle cx="230" cy="360" r="3" fill="#C47B60" />

      {/* Surrounding landscape stones */}
      <g stroke="#245C50" strokeWidth="1.5" strokeLinecap="round" fill="#86A99A" fillOpacity="0.2">
        <ellipse cx="110" cy="220" rx="14" ry="7" />
        <ellipse cx="128" cy="223" rx="8" ry="4" />
        <ellipse cx="390" cy="250" rx="18" ry="9" />
        <ellipse cx="412" cy="253" rx="10" ry="5" />
      </g>

      {/* Soft desert flora */}
      <g stroke="#245C50" strokeWidth="1.5" strokeLinecap="round">
        <path d="M75 280 C 70 265, 85 260, 90 270 C 95 258, 110 262, 105 280" fill="#86A99A" fillOpacity="0.3" />
        <path d="M375 120 C 370 108, 385 105, 390 115 C 395 104, 408 108, 402 120" fill="#86A99A" fillOpacity="0.3" />
      </g>
    </svg>
  );
};
