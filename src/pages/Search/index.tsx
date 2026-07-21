import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";
import { searchLaw } from "../../search/lawSearch";
import { useState, useEffect } from "react";

const badgeMap: Record<string, string> = {
  "None": "現行",
  "Repeal": "廃止",
  "Expire": "期限切れ",
  "Suspend": "失効",
  "LossOfEffectiveness": "効力喪失",
};

export function Search() {
  const pageSize = 20;
  const searchParams = useSearchParams();
  const query = searchParams[0].get("q") || "";
  const type = searchParams[0].get("type") || "name";
  const statuses = searchParams[0].getAll("status").join(",") || "None";
  const page = Number(searchParams[0].get("page")) || 1;
  const [results, setResults] = useState<ReturnType<typeof searchLaw>>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    setLoading(true);
    const data = type === "name" ? searchLaw(query, { status: statuses.split(",") }) : [];
    setResults(data);
    setTotalResults(data.length);
    setLoading(false);
  }, [query, type, statuses]);

  const pageResults = results.slice((page - 1) * pageSize, page * pageSize);

  console.log(pageResults);

  

  return (
    <main className={styles.main}>
      <div className={styles.toolbar}>
        <p className={styles.summary}>{totalResults}件中 {pageResults.length}件を表示・{page}ページ目</p>
        <p className={styles.sort}>並び替え: 更新日</p>
      </div>
      <ul className={styles.list}>
        {pageResults.map((law) => (
          <li key={law.law_title} className={styles.row}>
            <div className={styles.content}>
              <h2 className={styles.title}>{law.law_title}</h2>
              <p className={styles.meta}>{law.law_num}・{law.category}</p>
            </div>
            <div className={styles.statusGroup}>
              <div className={styles.details}>
                <span className={styles.updated}>公布日・{law.promulgation_date}</span>
                <br/>
                <span className={styles.updated}>最終改正・{law.updated_at}</span>
              </div>
              <span className={styles.badge + (law.status === "None" ? "" : " " + styles.inactivated)}>{badgeMap[law.status]}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Search;
