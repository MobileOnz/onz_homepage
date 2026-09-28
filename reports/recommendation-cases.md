# Recommendation evaluation — all 105 CSV records

Scores are model similarities, not probabilities. Rank 1 is preserved; ranks 2 onward use diversity, so scores can be non-monotonic.

## Case A

Answers: {"taste":"SWEET","aroma":"FRUIT","alcohol":"MILD","texture":"FIZZY","occasion":"PARTY","adventure":"1"}

| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | Barracuda | 0.8967 | 1.000 | 0.800 | 0.825 | 1.000 | 1.000 | 0.635 | 16 | 2 | 4/3/0 | 2/4 | id:104 | flavor_tropical |
| 2 | Bellini | 0.8651 | 0.800 | 1.000 | 0.825 | 1.000 | 0.667 | 0.870 | 8 | 0 | 3/1/0 | 2/4 | id:2 | flavor_stone_orchard |
| 3 | Porn Star Martini | 0.8857 | 1.000 | 1.000 | 0.811 | 0.250 | 1.000 | 0.970 | 17 | 2 | 4/3/0 | 2/1 | martini | flavor_tropical |
| 4 | Piña Colada | 0.8024 | 0.800 | 1.000 | 0.986 | 0.000 | 0.667 | 0.970 | 13 | 1 | 5/1/0 | 5/0 | colada | flavor_tropical |
| 5 | Singapore Sling | 0.7730 | 1.000 | 0.600 | 0.931 | 0.000 | 1.000 | 0.735 | 17 | 1 | 4/3/1 | 3/0 | id:82 | flavor_tropical, flavor_berry_red |
| 6 | Pisco Punch | 0.7606 | 1.000 | 0.800 | 0.811 | 0.000 | 0.667 | 0.635 | 17 | 2 | 4/3/0 | 2/0 | punch | flavor_tropical |
| 7 | Sex on the Beach | 0.7385 | 0.800 | 0.600 | 1.000 | 0.000 | 1.000 | 0.970 | 12 | 1 | 5/2/0 | 2/0 | id:21 | flavor_citrus, flavor_berry_red, flavor_stone_orchard |
| 8 | Missionary's Downfall | 0.7401 | 1.000 | 0.600 | 0.959 | 0.000 | 0.667 | 0.635 | 15 | 1 | 4/4/0 | 2/0 | id:92 | flavor_mint |
| 9 | Mary Pickford | 0.7551 | 1.000 | 0.800 | 0.783 | 0.000 | 0.667 | 0.635 | 19 | 2 | 4/1/0 | 2/0 | id:13 | flavor_tropical |
| 10 | Chartreuse Swizzle | 0.7312 | 1.000 | 0.600 | 0.825 | 1.000 | 0.000 | 0.325 | 16 | 2 | 4/3/0 | 2/4 | id:100 | flavor_herbal |

Pure-score top 5: Barracuda, Porn Star Martini, Bellini, Piña Colada, Singapore Sling

Normalized weights: {"taste":0.3,"flavor":0.25,"alcohol":0.2,"texture":0.1,"occasion":0.1,"beginnerFit":0.05}

Top 5 reasons:

- Barracuda: 단맛 4/5로, 선택한 취향과 가까워요. 열대과일 향 4/5로, 선택한 취향과 가까워요. 파티 적합도 3/3로, 선택한 취향과 가까워요.
- Bellini: 복숭아·사과 계열 향 5/5로, 선택한 취향과 가까워요. 단맛 3/5로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요.
- Porn Star Martini: 단맛 4/5로, 선택한 취향과 가까워요. 열대과일 향 5/5로, 선택한 취향과 가까워요. 파티 적합도 3/3로, 선택한 취향과 가까워요.
- Piña Colada: 열대과일 향 5/5로, 선택한 취향과 가까워요. 단맛 5/5로, 선택한 취향과 가까워요. 체감 술맛 1/5로, 선택한 취향과 가까워요.
- Singapore Sling: 단맛 4/5로, 선택한 취향과 가까워요. 체감 술맛 1/5로, 선택한 취향과 가까워요. 파티 적합도 3/3로, 선택한 취향과 가까워요.

Top without beginner contribution: Barracuda; with it: Barracuda. Beginner contribution ceiling: 0.0500.

## Case B

Answers: {"taste":"SOUR","aroma":"CITRUS","alcohol":"MEDIUM","texture":"LIGHT","occasion":"REFRESH","adventure":"2"}

| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | Margarita | 0.9485 | 1.000 | 1.000 | 0.952 | 1.000 | 0.667 | 0.830 | 25 | 3 | 3/4/0 | 1/0 | margarita | flavor_citrus |
| 2 | Caipirinha | 0.9421 | 1.000 | 1.000 | 0.924 | 0.750 | 1.000 | 0.645 | 27 | 3 | 3/4/0 | 2/0 | id:35 | flavor_citrus |
| 3 | Hemingway Special | 0.9335 | 1.000 | 1.000 | 0.938 | 1.000 | 0.667 | 0.585 | 17 | 3 | 2/4/0 | 1/0 | id:42 | flavor_citrus |
| 4 | Daiquiri | 0.9040 | 1.000 | 0.800 | 0.979 | 1.000 | 0.667 | 0.830 | 23 | 3 | 3/4/0 | 1/0 | daiquiri | flavor_citrus |
| 5 | Lemon Drop Martini | 0.8855 | 1.000 | 1.000 | 0.979 | 1.000 | 0.000 | 0.792 | 23 | 3 | 4/4/0 | 1/0 | martini | flavor_citrus |
| 6 | Tommy’s Margarita | 0.9214 | 1.000 | 1.000 | 0.966 | 0.750 | 0.667 | 0.733 | 19 | 3 | 3/4/0 | 2/0 | margarita | flavor_citrus |
| 7 | South Side | 0.8697 | 1.000 | 0.800 | 0.790 | 0.750 | 1.000 | 0.733 | 15 | 2 | 3/4/0 | 2/0 | id:51 | flavor_mint |
| 8 | White Lady | 0.8575 | 1.000 | 1.000 | 0.979 | 0.750 | 0.000 | 0.733 | 23 | 3 | 3/4/0 | 2/0 | id:25 | flavor_citrus |
| 9 | Mai Tai | 0.8463 | 1.000 | 0.800 | 0.952 | 0.500 | 0.667 | 0.785 | 25 | 3 | 4/4/0 | 3/0 | id:78 | flavor_citrus |
| 10 | Sea Breeze | 0.8395 | 1.000 | 0.800 | 0.588 | 0.750 | 1.000 | 0.940 | 9 | 1 | 2/4/1 | 2/0 | id:20 | flavor_citrus, flavor_berry_red |

Pure-score top 5: Margarita, Caipirinha, Hemingway Special, Tommy’s Margarita, Daiquiri

Normalized weights: {"taste":0.3,"flavor":0.25,"alcohol":0.2,"texture":0.1,"occasion":0.1,"beginnerFit":0.05}

Top 5 reasons:

- Margarita: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 5/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.
- Caipirinha: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 5/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.
- Hemingway Special: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 5/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.
- Daiquiri: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.
- Lemon Drop Martini: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 5/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.

Top without beginner contribution: Caipirinha; with it: Margarita. Beginner contribution ceiling: 0.0500.

## Case C

Answers: {"taste":"BITTER","aroma":"HERBAL","alcohol":"STRONG","texture":"RICH","occasion":"SLOW","adventure":"5"}

| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | Hanky Panky | 0.8399 | 1.000 | 0.800 | 0.866 | 0.750 | 0.667 | 0.500 | 29 | 4 | 2/1/4 | 4/0 | id:65 | flavor_herbal |
| 2 | Boulevardier | 0.8232 | 1.000 | 0.600 | 0.866 | 0.750 | 1.000 | 0.500 | 29 | 4 | 2/1/4 | 4/0 | id:61 | flavor_oak_caramel |
| 3 | Rabo de Galo | 0.7962 | 1.000 | 0.600 | 0.866 | 0.750 | 0.667 | 0.625 | 29 | 4 | 2/1/4 | 4/0 | id:81 | flavor_herbal |
| 4 | Vieux Carré | 0.8012 | 0.800 | 0.600 | 0.931 | 1.000 | 1.000 | 0.500 | 35 | 5 | 3/1/3 | 5/0 | id:83 | flavor_oak_caramel |
| 5 | Tipperary | 0.7772 | 0.600 | 0.800 | 0.986 | 0.750 | 1.000 | 0.500 | 29 | 5 | 3/0/2 | 4/0 | id:105 | flavor_herbal |
| 6 | Remember the Maine | 0.7567 | 0.800 | 0.400 | 0.959 | 1.000 | 1.000 | 0.500 | 33 | 5 | 3/1/3 | 5/0 | id:103 | flavor_oak_caramel |
| 7 | Negroni | 0.7439 | 0.800 | 0.800 | 0.811 | 0.500 | 0.667 | 0.500 | 25 | 4 | 2/0/5 | 3/0 | negroni | flavor_herbal |
| 8 | Stinger | 0.7262 | 0.600 | 0.800 | 0.866 | 0.750 | 0.667 | 0.625 | 31 | 4 | 4/0/2 | 4/0 | id:55 | flavor_mint |
| 9 | Mint Julep | 0.7179 | 0.400 | 1.000 | 1.000 | 0.500 | 0.667 | 0.625 | 30 | 5 | 3/0/1 | 3/0 | julep | flavor_mint |
| 10 | Rusty Nail | 0.7217 | 0.600 | 0.600 | 0.959 | 0.750 | 1.000 | 0.500 | 33 | 5 | 3/0/2 | 4/0 | id:74 | flavor_oak_caramel |

Pure-score top 5: Hanky Panky, Boulevardier, Vieux Carré, Rabo de Galo, Tipperary

Normalized weights: {"taste":0.3,"flavor":0.25,"alcohol":0.2,"texture":0.1,"occasion":0.1,"beginnerFit":0.05}

Top 5 reasons:

- Hanky Panky: 쌉싸름한 맛 4/5로, 선택한 취향과 가까워요. 허브 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 4/5로, 선택한 취향과 가까워요.
- Boulevardier: 쌉싸름한 맛 4/5로, 선택한 취향과 가까워요. 천천히 마시기 적합도 3/3로, 선택한 취향과 가까워요. 체감 술맛 4/5로, 선택한 취향과 가까워요.
- Rabo de Galo: 쌉싸름한 맛 4/5로, 선택한 취향과 가까워요. 체감 술맛 4/5로, 선택한 취향과 가까워요. 도수 29%로, 선택한 취향과 가까워요.
- Vieux Carré: 쌉싸름한 맛 3/5로, 선택한 취향과 가까워요. 체감 술맛 5/5로, 선택한 취향과 가까워요. 천천히 마시기 적합도 3/3로, 선택한 취향과 가까워요.
- Tipperary: 허브 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 5/5로, 선택한 취향과 가까워요. 천천히 마시기 적합도 3/3로, 선택한 취향과 가까워요.

Top without beginner contribution: Hanky Panky; with it: Hanky Panky. Beginner contribution ceiling: 0.0500.

## Case D

Answers: {"taste":"UNKNOWN","aroma":"UNKNOWN","alcohol":"MILD","texture":"FIZZY","occasion":"BRUNCH","adventure":"1"}

| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | Mimosa | 0.9160 | UNKNOWN | UNKNOWN | 0.811 | 1.000 | 1.000 | 1.000 | 7 | 0 | 3/2/0 | 1/4 | id:14 | flavor_citrus |
| 2 | Ramos Fizz | 0.9055 | UNKNOWN | UNKNOWN | 0.866 | 1.000 | 1.000 | 0.685 | 11 | 2 | 4/3/0 | 5/4 | fizz | flavor_creamy_nutty |
| 3 | Bellini | 0.9077 | UNKNOWN | UNKNOWN | 0.825 | 1.000 | 1.000 | 0.870 | 8 | 0 | 3/1/0 | 2/4 | id:2 | flavor_stone_orchard |
| 4 | Aperol Spritz | 0.8931 | UNKNOWN | UNKNOWN | 0.972 | 1.000 | 0.667 | 0.815 | 10 | 1 | 2/1/3 | 1/4 | spritz | flavor_citrus |
| 5 | Russian Spring Punch | 0.8664 | UNKNOWN | UNKNOWN | 0.945 | 1.000 | 0.667 | 0.685 | 16 | 1 | 4/4/0 | 2/4 | punch | flavor_berry_red |
| 6 | French 75 | 0.8370 | UNKNOWN | UNKNOWN | 0.866 | 1.000 | 0.667 | 0.735 | 13 | 2 | 3/3/0 | 2/4 | id:38 | flavor_citrus |
| 7 | Barracuda | 0.8075 | UNKNOWN | UNKNOWN | 0.825 | 1.000 | 0.667 | 0.635 | 16 | 2 | 4/3/0 | 2/4 | id:104 | flavor_tropical |
| 8 | Moscow Mule | 0.7650 | UNKNOWN | UNKNOWN | 0.986 | 1.000 | 0.000 | 0.940 | 13 | 1 | 3/2/0 | 1/4 | mule | flavor_spice |
| 9 | Mojito | 0.7499 | UNKNOWN | UNKNOWN | 0.945 | 1.000 | 0.000 | 0.970 | 16 | 1 | 3/3/0 | 1/4 | mojito | flavor_mint |
| 10 | Cuba Libre | 0.7655 | UNKNOWN | UNKNOWN | 0.972 | 1.000 | 0.000 | 1.000 | 10 | 1 | 4/1/0 | 1/4 | id:5 | flavor_citrus |

Pure-score top 5: Mimosa, Bellini, Ramos Fizz, Aperol Spritz, Russian Spring Punch

Normalized weights: {"taste":0,"flavor":0,"alcohol":0.4444444444444445,"texture":0.22222222222222224,"occasion":0.22222222222222224,"beginnerFit":0.11111111111111112}

Top 5 reasons:

- Mimosa: 브런치 적합도 3/3로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요. 체감 술맛 0/5로, 선택한 취향과 가까워요.
- Ramos Fizz: 브런치 적합도 3/3로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요. 체감 술맛 2/5로, 선택한 취향과 가까워요.
- Bellini: 브런치 적합도 3/3로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요. 체감 술맛 0/5로, 선택한 취향과 가까워요.
- Aperol Spritz: 체감 술맛 1/5로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요. 도수 10%로, 선택한 취향과 가까워요.
- Russian Spring Punch: 체감 술맛 1/5로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요. 도수 16%로, 선택한 취향과 가까워요.

Top without beginner contribution: Ramos Fizz; with it: Mimosa. Beginner contribution ceiling: 0.1111.

