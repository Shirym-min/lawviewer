import styles from './App.module.css'
import { Sidebar } from '../components/Sidebar'
import { Mainpage } from '../components/Mainpage'


function App() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <Mainpage />
    </div>
  )
}

export default App
