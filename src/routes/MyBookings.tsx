import { useBooking } from '../context/BookingContext';
import BookingSummary from '../components/BookingSummary/BookingSummary';
import EmptyState from '../components/EmptyState/EmptyState';
import styles from './MyBookings.module.css';

export default function MyBookings() {
  const { bookings, cancelBooking } = useBooking();

  const upcoming = bookings
    .slice()
    .sort((a, b) => (a.date + a.slots[0]).localeCompare(b.date + b.slots[0]));

  return (
    <div className="container">
      <h1 className={styles.h1}>My Bookings</h1>

      {upcoming.length === 0 ? (
        <EmptyState title="No bookings" message="You have no upcoming bookings." />
      ) : (
        <ul className={styles.list} aria-label="My bookings">
          {upcoming.map(b => (
            <li key={b.id} className={styles.item}>
              <BookingSummary booking={b} />
              <button
                className={styles.cancelBtn}
                onClick={() => cancelBooking(b.id)}
                aria-label={`Cancel booking ${b.id}`}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}