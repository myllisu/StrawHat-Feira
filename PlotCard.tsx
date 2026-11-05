import React from 'react';
import { FarmPlot } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';
import { Lock, Sparkles, Droplets } from 'lucide-react';
import { PlantGraphic } from './PlantGraphic';

interface PlotCardProps {
  plot: FarmPlot;
  activeThemeId?: string;
  onUnlockPlot: (plotId: number) => void;
  onHarvest: (plotId: number) => void;
  onSimulateTimeAdvance: (plotId: number, hours: number) => void;
  coins: number;
}

export const PlotCard: React.FC<PlotCardProps> = ({
  plot,
  activeThemeId = 'morango',
  onUnlockPlot,
  onHarvest,
  onSimulateTimeAdvance,
  coins,
}) => {
  const theme = GAME_CONFIG.THEMES.find((t) => t.id === activeThemeId) || GAME_CONFIG.THEMES[0];

  if (!plot.unlocked) {
    const canAfford = coins >= plot.priceCoins;
    return (
      <div className="plot-card">
        <div style={{ fontSize: '2.5rem', opacity: 0.5, marginBottom: '0.5rem' }}>
          <Lock size={44} color="var(--text-secondary)" />
        </div>
        <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Canteiro #{plot.id} Bloqueado
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Preço: <strong>{plot.priceCoins} moedas</strong>
        </p>
        <button
          className="btn btn-gold"
          onClick={() => onUnlockPlot(plot.id)}
          disabled={!canAfford}
          style={{ width: '100%', fontSize: '0.85rem' }}
        >
          {canAfford ? 'Desbloquear Canteiro' : 'Saldo Insuficiente'}
        </button>
      </div>
    );
  }

  const plant = plot.plant;
  if (!plant) {
    return (
      <div className="plot-card unlocked">
        <PlantGraphic themeId={theme.id} stage="broto" size={64} />
        <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.5rem' }}>Canteiro Vazio</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Pronto para plantar uma nova muda de {theme.plantIcons?.fruitName || 'fruto'}
        </p>
      </div>
    );
  }

  // Find current stage details
  const stages = GAME_CONFIG.GROWTH_STAGES;
  const currentStageIndex = stages.findIndex((s) => s.stage === plant.stage);
  const currentStageObj = stages[currentStageIndex] || stages[0];
  const isMature = plant.stage === 'fruto_maduro';

  // Calculate progress percent
  const totalMaxHours = stages[stages.length - 1].requiredHours; // 36h
  const progressPercent = Math.min(100, Math.round((plant.accumulatedHours / totalMaxHours) * 100));

  // Next stage remaining hours
  const nextStageObj = stages[currentStageIndex + 1];
  const hoursToNext = nextStageObj ? Math.max(0, nextStageObj.requiredHours - plant.accumulatedHours) : 0;

  const plantDisplayName = `${theme.plantIcons?.fruitName || 'Planta'} #${plot.id}`;

  return (
    <div className="plot-card unlocked" style={{ borderColor: isMature ? 'var(--primary-strawberry)' : '' }}>
      {/* Dynamic Theme SVG Plant Graphic */}
      <div className="plot-icon">
        <PlantGraphic themeId={theme.id} stage={plant.stage} size={80} />
      </div>

      <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
        {plantDisplayName}
      </h4>

      <span
        style={{
          display: 'inline-block',
          padding: '0.2rem 0.6rem',
          borderRadius: '12px',
          background: isMature ? 'rgba(229, 62, 62, 0.15)' : 'rgba(56, 161, 105, 0.15)',
          color: isMature ? 'var(--primary-strawberry)' : 'var(--foliage-green)',
          fontWeight: 700,
          fontSize: '0.8rem',
          marginBottom: '0.5rem',
        }}
      >
        {currentStageObj.name}
      </span>

      {/* Progress Bar */}
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
        {isMature ? (
          <span style={{ color: 'var(--primary-strawberry)', fontWeight: 700 }}>
            {theme.plantIcons?.fruitName || 'Fruto'} Maduro! Pronto para colheita! 🎉
          </span>
        ) : (
          <span>
            {hoursToNext}h restantes para {nextStageObj?.name} ({plant.accumulatedHours}h / 36h)
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {isMature ? (
        <button
          className="btn btn-primary"
          onClick={() => onHarvest(plot.id)}
          style={{ width: '100%', gap: '0.4rem' }}
        >
          <Sparkles size={16} /> Colher {theme.plantIcons?.fruitName || 'Fruto'}
        </button>
      ) : (
        <button
          className="btn btn-secondary"
          onClick={() => onSimulateTimeAdvance(plot.id, 6)}
          title="Avançar 6h de tempo de foco para testar crescimento"
          style={{ width: '100%', fontSize: '0.78rem', padding: '0.4rem' }}
        >
          <Droplets size={14} color="var(--foliage-green)" /> +6h Foco (Simular)
        </button>
      )}
    </div>
  );
};
