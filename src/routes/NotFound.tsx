import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={`container ${styles.wrapper}`}>
      <h1 className={styles.h1}>404 — Not Found</h1>
      <p className={styles.p}>The page you’re looking for does not exist.</p>
      <Link className={styles.link} to="/">Back to Home</Link>
    </div>
  );
}
