# CSV analysis

- Source: `onz_cocktails_530.csv`
- SHA-256: `b57b1a0b960f8d5437a73b201133de01078a046411f929242a60e0e8d3e9736d`
- Rows: 530; columns: 67; unique IDs: 530

## Numeric distributions

| Column | Missing | Min | Max | Frequencies |
|---|---:|---:|---:|---|
| taste_sweet | 0 | 0 | 5 | 0: 11, 1: 17, 2: 45, 3: 216, 4: 197, 5: 44 |
| taste_sour | 0 | 0 | 4 | 0: 70, 1: 64, 2: 127, 3: 177, 4: 92 |
| taste_bitter | 0 | 0 | 5 | 0: 371, 1: 65, 2: 54, 3: 28, 4: 9, 5: 3 |
| taste_boozy | 0 | 0 | 5 | 0: 18, 1: 144, 2: 160, 3: 107, 4: 66, 5: 35 |
| taste_body | 0 | 1 | 5 | 1: 66, 2: 230, 3: 140, 4: 64, 5: 30 |
| taste_fizz | 0 | 0 | 4 | 0: 367, 1: 1, 2: 2, 3: 3, 4: 157 |
| flavor_citrus | 0 | 0 | 5 | 0: 140, 1: 13, 2: 52, 3: 150, 4: 123, 5: 52 |
| flavor_tropical | 0 | 0 | 5 | 0: 435, 1: 6, 2: 15, 3: 27, 4: 27, 5: 20 |
| flavor_berry_red | 0 | 0 | 5 | 0: 396, 1: 10, 2: 34, 3: 43, 4: 30, 5: 17 |
| flavor_stone_orchard | 0 | 0 | 5 | 0: 486, 1: 3, 2: 8, 3: 13, 4: 15, 5: 5 |
| flavor_herbal | 0 | 0 | 5 | 0: 391, 1: 12, 2: 48, 3: 41, 4: 24, 5: 14 |
| flavor_mint | 0 | 0 | 5 | 0: 488, 1: 10, 2: 5, 3: 2, 4: 12, 5: 13 |
| flavor_floral | 0 | 0 | 5 | 0: 478, 1: 10, 2: 11, 3: 9, 4: 12, 5: 10 |
| flavor_spice | 0 | 0 | 5 | 0: 439, 1: 13, 2: 25, 3: 14, 4: 26, 5: 13 |
| flavor_coffee_choco | 0 | 0 | 5 | 0: 497, 1: 3, 2: 5, 3: 5, 4: 7, 5: 13 |
| flavor_creamy_nutty | 0 | 0 | 5 | 0: 476, 2: 5, 3: 17, 4: 19, 5: 13 |
| flavor_oak_caramel | 0 | 0 | 5 | 0: 397, 1: 7, 2: 40, 3: 52, 4: 24, 5: 10 |
| flavor_smoky | 0 | 0 | 5 | 0: 514, 1: 3, 2: 6, 3: 1, 4: 4, 5: 2 |
| flavor_anise | 0 | 0 | 5 | 0: 518, 1: 3, 2: 5, 3: 1, 4: 1, 5: 2 |
| flavor_savory | 0 | 0 | 5 | 0: 515, 1: 3, 2: 4, 3: 2, 4: 1, 5: 5 |
| occasion_aperitif | 0 | 0 | 3 | 0: 397, 1: 12, 2: 82, 3: 39 |
| occasion_with_meal | 0 | 0 | 3 | 0: 471, 1: 8, 2: 36, 3: 15 |
| occasion_dessert | 0 | 0 | 3 | 0: 463, 1: 13, 2: 16, 3: 38 |
| occasion_party | 0 | 0 | 3 | 0: 307, 1: 7, 2: 104, 3: 112 |
| occasion_refresh | 0 | 0 | 3 | 0: 324, 1: 5, 2: 84, 3: 117 |
| occasion_slow_sip | 0 | 0 | 3 | 0: 411, 1: 6, 2: 74, 3: 39 |
| occasion_brunch | 0 | 0 | 3 | 0: 457, 1: 5, 2: 39, 3: 29 |
| v2_abv | 0 | 0 | 45 | 0: 20, 3: 1, 4: 4, 5: 2, 6: 5, 7: 5, 8: 14, 9: 15, 10: 23, 11: 26, 12: 38, 13: 36, 14: 44, 15: 30, 16: 33, 17: 20, 18: 36, 19: 11, 20: 22, 21: 10, 22: 22, 23: 12, 24: 16, 25: 16, 26: 10, 27: 10, 28: 11, 29: 14, 30: 10, 31: 4, 32: 1, 33: 2, 34: 2, 35: 2, 36: 1, 38: 1, 45: 1 |
| approachability | 0 | 0 | 5 | 0: 1, 1: 52, 2: 55, 3: 105, 4: 180, 5: 137 |
| familiarity | 0 | 0 | 5 | 0: 1, 1: 236, 2: 124, 3: 99, 4: 40, 5: 30 |
| complexity | 0 | 0 | 5 | 0: 4, 1: 150, 2: 164, 3: 119, 4: 69, 5: 24 |
| polarizing | 0 | 0 | 1 | 0: 523, 1: 7 |

## Categorical distributions

- v2_bases: {"liqueur|fortified": 1, "sparkling": 7, "vodka|liqueur": 49, "sparkling|brandy": 2, "rum": 57, "liqueur": 20, "gin": 34, "wine|liqueur": 1, "tequila|liqueur": 23, "rum|liqueur": 24, "vodka": 19, "gin|liqueur": 30, "brandy|liqueur": 15, "tequila": 18, "whiskey": 41, "brandy": 14, "fortified": 2, "liqueur|sparkling": 10, "other": 4, "cachaca": 4, "gin|sparkling": 1, "rum|sparkling": 1, "vodka|liqueur|sparkling": 2, "gin|liqueur|brandy": 1, "mezcal|liqueur": 1, "whiskey|wine": 2, "brandy|rum|liqueur": 2, "whiskey|liqueur|fortified": 2, "gin|fortified": 5, "gin|fortified|liqueur": 6, "whiskey|fortified": 6, "fortified|brandy": 1, "whiskey|liqueur": 14, "whiskey|brandy": 1, "vodka|rum|gin|tequila|liqueur": 2, "pisco": 8, "cachaca|fortified|liqueur": 1, "whiskey|brandy|fortified|liqueur": 1, "gin|vodka|fortified": 2, "gin|liqueur|fortified": 2, "mezcal|rum|liqueur": 1, "gin|brandy": 1, "liqueur|whiskey": 1, "whiskey|fortified|liqueur": 4, "rum|liqueur|sparkling": 1, "soju": 8, "liqueur|gin": 2, "tequila|beer": 1, "rum|beer": 1, "other|liqueur": 1, "other|fortified": 1, "beer|sparkling": 1, "beer": 5, "rum|vodka|liqueur": 1, "none": 20, "whiskey|beer": 1, "wine": 7, "sparkling|liqueur": 5, "vodka|brandy|liqueur": 1, "wine|brandy": 4, "brandy|fortified": 2, "rum|fortified|liqueur": 1, "liqueur|rum": 2, "sake|liqueur": 3, "liqueur|wine": 1, "sake": 1, "sake|gin": 2, "sake|vodka": 1, "tequila|sparkling": 1, "mezcal|fortified|liqueur": 1, "liqueur|vodka": 1, "mezcal": 1, "rum|fortified": 2, "tequila|mezcal": 1, "whiskey|sake": 1, "whiskey|sparkling|liqueur": 1, "vodka|sake": 1, "gin|whiskey": 1, "tequila|fortified": 1, "fortified|liqueur": 1, "vodka|fortified": 1}
- 베이스: {"리큐르": 36, "와인": 28, "보드카": 74, "럼": 89, "진": 82, "테킬라": 45, "브랜디": 31, "위스키": 73, "코냑": 2, "와인/셰리": 1, "리큐르/와인": 1, "리큐르/카샤샤": 1, "메즈칼": 3, "보드카, 진, 럼, 테킬라": 1, "피스코": 8, "카샤사": 4, "위스키, 브랜디": 1, "진, 보드카": 1, "메스칼": 1, "진, 브랜디": 1, "앙고스투라 비터스": 1, "그라파": 1, "소주": 8, "기타": 4, "맥주": 6, "무알코올": 20, "사케": 7}
- 스타일: {"스페셜": 37, "라이트": 70, "스트롱": 92, "클래식": 12, "스탠다드": 319}
- serve: {"long": 157, "up": 244, "rocks": 118, "frozen": 1, "hot": 6, "shot": 4}
- v2_abvBand: {"1": 196, "3": 85, "2": 212, "0": 37}
- 도수구간: {"약함": 70, "강함": 166, "보통": 294}
- recipeStatus: {"verified": 373, "needs_review": 157}
- source: {"existing": 105, "image_old": 425}

## Data quality

- Numeric recommendation fields: no missing values.
- Images: 105 HTTP URLs on onz-cocktail.kr, 425 HTTPS URLs on raw.githubusercontent.com. Export upgrades only the known ONZ host to HTTPS; sample HTTPS availability was checked separately.
- No cocktail-family column. Name-based grouping is a documented heuristic, never a fabricated source attribute.
- `polarizing` is binary (523 zero / 7 one), not 0–5.
- `taste_fizz` is strongly bimodal (367 zero / 157 four). Percentile normalization would distort absence; use the observed linear scale.
- `recipeStatus=needs_review`: 162 records. Scores express this dataset, not independently verified sensory measurements.
- Missing allergens are unknown, not an assurance of allergen absence.
- Original Korean ABV bands and v2 bands are different categorizations; scoring uses numeric v2_abv, not either label.
- The supplied recipe/origin text is retained without inventing or correcting facts.

- ABV conflict: Espresso Martini: v2=19, old range=24–27. Use v2 consistently for score and display; flag for source review.
- ABV conflict: Trinidad Sour: v2=28, old range=18–20. Use v2 consistently for score and display; flag for source review.
