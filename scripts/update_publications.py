#!/usr/bin/env python3
"""Synchronize one researcher's OpenAlex works into static JSON.

Does not modify content.js or the manually curated publication records.
Only new/changed API data rewrites publications-auto.json.
"""
from __future__ import annotations
import datetime as dt
import json
import os
import pathlib
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ORCID = "0000-0001-7673-4156"
OUTPUT = pathlib.Path(__file__).resolve().parents[1] / "publications-auto.json"
API = "https://api.openalex.org/works"
ALLOWED_TYPES = {"article", "book-chapter", "book", "conference-paper", "proceedings-article"}


def fetch_page(page: int) -> dict:
    params = {
        "filter": "authorships.author.orcid:" + ORCID,
        "per_page": "100",
        "page": str(page),
    }
    key = os.environ.get("OPENALEX_API_KEY", "").strip()
    if key:
        params["api_key"] = key
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "KshitizAgarwalPortfolioPubSync/1.0", "Accept": "application/json"},
    )
    last_exc = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=25) as response:
                return json.load(response)
        except (urllib.error.URLError, TimeoutError, ValueError) as exc:
            last_exc = exc
            if attempt < 2:
                time.sleep(2 ** attempt)
    raise RuntimeError(f"OpenAlex request failed: {last_exc}")


def normal_doi(raw) -> str:
    if not raw:
        return ""
    value = str(raw).strip()
    if value.lower().startswith("https://doi.org/"):
        value = value[len("https://doi.org/"):]
    return value.lower().rstrip("/ ")


def clean_authors(authorships) -> str:
    names = []
    for auth in authorships or []:
        name = (auth.get("author") or {}).get("display_name", "").strip()
        if name and name not in names:
            names.append(name)
    if len(names) > 8:
        return ", ".join(names[:8]) + " et al."
    return ", ".join(names)


def convert(work) -> dict | None:
    title = (work.get("title") or work.get("display_name") or "").strip()
    year = work.get("publication_year")
    typ = work.get("type")
    if not title or not isinstance(year, int) or typ not in ALLOWED_TYPES:
        return None
    doi = normal_doi(work.get("doi"))
    source = ((work.get("primary_location") or {}).get("source") or {}).get("display_name") or ""
    url = "https://doi.org/" + doi if doi else (work.get("id") or "")
    if not url.startswith("https://"):
        return None
    return {
        "title": title,
        "authors": clean_authors(work.get("authorships")),
        "venue": source.strip() or typ.replace("-", " ").title(),
        "year": str(year),
        "url": url,
        "doi": doi,
        "openalex_id": work.get("id") or "",
    }


def main():
    all_works = []
    for page in range(1, 11):
        data = fetch_page(page)
        works = data.get("results")
        if not isinstance(works, list):
            raise RuntimeError("Unexpected OpenAlex API response; existing publications preserved")
        all_works.extend(works)
        total = (data.get("meta") or {}).get("count", len(works))
        if not works or len(all_works) >= total:
            break
    pubs = []
    seen = set()
    for raw in all_works:
        pub = convert(raw)
        if not pub:
            continue
        ident = pub["doi"] or pub["openalex_id"]
        if ident in seen:
            continue
        seen.add(ident)
        pubs.append(pub)
    pubs.sort(key=lambda p: (-int(p["year"]), p["title"].casefold()))
    if OUTPUT.exists():
        old = json.loads(OUTPUT.read_text(encoding="utf-8"))
        if old.get("publications") == pubs:
            print(f"Unchanged; {len(pubs)} OpenAlex records available.")
            return
    output = {
        "source": "OpenAlex",
        "orcid": ORCID,
        "last_updated": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "publications": pubs,
    }
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {OUTPUT.name}: {len(pubs)} records")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Publication sync failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
