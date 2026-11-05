import React from 'react';
import { AppState } from '../types';
import { GAME_CONFIG, ThemeConfig } from '../config/gameConfig';
import { Store, Check, Lock, Coins } from 'lucide-react';
import { PlantGraphic } from './PlantGraphic';
import { FruitGraphic } from './FruitGraphic';

interface ShopScreenProps {
  state: AppState;
  onBuyTheme: (themeId: string) => void;
  onSelectTheme: (themeId: string) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ state, onBuyTheme, onSelectTheme }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Store color="var(--primary-strawberry)" size={24} />
            Mercado de Temas e Personalização Completa
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Adquira novos temas para transformar as plantas, frutos e toda a paleta visual do aplicativo!
          </p>
        </div>

        <div className="currency-badge coins" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
          <Coins size={18} /> Saldo: {state.coins} moedas
        </div>
      </div>

      {/* Themes Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {GAME_CONFIG.THEMES.map((theme: ThemeConfig) => {
          const isUnlocked = state.unlockedThemeIds.includes(theme.id);
          const isActive = state.activeThemeId === theme.id;
          const canAfford = state.coins >= theme.priceCoins;

          return (
            <div
              key={theme.id}
              className="card"
              style={{
                background: theme.cardBg,
                border: isActive ? `2px solid ${theme.accentColor}` : '1px solid var(--card-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: theme.accentColor,
                    color: '#ffffff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  Equipado Agora
                </div>
              )}

              <div>
                {/* Theme Visual Preview Header with Plant & Fruit Graphics */}
                <div
                  style={{
                    height: '96px',
                    borderRadius: 'var(--radius-md)',
                    background: theme.bgGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  <PlantGraphic themeId={theme.id} stage="fruto_maduro" size={56} />
                  <FruitGraphic themeId={theme.id} rarity="dourado" size={42} />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme.textColor, marginBottom: '0.25rem' }}>
                  {theme.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', minHeight: '40px' }}>
                  {theme.description}
                </p>

                {/* Theme Features Specs */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', background: 'rgba(0,0,0,0.03)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  <div>🌱 <strong>Planta:</strong> {theme.plantIcons?.fruitName || 'Fruto'}</div>
                  <div>🎨 <strong>Cor Principal:</strong> <span style={{ color: theme.accentColor, fontWeight: 700 }}>● {theme.accentColor}</span></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                {isUnlocked ? (
                  <button
                    className={`btn ${isActive ? 'btn-selected' : 'btn-secondary'}`}
                    onClick={() => onSelectTheme(theme.id)}
                    disabled={isActive}
                    style={{ width: '100%' }}
                  >
                    {isActive ? (
                      <>
                        <Check size={16} /> Tema Selecionado
                      </>
                    ) : (
                      'Usar Este Tema'
                    )}
                  </button>
                ) : (
                  <button
                    className="btn btn-gold"
                    onClick={() => onBuyTheme(theme.id)}
                    disabled={!canAfford}
                    style={{ width: '100%', gap: '0.4rem' }}
                  >
                    {canAfford ? (
                      <>
                        <Coins size={16} /> Comprar por {theme.priceCoins} moedas
                      </>
                    ) : (
                      <>
                        <Lock size={16} /> Precisa de {theme.priceCoins} moedas
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
