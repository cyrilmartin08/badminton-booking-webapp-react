import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { BookingProvider, useBooking } from '../src/context/BookingContext';
import { todayStr } from '../src/utils/dates';

function renderUseBooking() {
  const wrapper = ({ children }: any) => <BookingProvider>{children}</BookingProvider>;
  return renderHook(() => useBooking(), { wrapper });
}

describe('Double booking prevention', () => {
  it('cannot book the same court/slot twice', () => {
    const { result } = renderUseBooking();
    const date = todayStr();

    act(() => {
      result.current.setSelectedDate(date);
      result.current.selectSlot('c1', '21:00');
      result.current.createBooking({ name: 'A', phone: '+910000000000' });
    });

    // try to book same again
    act(() => {
      result.current.selectSlot('c1', '21:00');
    });
    const isBooked = result.current.isBooked('c1', date, '21:00');
    expect(isBooked).toBe(true);
  });
});
``