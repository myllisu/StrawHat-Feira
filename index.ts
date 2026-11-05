export type PlantStage = 'broto' | 'planta' | 'flor' | 'fruto_verde' | 'fruto_maduro';
export type FruitRarity = 'comum' | 'grande' | 'dourado' | 'diamante';
export type ItemType = 'app' | 'site';
export type TabType = 'farm' | 'limits' | 'shop' | 'lootbox' | 'stats' | 'settings';
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface PlantState {
  stage: PlantStage;
  plantedAt: number;
  accumulatedHours: number;
  plantName: string;
  icon: string;
}

export interface FarmPlot {
  id: number;
  unlocked: boolean;
  priceCoins: number;
  plant?: PlantState;
}

export interface HarvestedFruit {
  id: string;
  name: string;
  rarity: FruitRarity;
  coinValue: number;
  harvestedAt: number;
  icon: string;
  themeId?: string;
}

export interface ExtraMinuteGrant {
  id: string;
  minutes: number;
  source: string;
  obtainedAt: number;
  expiresAt: number; // 7 days validity
  used: boolean;
}

export interface TimeWindow {
  id: string;
  name?: string;
  startTime: string; // "HH:MM" e.g. "22:00"
  endTime: string;   // "HH:MM" e.g. "07:00"
  daysActive: number[]; // 0-6 (0 = Sun, 1 = Mon...)
  active: boolean;
}

export interface MonitoredItem {
  id: string;
  name: string;
  type: ItemType;
  identifier: string;
  dailyLimitMinutes: number;
  timeUsedMinutesToday: number;
  active: boolean;
  weekdayLimit: number;
  weekendLimit: number;
  daysActive: number[];
  scheduleEnabled?: boolean;
  timeWindows?: TimeWindow[];
}

export interface SaleRecord {
  id: string;
  fruitName: string;
  rarity: FruitRarity;
  quantity: number;
  totalCoins: number;
  timestamp: number;
}

export interface ViolationRecord {
  id: string;
  itemName: string;
  timeOverMinutes: number;
  timestamp: number;
  penaltyApplied: string;
}

export interface PurchaseRecord {
  id: string;
  itemType: 'theme' | 'ticket' | 'plot';
  itemId: string;
  itemName: string;
  costCoins: number;
  timestamp: number;
}

export interface UserStats {
  streakDays: number;
  maxStreakDays: number;
  totalFocusHours: number;
  totalHarvestsCount: number;
  totalFruitsSold: number;
  totalCoinsEarned: number;
  totalCoinsSpent: number;
  unlockedPlotsCount: number;
  violationsCount: number;
  focusedMinutesToday?: number;
  dailyGoalMinutes?: number;
  sessionsCompleted?: number;
  totalSessionsTarget?: number;
}

export interface AppState {
  version: string;
  tutorialCompleted: boolean;
  streakDays: number;
  coins: number;
  tickets: number;
  activeThemeId: string;
  themeMode: ThemeMode;
  unlockedThemeIds: string[];
  plots: FarmPlot[];
  inventory: HarvestedFruit[];
  extraMinutesList: ExtraMinuteGrant[];
  monitoredItems: MonitoredItem[];
  stats: UserStats[];
  userStats: UserStats;
  salesHistory: SaleRecord[];
  violationsHistory: ViolationRecord[];
  purchaseHistory: PurchaseRecord[];
}

export interface GardenPlant {
  id: string;
  name: string;
  stage: string;
  growthPercent: number;
  strawberryYield: number;
  icon: string;
  wateredToday: boolean;
}

export interface ScreenTimeApp {
  id: string;
  name: string;
  category: string;
  timeUsedMinutes: number;
  timeLimitMinutes: number;
  icon: string;
}

