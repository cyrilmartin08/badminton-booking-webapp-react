import styles from './BookingSummary.module.css';
import { Booking } from '../../types';
import courtsData from '../../data/courts.json';

export default function BookingSummary({ booking }: { booking: Booking }) {
  const court = (courtsData.courts || []).find(c => c.id === booking.courtId);

  return (
    <div className={styles.summary} role="group" aria-label={`Booking ${booking.id}`}>
      <div className={styles.row}>
        <span className={styles.label}>Court</span>
        <span className={styles.value}>{court?.name ?? booking.courtId}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Date</span>
        <span className={styles.value}>{booking.date}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Slots</span>
        <span className={styles.value}>{booking.slots.join(', ')}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Name</span>
        <span className={styles.value}>{booking.name}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Phone</span>
        <span className={styles.value}>{booking.phone}</span>
      </div>
    </div>
  );
}
``