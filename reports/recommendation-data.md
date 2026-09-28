# CSV analysis

- Source: `onz_cocktails_105.csv`
- SHA-256: `f59b793c80d046a428c14b196e7050964b7aa7a75720dcb758e4a8e4dcd1748f`
- Rows: 105; columns: 62; unique IDs: 105

## Numeric distributions

| Column | Missing | Min | Max | Frequencies |
|---|---:|---:|---:|---|
| taste_sweet | 0 | 0 | 5 | 0: 3, 1: 2, 2: 15, 3: 52, 4: 28, 5: 5 |
| taste_sour | 0 | 0 | 4 | 0: 20, 1: 18, 2: 11, 3: 28, 4: 28 |
| taste_bitter | 0 | 0 | 5 | 0: 63, 1: 14, 2: 10, 3: 10, 4: 7, 5: 1 |
| taste_boozy | 0 | 0 | 5 | 0: 4, 1: 21, 2: 27, 3: 25, 4: 18, 5: 10 |
| taste_body | 0 | 1 | 5 | 1: 11, 2: 47, 3: 23, 4: 16, 5: 8 |
| taste_fizz | 0 | 0 | 4 | 0: 84, 1: 1, 3: 2, 4: 18 |
| flavor_citrus | 0 | 0 | 5 | 0: 31, 1: 3, 2: 11, 3: 25, 4: 24, 5: 11 |
| flavor_tropical | 0 | 0 | 5 | 0: 88, 1: 2, 3: 8, 4: 5, 5: 2 |
| flavor_berry_red | 0 | 0 | 5 | 0: 86, 1: 4, 2: 6, 3: 3, 4: 5, 5: 1 |
| flavor_stone_orchard | 0 | 0 | 5 | 0: 98, 1: 1, 2: 1, 3: 3, 4: 1, 5: 1 |
| flavor_herbal | 0 | 0 | 5 | 0: 70, 1: 1, 2: 14, 3: 10, 4: 7, 5: 3 |
| flavor_mint | 0 | 0 | 5 | 0: 98, 4: 4, 5: 3 |
| flavor_floral | 0 | 0 | 4 | 0: 100, 2: 1, 3: 3, 4: 1 |
| flavor_spice | 0 | 0 | 5 | 0: 86, 1: 4, 2: 5, 3: 1, 4: 7, 5: 2 |
| flavor_coffee_choco | 0 | 0 | 5 | 0: 100, 3: 1, 4: 1, 5: 3 |
| flavor_creamy_nutty | 0 | 0 | 4 | 0: 92, 2: 3, 3: 4, 4: 6 |
| flavor_oak_caramel | 0 | 0 | 5 | 0: 68, 1: 1, 2: 16, 3: 11, 4: 6, 5: 3 |
| flavor_smoky | 0 | 0 | 4 | 0: 100, 1: 1, 2: 1, 3: 1, 4: 2 |
| flavor_anise | 0 | 0 | 3 | 0: 98, 1: 2, 2: 4, 3: 1 |
| flavor_savory | 0 | 0 | 5 | 0: 102, 1: 1, 2: 1, 5: 1 |
| occasion_aperitif | 0 | 0 | 3 | 0: 64, 1: 3, 2: 25, 3: 13 |
| occasion_with_meal | 0 | 0 | 2 | 0: 97, 2: 8 |
| occasion_dessert | 0 | 0 | 3 | 0: 89, 1: 5, 2: 2, 3: 9 |
| occasion_party | 0 | 0 | 3 | 0: 64, 1: 2, 2: 19, 3: 20 |
| occasion_refresh | 0 | 0 | 3 | 0: 71, 1: 1, 2: 22, 3: 11 |
| occasion_slow_sip | 0 | 0 | 3 | 0: 72, 1: 2, 2: 20, 3: 11 |
| occasion_brunch | 0 | 0 | 3 | 0: 92, 1: 3, 2: 5, 3: 5 |
| v2_abv | 0 | 7 | 36 | 7: 1, 8: 2, 9: 2, 10: 3, 11: 5, 12: 1, 13: 10, 14: 1, 15: 4, 16: 8, 17: 10, 18: 3, 19: 6, 21: 2, 23: 7, 24: 2, 25: 5, 26: 3, 27: 6, 28: 2, 29: 9, 30: 4, 31: 4, 33: 2, 34: 1, 35: 1, 36: 1 |
| approachability | 0 | 1 | 5 | 1: 14, 2: 16, 3: 19, 4: 42, 5: 14 |
| familiarity | 0 | 1 | 5 | 1: 17, 2: 22, 3: 28, 4: 19, 5: 19 |
| complexity | 0 | 0 | 5 | 0: 2, 1: 9, 2: 20, 3: 33, 4: 26, 5: 15 |
| polarizing | 0 | 0 | 1 | 0: 103, 1: 2 |

## Categorical distributions

- v2_bases: {"liqueur|fortified": 1, "sparkling": 2, "vodka|liqueur": 7, "sparkling|brandy": 1, "rum": 7, "liqueur": 5, "gin": 7, "wine|liqueur": 1, "tequila|liqueur": 2, "rum|liqueur": 9, "vodka": 3, "gin|liqueur": 8, "brandy|liqueur": 5, "tequila": 3, "whiskey": 5, "brandy": 1, "fortified": 1, "liqueur|sparkling": 1, "other": 2, "cachaca": 1, "gin|sparkling": 1, "rum|sparkling": 1, "vodka|liqueur|sparkling": 2, "gin|liqueur|brandy": 1, "mezcal|liqueur": 1, "whiskey|wine": 1, "brandy|rum|liqueur": 1, "whiskey|liqueur|fortified": 1, "gin|fortified": 1, "gin|fortified|liqueur": 4, "whiskey|fortified": 1, "fortified|brandy": 1, "whiskey|liqueur": 2, "whiskey|brandy": 1, "vodka|rum|gin|tequila|liqueur": 1, "pisco": 2, "cachaca|fortified|liqueur": 1, "whiskey|brandy|fortified|liqueur": 1, "gin|vodka|fortified": 1, "gin|liqueur|fortified": 2, "mezcal|rum|liqueur": 1, "gin|brandy": 1, "liqueur|whiskey": 1, "whiskey|fortified|liqueur": 2, "rum|liqueur|sparkling": 1}
- 베이스: {"리큐르": 6, "와인": 4, "보드카": 12, "럼": 19, "진": 25, "테킬라": 5, "브랜디": 5, "위스키": 13, "코냑": 2, "와인/셰리": 1, "리큐르/와인": 1, "리큐르/카샤샤": 1, "메즈칼": 1, "보드카, 진, 럼, 테킬라": 1, "피스코": 2, "카샤사": 1, "위스키, 브랜디": 1, "진, 보드카": 1, "메스칼": 1, "진, 브랜디": 1, "앙고스투라 비터스": 1, "그라파": 1}
- 스타일: {"스페셜": 17, "라이트": 10, "스트롱": 38, "클래식": 12, "스탠다드": 28}
- serve: {"long": 26, "up": 56, "rocks": 21, "frozen": 1, "hot": 1}
- 도수구간: {"약함": 9, "강함": 48, "보통": 48}
- recipeStatus: {"verified": 105}

## Data quality

- Numeric recommendation fields: no missing values.
- Images: {"onz-cocktail.kr": 105}. Export upgrades only the known ONZ host to HTTPS.
- No cocktail-family column. Name-based grouping is a documented heuristic, never a fabricated source attribute.
- `polarizing` is binary, not 0–5.
- `taste_fizz` is strongly bimodal. Percentile normalization would distort absence; use the observed linear scale.
- Scores express this dataset, not independently verified sensory measurements.
- Missing allergens are unknown, not an assurance of allergen absence.
- Original Korean ABV bands and v2 bands are different categorizations; scoring uses numeric v2_abv, not either label.
- The supplied recipe/origin text is retained without inventing or correcting facts.

- ABV conflict: Espresso Martini: v2=19, old range=24–27. Use v2 consistently for score and display; flag for source review.
- ABV conflict: Trinidad Sour: v2=28, old range=18–20. Use v2 consistently for score and display; flag for source review.
