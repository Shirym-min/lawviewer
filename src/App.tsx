import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'
import { Mainpage } from './pages/Mainpage'
import { Header } from './components/Header'


function App() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.spacer} />
      <div className={styles.content}>
        <Sidebar />
        <Mainpage />
      </div>
    </div>
  )
}

export default App
