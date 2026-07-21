import styles from './SearchBar.module.css'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import type { SubmitEventHandler } from "react";

type search = "name" | "content"

export default function SearchBar() {
  const defaultSearchType = (useSearchParams()[0].get("type") as search) || "name";
  const [searchType, setSearchType] = useState<search>(defaultSearchType);
  const defaultQuery = useSearchParams()[0].get("q") || "";

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const type = formData.get("type");
    const query = formData.get("q");

    const params = new URLSearchParams();

    if (typeof type === "string") {
      params.set("type", type);
    }

    if (typeof query === "string" && query.trim() !== "") {
      params.set("q", query.trim());
    }

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.switchmenu}>
        <div className={styles.indicator + (searchType === "name" ? " " + styles.left : " " + styles.right)} />

        <div className={styles.buttonGroup}>
          <button className={styles.button + (searchType === "name" ? " " + styles.active : " " + styles.inactive)} onClick={() => setSearchType("name")}>
            法令検索
          </button>
          <button className={styles.button + (searchType === "content" ? " " + styles.active : " " + styles.inactive)} onClick={() => setSearchType("content")}>
            本文検索
          </button>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="hidden" name="type" value={searchType} />
        <div className={styles.inputWrapper}>
          <input className={styles.input} type="search" name="q" placeholder={searchType === "name" ? "法令名で検索" : "本文で検索"} defaultValue={defaultQuery} />
        </div>
        <button className={styles.submitButton} type="submit">検索</button>
      </form>
      <div className={styles.filterSlot}>
        <div className={styles.filter} data-open={isFilterOpen}>
          <div className={styles.filterHeader}>
            <button className={styles.filterButton} type="button" aria-expanded={isFilterOpen} onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <span className={styles.filterText}>{isFilterOpen ? "閉じる" : "フィルター"}</span>
            </button>
          </div>
          
        </div>
      </div>

    </div>
  )
}
