import { useState, useEffect } from 'react';
import { AppState, TabType, FarmPlot, HarvestedFruit, MonitoredItem, ExtraMinuteGrant, ThemeMode } from './types';
import { StorageService } from './services/storage';
import { GAME_CONFIG } from './config/gameConfig';
import { Header } from './components/Header';
import { OnboardingScreen } from './components/OnboardingScreen';
import { FarmView } from './components/FarmView';
import { LimitsScreen } from './components/LimitsScreen';
import { ShopScreen } from './components/ShopScreen';
import { LootboxScreen } from './components/LootboxScreen';
import { StatsScreen } from './components/StatsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { LimitReachedModal } from './components/LimitReachedModal';
import './styles/theme.css';

export default function App() {
  const [state, setState] = useState<AppState>(() => StorageService.loadState());
  const [activeTab, setActiveTab] = useState<TabType>('farm');
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // System Dark Mode preference state
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Simulation modal state
  const [simulationItem, setSimulationItem] = useState<MonitoredItem | null>(null);

  // System media query listener for Dark Mode 'auto' option
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mediaQuery.addEventListener?.('change', handler);
    return () => mediaQuery.removeEventListener?.('change', handler);
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    StorageService.saveState(state);
  }, [state]);

  // Compute effective dark mode state
  const isDarkMode = state.themeMode === 'dark' || (state.themeMode === 'auto' && systemPrefersDark);

  // Apply active theme & dark mode CSS variables to root
  useEffect(() => {
    const theme = GAME_CONFIG.THEMES.find((t) => t.id === state.activeThemeId) || GAME_CONFIG.THEMES[0];
    const root = document.documentElement;

    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

    root.style.setProperty('--bg-gradient', isDarkMode ? theme.darkBgGradient : theme.bgGradient);
    root.style.setProperty('--card-bg', isDarkMode ? theme.darkCardBg : theme.cardBg);
    root.style.setProperty('--card-border', isDarkMode ? theme.darkCardBorder : theme.cardBorder);
    root.style.setProperty('--card-shadow', isDarkMode ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : theme.cardShadow);

    root.style.setProperty('--primary-strawberry', theme.accentColor);
    root.style.setProperty('--primary-hover', theme.accentHover);
    root.style.setProperty('--foliage-green', theme.foliageColor || '#38a169');
    root.style.setProperty('--foliage-hover', theme.foliageHover || '#2f855a');

    root.style.setProperty('--text-primary', isDarkMode ? (theme.darkTextColor || '#f7fafc') : theme.textColor);
    root.style.setProperty('--text-secondary', isDarkMode ? '#a0aec0' : '#718096');
    root.style.setProperty('--badge-bg', isDarkMode ? (theme.darkBadgeBg || 'rgba(255, 255, 255, 0.1)') : theme.badgeBg);
  }, [state.activeThemeId, state.themeMode, isDarkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // --- Handlers ---

  // Onboarding completion
  const handleCompleteTutorial = () => {
    setState((prev) => ({ ...prev, tutorialCompleted: true }));
    setShowTutorialModal(false);
  };

  // Toggle Theme Mode (Light <-> Dark <-> Auto)
  const handleChangeThemeMode = (mode: ThemeMode) => {
    setState((prev) => ({ ...prev, themeMode: mode }));
    const labels = { light: 'Modo Claro', dark: 'Modo Escuro', auto: 'Modo Automático (Sistema)' };
    showToast(`Aparência alterada para ${labels[mode]}`);
  };

  const handleToggleQuickThemeMode = () => {
    const nextMode: ThemeMode = isDarkMode ? 'light' : 'dark';
    handleChangeThemeMode(nextMode);
  };

  // Unlock Plot
  const handleUnlockPlot = (plotId: number) => {
    const targetPlot = state.plots.find((p) => p.id === plotId);
    if (!targetPlot || targetPlot.unlocked) return;

    if (state.coins < targetPlot.priceCoins) {
      showToast(`Moedas insuficientes! Você precisa de ${targetPlot.priceCoins} moedas.`);
      return;
    }

    const activeTheme = GAME_CONFIG.THEMES.find((t) => t.id === state.activeThemeId) || GAME_CONFIG.THEMES[0];
    const fruitName = activeTheme.plantIcons?.fruitName || 'Morango';

    setState((prev) => {
      const updatedCoins = prev.coins - targetPlot.priceCoins;
      const updatedPlots: FarmPlot[] = prev.plots.map((p) =>
        p.id === plotId
          ? {
              ...p,
              unlocked: true,
              plant: {
                stage: 'broto',
                plantedAt: Date.now(),
                accumulatedHours: 6,
                plantName: `${fruitName} Doce`,
                icon: '🌱',
              },
            }
          : p
      );

      return {
        ...prev,
        coins: updatedCoins,
        plots: updatedPlots,
        userStats: {
          ...prev.userStats,
          unlockedPlotsCount: prev.userStats.unlockedPlotsCount + 1,
          totalCoinsSpent: prev.userStats.totalCoinsSpent + targetPlot.priceCoins,
        },
        purchaseHistory: [
          ...prev.purchaseHistory,
          {
            id: `p_${Date.now()}`,
            itemType: 'plot',
            itemId: `plot_${plotId}`,
            itemName: `Canteiro #${plotId}`,
            costCoins: targetPlot.priceCoins,
            timestamp: Date.now(),
          },
        ],
      };
    });

    showToast(`Canteiro #${plotId} desbloqueado com sucesso! 🎉`);
  };

  // Harvest Fruit from mature plot
  const handleHarvest = (plotId: number) => {
    const targetPlot = state.plots.find((p) => p.id === plotId);
    if (!targetPlot || !targetPlot.plant || targetPlot.plant.stage !== 'fruto_maduro') return;

    const activeTheme = GAME_CONFIG.THEMES.find((t) => t.id === state.activeThemeId) || GAME_CONFIG.THEMES[0];
    const fruitBaseName = activeTheme.plantIcons?.fruitName || 'Morango';

    // Weighted random rarity calculation (Total 100%)
    const rand = Math.random() * 100;
    let accumulated = 0;
    let selectedRarity = GAME_CONFIG.FRUIT_RARITIES[0];

    for (const r of GAME_CONFIG.FRUIT_RARITIES) {
      accumulated += r.weight;
      if (rand <= accumulated) {
        selectedRarity = r;
        break;
      }
    }

    const newFruit: HarvestedFruit = {
      id: `fruit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: `${fruitBaseName} ${selectedRarity.name}`,
      rarity: selectedRarity.rarity,
      coinValue: selectedRarity.coinValue,
      harvestedAt: Date.now(),
      icon: selectedRarity.icon,
      themeId: state.activeThemeId,
    };

    setState((prev) => {
      // Reset harvested plot to new sprout
      const updatedPlots: FarmPlot[] = prev.plots.map((p) =>
        p.id === plotId
          ? {
              ...p,
              plant: {
                stage: 'broto',
                plantedAt: Date.now(),
                accumulatedHours: 6,
                plantName: `${fruitBaseName} Doce`,
                icon: '🌱',
              },
            }
          : p
      );

      return {
        ...prev,
        inventory: [...prev.inventory, newFruit],
        plots: updatedPlots,
        userStats: {
          ...prev.userStats,
          totalHarvestsCount: prev.userStats.totalHarvestsCount + 1,
        },
      };
    });

    showToast(`Você colheu um ${newFruit.name} (${selectedRarity.name})! 🧺`);
  };

  // Simulate time advance for testing plant growth
  const handleSimulateTimeAdvance = (plotId: number, hours: number) => {
    setState((prev) => {
      const updatedPlots: FarmPlot[] = prev.plots.map((p) => {
        if (p.id !== plotId || !p.plant) return p;

        const newHours = Math.min(36, p.plant.accumulatedHours + hours);
        const stages = GAME_CONFIG.GROWTH_STAGES;

        // Determine matching stage
        let newStage = stages[0].stage;
        let newIcon = stages[0].icon;

        for (let i = stages.length - 1; i >= 0; i--) {
          if (newHours >= stages[i].requiredHours) {
            newStage = stages[i].stage;
            newIcon = stages[i].icon;
            break;
          }
        }

        return {
          ...p,
          plant: {
            ...p.plant,
            accumulatedHours: newHours,
            stage: newStage,
            icon: newIcon,
          },
        };
      });

      return { ...prev, plots: updatedPlots };
    });

    showToast(`+${hours}h de tempo de foco simulado!`);
  };

  // Sell individual fruit
  const handleSellFruit = (fruitId: string) => {
    const fruit = state.inventory.find((f) => f.id === fruitId);
    if (!fruit) return;

    setState((prev) => ({
      ...prev,
      coins: prev.coins + fruit.coinValue,
      inventory: prev.inventory.filter((f) => f.id !== fruitId),
      userStats: {
        ...prev.userStats,
        totalCoinsEarned: prev.userStats.totalCoinsEarned + fruit.coinValue,
        totalFruitsSold: prev.userStats.totalFruitsSold + 1,
      },
      salesHistory: [
        {
          id: `s_${Date.now()}`,
          fruitName: fruit.name,
          rarity: fruit.rarity,
          quantity: 1,
          totalCoins: fruit.coinValue,
          timestamp: Date.now(),
        },
        ...prev.salesHistory,
      ],
    }));

    showToast(`Fruto vendido por ${fruit.coinValue} moedas! 💰`);
  };

  // Sell all fruits in inventory
  const handleSellAllFruits = () => {
    if (state.inventory.length === 0) return;

    const totalCoins = state.inventory.reduce((sum, f) => sum + f.coinValue, 0);
    const totalCount = state.inventory.length;

    setState((prev) => ({
      ...prev,
      coins: prev.coins + totalCoins,
      inventory: [],
      userStats: {
        ...prev.userStats,
        totalCoinsEarned: prev.userStats.totalCoinsEarned + totalCoins,
        totalFruitsSold: prev.userStats.totalFruitsSold + totalCount,
      },
      salesHistory: [
        {
          id: `s_${Date.now()}`,
          fruitName: 'Lote de Frutos Colhidos',
          rarity: 'comum',
          quantity: totalCount,
          totalCoins: totalCoins,
          timestamp: Date.now(),
        },
        ...prev.salesHistory,
      ],
    }));

    showToast(`Venda concluída! +${totalCoins} moedas adicionadas ao saldo! 💰`);
  };

  // Add Monitored Item
  const handleAddItem = (item: Omit<MonitoredItem, 'id'>) => {
    const newItem: MonitoredItem = {
      ...item,
      id: `item_${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      monitoredItems: [...prev.monitoredItems, newItem],
    }));
    showToast(`Limite para ${item.name} adicionado! 🛡️`);
  };

  // Update Monitored Item
  const handleUpdateItem = (updated: MonitoredItem) => {
    setState((prev) => ({
      ...prev,
      monitoredItems: prev.monitoredItems.map((i) => (i.id === updated.id ? updated : i)),
    }));
  };

  // Delete Monitored Item
  const handleDeleteItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      monitoredItems: prev.monitoredItems.filter((i) => i.id !== id),
    }));
    showToast('Item removido com sucesso.');
  };

  // Apply Preset Modes
  const handleApplyPresetMode = (mode: 'routine' | 'weekend' | 'everyday') => {
    setState((prev) => {
      const updatedItems: MonitoredItem[] = prev.monitoredItems.map((item) => {
        if (mode === 'routine') {
          return { ...item, weekdayLimit: item.weekdayLimit, weekendLimit: item.weekdayLimit * 2 };
        } else if (mode === 'weekend') {
          return { ...item, weekendLimit: Math.round(item.weekendLimit * 1.5) };
        } else {
          return { ...item, weekendLimit: item.weekdayLimit };
        }
      });
      return { ...prev, monitoredItems: updatedItems };
    });
    showToast(`Modo preset "${mode}" aplicado em todos os itens!`);
  };

  // Remove ALL limits (penalty warning applied)
  const handleRemoveAllLimitsConfirmed = () => {
    const activeTheme = GAME_CONFIG.THEMES.find((t) => t.id === state.activeThemeId) || GAME_CONFIG.THEMES[0];
    const fruitName = activeTheme.plantIcons?.fruitName || 'Morango';

    const resetPlots: FarmPlot[] = state.plots.map((p) => ({
      ...p,
      plant: p.plant
        ? {
            stage: 'broto',
            plantedAt: Date.now(),
            accumulatedHours: 6,
            plantName: `${fruitName} Doce`,
            icon: '🌱',
          }
        : undefined,
    }));

    setState((prev) => ({
      ...prev,
      monitoredItems: [],
      streakDays: 0,
      plots: resetPlots,
    }));
    showToast('Todos os limites foram desativados. O progresso da fazenda foi zerado.');
  };

  // Buy theme from Market
  const handleBuyTheme = (themeId: string) => {
    const theme = GAME_CONFIG.THEMES.find((t) => t.id === themeId);
    if (!theme) return;

    if (state.coins < theme.priceCoins) {
      showToast(`Moedas insuficientes para comprar o tema "${theme.name}"! Precisa de ${theme.priceCoins} moedas.`);
      return;
    }

    if (state.unlockedThemeIds.includes(themeId)) {
      showToast(`Você já possui o tema "${theme.name}"!`);
      return;
    }

    setState((prev) => ({
      ...prev,
      coins: prev.coins - theme.priceCoins,
      unlockedThemeIds: [...prev.unlockedThemeIds, themeId],
      activeThemeId: themeId,
      userStats: {
        ...prev.userStats,
        totalCoinsSpent: prev.userStats.totalCoinsSpent + theme.priceCoins,
      },
    }));
    showToast(`Tema "${theme.name}" comprado por ${theme.priceCoins} moedas e ativado! 🎨`);
  };

  // Select Theme
  const handleSelectTheme = (themeId: string) => {
    const theme = GAME_CONFIG.THEMES.find((t) => t.id === themeId);
    if (!theme) return;

    setState((prev) => ({ ...prev, activeThemeId: themeId }));
    showToast(`Tema alterado para "${theme.name}"! 🎨`);
  };

  // Open Lootbox
  const handleOpenLootbox = (paymentMethod: 'ticket' | 'coins') => {
    let newTickets = state.tickets;
    let newCoins = state.coins;

    if (paymentMethod === 'ticket') {
      newTickets = Math.max(0, state.tickets - 1);
    } else {
      newCoins = Math.max(0, state.coins - GAME_CONFIG.LOOTBOX_TICKET_PRICE_COINS);
    }

    // Roll probability (Total 100%)
    const rand = Math.random() * 100;
    let accumulated = 0;
    let reward = GAME_CONFIG.LOOTBOX_PROBABILITIES[0];

    for (const prob of GAME_CONFIG.LOOTBOX_PROBABILITIES) {
      accumulated += prob.probability;
      if (rand <= accumulated) {
        reward = prob;
        break;
      }
    }

    let duplicateRefund: number | undefined = undefined;

    setState((prev) => {
      let updatedUnlockedThemes = [...prev.unlockedThemeIds];
      let updatedCoins = newCoins;
      let updatedExtraMinutes = [...prev.extraMinutesList];

      if (reward.rewardType === 'theme' && reward.themeId) {
        if (updatedUnlockedThemes.includes(reward.themeId)) {
          // Duplicate fallback refund: 50 coins
          duplicateRefund = 50;
          updatedCoins += 50;
        } else {
          updatedUnlockedThemes.push(reward.themeId);
        }
      } else if (reward.rewardType === 'extra_minutes' && reward.extraMinutesAmount) {
        const newGrant: ExtraMinuteGrant = {
          id: `em_${Date.now()}`,
          minutes: reward.extraMinutesAmount,
          source: 'Lootbox de Recompensa',
          obtainedAt: Date.now(),
          expiresAt: Date.now() + 7 * 86400000, // 7 days validity
          used: false,
        };
        updatedExtraMinutes.push(newGrant);
      }

      return {
        ...prev,
        coins: updatedCoins,
        tickets: newTickets,
        unlockedThemeIds: updatedUnlockedThemes,
        extraMinutesList: updatedExtraMinutes,
      };
    });

    return { reward, duplicateRefund };
  };

  // Use Extra Minutes in block simulation
  const handleUseExtraMinutes = (grantId: string) => {
    setState((prev) => ({
      ...prev,
      extraMinutesList: prev.extraMinutesList.map((g) => (g.id === grantId ? { ...g, used: true } : g)),
    }));
    setSimulationItem(null);
    showToast('Minutos extras aplicados com sucesso! Bloqueio adiado.');
  };

  // Accept limit violation in simulation modal
  const handleAcceptViolation = () => {
    setState((prev) => ({
      ...prev,
      streakDays: 0,
      userStats: {
        ...prev.userStats,
        streakDays: 0,
        violationsCount: prev.userStats.violationsCount + 1,
      },
      violationsHistory: [
        {
          id: `v_${Date.now()}`,
          itemName: simulationItem?.name || 'Aplicativo Monitorado',
          timeOverMinutes: 10,
          timestamp: Date.now(),
          penaltyApplied: 'Reinício de Sequência',
        },
        ...prev.violationsHistory,
      ],
    }));
    setSimulationItem(null);
    showToast('Violação registrada. Sua sequência de dias foi zerada.');
  };

  // Settings Actions
  const handleResetFarm = () => {
    const updated = StorageService.resetFarmProgress(state);
    setState(updated);
    showToast('Progresso da fazenda reiniciado com sucesso.');
  };

  const handleClearAllData = () => {
    const fresh = StorageService.clearAllData();
    setState(fresh);
    showToast('Todos os dados foram apagados do navegador.');
  };

  const handleImportData = (json: string) => {
    const imported = StorageService.importJSON(json);
    if (imported) {
      setState(imported);
      showToast('Dados importados com sucesso! App restaurado.');
    } else {
      showToast('Erro ao importar JSON. Verifique o formato.');
    }
  };

  // First time onboarding check
  if (!state.tutorialCompleted && !showTutorialModal) {
    return <OnboardingScreen onComplete={handleCompleteTutorial} />;
  }

  return (
    <div className="app-container">
      {/* Top Header & Navigation Bar */}
      <Header
        state={state}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSimulation={() => setSimulationItem(state.monitoredItems[0] || null)}
        onToggleThemeMode={handleToggleQuickThemeMode}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {activeTab === 'farm' && (
          <FarmView
            state={state}
            onUnlockPlot={handleUnlockPlot}
            onHarvest={handleHarvest}
            onSimulateTimeAdvance={handleSimulateTimeAdvance}
            onSellFruit={handleSellFruit}
            onSellAllFruits={handleSellAllFruits}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === 'limits' && (
          <LimitsScreen
            state={state}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            onApplyPresetMode={handleApplyPresetMode}
            onRemoveAllLimitsConfirmed={handleRemoveAllLimitsConfirmed}
          />
        )}

        {activeTab === 'shop' && (
          <ShopScreen state={state} onBuyTheme={handleBuyTheme} onSelectTheme={handleSelectTheme} />
        )}

        {activeTab === 'lootbox' && (
          <LootboxScreen state={state} onOpenLootbox={handleOpenLootbox} />
        )}

        {activeTab === 'stats' && <StatsScreen state={state} />}

        {activeTab === 'settings' && (
          <SettingsScreen
            state={state}
            onReplayTutorial={() => setShowTutorialModal(true)}
            onResetFarm={handleResetFarm}
            onClearAllData={handleClearAllData}
            onImportData={handleImportData}
            onChangeThemeMode={handleChangeThemeMode}
          />
        )}
      </main>

      {/* Footer Banner */}
      <footer
        style={{
          textAlign: 'center',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          padding: '1rem 0',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          marginTop: '1.5rem',
        }}
      >
        StrawHat App • Produtividade & Gamificação Digital • Feito com 👒 e carinho
      </footer>

      {/* Tutorial Replay Modal */}
      {showTutorialModal && (
        <OnboardingScreen
          onComplete={handleCompleteTutorial}
          isModal
          onCloseModal={() => setShowTutorialModal(false)}
        />
      )}

      {/* Simulated Limit Reached Modal */}
      {simulationItem && (
        <LimitReachedModal
          state={state}
          item={simulationItem}
          onUseExtraMinutes={handleUseExtraMinutes}
          onAcceptViolation={handleAcceptViolation}
          onClose={() => setSimulationItem(null)}
        />
      )}

      {/* Toast Notice */}
      {toastMessage && <div className="toast-notice">{toastMessage}</div>}
    </div>
  );
}
