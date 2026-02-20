import { Config } from '../types';
import config from '../data/config.json';

export function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
}

export function todayStr(): string {
  return formatDate(new Date());
}

export function addDays(d: Date, days: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + days);
  return c;
}

export function generateTimeSlots(openHour: number, closeHour: number, stepMinutes: number): string[] {
  const slots: string[] = [];
  const base = new Date();
  base.setMinutes(0, 0, 0);
  for (let h = openHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const label = `${pad2(h)}:${pad2(m)}`;
      slots.push(label);
    }
  }
  return slots;
}

/** Returns true if the given slot (HH:MM) is in the past relative to now for the given date (YYYY-MM-DD) */
export function isPastSlotForDate(dateStr: string, slot: string): boolean {
  const [h, m] = slot.split(':').map(Number);
  const [y, mon, d] = dateStr.split('-').map(Number);
  const slotDate = new Date(y, (mon - 1), d, h, m, 0, 0);
  const now = new Date();
  return slotDate.getTime() < now.getTime();
}