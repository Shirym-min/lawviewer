import requests
import json
from pathlib import Path
from typing import Any
import unicodedata
from sudachipy import dictionary
from sudachipy import tokenizer

tokenizer_obj = dictionary.Dictionary().create()
mode = tokenizer.Tokenizer.SplitMode.C

def normalize_text(text: str) -> str:
    text = unicodedata.normalize("NFKC", text)
    text = text.lower()
    return text

def get_nested(data, path, default=None):
    current = data

    for key in path:
        if not isinstance(current, dict):
            return default

        current = current.get(key)

        if current is None:
            return default

    return current

def sudachi_tokens(text: str):
    tokens = []
    for m in tokenizer_obj.tokenize(text, mode):
      if m.part_of_speech()[0] not in ["助詞", "助動詞"]:
        tokens.append(m.surface())
    return tokens


def create_search_text(title, title_kana, category=None):
    values = []

    for text in [title, title_kana, category]:
        if text:
            values.append(text)
            values.extend(sudachi_tokens(text))

    return " ".join(values)

url = "https://laws.e-gov.go.jp/api/2/laws"

params = { "limit": 10000, "law_type": "Act", "order": "revision_info.law_title_kana" }

# with open("public/data.json", "r", encoding="utf-8") as file:
#     data = json.load(file)

res = requests.get(url, params=params)
data: dict[str,Any]= json.loads(res.text)
output_path = Path("public/data.json")
field = {
  "id" : ("law_info", "law_id"),
  "law_type" : ("law_info", "law_type"),
  "law_num" : ("law_info", "law_num"),
  "promulgation_date" : ("law_info", "promulgation_date"),
  "category" : ("current_revision_info", "category"),
  "updated_at" : ("current_revision_info", "amendment_enforcement_date"),
  "law_title" : ("current_revision_info", "law_title"),
  "law_title_kana" : ("current_revision_info", "law_title_kana"),
  "status" : ("current_revision_info", "repeal_status"),
}

with output_path.open("w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

laws_index = {"total": data["count"], "index": []}

for i in range(data["count"]):
    result = {
        output_key: get_nested(data["laws"][i], path) if output_key != "law_title" else normalize_text(get_nested(data["laws"][i], path))
        for output_key, path in field.items()
    }
    result["index_id"] = i
    result["search_text"] = create_search_text(result["law_title"], result["law_title_kana"], result["category"])
    laws_index["index"].append(result)

output_path = Path("public/index_data.json")

with output_path.open("w", encoding="utf-8") as file:
    json.dump(laws_index, file, ensure_ascii=False, indent=2)