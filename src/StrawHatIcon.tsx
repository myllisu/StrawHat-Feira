import React from 'react';

interface StrawHatIconProps {
  size?: number;
  color?: string;
  ribbonColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const StrawHatIcon: React.FC<StrawHatIconProps> = ({
  size = 32,
  color = '#d69e2e',
  ribbonColor = 'var(--primary-strawberry)',
  className = '',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))', ...style }}
    >
      {/* Crown / Top Dome of Straw Hat */}
      <path
        d="M 18 36 C 18 20, 46 20, 46 36 Z"
        fill={color}
        stroke="#744210"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Red Ribbon / Theme Ribbon Band */}
      <path
        d="M 18 33 C 24 35, 40 35, 46 33 L 46 37 C 40 39, 24 39, 18 37 Z"
        fill={ribbonColor}
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="1"
      />

      {/* Wide Brim of Straw Hat */}
      <ellipse
        cx="32"
        cy="38"
        rx="28"
        ry="8"
        fill={color}
        stroke="#744210"
        strokeWidth="2.5"
      />

      {/* Inner Shadow / Woven Texture Line on Brim */}
      <path
        d="M 10 38 Q 32 44 54 38"
        stroke="#b7791f"
        strokeWidth="1.8"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
};
