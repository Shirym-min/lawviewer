export type LawIndex = {
  id: string;
  law_type: string;
  law_num: string;
  promulgation_date: string;
  category: string | null;
  updated_at: string;
  law_title: string;
  law_title_kana: string;
  status: string;
  index_id: number;
  search_text: string;
};


export type LawIndexResponse = {
  total: number;
  index: LawIndex[];
};