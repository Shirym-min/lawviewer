import MiniSearch from "minisearch";
import type { LawIndex, LawIndexResponse } from "../types/law";


// MiniSearchインスタンス
let miniSearch: MiniSearch<LawIndex> | null = null;


// 初期化済みか確認
let initialized = false;


/**
 * 検索エンジンを初期化する
 */
export async function initializeLawSearch() {
  if (initialized) {
    return;
  }

  const response = await fetch("/index_data.json");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch index_data.json: ${response.status}`
    );
  }


  const data: LawIndexResponse =
    await response.json();


  miniSearch = new MiniSearch<LawIndex>({
    // 検索対象
    fields: [
      "search_text"
    ],
    // 検索結果として保持するデータ
    storeFields: [
      "id",
      "law_type",
      "law_num",
      "promulgation_date",
      "category",
      "updated_at",
      "law_title",
      "law_title_kana",
      "status"
    ],

    searchOptions: {
      prefix: true,
      // 入力ミス許容度
      fuzzy: 0.15
    }
  });


  miniSearch.addAll(data.index);

  initialized = true;

  console.log("Created Index")
}


/**
 * 検索条件
 */
export type LawSearchOptions = {
  status?: string;
  category?: string;
  law_type?: string;
};


/**
 * 法令検索
 */
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
        law.status === options.status
    );
  }

  if (options?.category) {
    results = results.filter(
      (law) =>
        law.category === options.category
    );
  }

  if (options?.law_type) {
    results = results.filter(
      (law) =>
        law.law_type === options.law_type
    );
  }
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