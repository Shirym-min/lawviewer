import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";
import { searchLaw } from "../../search/lawSearch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const badgeMap: Record<string, string> = {
  "None": "現行",
  "Repeal": "廃止",
  "Expire": "期限切れ",
  "Suspend": "失効",
  "LossOfEffectiveness": "効力喪失",
};

export function Search() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const pageSize = 20;
  const searchParams = useSearchParams();
  const query = searchParams[0].get("q") || "";
  const type = searchParams[0].get("type") || "name";
  const statuses = searchParams[0].getAll("status").join(",") || "None";
  const page = Number(searchParams[0].get("page")) || 1;
  const [results, setResults] = useState<ReturnType<typeof searchLaw>>([]);

  const [totalResults, setTotalResults] = useState(0);
  const pagemap: number[] = Array.from(
    { length: 5 },
    (_, i) => {
      const pagenum = page - 2 + i;
      return pagenum > 0 && pagenum <= Math.ceil(totalResults / pageSize) ? pagenum : -1;
    }
  )

  useEffect(() => {
    const data = type === "name" ? searchLaw(query, { status: statuses.split(",") }) : [];
    setResults(data);
    setTotalResults(data.length);
  }, [query, type, statuses]);

  const pageResults = results.slice((page - 1) * pageSize, page * pageSize);

  console.log(pageResults);
  const navigate = useNavigate();
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams[0]);
    params.set("page", newPage.toString());
    navigate(`/search?${params.toString()}`);
  }

  return (
    <main className={styles.main}>
      <div className={styles.toolbar}>
        <h2 className={styles.resultTitle}>"{query}"の検索結果</h2>
        <div className={styles.summarybox}>
          <p className={styles.summary}>{totalResults}件中 {pageResults.length}件を表示・{page}ページ目/全{Math.ceil(totalResults / pageSize)}ページ</p>
        </div>
        
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
                <br />
                <span className={styles.updated}>最終改正・{law.updated_at}</span>
              </div>
              <span className={styles.badge + (law.status === "None" ? "" : " " + styles.inactivated)}>{badgeMap[law.status]}</span>
            </div>
          </li>
        ))}
      </ul>
      
      <div className={styles.pagebuttons}>
        <button onClick={() => handlePageChange(page - 1)} className={styles.arrowPagebutton} disabled={page <= 1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.pagebuttonIcon}><path d="m15 18-6-6 6-6"/></svg>
        </button>
        {pagemap.map((p, index) => (
          p === page ? (
            <div key={`${p}-${index}`} onClick={() => handlePageChange(p)} className={styles.currentPagebutton}>
              <span className={styles.pagebuttonText}>{p}</span>
            </div>
          ) : p !== -1 ? (
            <div key={`${p}-${index}`} onClick={() => handlePageChange(p)} className={styles.pagebutton}>
              <span className={styles.pagebuttonText}>{p}</span>
            </div>
          ) : (
            <div key={`${p}-${index}`} className={styles.hidePagebutton}>
              <span className={styles.pagebuttonText}></span>
            </div>
          )

        ))}
        <button onClick={() => handlePageChange(page + 1)} className={styles.arrowPagebutton} disabled={Math.ceil(totalResults / pageSize) <= page}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.pagebuttonIcon}><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </main >
  );
}

export default Search;
