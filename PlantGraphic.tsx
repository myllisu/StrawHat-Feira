import React from 'react';
import { PlantStage } from '../types';

interface PlantGraphicProps {
  themeId?: string;
  stage: PlantStage;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PlantGraphic: React.FC<PlantGraphicProps> = ({
  themeId = 'morango',
  stage,
  size = 72,
  className = '',
  style = {},
}) => {
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    ...style,
  };

  switch (themeId) {
    case 'manga':
      return (
        <div className={className} style={containerStyle}>
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
            {stage === 'broto' && (
              <g>
                <path d="M40 70 Q40 50 40 42" stroke="#795548" strokeWidth="4" strokeLinecap="round" />
                <path d="M40 45 C30 35, 20 40, 25 28 C35 32, 40 40, 40 45" fill="#81C784" stroke="#388E3C" strokeWidth="1.5" />
                <path d="M40 45 C50 35, 60 40, 55 28 C45 32, 40 40, 40 45" fill="#A5D6A7" stroke="#388E3C" strokeWidth="1.5" />
                <ellipse cx="40" cy="71" rx="16" ry="4" fill="#5D4037" opacity="0.3" />
              </g>
            )}
            {stage === 'planta' && (
              <g>
                <path d="M40 72 Q38 45 40 25" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
                <path d="M40 40 Q20 30 15 18 Q32 25 40 40" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M40 45 Q60 35 65 22 Q48 30 40 45" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M40 30 Q30 15 32 8 Q42 16 40 30" fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" />
                <ellipse cx="40" cy="73" rx="20" ry="5" fill="#3E2723" opacity="0.35" />
              </g>
            )}
            {stage === 'flor' && (
              <g>
                <path d="M40 72 Q38 45 40 25" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
                <path d="M40 40 Q20 30 15 18 Q32 25 40 40" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M40 45 Q60 35 65 22 Q48 30 40 45" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
                {/* Golden panicle blossoms */}
                <circle cx="40" cy="18" r="4" fill="#FDD835" />
                <circle cx="34" cy="22" r="3" fill="#FFEE58" />
                <circle cx="46" cy="22" r="3" fill="#FFEE58" />
                <circle cx="40" cy="12" r="3" fill="#FFF176" />
                <circle cx="30" cy="28" r="2.5" fill="#FDD835" />
                <circle cx="50" cy="28" r="2.5" fill="#FDD835" />
              </g>
            )}
            {stage === 'fruto_verde' && (
              <g>
                <path d="M40 72 Q38 45 40 25" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
                <path d="M40 40 Q20 30 15 18 Q32 25 40 40" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M40 45 Q60 35 65 22 Q48 30 40 45" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
                {/* Green Mango Hanging */}
                <path d="M40 25 Q45 28 47 38 C49 50 35 52 31 42 C28 34 35 25 40 25 Z" fill="#9CCC65" stroke="#558B2F" strokeWidth="2" />
              </g>
            )}
            {stage === 'fruto_maduro' && (
              <g>
                <path d="M40 72 Q38 45 40 22" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
                <path d="M40 40 Q20 30 12 18 Q32 25 40 40" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M40 45 Q60 35 68 22 Q48 30 40 45" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
                {/* Ripe Golden Mango */}
                <path d="M40 22 Q46 25 49 37 C52 52 34 55 29 43 C25 33 34 22 40 22 Z" fill="url(#mangoGrad)" stroke="#E65100" strokeWidth="2" />
                <circle cx="36" cy="30" r="3" fill="#FFF" opacity="0.4" />
                <defs>
                  <linearGradient id="mangoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFEE58" />
                    <stop offset="50%" stopColor="#FFA726" />
                    <stop offset="100%" stopColor="#E65100" />
                  </linearGradient>
                </defs>
              </g>
            )}
          </svg>
        </div>
      );

    case 'melancia':
      return (
        <div className={className} style={containerStyle}>
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
            {stage === 'broto' && (
              <g>
                <path d="M40 70 Q40 50 40 44" stroke="#2E7D32" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M40 45 Q25 40 28 30 Q38 35 40 45" fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M40 45 Q55 40 52 30 Q42 35 40 45" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1.5" />
              </g>
            )}
            {stage === 'planta' && (
              <g>
                <path d="M15 65 Q35 50 65 60" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round" />
                <path d="M30 58 Q22 40 25 35 Q35 45 30 58" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1.5" />
                <path d="M50 60 Q58 42 62 45 Q55 52 50 60" fill="#43A047" stroke="#1B5E20" strokeWidth="1.5" />
                <path d="M60 60 Q68 55 72 57" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
            {stage === 'flor' && (
              <g>
                <path d="M15 65 Q35 50 65 60" stroke="#1B5E20" strokeWidth="4" fill="none" />
                <path d="M30 58 Q22 40 25 35 Q35 45 30 58" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1.5" />
                {/* Yellow Vine Flower */}
                <circle cx="42" cy="45" r="7" fill="#FDD835" stroke="#F57F17" strokeWidth="1" />
                <circle cx="42" cy="45" r="2.5" fill="#E65100" />
              </g>
            )}
            {stage === 'fruto_verde' && (
              <g>
                <path d="M15 65 Q35 50 65 60" stroke="#1B5E20" strokeWidth="4" fill="none" />
                {/* Small Green Striped Melon */}
                <ellipse cx="45" cy="52" rx="16" ry="12" fill="#81C784" stroke="#2E7D32" strokeWidth="2" />
                <path d="M35 44 Q45 52 35 60" stroke="#1B5E20" strokeWidth="1.5" fill="none" />
                <path d="M45 40 Q52 52 45 64" stroke="#1B5E20" strokeWidth="1.5" fill="none" />
                <path d="M55 44 Q60 52 53 60" stroke="#1B5E20" strokeWidth="1.5" fill="none" />
              </g>
            )}
            {stage === 'fruto_maduro' && (
              <g>
                {/* Ripe Watermelon + Slice */}
                <ellipse cx="40" cy="50" rx="22" ry="16" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2.5" />
                <path d="M24 40 Q38 50 24 60" stroke="#A5D6A7" strokeWidth="2" fill="none" />
                <path d="M38 34 Q48 50 38 66" stroke="#A5D6A7" strokeWidth="2" fill="none" />
                <path d="M52 38 Q60 50 52 62" stroke="#A5D6A7" strokeWidth="2" fill="none" />
                {/* Wedge slice */}
                <path d="M50 30 L68 50 L42 50 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" />
                <path d="M68 50 L42 50" stroke="#81C784" strokeWidth="3" />
                <circle cx="52" cy="42" r="1" fill="#000" />
                <circle cx="58" cy="45" r="1" fill="#000" />
              </g>
            )}
          </svg>
        </div>
      );

    case 'abacate':
      return (
        <div className={className} style={containerStyle}>
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
            {stage === 'broto' && (
              <g>
                <ellipse cx="40" cy="62" rx="12" ry="10" fill="#795548" stroke="#4E342E" strokeWidth="2" />
                <path d="M40 52 Q40 38 40 32" stroke="#558B2F" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="34" cy="30" rx="7" ry="4" fill="#9CCC65" transform="rotate(-20 34 30)" />
                <ellipse cx="46" cy="30" rx="7" ry="4" fill="#AED581" transform="rotate(20 46 30)" />
              </g>
            )}
            {stage === 'planta' && (
              <g>
                <path d="M40 70 L40 25" stroke="#4E342E" strokeWidth="5" strokeLinecap="round" />
                <ellipse cx="26" cy="38" rx="14" ry="7" fill="#33691E" transform="rotate(-25 26 38)" />
                <ellipse cx="54" cy="38" rx="14" ry="7" fill="#558B2F" transform="rotate(25 54 38)" />
                <ellipse cx="40" cy="22" rx="12" ry="6" fill="#689F38" transform="rotate(-5 40 22)" />
              </g>
            )}
            {stage === 'flor' && (
              <g>
                <path d="M40 70 L40 25" stroke="#4E342E" strokeWidth="5" strokeLinecap="round" />
                <ellipse cx="26" cy="38" rx="14" ry="7" fill="#33691E" transform="rotate(-25 26 38)" />
                <ellipse cx="54" cy="38" rx="14" ry="7" fill="#558B2F" transform="rotate(25 54 38)" />
                <circle cx="40" cy="18" r="3.5" fill="#E6EE9C" />
                <circle cx="34" cy="22" r="3" fill="#DCEDC8" />
                <circle cx="46" cy="22" r="3" fill="#DCEDC8" />
              </g>
            )}
            {stage === 'fruto_verde' && (
              <g>
                <path d="M40 70 L40 25" stroke="#4E342E" strokeWidth="5" />
                <ellipse cx="26" cy="38" rx="14" ry="7" fill="#33691E" transform="rotate(-25 26 38)" />
                <ellipse cx="54" cy="38" rx="14" ry="7" fill="#558B2F" transform="rotate(25 54 38)" />
                <path d="M40 32 C46 32 50 42 48 52 C46 60 34 60 32 52 C30 42 34 32 40 32 Z" fill="#689F38" stroke="#33691E" strokeWidth="2" />
              </g>
            )}
            {stage === 'fruto_maduro' && (
              <g>
                {/* Cut Avocado showing seed & creamy interior */}
                <path d="M40 20 C48 20 54 32 52 48 C50 62 30 62 28 48 C26 32 32 20 40 20 Z" fill="#33691E" stroke="#1B5E20" strokeWidth="2" />
                <path d="M40 23 C46 23 51 34 49 47 C47 59 33 59 31 47 C29 34 34 23 40 23 Z" fill="#D4E157" />
                <circle cx="40" cy="46" r="8" fill="#6D4C41" stroke="#3E2723" strokeWidth="1.5" />
                <circle cx="37" cy="43" r="2.5" fill="#FFF" opacity="0.3" />
              </g>
            )}
          </svg>
        </div>
      );

    case 'pitaya':
      return (
        <div className={className} style={containerStyle}>
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
            {stage === 'broto' && (
              <g>
                <path d="M40 70 L40 45" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round" />
                <polygon points="40,42 36,50 44,50" fill="#81C784" />
                <circle cx="40" cy="42" r="2" fill="#D81B60" />
              </g>
            )}
            {stage === 'planta' && (
              <g>
                <path d="M40 72 L40 30" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" />
                <path d="M40 45 Q20 40 18 28" stroke="#388E3C" strokeWidth="6" strokeLinecap="round" />
                <path d="M40 50 Q60 45 62 32" stroke="#388E3C" strokeWidth="6" strokeLinecap="round" />
              </g>
            )}
            {stage === 'flor' && (
              <g>
                <path d="M40 72 L40 30" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" />
                {/* Large Dragonfruit Flower */}
                <ellipse cx="40" cy="20" rx="14" ry="10" fill="#FFF" stroke="#C2185B" strokeWidth="1.5" />
                <circle cx="40" cy="20" r="4" fill="#FDD835" />
              </g>
            )}
            {stage === 'fruto_verde' && (
              <g>
                <path d="M40 72 L40 30" stroke="#2E7D32" strokeWidth="8" />
                <ellipse cx="40" cy="30" rx="12" ry="15" fill="#4CAF50" stroke="#1B5E20" strokeWidth="2" />
                <path d="M32 25 L28 20 M48 25 L52 20 M30 35 L24 35 M50 35 L56 35" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
            {stage === 'fruto_maduro' && (
              <g>
                {/* Hot Pink Dragonfruit */}
                <ellipse cx="40" cy="42" rx="15" ry="19" fill="#E91E63" stroke="#880E4F" strokeWidth="2" />
                {/* Green scale tips */}
                <path d="M30 30 C26 22 34 26 34 32" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
                <path d="M50 30 C54 22 46 26 46 32" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
                <path d="M26 42 C18 40 24 48 27 46" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
                <path d="M54 42 C62 40 56 48 53 46" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
                <path d="M32 55 C28 62 36 58 37 54" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
                <path d="M48 55 C52 62 44 58 43 54" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1" />
              </g>
            )}
          </svg>
        </div>
      );

    case 'sakura':
      return (
        <div className={className} style={containerStyle}>
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
            {stage === 'broto' && (
              <g>
                <path d="M40 70 Q42 50 38 42" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />
                <circle cx="38" cy="40" r="4" fill="#F8BBD0" stroke="#C2185B" strokeWidth="1" />
              </g>
            )}
            {stage === 'planta' && (
              <g>
                <path d="M40 72 Q35 45 42 25" stroke="#4E342E" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M38 45 Q20 38 18 30" stroke="#4E342E" strokeWidth="3" strokeLinecap="round" />
                <path d="M40 38 Q58 32 60 22" stroke="#4E342E" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="18" cy="28" rx="8" ry="4" fill="#81C784" transform="rotate(-15 18 28)" />
                <ellipse cx="60" cy="20" rx="8" ry="4" fill="#81C784" transform="rotate(15 60 20)" />
              </g>
            )}
            {stage === 'flor' && (
              <g>
                <path d="M40 72 Q35 45 42 25" stroke="#4E342E" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M38 45 Q20 38 18 30" stroke="#4E342E" strokeWidth="3" strokeLinecap="round" />
                <path d="M40 38 Q58 32 60 22" stroke="#4E342E" strokeWidth="3" strokeLinecap="round" />
                {/* Sakura Petal Flowers */}
                <circle cx="18" cy="28" r="6" fill="#F8BBD0" />
                <circle cx="60" cy="20" r="6" fill="#F8BBD0" />
                <circle cx="42" cy="22" r="7" fill="#F48FB1" />
                <circle cx="42" cy="22" r="2" fill="#E91E63" />
              </g>
            )}
            {stage === 'fruto_verde' && (
              <g>
                <path d="M40 72 Q35 45 42 25" stroke="#4E342E" strokeWidth="4.5" />
                <path d="M38 45 Q20 38 18 30" stroke="#4E342E" strokeWidth="3" />
                <circle cx="18" cy="30" r="5" fill="#A5D6A7" stroke="#388E3C" strokeWidth="1" />
                <circle cx="60" cy="22" r="5" fill="#A5D6A7" stroke="#388E3C" strokeWidth="1" />
              </g>
            )}
            {stage === 'fruto_maduro' && (
              <g>
                {/* Lush Sakura Cherry Blossoms & Cherry Pair */}
                <path d="M40 72 Q35 45 42 25" stroke="#4E342E" strokeWidth="4.5" />
                <path d="M38 45 Q20 38 22 30" stroke="#4E342E" strokeWidth="3" />
                <path d="M40 38 Q58 32 56 22" stroke="#4E342E" strokeWidth="3" />
                {/* Ripe Cherries */}
                <circle cx="20" cy="36" r="7" fill="#D50000" stroke="#880E4F" strokeWidth="1.5" />
                <circle cx="32" cy="38" r="7" fill="#C51162" stroke="#880E4F" strokeWidth="1.5" />
                <path d="M20 29 Q25 22 28 32" stroke="#388E3C" strokeWidth="2" fill="none" />
                {/* Floating Sakura Petals */}
                <ellipse cx="55" cy="18" rx="5" ry="3" fill="#F8BBD0" transform="rotate(-30 55 18)" />
                <ellipse cx="65" cy="28" rx="4" ry="2.5" fill="#F8BBD0" transform="rotate(20 65 28)" />
              </g>
            )}
          </svg>
        </div>
      );

    case 'cafe':
      return (
        <div className={className} style={containerStyle}>
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
            {stage === 'broto' && (
              <g>
                <path d="M40 70 L40 46" stroke="#4E342E" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="33" cy="44" rx="7" ry="4" fill="#388E3C" transform="rotate(-20 33 44)" />
                <ellipse cx="47" cy="44" rx="7" ry="4" fill="#4CAF50" transform="rotate(20 47 44)" />
              </g>
            )}
            {stage === 'planta' && (
              <g>
                <path d="M40 72 L40 25" stroke="#3E2723" strokeWidth="5" strokeLinecap="round" />
                <ellipse cx="25" cy="38" rx="12" ry="6" fill="#1B5E20" transform="rotate(-25 25 38)" />
                <ellipse cx="55" cy="38" rx="12" ry="6" fill="#2E7D32" transform="rotate(25 55 38)" />
                <ellipse cx="28" cy="52" rx="11" ry="5" fill="#1B5E20" transform="rotate(-20 28 52)" />
                <ellipse cx="52" cy="52" rx="11" ry="5" fill="#2E7D32" transform="rotate(20 52 52)" />
              </g>
            )}
            {stage === 'flor' && (
              <g>
                <path d="M40 72 L40 25" stroke="#3E2723" strokeWidth="5" />
                <ellipse cx="25" cy="38" rx="12" ry="6" fill="#1B5E20" transform="rotate(-25 25 38)" />
                <ellipse cx="55" cy="38" rx="12" ry="6" fill="#2E7D32" transform="rotate(25 55 38)" />
                {/* White Coffee Blossoms */}
                <circle cx="40" cy="35" r="4" fill="#FFF" stroke="#E0E0E0" strokeWidth="1" />
                <circle cx="36" cy="40" r="3.5" fill="#FFF" stroke="#E0E0E0" strokeWidth="1" />
                <circle cx="44" cy="40" r="3.5" fill="#FFF" stroke="#E0E0E0" strokeWidth="1" />
              </g>
            )}
            {stage === 'fruto_verde' && (
              <g>
                <path d="M40 72 L40 25" stroke="#3E2723" strokeWidth="5" />
                <ellipse cx="25" cy="38" rx="12" ry="6" fill="#1B5E20" transform="rotate(-25 25 38)" />
                <ellipse cx="55" cy="38" rx="12" ry="6" fill="#2E7D32" transform="rotate(25 55 38)" />
                {/* Green Coffee Cherries */}
                <circle cx="40" cy="35" r="4.5" fill="#689F38" stroke="#33691E" strokeWidth="1" />
                <circle cx="35" cy="40" r="4" fill="#689F38" stroke="#33691E" strokeWidth="1" />
                <circle cx="45" cy="40" r="4" fill="#689F38" stroke="#33691E" strokeWidth="1" />
              </g>
            )}
            {stage === 'fruto_maduro' && (
              <g>
                {/* Ripe Coffee Cherries & Warm Cup Detail */}
                <path d="M40 72 L40 28" stroke="#3E2723" strokeWidth="5" />
                <ellipse cx="24" cy="35" rx="12" ry="6" fill="#1B5E20" transform="rotate(-25 24 35)" />
                <ellipse cx="56" cy="35" rx="12" ry="6" fill="#2E7D32" transform="rotate(25 56 35)" />
                {/* Deep Crimson Coffee Cherries */}
                <circle cx="40" cy="30" r="5.5" fill="#B71C1C" stroke="#4A148C" strokeWidth="1" />
                <circle cx="34" cy="36" r="5" fill="#D32F2F" stroke="#4A148C" strokeWidth="1" />
                <circle cx="46" cy="36" r="5" fill="#C62828" stroke="#4A148C" strokeWidth="1" />
                <circle cx="40" cy="42" r="5" fill="#B71C1C" stroke="#4A148C" strokeWidth="1" />
                {/* Coffee Bean emblem */}
                <ellipse cx="40" cy="58" rx="7" ry="5" fill="#4E342E" stroke="#3E2723" strokeWidth="1" transform="rotate(-15 40 58)" />
                <path d="M37 54 Q40 58 43 62" stroke="#D7CCC8" strokeWidth="1" fill="none" />
              </g>
            )}
          </svg>
        </div>
      );

    case 'morango':
    default:
      return (
        <div className={className} style={containerStyle}>
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
            {stage === 'broto' && (
              <g>
                <path d="M40 70 Q40 52 40 44" stroke="#388E3C" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M40 45 C30 38, 24 44, 28 32 C36 36, 40 42, 40 45" fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M40 45 C50 38, 56 44, 52 32 C44 36, 40 42, 40 45" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1.5" />
              </g>
            )}
            {stage === 'planta' && (
              <g>
                <path d="M40 72 Q38 48 40 28" stroke="#2E7D32" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M40 45 Q22 35 18 22 Q35 28 40 45" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1.5" />
                <path d="M40 48 Q58 35 62 22 Q45 28 40 48" fill="#43A047" stroke="#1B5E20" strokeWidth="1.5" />
                <path d="M40 32 Q32 18 34 10 Q42 18 40 32" fill="#66BB6A" stroke="#1B5E20" strokeWidth="1.5" />
              </g>
            )}
            {stage === 'flor' && (
              <g>
                <path d="M40 72 Q38 48 40 28" stroke="#2E7D32" strokeWidth="4.5" />
                <path d="M40 45 Q22 35 18 22 Q35 28 40 45" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1.5" />
                <path d="M40 48 Q58 35 62 22 Q45 28 40 48" fill="#43A047" stroke="#1B5E20" strokeWidth="1.5" />
                {/* Strawberry White Flower */}
                <circle cx="40" cy="20" r="9" fill="#FFF" stroke="#E0E0E0" strokeWidth="1.5" />
                <circle cx="40" cy="20" r="3.5" fill="#FDD835" />
              </g>
            )}
            {stage === 'fruto_verde' && (
              <g>
                <path d="M40 72 Q38 48 40 28" stroke="#2E7D32" strokeWidth="4.5" />
                <path d="M40 45 Q22 35 18 22 Q35 28 40 45" fill="#4CAF50" stroke="#1B5E20" strokeWidth="1.5" />
                {/* Unripe Green Strawberry */}
                <path d="M40 28 C48 28 53 38 48 50 C44 58 36 58 32 50 C27 38 32 28 40 28 Z" fill="#9CCC65" stroke="#33691E" strokeWidth="2" />
                <path d="M35 26 L40 32 L45 26" stroke="#2E7D32" strokeWidth="2" fill="none" />
              </g>
            )}
            {stage === 'fruto_maduro' && (
              <g>
                {/* Vibrant Red Ripe Strawberry */}
                <path d="M40 25 C52 25 57 38 50 54 C45 64 35 64 30 54 C23 38 28 25 40 25 Z" fill="url(#strawGrad)" stroke="#B71C1C" strokeWidth="2" />
                {/* Seeds */}
                <circle cx="35" cy="35" r="1" fill="#FDD835" />
                <circle cx="45" cy="35" r="1" fill="#FDD835" />
                <circle cx="40" cy="43" r="1" fill="#FDD835" />
                <circle cx="34" cy="48" r="1" fill="#FDD835" />
                <circle cx="46" cy="48" r="1" fill="#FDD835" />
                <circle cx="40" cy="54" r="1" fill="#FDD835" />
                {/* Green Calyx / Top Leaves */}
                <path d="M30 24 Q40 30 50 24 M33 22 Q40 27 47 22" stroke="#2E7D32" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <defs>
                  <linearGradient id="strawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5252" />
                    <stop offset="60%" stopColor="#E53935" />
                    <stop offset="100%" stopColor="#B71C1C" />
                  </linearGradient>
                </defs>
              </g>
            )}
          </svg>
        </div>
      );
  }
};
