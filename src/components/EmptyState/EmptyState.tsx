import styles from './EmptyState.module.css';

export default function EmptyState({
  title,
  message
}: {
  title: string;
  message: string;
}) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <h3 className={styles.h3}>{title}</h3>
      <p className={styles.p}>{message}</p>
    </div>
  );
}