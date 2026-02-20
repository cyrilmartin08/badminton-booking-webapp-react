


import React, { createContext, useContext, useMemo, useState } from 'react';
import { courtsData, holidaysData, config } from '../data'; // ← typed wrapper
import { Booking, Court } from '../types';
import { generateTimeSlots, isPastSlotForDate, todayStr } from '../utils/dates';
import { loadBookings, saveBookings } from '../utils/storage';



type CreateBookingInput = {
  name: string;
  phone: string;
  notes?: string;
};

type CreateResult = { success: true; id: string } | { success: false; reason?: string };

interface BookingCtx {
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  selectedCourtId: string | null;
  setSelectedCourtId: (id: string | null) => void;
  selectedSlots: string[];
  selectSlot: (courtId: string, slot: string) => void;
  clearSelection: () => void;

  bookings: Booking[];
  isBooked: (courtId: string, date: string, slot: string) => boolean;
  createBooking: (input: CreateBookingInput) => CreateResult;
  cancelBooking: (id: string) => void;

  courtsMap: Map<string, Court>;
  hasAvailableNow: (courtId: string, date: string) => boolean;
}

const BookingContext = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<string>(todayStr());
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from backend on mount
  React.useEffect(() => {
    loadBookings().then(setBookings);
  }, []);

  const courts = (courtsData.courts as Court[]);
  const courtsMap = useMemo(() => new Map(courts.map(c => [c.id, c])), [courts]);

  function clearSelection() {
    setSelectedCourtId(null);
    setSelectedSlots([]);
  }

  function isBooked(courtId: string, date: string, slot: string) {
    return bookings.some(
      (b) => b.courtId === courtId && b.date === date && b.slots.includes(slot)
    );
  }

  function selectSlot(courtId: string, slot: string) {
    // Change court selection if needed
    if (selectedCourtId && selectedCourtId !== courtId) {
      setSelectedCourtId(courtId);
      setSelectedSlots([slot]);
      return;
    }
    if (!selectedCourtId) setSelectedCourtId(courtId);

    setSelectedSlots((prev) => {
      // Toggle selection. (Contiguity is allowed but not enforced.)
      return prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot].sort();
    });
  }

  function createBooking(input: CreateBookingInput): CreateResult {
    if (!selectedCourtId || selectedSlots.length === 0) {
      return { success: false, reason: 'No court or slots selected.' };
    }

    // Validate conflicts
    for (const s of selectedSlots) {
      if (isBooked(selectedCourtId, selectedDate, s)) {
        return { success: false, reason: 'One or more selected slots are already booked.' };
      }
      if (isPastSlotForDate(selectedDate, s)) {
        return { success: false, reason: 'Cannot book past slots.' };
      }
    }

    // Holiday / closed-court check
    if ((holidaysData.holidays || []).includes(selectedDate)) {
      return { success: false, reason: 'Bookings are closed for holidays.' };
    }
    if ((holidaysData.closedCourts && (holidaysData.closedCourts as Record<string, string[]>)[selectedCourtId] || []).includes(selectedDate)) {
      return { success: false, reason: 'This court is closed on the selected date.' };
    }

    const newBooking: Booking = {
      id: crypto.randomUUID(),
      courtId: selectedCourtId,
      date: selectedDate,
      slots: [...selectedSlots].sort(),
      name: input.name,
      phone: input.phone,
      notes: input.notes,
      createdAt: new Date().toISOString()
    };

    const next = [...bookings, newBooking];
    setBookings(next);
    saveBookings(next);

    return { success: true, id: newBooking.id };
  }

  function cancelBooking(id: string) {
    const next = bookings.filter(b => b.id !== id);
    setBookings(next);
    saveBookings(next);
  }

  function hasAvailableNow(courtId: string, date: string): boolean {
    const slots = generateTimeSlots(config.openHour, config.closeHour, config.slotIntervalMinutes);
    return slots.some((s) => {
      const booked = isBooked(courtId, date, s);
      const past = isPastSlotForDate(date, s);
      const closed = (holidaysData.closedCourts && (holidaysData.closedCourts as Record<string, string[]>)[courtId] || []).includes(date);
      const holiday = (holidaysData.holidays || []).includes(date);
      return !booked && !past && !closed && !holiday;
    });
  }

  const value: BookingCtx = {
    selectedDate,
    setSelectedDate,
    selectedCourtId,
    setSelectedCourtId,
    selectedSlots,
    selectSlot,
    clearSelection,
    bookings,
    isBooked,
    createBooking,
    cancelBooking,
    courtsMap,
    hasAvailableNow
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}