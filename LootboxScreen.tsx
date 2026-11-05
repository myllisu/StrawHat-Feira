import React, { useState } from 'react';
import { AppState } from '../types';
import { GAME_CONFIG, LootboxProbConfig } from '../config/gameConfig';
import { Sparkles, Ticket, Coins, Gift, Clock, CheckCircle2 } from 'lucide-react';

interface LootboxScreenProps {
  state: AppState;
  onOpenLootbox: (paymentMethod: 'ticket' | 'coins') => { reward: LootboxProbConfig; duplicateRefund?: number };
}

export const LootboxScreen: React.FC<LootboxScreenProps> = ({ state, onOpenLootbox }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [rewardResult, setRewardResult] = useState<{ reward: LootboxProbConfig; duplicateRefund?: number } | null>(null);

  const canUseTicket = state.tickets > 0;
  const canUseCoins = state.coins >= GAME_CONFIG.LOOTBOX_TICKET_PRICE_COINS;

  const handleStartOpening = (method: 'ticket' | 'coins') => {
    if (isOpening) return;
    setIsOpening(true);
    setRewardResult(null);

    setTimeout(() => {
      const result = onOpenLootbox(method);
      setRewardResult(result);
      setIsOpening(false);
    }, 1200);
  };

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
          background: 'linear-gradient(135deg, #ffffff 0%, #fff5f5 100%)',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles color="#805ad5" size={24} />
            Lootbox de Recompensas
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Use seus bilhetes ou moedas para sorteios de temas exclusivos e minutos extras!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div className="currency-badge tickets" style={{ fontSize: '0.95rem' }}>
            <Ticket size={16} /> {state.tickets} bilhetes
          </div>
          <div className="currency-badge coins" style={{ fontSize: '0.95rem' }}>
            <Coins size={16} /> {state.coins} moedas
          </div>
        </div>
      </div>

      {/* Main Lootbox Interaction Section */}
      <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Caixa Misteriosa do Fazendeiro 🎁
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Clique em um dos botões abaixo para abrir a caixa e resgatar sua recompensa.
        </p>

        {/* Shaking Box Visual */}
        <div className={`lootbox-box ${isOpening ? 'opening' : ''}`} onClick={() => canUseTicket && handleStartOpening('ticket')}>
          🎁
        </div>

        {/* Open Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <button
            className="btn btn-gold"
            onClick={() => handleStartOpening('ticket')}
            disabled={!canUseTicket || isOpening}
            style={{ minWidth: '180px' }}
          >
            <Ticket size={18} /> Abrir com 1 Bilhete
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => handleStartOpening('coins')}
            disabled={!canUseCoins || isOpening}
            style={{ minWidth: '180px' }}
          >
            <Coins size={18} color="#d69e2e" /> Abrir com 80 Moedas
          </button>
        </div>
      </div>

      {/* Probability Breakdown Table */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Gift size={20} color="#805ad5" />
          Probabilidades Oficiais de Recompensa (Total 100%)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {GAME_CONFIG.LOOTBOX_PROBABILITIES.map((prob) => (
            <div
              key={prob.id}
              style={{
                background: '#ffffff',
                border: `1px solid ${prob.color}`,
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{prob.name}</strong>
                <div style={{ fontSize: '0.75rem', color: prob.color, fontWeight: 700 }}>Raridade: {prob.rarity.toUpperCase()}</div>
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{prob.probability}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Minutes History & Inventory */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={20} color="#3182ce" />
          Seus Minutos Extras Válidos (Validade de 7 Dias)
        </h4>

        {state.extraMinutesList.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Nenhum lote de minutos extras obtido até o momento.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {state.extraMinutesList.map((grant) => {
              const daysLeft = Math.max(0, Math.ceil((grant.expiresAt - Date.now()) / (1000 * 3600 * 24)));
              return (
                <div
                  key={grant.id}
                  style={{
                    padding: '0.65rem 1rem',
                    background: grant.used ? 'rgba(0,0,0,0.03)' : '#ebf8ff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    opacity: grant.used ? 0.6 : 1,
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#2b6cb0' }}>+{grant.minutes} Minutos Extras</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Origem: {grant.source} • Validade: {grant.used ? 'Já Utilizado' : `${daysLeft} dias restantes`}
                    </div>
                  </div>
                  {grant.used && (
                    <span style={{ fontSize: '0.75rem', background: '#cbd5e0', padding: '0.1rem 0.5rem', borderRadius: '8px' }}>
                      Utilizado
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reward Result Popup Modal */}
      {rewardResult && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center', maxWidth: '440px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem', animation: 'float 2s infinite' }}>🎉</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Parabéns! Recompensa Recebida!
            </h3>

            <div
              style={{
                background: `${rewardResult.reward.color}15`,
                border: `2px solid ${rewardResult.reward.color}`,
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                margin: '1rem 0',
              }}
            >
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: rewardResult.reward.color }}>
                {rewardResult.reward.name}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Raridade: {rewardResult.reward.rarity.toUpperCase()} ({rewardResult.reward.probability}% de chance)
              </p>

              {rewardResult.duplicateRefund && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#dd6b20', fontWeight: 700 }}>
                  (Tema já adquirido! Convertido em reembolso de {rewardResult.duplicateRefund} moedas)
                </div>
              )}
            </div>

            <button className="btn btn-primary" onClick={() => setRewardResult(null)} style={{ width: '100%' }}>
              <CheckCircle2 size={16} /> Resgatar Recompensa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
