import styles from './Header.module.css'
import SearchBar from '../SearchBar'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.homeLink}>
        <h1 className={styles.title}>
          日本法令検索
        </h1>
      </Link>
      <SearchBar/>
    </header>
  )
}

export default Header
