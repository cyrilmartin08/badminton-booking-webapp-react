import React, { FormEvent, useMemo, useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import styles from './BookingForm.module.css';
import Alert from '../Alert/Alert';
import { config } from '../../data'; // ← use typed wrapper

export default function BookingForm() {
  const {
    selectedCourtId,
    selectedSlots,
    selectedDate,
    createBooking,
    courtsMap,
    clearSelection
  } = useBooking();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const courtName = useMemo(() => {
    if (!selectedCourtId) return '';
    return courtsMap.get(selectedCourtId)?.name ?? '';
  }, [selectedCourtId, courtsMap]);

  const total = useMemo(() => {
    const hours = selectedSlots.length;
    return hours * config.defaultPricePerHour;
  }, [selectedSlots]);

  const valid =
    name.trim().length >= 2 &&
    /^\+?[0-9]{7,15}$/.test(phone) &&
    !!selectedCourtId &&
    selectedSlots.length > 0;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!valid) {
      setMessage({ type: 'error', text: 'Please complete all required fields correctly.' });
      return;
    }

    const ok = createBooking({
      name: name.trim(),
      phone: phone.trim(),
      notes: notes.trim() || undefined
    });

    if (ok.success) {
      setMessage({ type: 'success', text: 'Booking confirmed!' });
      setName('');
      setPhone('');
      setNotes('');
      clearSelection();
    } else {
      setMessage({ type: 'error', text: ok.reason ?? 'Could not create booking.' });
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-label="Booking form" noValidate>
      {message && <Alert type={message.type}>{message.text}</Alert>}

      <div className={styles.summary}>
        <div>
          <div className={styles.summaryLabel}>Court</div>
          <div className={styles.summaryValue}>{courtName}</div>
        </div>
        <div>
          <div className={styles.summaryLabel}>Date</div>
          <div className={styles.summaryValue}>{selectedDate}</div>
        </div>
        <div>
          <div className={styles.summaryLabel}>Slots</div>
          <div className={styles.summaryValue}>{selectedSlots.join(', ')}</div>
        </div>
        <div>
          <div className={styles.summaryLabel}>Total</div>
          <div className={styles.summaryValue}>₹{total}</div>
        </div>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>
          Name*
          <input
            className={styles.input}
            aria-invalid={name.trim().length < 2}
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>

        <label className={styles.label}>
          Phone*
          <input
            className={styles.input}
            aria-invalid={!/^\+?[0-9]{7,15}$/.test(phone)}
            type="tel"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            required
          />
        </label>
      </div>

      <label className={styles.label}>
        Notes
        <textarea
          className={styles.textarea}
          value={notes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
          placeholder="Optional notes"
          rows={3}
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.submitBtn} disabled={!valid} type="submit" aria-disabled={!valid}>
          Confirm Booking
        </button>
      </div>
    </form>
  );
}