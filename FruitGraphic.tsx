import React from 'react';
import { FruitRarity } from '../types';

interface FruitGraphicProps {
  themeId?: string;
  rarity?: FruitRarity;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FruitGraphic: React.FC<FruitGraphicProps> = ({
  themeId = 'morango',
  rarity = 'comum',
  size = 48,
  className = '',
  style = {},
}) => {
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter:
      rarity === 'dourado'
        ? 'drop-shadow(0 0 6px rgba(253, 216, 53, 0.75))'
        : rarity === 'diamante'
        ? 'drop-shadow(0 0 8px rgba(66, 165, 245, 0.85))'
        : 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
    ...style,
  };

  // Sparkle or glow overlay for Golden / Diamond rarities
  const isGolden = rarity === 'dourado';
  const isDiamond = rarity === 'diamante';

  return (
    <div className={className} style={containerStyle}>
      <svg viewBox="0 0 64 64" width={size} height={size} fill="none">
        {themeId === 'manga' && (
          <g>
            <path
              d="M32 12 Q42 16 46 30 C50 48 26 54 20 40 C15 28 26 12 32 12 Z"
              fill={isGolden ? '#FDD835' : isDiamond ? '#4FC3F7' : 'url(#mangaFruitGrad)'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#E65100'}
              strokeWidth="2.5"
            />
            <path d="M32 12 L34 6" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M34 8 Q42 6 40 12" stroke="#2E7D32" strokeWidth="2" fill="#4CAF50" />
            <defs>
              <linearGradient id="mangaFruitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEE58" />
                <stop offset="50%" stopColor="#FFA726" />
                <stop offset="100%" stopColor="#E65100" />
              </linearGradient>
            </defs>
          </g>
        )}

        {themeId === 'melancia' && (
          <g>
            <ellipse
              cx="32"
              cy="36"
              rx="20"
              ry="16"
              fill={isGolden ? '#FDD835' : isDiamond ? '#4FC3F7' : '#2E7D32'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#1B5E20'}
              strokeWidth="2.5"
            />
            {!isGolden && !isDiamond && (
              <>
                <path d="M18 26 Q30 36 18 46" stroke="#A5D6A7" strokeWidth="2" fill="none" />
                <path d="M32 20 Q42 36 32 52" stroke="#A5D6A7" strokeWidth="2" fill="none" />
                <path d="M46 26 Q54 36 46 46" stroke="#A5D6A7" strokeWidth="2" fill="none" />
              </>
            )}
            <path d="M32 20 Q30 14 36 12" stroke="#1B5E20" strokeWidth="2" fill="none" />
          </g>
        )}

        {themeId === 'abacate' && (
          <g>
            <path
              d="M32 14 C41 14 48 26 46 42 C44 56 20 56 18 42 C16 26 23 14 32 14 Z"
              fill={isGolden ? '#FDD835' : isDiamond ? '#81D4FA' : '#33691E'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#1B5E20'}
              strokeWidth="2.5"
            />
            <path
              d="M32 18 C39 18 45 28 43 41 C41 53 23 53 21 41 C19 28 25 18 32 18 Z"
              fill={isGolden ? '#FFF59D' : isDiamond ? '#E0F7FA' : '#C0CA33'}
            />
            <circle cx="32" cy="40" r="7" fill={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#5D4037'} />
          </g>
        )}

        {themeId === 'pitaya' && (
          <g>
            <ellipse
              cx="32"
              cy="34"
              rx="16"
              ry="20"
              fill={isGolden ? '#FDD835' : isDiamond ? '#4FC3F7' : '#D81B60'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#880E4F'}
              strokeWidth="2.5"
            />
            <path d="M22 24 C18 16 26 20 26 26" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
            <path d="M42 24 C46 16 38 20 38 26" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
            <path d="M18 36 C10 34 16 42 20 40" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
            <path d="M46 36 C54 34 48 42 44 40" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
          </g>
        )}

        {themeId === 'sakura' && (
          <g>
            <circle
              cx="24"
              cy="40"
              r="10"
              fill={isGolden ? '#FDD835' : isDiamond ? '#4FC3F7' : '#D50000'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#880E4F'}
              strokeWidth="2"
            />
            <circle
              cx="40"
              cy="42"
              r="10"
              fill={isGolden ? '#FFEE58' : isDiamond ? '#81D4FA' : '#C51162'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#880E4F'}
              strokeWidth="2"
            />
            <path d="M24 30 Q32 20 36 32" stroke="#2E7D32" strokeWidth="2.5" fill="none" />
            <ellipse cx="44" cy="22" rx="5" ry="3" fill="#F8BBD0" transform="rotate(-20 44 22)" />
          </g>
        )}

        {themeId === 'cafe' && (
          <g>
            <circle
              cx="24"
              cy="36"
              r="9"
              fill={isGolden ? '#FDD835' : isDiamond ? '#4FC3F7' : '#B71C1C'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#4E342E'}
              strokeWidth="2"
            />
            <circle
              cx="40"
              cy="38"
              r="9"
              fill={isGolden ? '#FFEE58' : isDiamond ? '#81D4FA' : '#C62828'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#4E342E'}
              strokeWidth="2"
            />
            <path d="M24 27 Q32 18 36 29" stroke="#1B5E20" strokeWidth="2" fill="none" />
            {/* Coffee bean line */}
            <path d="M22 32 Q24 36 26 40" stroke="#FFF" opacity="0.6" strokeWidth="1" fill="none" />
            <path d="M38 34 Q40 38 42 42" stroke="#FFF" opacity="0.6" strokeWidth="1" fill="none" />
          </g>
        )}

        {(themeId === 'morango' || !['manga', 'melancia', 'abacate', 'pitaya', 'sakura', 'cafe'].includes(themeId)) && (
          <g>
            <path
              d="M32 16 C44 16 50 28 43 46 C38 56 26 56 21 46 C14 28 20 16 32 16 Z"
              fill={isGolden ? '#FDD835' : isDiamond ? '#4FC3F7' : 'url(#strawFruitGrad)'}
              stroke={isGolden ? '#F57F17' : isDiamond ? '#0288D1' : '#B71C1C'}
              strokeWidth="2"
            />
            <circle cx="27" cy="28" r="1" fill={isGolden ? '#F57F17' : isDiamond ? '#FFF' : '#FDD835'} />
            <circle cx="37" cy="28" r="1" fill={isGolden ? '#F57F17' : isDiamond ? '#FFF' : '#FDD835'} />
            <circle cx="32" cy="36" r="1" fill={isGolden ? '#F57F17' : isDiamond ? '#FFF' : '#FDD835'} />
            <circle cx="26" cy="42" r="1" fill={isGolden ? '#F57F17' : isDiamond ? '#FFF' : '#FDD835'} />
            <circle cx="38" cy="42" r="1" fill={isGolden ? '#F57F17' : isDiamond ? '#FFF' : '#FDD835'} />
            <path d="M22 15 Q32 22 42 15" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />
            <defs>
              <linearGradient id="strawFruitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5252" />
                <stop offset="60%" stopColor="#E53935" />
                <stop offset="100%" stopColor="#B71C1C" />
              </linearGradient>
            </defs>
          </g>
        )}

        {/* Diamond / Golden Sparkle overlay */}
        {isGolden && (
          <path d="M46 12 L48 18 L54 20 L48 22 L46 28 L44 22 L38 20 L44 18 Z" fill="#FFF" stroke="#F57F17" strokeWidth="0.5" />
        )}
        {isDiamond && (
          <path d="M46 12 L49 18 L55 20 L49 22 L46 28 L43 22 L37 20 L43 18 Z" fill="#E0F7FA" stroke="#0288D1" strokeWidth="0.5" />
        )}
      </svg>
    </div>
  );
};
