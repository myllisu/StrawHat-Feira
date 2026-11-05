import React from 'react';
import { AppState } from '../types';
import { BarChart3, Flame, Coins, Sprout, ShieldAlert, History } from 'lucide-react';

interface StatsScreenProps {
  state: AppState;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ state }) => {
  const stats = state.userStats;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Title */}
      <div className="card">
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 color="var(--primary-strawberry)" size={24} />
          Estatísticas Gerais da Fazenda e Disciplina
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Acompanhe seu desempenho real registrado desde o início da utilização.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: '#feebc8', borderRadius: 'var(--radius-md)', color: '#dd6b20' }}>
            <Flame size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sequência Atual / Recorde</div>
            <strong style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              {state.streakDays} dias <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>(Máx: {stats.maxStreakDays}d)</span>
            </strong>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: '#e6fffa', borderRadius: 'var(--radius-md)', color: 'var(--foliage-green)' }}>
            <Sprout size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Colheitas / Canteiros</div>
            <strong style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              {stats.totalHarvestsCount} colheitas ({state.plots.filter((p) => p.unlocked).length} canteiros)
            </strong>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: '#fefcbf', borderRadius: 'var(--radius-md)', color: '#d69e2e' }}>
            <Coins size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Moedas Ganhas / Gastas</div>
            <strong style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              {stats.totalCoinsEarned} / {stats.totalCoinsSpent} moedas
            </strong>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: '#fed7d7', borderRadius: 'var(--radius-md)', color: 'var(--primary-strawberry)' }}>
            <ShieldAlert size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Violações de Limites</div>
            <strong style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              {stats.violationsCount} violações registradas
            </strong>
          </div>
        </div>
      </div>

      {/* Sales History Log Table */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <History size={20} color="var(--accent-gold)" />
          Histórico de Vendas de Morangos
        </h4>

        {state.salesHistory.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Nenhuma venda registrada ainda. Colha frutos e venda-os no inventário!
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '2px solid rgba(0,0,0,0.08)' }}>
                  <th style={{ padding: '0.65rem', textAlign: 'left' }}>Data/Hora</th>
                  <th style={{ padding: '0.65rem', textAlign: 'left' }}>Fruto</th>
                  <th style={{ padding: '0.65rem', textAlign: 'center' }}>Raridade</th>
                  <th style={{ padding: '0.65rem', textAlign: 'center' }}>Quantidade</th>
                  <th style={{ padding: '0.65rem', textAlign: 'right' }}>Moedas Obtidas</th>
                </tr>
              </thead>
              <tbody>
                {state.salesHistory.map((sale) => (
                  <tr key={sale.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td style={{ padding: '0.65rem', color: 'var(--text-secondary)' }}>
                      {new Date(sale.timestamp).toLocaleString('pt-BR')}
                    </td>
                    <td style={{ padding: '0.65rem', fontWeight: 600 }}>{sale.fruitName}</td>
                    <td style={{ padding: '0.65rem', textAlign: 'center' }}>{sale.rarity.toUpperCase()}</td>
                    <td style={{ padding: '0.65rem', textAlign: 'center' }}>{sale.quantity}</td>
                    <td style={{ padding: '0.65rem', textAlign: 'right', fontWeight: 700, color: 'var(--accent-gold)' }}>
                      +{sale.totalCoins} moedas
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
