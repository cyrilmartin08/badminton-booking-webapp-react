import { Booking } from '../types';
export async function loadBookings(): Promise<Booking[]> {
  try {
    const res = await fetch('/api/bookings');
    if (!res.ok) return [];
    const bookings = await res.json();
    return Array.isArray(bookings) ? bookings : [];
  } catch {
    return [];
  }
}

export async function saveBookings(bookings: Booking[]): Promise<boolean> {
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookings[bookings.length - 1]) // send only the new booking
    });
    return res.ok;
  } catch {
    return false;
  }
}