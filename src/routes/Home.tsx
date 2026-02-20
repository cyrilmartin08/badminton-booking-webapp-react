import { useMemo, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import DatePicker from '../components/DatePicker/DatePicker';
import CourtList from '../components/CourtList/CourtList';
import SlotGrid from '../components/SlotGrid/SlotGrid';
import BookingForm from '../components/BookingForm/BookingForm';
import EmptyState from '../components/EmptyState/EmptyState';
import styles from './Home.module.css';
import courtsData from '../data/courts.json';
import { Court } from '../types';

export default function Home() {
  const { selectedCourtId, selectedSlots, selectedDate } = useBooking();
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [onlyAvailableNow, setOnlyAvailableNow] = useState<boolean>(false);

  const courts = (courtsData.courts as Court[]);

  const filteredCourts = useMemo(() => {
    return courts.filter((c) => {
      if (locationFilter !== 'all' && c.location !== locationFilter) return false;
      return true;
    });
  }, [courts, locationFilter]);

  const locations = useMemo(() => {
    const set = new Set(courts.map(c => c.location));
    return ['all', ...Array.from(set)];
  }, [courts]);

  return (
    <div className="container">
      <section className={styles.headerRow}>
        <h1 className={styles.h1}>Book a Badminton Court</h1>
        <p className={styles.sub}>Pick a date, choose a court, select your time slots, and confirm.</p>
      </section>

      <section className={styles.controls}>
        <DatePicker />
        <div className={styles.filters}>
          <label className={styles.label}>
            Location
            <select
              aria-label="Filter by location"
              className={styles.select}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc === 'all' ? 'All locations' : loc}</option>
              ))}
            </select>
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={onlyAvailableNow}
              onChange={(e) => setOnlyAvailableNow(e.target.checked)}
            />
            Only available now / today
          </label>
        </div>
      </section>

      <CourtList
        courts={filteredCourts}
        onlyAvailableNow={onlyAvailableNow}
        selectedDate={selectedDate}
      />

      <section className={styles.bookingPanel}>
        {!selectedCourtId || selectedSlots.length === 0 ? (
          <EmptyState
            title="No selection yet"
            message="Select a court and one or more available time slots to proceed with booking."
          />
        ) : (
          <>
            <h2 className={styles.h2}>Complete your booking</h2>
            <BookingForm />
          </>
        )}
      </section>
    </div>
  );
}
``