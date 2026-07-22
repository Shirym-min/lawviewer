import MiniSearch from "minisearch";
import type { LawIndex, LawIndexResponse } from "../types/law";


// MiniSearch
let miniSearch: MiniSearch<LawIndex> | null = null;
let initialized = false;
let initializationPromise: Promise<void> | null = null;

export async function initializeLawSearch() {
  if (initialized) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}index_data.json`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch index_data.json: ${response.status}`
      );
    }

    const data: LawIndexResponse = await response.json();

    miniSearch = new MiniSearch<LawIndex>({
      fields: [
        "search_text"
      ],
      storeFields: [
        "id",
        "law_type",
        "law_num",
        "promulgation_date",
        "category",
        "updated_at",
        "law_title",
        "law_title_kana",
        "status",
        "abbrev"
      ],

      searchOptions: {
        prefix: true,
        // 入力ミス許容度
        fuzzy: 0.1
      }
    });

    miniSearch.addAll(data.index);

    initialized = true;

    console.log("Created Index")
  })();

  try {
    await initializationPromise;
  } catch (error) {
    initializationPromise = null;
    throw error;
  }
}


export type LawSearchOptions = {
  status?: string[];
  category?: string;
  law_type?: string;
};


export function searchLaw(
  query: string,
  options?: LawSearchOptions
) {

  if (!miniSearch) {
    throw new Error(
      "Search engine is not initialized"
    );
  }


  let results =
    miniSearch.search(query);


  if (options?.status) {
    results = results.filter(
      (law) =>
        options.status?.includes(law.status)
    );
  }

  if (options?.category) {
    results = results.filter(
      (law) =>
        law.category === options.category
    );
  }
  console.log("searched", query, options, results.length)
  return results;
}


export function getAllLaws() {

  if (!miniSearch) {
    throw new Error(
      "Search engine is not initialized"
    );
  }


  return miniSearch.documentCount;
}
