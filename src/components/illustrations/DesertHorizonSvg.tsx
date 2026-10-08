import React from 'react';

interface SvgProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * DesertHorizonSvg: Hand-drawn line art saguaro & McDowell Mountains horizon
 * 1.5px stroke, slightly organic/hand-drawn curves, two-color fills (#0B4F4A deep teal + #F5EFE6 warm sand).
 */
export const DesertHorizonSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto',
  width = '100%',
  height = '100%'
}) => {
  return (
    <svg
      viewBox="0 0 540 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      aria-label="Hand-drawn illustration of the Scottsdale desert horizon with saguaro cacti and distant mountains"
      role="img"
    >
      <defs>
        <pattern id="desert-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.75" fill="#0B4F4A" fillOpacity="0.12" />
        </pattern>
        <linearGradient id="warm-sky" x1="270" y1="20" x2="270" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5EFE6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#EFE6D8" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Gentle morning desert sun arc */}
      <circle
        cx="380"
        cy="150"
        r="68"
        fill="#C8643B"
        fillOpacity="0.14"
        stroke="#C8643B"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* Background mountains: McDowell Sonoran range */}
      <path
        d="M20 280 C 80 240, 140 220, 195 245 C 245 268, 290 225, 345 235 C 400 245, 455 215, 520 270"
        stroke="#0B4F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#8FA89B"
        fillOpacity="0.18"
      />

      {/* Midground desert hills */}
      <path
        d="M-10 320 C 60 290, 120 305, 180 295 C 260 280, 320 310, 410 290 C 470 278, 510 305, 550 315 L 550 420 L -10 420 Z"
        fill="#F5EFE6"
        stroke="#0B4F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Subtle stippling texture on dunes */}
      <rect x="0" y="295" width="540" height="125" fill="url(#desert-dots)" />

      {/* Main majestic Saguaro cactus (center-left) */}
      <g stroke="#0B4F4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#0B4F4A" fillOpacity="0.08">
        {/* Main trunk */}
        <path d="M110 380 L110 185 C110 172 124 172 124 185 L124 380" />
        {/* Left arm */}
        <path d="M110 270 C88 270 82 258 82 240 L82 210 C82 202 92 202 92 210 L92 235 C92 248 98 252 110 252" />
        {/* Right arm */}
        <path d="M124 250 C146 250 152 240 152 220 L152 195 C152 188 162 188 162 195 L162 218 C162 238 152 268 124 268" />
        {/* Rib lines (organic hand-drawn feel) */}
        <line x1="117" y1="186" x2="117" y2="380" strokeDasharray="6 3" strokeOpacity="0.6" />
      </g>

      {/* Secondary smaller Saguaro (right) */}
      <g stroke="#0B4F4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#0B4F4A" fillOpacity="0.06">
        <path d="M440 375 L440 240 C440 230 450 230 450 240 L450 375" />
        <path d="M440 295 C425 295 422 288 422 278 L422 258 C422 252 429 252 429 258 L429 274 C429 280 432 284 440 284" />
      </g>

      {/* Agave desert rosette cluster */}
      <g stroke="#0B4F4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#8FA89B" fillOpacity="0.25">
        <path d="M210 380 C215 360 225 350 235 345 C230 358 228 370 230 380" />
        <path d="M235 380 C240 355 250 340 255 330 C254 348 250 365 248 380" />
        <path d="M255 380 C265 358 275 352 285 348 C278 360 272 372 268 380" />
        <path d="M220 380 C230 370 245 365 260 380" />
      </g>

      {/* Riverbed / wash gentle contour line */}
      <path
        d="M30 405 C 120 395, 220 412, 320 398 C 410 385, 480 400, 530 395"
        stroke="#0B4F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="8 5"
      />
    </svg>
  );
};
