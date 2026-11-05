import React from 'react';
import { Sprout, Droplets, Sun, Sparkles } from 'lucide-react';
import { GardenPlant } from '../types';

interface GardenPreviewProps {
  plants: GardenPlant[];
  onWaterPlant?: (id: string) => void;
}

export const GardenPreview: React.FC<GardenPreviewProps> = ({ plants }) => {
  const getStageLabel = (stage: GardenPlant['stage']) => {
    switch (stage) {
      case 'seed': return '🌱 Semente';
      case 'sprout': return '🌿 Brotando';
      case 'flowering': return '🌸 Floração';
      case 'ripe': return '🍓 Maduro';
      default: return 'Planta';
    }
  };

  const getStageColor = (stage: GardenPlant['stage']) => {
    switch (stage) {
      case 'seed': return '#A1887F';
      case 'sprout': return '#66BB6A';
      case 'flowering': return '#EC407A';
      case 'ripe': return '#E0535D';
    }
  };

  return (
    <div className="cozy-card garden-card">
      <div className="card-header-row">
        <div>
          <h2 className="card-title">
            <Sprout size={24} color="var(--leaf-green)" />
            Seu Jardim de Morangos
          </h2>
          <p className="card-subtitle">Cada minuto focado rega e faz suas plantas crescerem</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="cafe-status-badge" style={{ background: '#E8F5E9', color: '#2E7D32', borderColor: '#C8E6C9' }}>
            <Droplets size={14} /> Sol & Água Ideal
          </span>
        </div>
      </div>

      <div className="garden-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--coffee-dark)' }}>
          <Sun size={18} color="#F59E0B" /> Clima Aconchegante do Jardim
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Colheita Próxima em 25min de foco
        </div>
      </div>

      <div className="garden-grid">
        {plants.map((plant) => (
          <div className="patch-tile" key={plant.id} title={`${plant.name} - Estágio: ${getStageLabel(plant.stage)} (${plant.growthPercent}%)`}>
            <div className="plant-sprite">{plant.icon}</div>
            
            <div className="plant-stage-tag" style={{ borderLeft: `4px solid ${getStageColor(plant.stage)}` }}>
              {getStageLabel(plant.stage)}
            </div>

            {/* Growth Mini Bar */}
            <div style={{
              position: 'absolute',
              top: '6px',
              left: '8px',
              right: '8px',
              height: '4px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${plant.growthPercent}%`,
                background: 'linear-gradient(90deg, #A3D9A5 0%, #81C784 100%)'
              }}></div>
            </div>
          </div>
        ))}

        {/* Empty Plot for future store / lootbox unlock */}
        <div className="patch-tile" style={{ background: 'rgba(111, 78, 55, 0.4)', borderStyle: 'dashed' }}>
          <div className="empty-patch-btn">
            <Sparkles size={20} />
            <span>Novo Canteiro</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>(Em Breve)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
