import React from 'react';
import { Target, Flame, Award, Clock } from 'lucide-react';
import { UserStats } from '../types';

interface DailyProgressWidgetProps {
  stats: UserStats;
}

export const DailyProgressWidget: React.FC<DailyProgressWidgetProps> = ({ stats }) => {
  const focused = stats.focusedMinutesToday || 0;
  const goal = stats.dailyGoalMinutes || 150;
  const goalPercent = Math.min(Math.round((focused / goal) * 100), 100);

  return (
    <div className="cozy-card">
      <div className="card-header-row">
        <div>
          <h2 className="card-title">
            <Target size={22} color="var(--leaf-green)" />
            Progresso Diário de Foco
          </h2>
          <p className="card-subtitle">Sua jornada de produtividade de hoje</p>
        </div>
        <div style={{ background: '#FFF8E1', color: '#B78103', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Flame size={16} color="#FF9800" fill="#FF9800" /> {stats.streakDays} Dias de Sequência!
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, color: 'var(--coffee-dark)', marginBottom: '0.4rem' }}>
            <span>Meta de Tempo Focado</span>
            <span>{focused}min / {goal}min ({goalPercent}%)</span>
          </div>
          <div className="progress-bar-container" style={{ height: '16px' }}>
            <div className="progress-bar-fill" style={{ width: `${goalPercent}%` }}></div>
          </div>
        </div>

        <div className="progress-stat-grid">
          <div className="stat-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
              <Clock size={16} /> Sessões
            </div>
            <div className="stat-value" style={{ color: 'var(--coffee-dark)' }}>
              {stats.sessionsCompleted || 0} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ {stats.totalSessionsTarget || 5}</span>
            </div>
            <div className="stat-label">Concluídas Hoje</div>
          </div>

          <div className="stat-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
              <Award size={16} /> Recompensa
            </div>
            <div className="stat-value" style={{ color: 'var(--primary-strawberry)' }}>
              +{focused * 2} 🍓
            </div>
            <div className="stat-label">Morangos Ganhos</div>
          </div>
        </div>
      </div>
    </div>
  );
};
