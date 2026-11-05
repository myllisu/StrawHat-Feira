import { MonitoredItem } from '../types';

export interface FruitRarityConfig {
  rarity: 'comum' | 'grande' | 'dourado' | 'diamante';
  name: string;
  weight: number; // Percentage total = 100
  coinValue: number;
  color: string;
  icon: string;
}

export interface GrowthStageConfig {
  stage: 'broto' | 'planta' | 'flor' | 'fruto_verde' | 'fruto_maduro';
  name: string;
  requiredHours: number;
  icon: string;
}

export interface PlotPriceConfig {
  plotIndex: number;
  priceCoins: number;
}

export interface ThemePlantIcons {
  broto: string;
  planta: string;
  flor: string;
  fruto_verde: string;
  fruto_maduro: string;
  fruitName: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  priceCoins: number; // Centralized updated prices: 150, 300, 450, 650, 900, 1500, 3000
  unlockedByDefault?: boolean;
  bgGradient: string;
  darkBgGradient: string;
  cardBg: string;
  darkCardBg: string;
  cardBorder: string;
  darkCardBorder: string;
  cardShadow: string;
  accentColor: string;
  accentHover: string;
  foliageColor: string;
  foliageHover: string;
  textColor: string;
  darkTextColor: string;
  badgeBg: string;
  darkBadgeBg: string;
  plantEmoji: string;
  fruitEmoji: string;
  icon: string;
  plantIcons: ThemePlantIcons;
}

export interface LootboxProbConfig {
  id: string;
  name: string;
  rarity: 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario' | 'extra_minutes';
  probability: number; // Percentage total = 100
  rewardType: 'theme' | 'extra_minutes';
  themeId?: string;
  extraMinutesAmount?: number;
  color: string;
}

export const GAME_CONFIG = {
  GROWTH_STAGES: [
    { stage: 'broto', name: 'Broto', requiredHours: 6, icon: '🌱' },
    { stage: 'planta', name: 'Planta Pequena', requiredHours: 12, icon: '🌿' },
    { stage: 'flor', name: 'Flor', requiredHours: 18, icon: '🌸' },
    { stage: 'fruto_verde', name: 'Fruto Verde', requiredHours: 24, icon: '🍏' },
    { stage: 'fruto_maduro', name: 'Fruto Maduro', requiredHours: 36, icon: '🍓' },
  ] as GrowthStageConfig[],

  PLOT_PRICES: [
    { plotIndex: 1, priceCoins: 0 },
    { plotIndex: 2, priceCoins: 100 },
    { plotIndex: 3, priceCoins: 400 },
    { plotIndex: 4, priceCoins: 900 },
  ] as PlotPriceConfig[],

  FRUIT_RARITIES: [
    { rarity: 'comum', name: 'Comum', weight: 75, coinValue: 10, color: '#e53e3e', icon: '🍓' },
    { rarity: 'grande', name: 'Grande', weight: 18, coinValue: 20, color: '#e67e22', icon: '🍓' },
    { rarity: 'dourado', name: 'Dourado', weight: 6, coinValue: 50, color: '#f1c40f', icon: '⭐' },
    { rarity: 'diamante', name: 'Diamante', weight: 1, coinValue: 150, color: '#3498db', icon: '💎' },
  ] as FruitRarityConfig[],

  STREAK_BONUSES: [
    { days: 3, bonusPercent: 5 },
    { days: 7, bonusPercent: 10 },
    { days: 15, bonusPercent: 15 },
    { days: 30, bonusPercent: 20 },
  ],

  // Centralized Theme Prices & Visual Tokens:
  // Morango (150), Manga (300), Melancia (450), Abacate (650), Pitaya (900), Sakura (1500), Café (3000)
  THEMES: [
    {
      id: 'morango',
      name: 'Morango Doce',
      description: 'Tema padrão aconchegante com folhas verdes, flores e morangos vermelhos.',
      priceCoins: 150,
      unlockedByDefault: true,
      bgGradient: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 50%, #feebc8 100%)',
      darkBgGradient: 'linear-gradient(135deg, #1c1315 0%, #2b171a 50%, #161214 100%)',
      cardBg: 'rgba(255, 255, 255, 0.94)',
      darkCardBg: 'rgba(32, 23, 26, 0.94)',
      cardBorder: 'rgba(229, 62, 62, 0.18)',
      darkCardBorder: 'rgba(229, 62, 62, 0.3)',
      cardShadow: '0 10px 25px -5px rgba(229, 62, 62, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      accentColor: '#e53e3e',
      accentHover: '#c53030',
      foliageColor: '#38a169',
      foliageHover: '#2f855a',
      textColor: '#2d3748',
      darkTextColor: '#f7fafc',
      badgeBg: '#feebc8',
      darkBadgeBg: 'rgba(254, 235, 200, 0.15)',
      plantEmoji: '🌿',
      fruitEmoji: '🍓',
      icon: '🍓',
      plantIcons: {
        broto: '🌱',
        planta: '🌿',
        flor: '🌸',
        fruto_verde: '🍏',
        fruto_maduro: '🍓',
        fruitName: 'Morango',
      },
    },
    {
      id: 'manga',
      name: 'Manga Tropical',
      description: 'Visual ensolarado com folhas tropicais e mangas amarelas e alaranjadas.',
      priceCoins: 300,
      bgGradient: 'linear-gradient(135deg, #fffaf0 0%, #feebc8 50%, #fbd38d 100%)',
      darkBgGradient: 'linear-gradient(135deg, #1d170f 0%, #2c2011 50%, #15130d 100%)',
      cardBg: 'rgba(255, 255, 255, 0.94)',
      darkCardBg: 'rgba(34, 26, 17, 0.94)',
      cardBorder: 'rgba(221, 107, 32, 0.2)',
      darkCardBorder: 'rgba(221, 107, 32, 0.35)',
      cardShadow: '0 10px 25px -5px rgba(221, 107, 32, 0.1)',
      accentColor: '#dd6b20',
      accentHover: '#c05621',
      foliageColor: '#2b6cb0',
      foliageHover: '#2c5282',
      textColor: '#2c403f',
      darkTextColor: '#feebc8',
      badgeBg: '#feebc8',
      darkBadgeBg: 'rgba(254, 235, 200, 0.15)',
      plantEmoji: '🪴',
      fruitEmoji: '🥭',
      icon: '🥭',
      plantIcons: {
        broto: '🌱',
        planta: '🪴',
        flor: '🌼',
        fruto_verde: '🥭',
        fruto_maduro: '🥭',
        fruitName: 'Manga',
      },
    },
    {
      id: 'melancia',
      name: 'Melancia Fresca',
      description: 'Visual refrescante com rama verde, flores amarelas e melancias sulcadas.',
      priceCoins: 450,
      bgGradient: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 50%, #fed7d7 100%)',
      darkBgGradient: 'linear-gradient(135deg, #0e1e13 0%, #152d1c 50%, #201316 100%)',
      cardBg: 'rgba(255, 255, 255, 0.94)',
      darkCardBg: 'rgba(21, 38, 26, 0.94)',
      cardBorder: 'rgba(56, 161, 105, 0.2)',
      darkCardBorder: 'rgba(56, 161, 105, 0.35)',
      cardShadow: '0 10px 25px -5px rgba(56, 161, 105, 0.1)',
      accentColor: '#38a169',
      accentHover: '#2f855a',
      foliageColor: '#e53e3e',
      foliageHover: '#c53030',
      textColor: '#1c4532',
      darkTextColor: '#e6fffa',
      badgeBg: '#c6f6d5',
      darkBadgeBg: 'rgba(198, 246, 213, 0.15)',
      plantEmoji: '🍉',
      fruitEmoji: '🍉',
      icon: '🍉',
      plantIcons: {
        broto: '🌱',
        planta: '🌿',
        flor: '🌼',
        fruto_verde: '🍈',
        fruto_maduro: '🍉',
        fruitName: 'Melancia',
      },
    },
    {
      id: 'abacate',
      name: 'Abacate Cremoso',
      description: 'Tons verde-oliva relaxantes com árvore de abacate e frutos cremosos.',
      priceCoins: 650,
      bgGradient: 'linear-gradient(135deg, #f0fff4 0%, #d4edda 50%, #c3e6cb 100%)',
      darkBgGradient: 'linear-gradient(135deg, #101e13 0%, #172a1b 50%, #0d170e 100%)',
      cardBg: 'rgba(255, 255, 255, 0.94)',
      darkCardBg: 'rgba(22, 36, 25, 0.94)',
      cardBorder: 'rgba(72, 187, 120, 0.2)',
      darkCardBorder: 'rgba(72, 187, 120, 0.35)',
      cardShadow: '0 10px 25px -5px rgba(72, 187, 120, 0.1)',
      accentColor: '#48bb78',
      accentHover: '#38a169',
      foliageColor: '#276749',
      foliageHover: '#1c4532',
      textColor: '#1c4532',
      darkTextColor: '#d4edda',
      badgeBg: '#d4edda',
      darkBadgeBg: 'rgba(212, 237, 218, 0.15)',
      plantEmoji: '🥑',
      fruitEmoji: '🥑',
      icon: '🥑',
      plantIcons: {
        broto: '🌱',
        planta: '🪴',
        flor: '🌼',
        fruto_verde: '🍏',
        fruto_maduro: '🥑',
        fruitName: 'Abacate',
      },
    },
    {
      id: 'pitaya',
      name: 'Pitaya Neon',
      description: 'Cactos tropicais com flores exóticas e pitayas rosa fúcsia.',
      priceCoins: 900,
      bgGradient: 'linear-gradient(135deg, #fff5f7 0%, #fed7e2 50%, #fbb6ce 100%)',
      darkBgGradient: 'linear-gradient(135deg, #200d17 0%, #301323 50%, #150910 100%)',
      cardBg: 'rgba(255, 255, 255, 0.94)',
      darkCardBg: 'rgba(38, 20, 30, 0.94)',
      cardBorder: 'rgba(213, 63, 140, 0.2)',
      darkCardBorder: 'rgba(213, 63, 140, 0.35)',
      cardShadow: '0 10px 25px -5px rgba(213, 63, 140, 0.12)',
      accentColor: '#d53f8c',
      accentHover: '#b83280',
      foliageColor: '#38a169',
      foliageHover: '#2f855a',
      textColor: '#521b41',
      darkTextColor: '#fed7e2',
      badgeBg: '#fed7e2',
      darkBadgeBg: 'rgba(254, 215, 226, 0.15)',
      plantEmoji: '🌺',
      fruitEmoji: '🪷',
      icon: '🌺',
      plantIcons: {
        broto: '🌱',
        planta: '🌵',
        flor: '🌺',
        fruto_verde: '🪷',
        fruto_maduro: '🌺',
        fruitName: 'Pitaya',
      },
    },
    {
      id: 'sakura',
      name: 'Sakura Primaveril',
      description: 'Flores de cerejeira delicadas e elementos de um jardim japonês.',
      priceCoins: 1500,
      bgGradient: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 50%, #fbb6ce 100%)',
      darkBgGradient: 'linear-gradient(135deg, #200e16 0%, #301421 50%, #15090f 100%)',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      darkCardBg: 'rgba(38, 22, 30, 0.94)',
      cardBorder: 'rgba(237, 100, 166, 0.2)',
      darkCardBorder: 'rgba(237, 100, 166, 0.35)',
      cardShadow: '0 10px 25px -5px rgba(237, 100, 166, 0.12)',
      accentColor: '#ed64a6',
      accentHover: '#d53f8c',
      foliageColor: '#319795',
      foliageHover: '#2c7a7b',
      textColor: '#521b41',
      darkTextColor: '#ffe3e3',
      badgeBg: '#ffe3e3',
      darkBadgeBg: 'rgba(255, 227, 227, 0.15)',
      plantEmoji: '🌸',
      fruitEmoji: '🌸',
      icon: '🌸',
      plantIcons: {
        broto: '🌱',
        planta: '🎋',
        flor: '🌸',
        fruto_verde: '🌸',
        fruto_maduro: '🌸',
        fruitName: 'Sakura',
      },
    },
    {
      id: 'cafe',
      name: 'Café & Chocolate',
      description: 'Cafeeiros aconchegantes com flores brancas e frutos de café avermelhados.',
      priceCoins: 3000,
      bgGradient: 'linear-gradient(135deg, #fefcbf 0%, #f6ad55 50%, #dd6b20 100%)',
      darkBgGradient: 'linear-gradient(135deg, #1b1009 0%, #28170d 50%, #120b06 100%)',
      cardBg: 'rgba(255, 255, 255, 0.94)',
      darkCardBg: 'rgba(34, 22, 14, 0.94)',
      cardBorder: 'rgba(140, 74, 39, 0.25)',
      darkCardBorder: 'rgba(140, 74, 39, 0.4)',
      cardShadow: '0 10px 25px -5px rgba(140, 74, 39, 0.15)',
      accentColor: '#8c4a27',
      accentHover: '#6b361a',
      foliageColor: '#38a169',
      foliageHover: '#2f855a',
      textColor: '#3d200d',
      darkTextColor: '#feebc8',
      badgeBg: '#feebc8',
      darkBadgeBg: 'rgba(254, 235, 200, 0.15)',
      plantEmoji: '☕',
      fruitEmoji: '🫘',
      icon: '☕',
      plantIcons: {
        broto: '🌱',
        planta: '🌿',
        flor: '⚪',
        fruto_verde: '🫘',
        fruto_maduro: '☕',
        fruitName: 'Grão de Café',
      },
    },
  ] as ThemeConfig[],

  LOOTBOX_TICKET_PRICE_COINS: 80,
  LOOTBOX_PROBABILITIES: [
    { id: 'l1', name: 'Tema Comum (Manga)', rarity: 'comum', probability: 60, rewardType: 'theme', themeId: 'manga', color: '#a0aec0' },
    { id: 'l2', name: 'Tema Incomum (Melancia)', rarity: 'incomum', probability: 20, rewardType: 'theme', themeId: 'melancia', color: '#48bb78' },
    { id: 'l3', name: 'Tema Raro (Abacate)', rarity: 'raro', probability: 10, rewardType: 'theme', themeId: 'abacate', color: '#4299e1' },
    { id: 'l4', name: 'Tema Épico (Pitaya)', rarity: 'epico', probability: 5, rewardType: 'theme', themeId: 'pitaya', color: '#9f7aea' },
    { id: 'l5', name: 'Tema Lendário (Sakura)', rarity: 'lendario', probability: 3, rewardType: 'theme', themeId: 'sakura', color: '#ed64a6' },
    { id: 'l6', name: '+10 Minutos Extras Exclusivos', rarity: 'extra_minutes', probability: 2, rewardType: 'extra_minutes', extraMinutesAmount: 10, color: '#ed8936' },
  ] as LootboxProbConfig[],

  DEFAULT_MONITORED_ITEMS: [
    {
      id: 'item_1',
      name: 'Instagram',
      type: 'app',
      identifier: 'com.instagram.android',
      dailyLimitMinutes: 45,
      timeUsedMinutesToday: 20,
      active: true,
      weekdayLimit: 45,
      weekendLimit: 90,
      daysActive: [0, 1, 2, 3, 4, 5, 6],
      scheduleEnabled: true,
      timeWindows: [
        {
          id: 'tw_1',
          name: 'Bloqueio Noturno',
          startTime: '22:00',
          endTime: '07:00',
          daysActive: [0, 1, 2, 3, 4, 5, 6],
          active: true,
        },
      ],
    },
    {
      id: 'item_2',
      name: 'TikTok',
      type: 'app',
      identifier: 'com.zhiliaoapp.musically',
      dailyLimitMinutes: 30,
      timeUsedMinutesToday: 35,
      active: true,
      weekdayLimit: 30,
      weekendLimit: 60,
      daysActive: [0, 1, 2, 3, 4, 5, 6],
      scheduleEnabled: false,
      timeWindows: [],
    },
    {
      id: 'item_3',
      name: 'YouTube',
      type: 'site',
      identifier: 'youtube.com',
      dailyLimitMinutes: 60,
      timeUsedMinutesToday: 15,
      active: true,
      weekdayLimit: 60,
      weekendLimit: 120,
      daysActive: [0, 1, 2, 3, 4, 5, 6],
      scheduleEnabled: false,
      timeWindows: [],
    },
  ] as MonitoredItem[],
};

