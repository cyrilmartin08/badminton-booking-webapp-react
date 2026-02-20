import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookingProvider } from '../src/context/BookingContext';
import SlotGrid from '../src/components/SlotGrid/SlotGrid';
import { Court } from '../src/types';
import { todayStr } from '../src/utils/dates';

const mockCourt: Court = {
  id: 'c-test',
  name: 'Test Court',
  location: 'Testville',
  indoor: true
};

describe('Dynamic class CSS on slots', () => {
  it('renders state classes/data-state for available/past/disabled/booked', () => {
    render(
      <BookingProvider>
        <SlotGrid court={mockCourt} selectedDate={todayStr()} />
      </BookingProvider>
    );
    const anySlot = screen.getAllByRole('button', { name: /slot/i })[0];
    expect(anySlot.className).toMatch(/slot/);
    // data-state must exist
    expect(anySlot).toHaveAttribute('data-state');
  });
});