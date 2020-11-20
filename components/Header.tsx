import styles from './../styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
    </header>
  );
}