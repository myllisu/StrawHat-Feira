import { AppState, FarmPlot, HarvestedFruit, MonitoredItem, ExtraMinuteGrant } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';

const STORAGE_KEY = 'STRAWHAT_APP_DATA_V1';

export const INITIAL_STATE: AppState = {
  version: '1.0',
  tutorialCompleted: false,
  streakDays: 5,
  coins: 150,
  tickets: 2,
  activeThemeId: 'morango',
  unlockedThemeIds: ['morango'],
  plots: [
    {
      id: 1,
      unlocked: true,
      priceCoins: 0,
      plant: {
        stage: 'fruto_maduro',
        plantedAt: Date.now() - 36 * 3600 * 1000,
        accumulatedHours: 36,
        plantName: 'Morango Doce',
        icon: '🍓',
      },
    },
    {
      id: 2,
      unlocked: false,
      priceCoins: 100,
    },
    {
      id: 3,
      unlocked: false,
      priceCoins: 400,
    },
    {
      id: 4,
      unlocked: false,
      priceCoins: 900,
    },
  ],
  inventory: [
    { id: 'f1', name: 'Morango Comum', rarity: 'comum', coinValue: 10, harvestedAt: Date.now() - 3600000, icon: '🍓' },
    { id: 'f2', name: 'Morango Grande', rarity: 'grande', coinValue: 20, harvestedAt: Date.now() - 1800000, icon: '🍓' },
  ],
  extraMinutesList: [
    {
      id: 'em1',
      minutes: 10,
      source: 'Lootbox de Recompensa',
      obtainedAt: Date.now() - 86400000,
      expiresAt: Date.now() + 6 * 86400000, // 6 days remaining
      used: false,
    },
  ],
  monitoredItems: GAME_CONFIG.DEFAULT_MONITORED_ITEMS,
  stats: [],
  userStats: {
    streakDays: 5,
    maxStreakDays: 7,
    totalFocusHours: 42,
    totalHarvestsCount: 8,
    totalFruitsSold: 6,
    totalCoinsEarned: 180,
    totalCoinsSpent: 30,
    unlockedPlotsCount: 1,
    violationsCount: 1,
  },
  salesHistory: [
    { id: 's1', fruitName: 'Morango Comum', rarity: 'comum', quantity: 3, totalCoins: 30, timestamp: Date.now() - 86400000 },
  ],
  violationsHistory: [],
  purchaseHistory: [],
};

export class StorageService {
  public static loadState(): AppState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        StorageService.saveState(INITIAL_STATE);
        return INITIAL_STATE;
      }
      const data: AppState = JSON.parse(raw);
      // Basic fallback check
      if (!data.version || !data.plots) {
        StorageService.saveState(INITIAL_STATE);
        return INITIAL_STATE;
      }
      return data;
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      return INITIAL_STATE;
    }
  }

  public static saveState(state: AppState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }

  public static clearAllData(): AppState {
    localStorage.removeItem(STORAGE_KEY);
    const fresh = { ...INITIAL_STATE, tutorialCompleted: false };
    StorageService.saveState(fresh);
    return fresh;
  }

  public static resetFarmProgress(currentState: AppState): AppState {
    const resetPlots: FarmPlot[] = [
      {
        id: 1,
        unlocked: true,
        priceCoins: 0,
        plant: {
          stage: 'broto',
          plantedAt: Date.now(),
          accumulatedHours: 6,
          plantName: 'Morango Doce',
          icon: '🌱',
        },
      },
      { id: 2, unlocked: false, priceCoins: 100 },
      { id: 3, unlocked: false, priceCoins: 400 },
      { id: 4, unlocked: false, priceCoins: 900 },
    ];

    const updated: AppState = {
      ...currentState,
      plots: resetPlots,
      streakDays: 0,
      userStats: {
        ...currentState.userStats,
        streakDays: 0,
      },
    };
    StorageService.saveState(updated);
    return updated;
  }

  public static exportJSON(state: AppState): string {
    return JSON.stringify(state, null, 2);
  }

  public static importJSON(jsonString: string): AppState | null {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.version && Array.isArray(parsed.plots)) {
        StorageService.saveState(parsed);
        return parsed;
      }
    } catch (e) {
      console.error('Invalid JSON import format:', e);
    }
    return null;
  }
}
