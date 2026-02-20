import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.row}`}>
        <Link to="/" className={styles.brand} aria-label="Home">
          🏸 Badminton Booking
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Home
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            My Bookings
          </NavLink>
        </nav>
      </div>
    </header>
  );
}