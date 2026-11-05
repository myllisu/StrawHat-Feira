import { MonitoredItem, TimeWindow } from '../types';

/**
 * Formats total minutes into readable hours and minutes format.
 * Examples: 45 -> "45 min", 60 -> "1 h", 90 -> "1 h 30 min", 120 -> "2 h".
 */
export function formatMinutesToHoursMin(totalMinutes: number): string {
  if (!totalMinutes || totalMinutes <= 0) return '0 min';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} h ${minutes} min`;
  } else if (hours > 0) {
    return `${hours} h`;
  } else {
    return `${minutes} min`;
  }
}

/**
 * Parses separate hours and minutes into total minutes.
 * Ensures non-negative numbers.
 */
export function parseHoursMinutesToTotalMinutes(hours: number, minutes: number): number {
  const h = Math.max(0, Math.floor(Number(hours) || 0));
  const m = Math.max(0, Math.floor(Number(minutes) || 0));
  return h * 60 + m;
}

/**
 * Formats day array (0..6) into human readable day names.
 */
export function formatDaysList(daysActive: number[]): string {
  if (!daysActive || daysActive.length === 0) return 'Nenhum dia';
  if (daysActive.length === 7) return 'Todos os dias';
  if (daysActive.length === 5 && daysActive.every((d) => d >= 1 && d <= 5)) return 'Segunda a Sexta';
  if (daysActive.length === 2 && daysActive.includes(0) && daysActive.includes(6)) return 'Fim de semana';

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return daysActive
    .slice()
    .sort((a, b) => a - b)
    .map((d) => dayNames[d])
    .join(', ');
}

/**
 * Checks if a specific time window is currently active.
 * Handles overnight time windows crossing midnight (e.g., 22:00 to 07:00).
 */
export function isScheduleWindowActive(
  startTime: string, // "HH:MM" e.g. "22:00"
  endTime: string,   // "HH:MM" e.g. "07:00"
  daysActive: number[], // [0..6] (0 = Sunday, 1 = Monday, etc.)
  currentTime: Date = new Date()
): boolean {
  if (!daysActive || daysActive.length === 0) return false;

  const currentDay = currentTime.getDay(); // 0-6
  const currentMinutesOfDay = currentTime.getHours() * 60 + currentTime.getMinutes();

  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  const startMinutes = startH * 60 + (startM || 0);
  const endMinutes = endH * 60 + (endM || 0);

  if (startMinutes < endMinutes) {
    // Normal same-day window e.g. 09:00 to 17:00
    if (!daysActive.includes(currentDay)) return false;
    return currentMinutesOfDay >= startMinutes && currentMinutesOfDay < endMinutes;
  } else if (startMinutes > endMinutes) {
    // Overnight window crossing midnight e.g. 22:00 to 07:00
    // Part 1: Evening of start day (e.g. 22:00 - 23:59 on Sunday)
    if (daysActive.includes(currentDay) && currentMinutesOfDay >= startMinutes) {
      return true;
    }
    // Part 2: Morning of next day (e.g. 00:00 - 07:00 on Monday)
    // The previous day must be in daysActive!
    const previousDay = (currentDay + 6) % 7;
    if (daysActive.includes(previousDay) && currentMinutesOfDay < endMinutes) {
      return true;
    }
    return false;
  } else {
    // start === end (all day if active day)
    return daysActive.includes(currentDay);
  }
}

/**
 * Checks if a monitored item currently has an active scheduled time lock.
 */
export function isItemScheduleActive(
  item: MonitoredItem,
  currentTime: Date = new Date()
): { active: boolean; activeWindow?: TimeWindow } {
  if (!item.active || !item.scheduleEnabled || !item.timeWindows || item.timeWindows.length === 0) {
    return { active: false };
  }

  for (const window of item.timeWindows) {
    if (window.active && isScheduleWindowActive(window.startTime, window.endTime, window.daysActive, currentTime)) {
      return { active: true, activeWindow: window };
    }
  }

  return { active: false };
}

