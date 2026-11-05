import React from 'react';
import { Smartphone, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ScreenTimeApp } from '../types';

interface ScreenTimeWidgetProps {
  usedMinutes: number;
  limitMinutes: number;
  apps: ScreenTimeApp[];
}

export const ScreenTimeWidget: React.FC<ScreenTimeWidgetProps> = ({
  usedMinutes,
  limitMinutes,
  apps
}) => {
  const percentage = Math.min(Math.round((usedMinutes / limitMinutes) * 100), 100);
  
  const formatTime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours === 0) return `${remainingMins}m`;
    return `${hours}h ${remainingMins}m`;
  };

  const remainingMinutes = Math.max(0, limitMinutes - usedMinutes);

  let progressClass = 'progress-bar-fill';
  if (percentage >= 85) progressClass += ' danger';
  else if (percentage >= 65) progressClass += ' warning';

  return (
    <div className="cozy-card">
      <div className="card-header-row">
        <div>
          <h2 className="card-title">
            <Smartphone size={22} color="var(--primary-strawberry)" />
            Tempo de Tela Diário
          </h2>
          <p className="card-subtitle">Monitoramento visual do uso de redes e distrações</p>
        </div>
        <span className="cafe-status-badge" style={{ background: '#FFF3E0', color: '#E65100', borderColor: '#FFE0B2' }}>
          Restam {formatTime(remainingMinutes)}
        </span>
      </div>

      <div className="screen-time-content">
        <div className="time-main-display">
          <span className="time-val">{formatTime(usedMinutes)}</span>
          <span className="time-limit">de {formatTime(limitMinutes)} limite planejado ({percentage}%)</span>
        </div>

        <div className="progress-bar-container" title={`${percentage}% do limite de tempo de tela atingido`}>
          <div className={progressClass} style={{ width: `${percentage}%` }}></div>
        </div>

        <div className="app-limits-list">
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
            Principais Aplicativos Monitorados:
          </div>
          {apps.map((app) => (
            <div className="app-item-row" key={app.id}>
              <div className="app-info">
                <span className="app-icon-badge">{app.icon}</span>
                <div>
                  <div style={{ color: 'var(--coffee-dark)', fontWeight: 600 }}>{app.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{app.category}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: app.timeUsedMinutes > app.timeLimitMinutes ? 'var(--primary-strawberry)' : 'var(--coffee-dark)' }}>
                  {formatTime(app.timeUsedMinutes)} / {formatTime(app.timeLimitMinutes)}
                </div>
                <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.2rem', color: app.timeUsedMinutes > app.timeLimitMinutes ? 'var(--primary-strawberry)' : 'var(--leaf-green)' }}>
                  {app.timeUsedMinutes > app.timeLimitMinutes ? (
                    <><ShieldAlert size={12} /> Limite Excedido</>
                  ) : (
                    <><CheckCircle2 size={12} /> No Limite</>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
