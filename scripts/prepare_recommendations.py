"""Validate the supplied CSV, export only recommendation fields, and report distributions.
Run: python3 scripts/prepare_recommendations.py
"""
import csv
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'onz_cocktails_530.csv'
with source.open(encoding='utf-8-sig', newline='') as stream:
    rows = list(csv.DictReader(stream))
features = [key for key in rows[0] if key.startswith(('taste_', 'flavor_', 'occasion_'))]
features += ['v2_abv', 'approachability', 'familiarity', 'complexity', 'polarizing']
records = []
ids = set()
for row in rows:
    ident = int(row['id'])
    if ident in ids:
        raise ValueError(f'Duplicate id: {ident}')
    ids.add(ident)
    numeric = {}
    for key in features:
        limit = 100 if key == 'v2_abv' else 1 if key == 'polarizing' else 3 if key.startswith('occasion_') else 5
        value = float(row[key])
        if not 0 <= value <= limit:
            raise ValueError(f'{ident}: invalid {key}={value}')
        numeric[key] = int(value) if value.is_integer() else value
    for key in ['이름_한글', '이름_영문', '이미지_URL', 'v2_bases', 'serve', '스타일']:
        if not row[key].strip():
            raise ValueError(f'{ident}: missing {key}')
    image = row['이미지_URL']
    if not image.startswith(('http://onz-cocktail.kr/uploads/cocktails/', 'https://raw.githubusercontent.com/rlaaudgjs2/onz-cocktail-images/main/')):
        raise ValueError(f'{ident}: unexpected image origin: {image}')
    records.append(dict(id=ident, korName=row['이름_한글'], engName=row['이름_영문'],
                        imageUrl=image.replace('http:', 'https:', 1),
                        base=row['베이스'], bases=row['v2_bases'].split('|'), style=row['스타일'],
                        serve=row['serve'], ingredients=row['재료_원문'], originText=row['유래'],
                        recipeStatus=row['recipeStatus'], allergens=row['allergens'].split('|') if row['allergens'] else [],
                        features=numeric))
output = ROOT / 'recommendation/data/cocktails.json'
output.write_text(json.dumps(records, ensure_ascii=False, separators=(',', ':')) + '\n')
lines = ['# CSV analysis', '', f'- Source: `{source.name}`',
         f'- SHA-256: `{hashlib.sha256(source.read_bytes()).hexdigest()}`',
         f'- Rows: {len(rows)}; columns: {len(rows[0])}; unique IDs: {len(ids)}', '',
         '## Numeric distributions', '', '| Column | Missing | Min | Max | Frequencies |', '|---|---:|---:|---:|---|']
for key in features:
    counts = Counter(record['features'][key] for record in records)
    lines.append(f'| {key} | 0 | {min(counts)} | {max(counts)} | ' + ', '.join(f'{k}: {counts[k]}' for k in sorted(counts)) + ' |')
lines += ['', '## Categorical distributions', '']
for key in ['v2_bases', '베이스', '스타일', 'serve', 'v2_abvBand', '도수구간', 'recipeStatus', 'source']:
    lines.append(f'- {key}: ' + json.dumps(dict(Counter(row[key] for row in rows)), ensure_ascii=False))
lines += ['', '## Data quality', '', '- Numeric recommendation fields: no missing values.',
          '- Images: 105 HTTP URLs on onz-cocktail.kr, 425 HTTPS URLs on raw.githubusercontent.com. Export upgrades only the known ONZ host to HTTPS; sample HTTPS availability was checked separately.',
          '- No cocktail-family column. Name-based grouping is a documented heuristic, never a fabricated source attribute.',
          '- `polarizing` is binary (523 zero / 7 one), not 0–5.',
          '- `taste_fizz` is strongly bimodal (367 zero / 157 four). Percentile normalization would distort absence; use the observed linear scale.',
          '- `recipeStatus=needs_review`: 162 records. Scores express this dataset, not independently verified sensory measurements.',
          '- Missing allergens are unknown, not an assurance of allergen absence.',
          '- Original Korean ABV bands and v2 bands are different categorizations; scoring uses numeric v2_abv, not either label.',
          '- The supplied recipe/origin text is retained without inventing or correcting facts.', '']
for row in rows:
    if not float(row['최소도수']) <= float(row['v2_abv']) <= float(row['최대도수']):
        lines.append(f"- ABV conflict: {row['이름_영문']}: v2={row['v2_abv']}, old range={row['최소도수']}–{row['최대도수']}. Use v2 consistently for score and display; flag for source review.")
(ROOT / 'reports/recommendation-data.md').write_text('\n'.join(lines) + '\n')
print(f'Validated/exported {len(records)} records and {len(features)} numeric features.')
