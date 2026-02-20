import { useMemo } from 'react';
import { Court } from '../../types';
import { useBooking } from '../../context/BookingContext';
import SlotGrid from '../SlotGrid/SlotGrid';
import styles from './CourtList.module.css';
import holidaysData from '../../data/holidays.json';

interface Props {
  courts: Court[];
  selectedDate: string;
  onlyAvailableNow: boolean;
}

export default function CourtList({ courts, selectedDate, onlyAvailableNow }: Props) {
  const { hasAvailableNow } = useBooking();

  const visibleCourts = useMemo(() => {
    if (!onlyAvailableNow) return courts;
    return courts.filter(c => hasAvailableNow(c.id, selectedDate));
  }, [courts, onlyAvailableNow, hasAvailableNow, selectedDate]);

  if (visibleCourts.length === 0) {
    return (
      <p className={styles.noResults}>
        No courts match the selected filters.
      </p>
    );
  }

  const dateIsHoliday = (holidaysData.holidays || []).includes(selectedDate);

  return (
    <section className={styles.grid} aria-label="Courts">
      {visibleCourts.map(court => (
        <article key={court.id} className={styles.card} aria-labelledby={`court-${court.id}`}>
          <header className={styles.cardHeader}>
            <div>
              <h2 id={`court-${court.id}`} className={styles.cardTitle}>{court.name}</h2>
              <p className={styles.meta}>
                {court.location} · {court.indoor ? 'Indoor' : 'Outdoor'}
                {court.surface ? ` · ${court.surface}` : ''}
              </p>
            </div>
          </header>

          {dateIsHoliday ? (
            <div className={styles.holiday}>
              This date is a holiday. Bookings are closed.
            </div>
          ) : (
            <SlotGrid court={court} selectedDate={selectedDate} />
          )}
        </article>
      ))}
    </section>
  );
}
``