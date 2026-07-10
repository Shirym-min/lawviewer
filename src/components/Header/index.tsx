import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>日本法令検索 Laws Search</h1>
      <p className={styles.description}>e-gov法令API</p>
    </header>
  )
}

export default Header