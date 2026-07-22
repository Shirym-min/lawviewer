import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'
import { Mainpage } from './pages/Mainpage'
import { Search } from './pages/Search'
import { Header } from './components/Header'
import { useEffect, useState } from 'react'
import { initializeLawSearch } from './search/lawSearch'
import Loading from './components/Loading/Loading'
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'



function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
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
        {ready && (
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Mainpage />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </AnimatePresence>
        )}
        
      </div>
      <Loading visible={!ready && !error} />
    </div>
  )
}

export default App
