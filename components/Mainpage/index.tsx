import styles from './Mainpage.module.css'

const laws = [
  {
    title: '日本国憲法',
    meta: '昭和二十一年十一月三日公布・内閣',
    updated: '最終改正 R6.6.14',
  },
  {
    title: '民法',
    meta: '明治二十九年法律第八十九号・法務省',
    updated: '最終改正 R6.5.24',
  },
  {
    title: '会社法',
    meta: '平成十七年法律第八十六号・法務省',
    updated: '最終改正 R6.6.14',
  },
  {
    title: '電気通信事業法',
    meta: '昭和五十九年法律第八十六号・総務省',
    updated: '最終改正 R6.5.17',
  },
  {
    title: '商法',
    meta: '明治三十二年法律第四十八号・法務省',
    updated: '最終改正 R5.6.14',
  },
  {
    title: '労働基準法',
    meta: '昭和二十二年法律第四十九号・厚生労働省',
    updated: '最終改正 R6.4.1',
  },
]

export function Mainpage() {
  return (
    <main className={styles.main}>
      <div className={styles.toolbar}>
        <p className={styles.summary}>1,912件中 6件を表示</p>
        <p className={styles.sort}>並び替え: 更新日</p>
      </div>

      <ul className={styles.list}>
        {laws.map((law) => (
          <li key={law.title} className={styles.row}>
            <div className={styles.content}>
              <h2 className={styles.title}>{law.title}</h2>
              <p className={styles.meta}>{law.meta}</p>
            </div>

            <div className={styles.statusGroup}>
              <span className={styles.updated}>{law.updated}</span>
              <span className={styles.badge}>現行</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Mainpage