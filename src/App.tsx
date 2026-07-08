import { useState } from 'react'
import styles from '@/src/App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className={styles.title}>日本法律ビューアー</h1>
    </>
  )
}

export default App
