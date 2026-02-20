// src/types.ts

export interface Court {
  id: string;
  name: string;
  location: string;
  surface?: string; // e.g. "wood", "synthetic", etc.
  indoor?: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  date: string;      // YYYY-MM-DD
  slots: string[];   // e.g. ["06:00", "07:00"]
  name: string;
  phone: string;
  notes?: string;
  createdAt: string; // ISO timestamp
}

export interface Config {
  slotIntervalMinutes: number;
  openHour: number;        // e.g. 6
  closeHour: number;       // e.g. 22
  maxAdvanceDays: number;  // e.g. 14
  currency: string;        // e.g. "INR"
  defaultPricePerHour: number;
}

export interface HolidaysData {
  holidays: string[]; // e.g. ["2026-03-29"]
  closedCourts: Record<string, string[]>; // courtId -> ["2026-03-29"]
}