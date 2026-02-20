import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import styles from './styles/AppShell.module.css';

export default function App() {
  return (
    <div className={styles.appShell}>
      <NavBar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Badminton Booking</p>
      </footer>
    </div>
  );
}