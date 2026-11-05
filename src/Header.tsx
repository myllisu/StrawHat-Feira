import React from 'react';
import { AppState, TabType } from '../types';
import { Flame, Coins, Ticket, Sprout, Store, BarChart3, Settings, ShieldAlert, Sparkles, Sun, Moon } from 'lucide-react';
import { GAME_CONFIG } from '../config/gameConfig';
import { StrawHatIcon } from './StrawHatIcon';
import { FruitGraphic } from './FruitGraphic';

interface HeaderProps {
  state: AppState;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenSimulation: () => void;
  onToggleThemeMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  activeTab,
  onTabChange,
  onOpenSimulation,
  onToggleThemeMode,
}) => {
  const activeTheme = GAME_CONFIG.THEMES.find((t) => t.id === state.activeThemeId) || GAME_CONFIG.THEMES[0];
  const fruitCount = state.inventory.length;

  return (
    <header className="app-header">
      {/* Brand & StrawHat Logo */}
      <div className="brand-section">
        <div className="brand-icon" title={`StrawHat App • ${activeTheme.name}`}>
          <StrawHatIcon size={32} color="#d69e2e" ribbonColor="var(--primary-strawberry)" />
        </div>
        <div>
          <div className="brand-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            StrawHat
          </div>
          <div className="brand-subtitle">
            Fazenda & Produtividade Digital • <span style={{ fontWeight: 700, color: 'var(--primary-strawberry)' }}>{activeTheme.name}</span>
          </div>
        </div>
      </div>

      {/* Currency & Quick Toggle Badges */}
      <div className="header-currencies">
        <div className="currency-badge streak" title="Sequência de dias respeitando limites">
          <Flame size={16} />
          <span>{state.streakDays} dias</span>
        </div>

        <div className="currency-badge coins" title="Saldo de Moedas para o Mercado">
          <Coins size={16} />
          <span>{state.coins} moedas</span>
        </div>

        <div className="currency-badge tickets" title="Bilhetes para a Lootbox">
          <Ticket size={16} />
          <span>{state.tickets} bilhetes</span>
        </div>

        <div className="currency-badge strawberries" title="Frutos no inventário prontos para venda">
          <FruitGraphic themeId={activeTheme.id} rarity="comum" size={18} />
          <span>{fruitCount} {activeTheme.plantIcons?.fruitName || 'frutos'}</span>
        </div>

        {onToggleThemeMode && (
          <button
            className="btn btn-secondary"
            onClick={onToggleThemeMode}
            style={{ padding: '0.4rem 0.65rem', fontSize: '0.82rem' }}
            title={`Alternar Modo (Atual: ${state.themeMode})`}
          >
            {state.themeMode === 'dark' ? <Moon size={16} color="#f6ad55" /> : <Sun size={16} color="#dd6b20" />}
          </button>
        )}

        <button
          className="btn btn-secondary"
          onClick={onOpenSimulation}
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem', gap: '0.3rem' }}
          title="Simular aviso de limite de aplicativo excedido"
        >
          <ShieldAlert size={15} color="var(--primary-strawberry)" />
          <span>Simular Limite</span>
        </button>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="nav-tabs" style={{ width: '100%', marginTop: '0.5rem' }}>
        <button
          className={`nav-tab-btn ${activeTab === 'farm' ? 'active' : ''}`}
          onClick={() => onTabChange('farm')}
        >
          <Sprout size={18} />
          Fazenda
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'limits' ? 'active' : ''}`}
          onClick={() => onTabChange('limits')}
        >
          <ShieldAlert size={18} />
          Limites & Agenda
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => onTabChange('shop')}
        >
          <Store size={18} />
          Mercado
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'lootbox' ? 'active' : ''}`}
          onClick={() => onTabChange('lootbox')}
        >
          <Sparkles size={18} />
          Lootbox
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => onTabChange('stats')}
        >
          <BarChart3 size={18} />
          Estatísticas
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => onTabChange('settings')}
        >
          <Settings size={18} />
          Configurações
        </button>
      </nav>
    </header>
  );
};
