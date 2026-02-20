// src/data/index.ts
import rawConfig from './config.json';
import rawHolidays from './holidays.json';
import rawCourts from './courts.json';

import type { Config, HolidaysData, Court } from '../types';

/**
 * Normalize config: accept either an object or an array with a single object,
 * and validate required fields. Throws early if missing.
 */
function normalizeConfig(rc: unknown): Config {
  const obj = Array.isArray(rc) ? rc[0] : rc;
  const c = obj as Partial<Config>;

  if (
    typeof c?.openHour !== 'number' ||
    typeof c?.closeHour !== 'number' ||
    typeof c?.slotIntervalMinutes !== 'number' ||
    typeof c?.maxAdvanceDays !== 'number' ||
    typeof c?.defaultPricePerHour !== 'number' ||
    typeof c?.currency !== 'string'
  ) {
    throw new Error(
      'Invalid config.json shape. It must be a single object with required numeric fields and currency string.'
    );
  }
  return c as Config;
}

/**
 * Normalize holidays: widen literal keys to Record<string, string[]>
 * so we can index with any courtId string.
 */
function normalizeHolidays(rh: unknown): HolidaysData {
  const h = rh as Partial<HolidaysData>;
  return {
    holidays: Array.isArray(h?.holidays) ? (h!.holidays as string[]) : [],
    closedCourts:
      h && typeof h.closedCourts === 'object' && h.closedCourts !== null
        ? (h.closedCourts as Record<string, string[]>)
        : {}
  };
}

/**
 * Normalize courts: ensure a consistent { courts: Court[] } shape.
 */
function normalizeCourts(rc: unknown): { courts: Court[] } {
  const c = rc as any;
  const courts = Array.isArray(c?.courts) ? (c.courts as Court[]) : [];
  return { courts };
}

export const config = normalizeConfig(rawConfig as unknown);
export const holidaysData = normalizeHolidays(rawHolidays as unknown);
export const courtsData = normalizeCourts(rawCourts as unknown);