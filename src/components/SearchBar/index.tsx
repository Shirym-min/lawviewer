import styles from './SearchBar.module.css'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import type { SubmitEventHandler } from "react";
import { type ChangeEvent } from "react";

type search = "name" | "content"

const statusOptions = [
  { value: "None", label: "現行" },
  { value: "Repeal", label: "廃止" },
  { value: "Expire", label: "期限切れ" },
  { value: "Suspend", label: "失効" },
  { value: "LossOfEffectiveness", label: "効力喪失" },
] as const;

type Status = (typeof statusOptions)[number]["value"];


export default function SearchBar() {
  const defaultSearchType = (useSearchParams()[0].get("type") as search) || "name";
  const [searchType, setSearchType] = useState<search>(defaultSearchType);
  const defaultQuery = useSearchParams()[0].get("q") || "";

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const defaultStatuses = useSearchParams()[0].getAll("status") as Status[];
  if (defaultStatuses.length === 0) {
    defaultStatuses.push("None");
  }
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>(defaultStatuses);
  const [currentStatuses, setCurrentStatuses] = useState<Status[]>(defaultStatuses);
  const handleStatusChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const statusName = event.target.value as Status;
    const isChecked = event.target.checked;

    setCurrentStatuses((previous) => {
      if (isChecked) {
        return [...previous, statusName];
      }
      return previous.filter((status) => status !== statusName);
    })

  }

  const handleFilterApply = () => {
    setSelectedStatuses(currentStatuses);
    setIsFilterOpen(false);
  }

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

    selectedStatuses.forEach((status) => {
      params.append("status", status);
    });

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
            {isFilterOpen ? 
            <button className={styles.filterButton} type="button" aria-expanded={isFilterOpen} onClick={() => handleFilterApply()}>
              <span className={styles.filterText}>適用</span>
            </button>
             : 
            <button className={styles.filterButton} type="button" aria-expanded={isFilterOpen} onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <span className={styles.filterText}>フィルター</span>
            </button>
            }

          </div>
          <section className={styles.repealStatus} data-open={isFilterOpen}>
            <span className={styles.sectionText}>状態</span>
            <div className={styles.checkboxGroup}>
              {statusOptions.map((option) => (
                <label key={option.value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="status"
                    className={styles.checkboxInput}
                    value={option.value}
                    checked={currentStatuses.includes(option.value)}
                    onChange={handleStatusChange}
                  />
                  <span className={styles.checkboxText}>{option.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

      </div>

    </div>
  )
}
