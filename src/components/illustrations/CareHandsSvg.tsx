import React from 'react';

interface SvgProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * CareHandsSvg: Hand-drawn line art of a physician's caring hand supporting a patient's hand
 * 1.5px stroke, slightly imperfect lines, two-color fills (#0B4F4A deep teal + #F5EFE6 warm sand).
 * No faces.
 */
export const CareHandsSvg: React.FC<SvgProps> = ({
  className = 'w-full h-auto',
  width = '100%',
  height = '100%'
}) => {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      aria-label="Hand-drawn line illustration of two hands gently clasping in mutual support and care"
      role="img"
    >
      <defs>
        <pattern id="care-grain" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.6" fill="#0B4F4A" fillOpacity="0.1" />
        </pattern>
      </defs>

      {/* Gentle background halo */}
      <circle
        cx="200"
        cy="160"
        r="110"
        fill="#F5EFE6"
        stroke="#8FA89B"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        strokeOpacity="0.6"
      />
      <circle cx="200" cy="160" r="110" fill="url(#care-grain)" />

      {/* Supporting lower hand (physician) */}
      <g stroke="#0B4F4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#F5EFE6">
        {/* Palm & wrist curve */}
        <path d="M70 240 C 95 210, 130 195, 170 195 C 210 195, 250 205, 280 225 L 290 260 C 230 270, 160 270, 70 240 Z" fill="#0B4F4A" fillOpacity="0.04" />
        {/* Lower fingers cradling */}
        <path d="M170 195 C 190 175, 230 170, 270 185 C 295 195, 305 210, 300 225 C 290 235, 275 235, 250 220" />
        <path d="M185 205 C 205 190, 235 188, 265 198" />
        <path d="M195 218 C 220 208, 245 208, 260 216" />
      </g>

      {/* Resting upper hand (patient) */}
      <g stroke="#0B4F4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Forearm entering from upper right */}
        <path d="M330 90 C 290 100, 260 115, 230 135 C 195 158, 160 170, 125 170 C 110 170, 100 162, 105 150 C 112 138, 135 135, 175 130 C 210 125, 250 100, 290 75" fill="#F5EFE6" />
        {/* Patient thumb resting gently */}
        <path d="M210 142 C 190 135, 175 140, 165 152 C 160 158, 165 165, 178 165 C 195 165, 215 155, 228 148" fill="#8FA89B" fillOpacity="0.15" />
        {/* Fingers curved softly over the physician's palm */}
        <path d="M140 168 C 128 178, 120 192, 128 202 C 135 208, 148 205, 158 190 C 168 178, 172 168, 172 165" />
        <path d="M152 172 C 145 182, 140 195, 148 202 C 156 208, 165 198, 172 185" />
      </g>

      {/* Warm terracotta pulse accent (subtle touchpoint) */}
      <circle cx="180" cy="180" r="4" fill="#C8643B" />
      <path d="M175 180 C 172 170, 188 170, 185 180" stroke="#C8643B" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};
