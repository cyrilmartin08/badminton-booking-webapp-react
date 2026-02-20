import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BookingProvider } from '../src/context/BookingContext';
import Home from '../src/routes/Home';

function setup() {
  return render(
    <BookingProvider>
      <Home />
    </BookingProvider>
  );
}

describe('Booking flow', () => {
  it('select slot → submit → appears in My Bookings state (visible summary)', async () => {
    const user = userEvent.setup();
    setup();

    // choose a future date (tomorrow)
    const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
    const today = new Date();
    const next = new Date(today);
    next.setDate(today.getDate() + 1);
    const yyyy = next.getFullYear();
    const mm = String(next.getMonth() + 1).padStart(2, '0');
    const dd = String(next.getDate()).padStart(2, '0');
    const future = `${yyyy}-${mm}-${dd}`;

    await user.clear(dateInput);
    await user.type(dateInput, future);

    // select first available slot
    const slotBtn = await screen.findByRole('button', { name: /slot 06:00/i });
    if (!slotBtn.hasAttribute('disabled')) {
      await user.click(slotBtn);
    }

    // Fill form
    const name = screen.getByPlaceholderText(/your name/i);
    const phone = screen.getByPlaceholderText(/\+91/i);
    await user.type(name, 'Test User');
    await user.type(phone, '+919999999999');

    // Submit
    const submit = screen.getByRole('button', { name: /confirm booking/i });
    if (submit.hasAttribute('disabled')) {
      // select another slot if first was disabled (edge in CI timezones)
      const alt = screen.getByRole('button', { name: /slot 07:00/i });
      if (!alt.hasAttribute('disabled')) await user.click(alt);
    }
    await user.click(submit);

    // Success alert
    expect(await screen.findByText(/booking confirmed/i)).toBeInTheDocument();
  });
});