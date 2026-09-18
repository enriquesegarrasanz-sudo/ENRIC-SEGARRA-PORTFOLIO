"""Generate build-time translations. The public site never calls a translation service."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import json
import time
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "dist" / "content-translation-source.json"
OUTPUT = ROOT / "dist" / "content-translations.js"
LANGUAGES = {"ca": "ca", "en": "en", "fr": "fr", "zh": "zh-CN"}
SEPARATOR = "\n@@@\n"
MAX_CHARS = 4200


def chunks(values):
    batch, length = [], 0
    for value in values:
        added = len(value) + len(SEPARATOR)
        if batch and length + added > MAX_CHARS:
            yield batch
            batch, length = [], 0
        batch.append(value)
        length += added
    if batch:
        yield batch


def translate_batch(language, values):
    text = SEPARATOR.join(values)
    url = "https://translate.googleapis.com/translate_a/single?" + urllib.parse.urlencode({
        "client": "gtx", "sl": "es", "tl": language, "dt": "t", "q": text,
    })
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=30) as response:
                data = json.load(response)
            translated = "".join(part[0] for part in data[0]).split(SEPARATOR)
            if len(translated) == len(values):
                return translated
        except Exception:
            if attempt == 2:
                raise
            time.sleep(1 + attempt)
    raise RuntimeError("The translation service returned an incomplete batch")


def main():
    values = json.loads(SOURCE.read_text(encoding="utf-8"))
    result = {value: {} for value in values}
    jobs = [(source, code, batch) for code, source in LANGUAGES.items() for batch in chunks(values)]
    with ThreadPoolExecutor(max_workers=6) as executor:
        pending = {executor.submit(translate_batch, source, batch): (code, batch) for source, code, batch in jobs}
        for index, future in enumerate(as_completed(pending), 1):
            code, batch = pending[future]
            for original, translated in zip(batch, future.result()):
                result[original][code] = translated
            print(f"{index}/{len(jobs)} batches completed", flush=True)
    missing = [value for value, translations in result.items() if set(translations) != set(LANGUAGES)]
    if missing:
        raise RuntimeError(f"Missing translations for {len(missing)} texts")
    OUTPUT.write_text("// Generated at build time; no runtime translation requests.\nexport const contentTranslations = " + json.dumps(result, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print(f"Saved {len(result)} local translations to {OUTPUT}")


if __name__ == "__main__":
    main()
