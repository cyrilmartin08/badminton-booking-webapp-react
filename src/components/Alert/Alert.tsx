import { ReactNode } from 'react';
import styles from './Alert.module.css';
import cx from 'clsx';

export default function Alert({
  type = 'info',
  children
}: {
  type?: 'success' | 'error' | 'info';
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cx(styles.alert, {
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
        [styles.info]: type === 'info'
      })}
    >
      {children}
    </div>
  );
}