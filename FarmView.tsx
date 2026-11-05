import React, { useState } from 'react';
import { AppState } from '../types';
import { PlotCard } from './PlotCard';
import { GAME_CONFIG } from '../config/gameConfig';
import { Sprout, Flame, Coins, Package } from 'lucide-react';
import { FruitGraphic } from './FruitGraphic';

interface FarmViewProps {
  state: AppState;
  onUnlockPlot: (plotId: number) => void;
  onHarvest: (plotId: number) => void;
  onSimulateTimeAdvance: (plotId: number, hours: number) => void;
  onSellFruit: (fruitId: string) => void;
  onSellAllFruits: () => void;
  onTabChange: (tab: any) => void;
}

export const FarmView: React.FC<FarmViewProps> = ({
  state,
  onUnlockPlot,
  onHarvest,
  onSimulateTimeAdvance,
  onSellFruit,
  onSellAllFruits,
  onTabChange,
}) => {
  const [showConfirmSellAll, setShowConfirmSellAll] = useState(false);
  const activeTheme = GAME_CONFIG.THEMES.find((t) => t.id === state.activeThemeId) || GAME_CONFIG.THEMES[0];

  // Calculate active streak bonus
  let activeBonus = 0;
  for (const tier of GAME_CONFIG.STREAK_BONUSES) {
    if (state.streakDays >= tier.days) {
      activeBonus = tier.bonusPercent;
    }
  }

  const nextTier = GAME_CONFIG.STREAK_BONUSES.find((t) => t.days > state.streakDays);
  const totalInventoryValue = state.inventory.reduce((sum, f) => sum + f.coinValue, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner / Header section for Streak Bonus & Production */}
      <div
        className="card"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--badge-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dd6b20',
            }}
          >
            <Flame size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Sequência de Disciplina: {state.streakDays} Dias Consecutivos 🔥
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Bônus Ativo de Produção: <strong style={{ color: 'var(--foliage-green)' }}>+{activeBonus}%</strong>
              {nextTier && (
                <span style={{ marginLeft: '0.5rem', opacity: 0.85 }}>
                  (Próximo marco: {nextTier.days} dias = +{nextTier.bonusPercent}%)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => onTabChange('limits')}>
            Configurar Limites
          </button>
          <button className="btn btn-gold" onClick={() => onTabChange('shop')}>
            Ir ao Mercado
          </button>
        </div>
      </div>

      {/* Farm Plots Grid */}
      <div className="card">
        <div className="card-title">
          <Sprout color="var(--foliage-green)" size={22} />
          <span>Canteiros da Fazenda • Tema {activeTheme.name}</span>
        </div>

        <div className="farm-grid">
          {state.plots.map((plot) => (
            <PlotCard
              key={plot.id}
              plot={plot}
              activeThemeId={state.activeThemeId}
              onUnlockPlot={onUnlockPlot}
              onHarvest={onHarvest}
              onSimulateTimeAdvance={onSimulateTimeAdvance}
              coins={state.coins}
            />
          ))}
        </div>
      </div>

      {/* Fruit Inventory & Selling Section */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div className="card-title" style={{ margin: 0 }}>
            <Package color="var(--primary-strawberry)" size={22} />
            <span>Inventário de Frutos Colhidos ({state.inventory.length})</span>
          </div>

          {state.inventory.length > 0 && (
            <button
              className="btn btn-gold"
              onClick={() => setShowConfirmSellAll(true)}
              style={{ fontSize: '0.88rem' }}
            >
              <Coins size={16} /> Vender Todos ({totalInventoryValue} moedas)
            </button>
          )}
        </div>

        {state.inventory.length === 0 ? (
          <div
            style={{
              padding: '2.5rem',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.02)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
            }}
          >
            <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Seu inventário de frutos está vazio 🧺
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              Mantenha o foco nos seus limites para que suas plantas amadureçam e você possa colher!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {state.inventory.map((fruit) => {
              const rarityMeta =
                GAME_CONFIG.FRUIT_RARITIES.find((r) => r.rarity === fruit.rarity) ||
                GAME_CONFIG.FRUIT_RARITIES[0];
              const fruitThemeId = fruit.themeId || state.activeThemeId;
              const fruitTheme = GAME_CONFIG.THEMES.find((t) => t.id === fruitThemeId) || activeTheme;
              const displayFruitName = `${fruitTheme.plantIcons?.fruitName || 'Fruto'} ${rarityMeta.name}`;

              return (
                <div
                  key={fruit.id}
                  style={{
                    background: 'var(--card-bg)',
                    border: `1px solid ${rarityMeta.color}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ margin: '0.25rem 0' }}>
                    <FruitGraphic themeId={fruitThemeId} rarity={fruit.rarity} size={54} />
                  </div>

                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)', textAlign: 'center' }}>
                    {displayFruitName}
                  </strong>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: rarityMeta.color,
                      background: `${rarityMeta.color}15`,
                      padding: '0.15rem 0.55rem',
                      borderRadius: '10px',
                      margin: '0.3rem 0 0.75rem 0',
                    }}
                  >
                    Raridade: {rarityMeta.name}
                  </span>

                  <button
                    className="btn btn-secondary"
                    onClick={() => onSellFruit(fruit.id)}
                    style={{ width: '100%', fontSize: '0.82rem', padding: '0.4rem', gap: '0.3rem' }}
                  >
                    <Coins size={14} color="#d69e2e" /> Vender por {fruit.coinValue} moedas
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Sell All */}
      {showConfirmSellAll && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Confirmar Venda do Inventário
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Você deseja vender <strong>{state.inventory.length} fruto(s)</strong> por um valor total de{' '}
              <strong style={{ color: 'var(--accent-gold)' }}>{totalInventoryValue} moedas</strong>?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirmSellAll(false)}>
                Cancelar
              </button>
              <button
                className="btn btn-gold"
                onClick={() => {
                  onSellAllFruits();
                  setShowConfirmSellAll(false);
                }}
              >
                Confirmar Venda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
