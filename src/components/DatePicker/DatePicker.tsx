import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { addDays, formatDate, todayStr } from '../../utils/dates';
// ✅ new (typed wrapper)
import { config, holidaysData, courtsData } from '../../data'; // ← typed import from wrapper
import styles from './DatePicker.module.css';

export default function DatePicker() {
  const { selectedDate, setSelectedDate, clearSelection } = useBooking();
  const min = todayStr();
  const max = formatDate(addDays(new Date(), config.maxAdvanceDays));

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        Date
        <input
          type="date"
          aria-label="Select date"
          className={styles.input}
          min={min}
          max={max}
          value={selectedDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedDate(e.target.value);
            clearSelection();
          }}
        />
      </label>
    </div>
  );
}