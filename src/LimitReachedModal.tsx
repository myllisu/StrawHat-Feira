import React from 'react';
import { AppState, MonitoredItem } from '../types';
import { ShieldAlert, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

interface LimitReachedModalProps {
  state: AppState;
  item: MonitoredItem;
  onUseExtraMinutes: (minutesGrantId: string) => void;
  onAcceptViolation: () => void;
  onClose: () => void;
}

export const LimitReachedModal: React.FC<LimitReachedModalProps> = ({
  state,
  item,
  onUseExtraMinutes,
  onAcceptViolation,
  onClose,
}) => {
  const now = Date.now();
  const availableGrants = state.extraMinutesList.filter((g) => !g.used && g.expiresAt > now);
  const totalExtraAvailable = availableGrants.reduce((sum, g) => sum + g.minutes, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '520px', border: '2px solid var(--primary-strawberry)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fed7d7',
              color: 'var(--primary-strawberry)',
              display: 'inlineFlex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <ShieldAlert size={36} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Limite Atingido: {item.name} 🚫
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Você utilizou {item.timeUsedMinutesToday} min de {item.dailyLimitMinutes} min permitidos hoje.
          </p>
        </div>

        {/* Warning Card */}
        <div
          style={{
            background: '#fffaf0',
            border: '1px solid #feebc8',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flexStart',
          }}
        >
          <AlertTriangle size={24} color="#dd6b20" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.88rem', color: '#744210' }}>
            <strong>Sua plantação está em risco!</strong>
            <br />
            Se você ignorar este limite sem usar minutos extras, sua sequência de disciplina de{' '}
            <strong>{state.streakDays} dias</strong> será zerada.
          </div>
        </div>

        {/* Extra Minutes Options */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} color="#3182ce" />
            Minutos Extras Disponíveis - {totalExtraAvailable} min
          </h4>

          {availableGrants.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              Você não possui minutos extras válidos no inventário. Ganhe mais em Lootboxes!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {availableGrants.map((grant) => (
                <div
                  key={grant.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: '#ebf8ff',
                    border: '1px solid #bee3f8',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#2b6cb0' }}>+{grant.minutes} Minutos Extras</strong>
                    <div style={{ fontSize: '0.75rem', color: '#4a5568' }}>Origem: {grant.source}</div>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => onUseExtraMinutes(grant.id)}
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                  >
                    Usar Agora
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flexEnd', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            <ArrowLeft size={16} /> Voltar ao App
          </button>
          <button className="btn btn-danger" onClick={onAcceptViolation}>
            Aceitar Violação e Zerar Sequência
          </button>
        </div>
      </div>
    </div>
  );
};
