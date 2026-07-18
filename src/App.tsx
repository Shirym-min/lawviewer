import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'
import { Mainpage } from './pages/Mainpage'
import { Header } from './components/Header'
import { useEffect, useState } from 'react'
import { initializeLawSearch,searchLaw } from './search/lawSearch'
import Loading from './components/Loading/Loading'


function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function initialize() {
      try {
        await initializeLawSearch();
        setReady(true);
      } catch (e) {
        console.error(e);
        setError(
          "検索データの読み込みに失敗しました"
        );
      }
    }
    initialize();
  }, []);
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.spacer} />
      <div className={styles.content}>
        <Sidebar />
        <Mainpage />
      </div>
      <Loading visible={!ready && !error} />
    </div>
  )
}

export default App
