import styles from './Header.module.css'
import SearchBar from '../SearchBar'

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>日本法令検索</h1>
      <SearchBar/>
    </header>
  )
}

export default Header