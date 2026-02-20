import cx from 'clsx';
import styles from './SlotGrid.module.css';
import { Court } from '../../types';
// ✅ new (typed wrapper)
import { config, holidaysData, courtsData } from '../../data';
import { generateTimeSlots, isPastSlotForDate } from '../../utils/dates';
import { useBooking } from '../../context/BookingContext';

interface Props {
  court: Court;
  selectedDate: string;
}

export default function SlotGrid({ court, selectedDate }: Props) {
  const {
    isBooked,
    selectedCourtId,
    selectedSlots,
    selectSlot
  } = useBooking();

  const slots = generateTimeSlots(
    config.openHour,
    config.closeHour,
    config.slotIntervalMinutes
  );

  // With typed holidaysData, the index access is allowed:
  const isClosedCourtDate = (holidaysData.closedCourts?.[court.id] ?? []).includes(selectedDate);

  return (
    <div className={styles.wrapper}>
      <div className={styles.legend} aria-hidden="true">
        <span className={cx(styles.legendItem, styles.available)}>Available</span>
        <span className={cx(styles.legendItem, styles.selected)}>Selected</span>
        <span className={cx(styles.legendItem, styles.booked)}>Booked</span>
        <span className={cx(styles.legendItem, styles.past)}>Past</span>
        <span className={cx(styles.legendItem, styles.disabled)}>Disabled</span>
      </div>

      <div className={styles.grid} role="grid" aria-label={`Time slots for ${court.name}`}>
        {slots.map((label) => {
          const booked = isBooked(court.id, selectedDate, label);
          const past = isPastSlotForDate(selectedDate, label);
          const disabled = isClosedCourtDate;
          const available = !booked && !past && !disabled;
          const selected = selectedCourtId === court.id && selectedSlots.includes(label);

          return (
            <button
              key={label}
              type="button"
              className={cx(
                styles.slot,
                available && styles.available,
                selected && styles.selected,
                booked && styles.booked,
                past && styles.past,
                disabled && styles.disabled
              )}
              data-state={selected ? 'selected' : booked ? 'booked' : past ? 'past' : disabled ? 'disabled' : 'available'}
              aria-pressed={selected}
              aria-label={`Slot ${label}`}
              disabled={!available}
              onClick={() => available && selectSlot(court.id, label)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}