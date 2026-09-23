# Recommendation evaluation — all 530 CSV records

Scores are model similarities, not probabilities. Rank 1 is preserved; ranks 2 onward use diversity, so scores can be non-monotonic.

## Case A

Answers: {"taste":"SWEET","aroma":"FRUIT","alcohol":"MILD","texture":"FIZZY","occasion":"PARTY","adventure":"1"}

| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | Rum Mango Fizz | 0.9925 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 0.850 | 12 | 1 | 4/3/0 | 2/4 | fizz | flavor_tropical |
| 2 | Plum Soju Cocktail | 0.9409 | 1.000 | 0.800 | 0.982 | 1.000 | 1.000 | 0.890 | 10 | 1 | 4/3/0 | 1/4 | id:402 | flavor_stone_orchard |
| 3 | Sangria Blanca | 0.9392 | 1.000 | 0.800 | 0.973 | 1.000 | 1.000 | 0.890 | 9 | 1 | 4/2/0 | 2/4 | sangria | flavor_citrus, flavor_stone_orchard |
| 4 | Pineapple Mojito | 0.9427 | 1.000 | 0.800 | 0.991 | 1.000 | 1.000 | 0.890 | 13 | 1 | 4/3/0 | 1/4 | mojito | flavor_mint |
| 5 | Rio Carnival | 0.9319 | 1.000 | 0.800 | 0.982 | 1.000 | 1.000 | 0.710 | 14 | 1 | 4/3/0 | 2/4 | id:415 | flavor_tropical |
| 6 | South Beach | 0.9387 | 1.000 | 0.800 | 0.991 | 1.000 | 1.000 | 0.810 | 13 | 1 | 4/3/0 | 2/4 | id:461 | flavor_citrus, flavor_tropical |
| 7 | Saint Martin Bucket | 0.9319 | 1.000 | 0.800 | 0.982 | 1.000 | 1.000 | 0.710 | 14 | 1 | 4/3/0 | 2/4 | id:443 | flavor_tropical |
| 8 | Turks Punch | 0.9319 | 1.000 | 0.800 | 0.982 | 1.000 | 1.000 | 0.710 | 14 | 1 | 4/3/0 | 2/4 | punch | flavor_citrus, flavor_tropical |
| 9 | Rum Bucket | 0.9405 | 1.000 | 0.800 | 1.000 | 1.000 | 1.000 | 0.810 | 12 | 1 | 4/3/0 | 2/4 | id:427 | flavor_tropical |
| 10 | Varadero Beach | 0.9387 | 1.000 | 0.800 | 0.991 | 1.000 | 1.000 | 0.810 | 13 | 1 | 4/3/0 | 2/4 | id:498 | flavor_citrus, flavor_tropical |

Pure-score top 5: Rum Mango Fizz, Peach Soju Fizz, Pineapple Mojito, Plum Soju Cocktail, Rum Bucket

Normalized weights: {"taste":0.3,"flavor":0.25,"alcohol":0.2,"texture":0.1,"occasion":0.1,"beginnerFit":0.05}

Top 5 reasons:

- Rum Mango Fizz: 단맛 4/5로, 선택한 취향과 가까워요. 열대과일 향 5/5로, 선택한 취향과 가까워요. 체감 술맛 1/5로, 선택한 취향과 가까워요.
- Plum Soju Cocktail: 단맛 4/5로, 선택한 취향과 가까워요. 복숭아·사과 계열 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 1/5로, 선택한 취향과 가까워요.
- Sangria Blanca: 단맛 4/5로, 선택한 취향과 가까워요. 복숭아·사과 계열 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 1/5로, 선택한 취향과 가까워요.
- Pineapple Mojito: 단맛 4/5로, 선택한 취향과 가까워요. 열대과일 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 1/5로, 선택한 취향과 가까워요.
- Rio Carnival: 단맛 4/5로, 선택한 취향과 가까워요. 열대과일 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 1/5로, 선택한 취향과 가까워요.

Top without beginner contribution: Rum Mango Fizz; with it: Rum Mango Fizz. Beginner contribution ceiling: 0.0500.

## Case B

Answers: {"taste":"SOUR","aroma":"CITRUS","alcohol":"MEDIUM","texture":"LIGHT","occasion":"REFRESH","adventure":"2"}

| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | Margarita | 0.9532 | 1.000 | 1.000 | 0.969 | 1.000 | 0.667 | 0.855 | 25 | 3 | 3/4/0 | 1/0 | margarita | flavor_citrus |
| 2 | Caipirinha | 0.9503 | 1.000 | 1.000 | 0.951 | 0.750 | 1.000 | 0.703 | 27 | 3 | 3/4/0 | 2/0 | id:35 | flavor_citrus |
| 3 | Citrus Basil Smash | 0.9266 | 1.000 | 1.000 | 0.822 | 0.750 | 1.000 | 0.743 | 15 | 2 | 3/4/0 | 2/0 | smash | flavor_citrus, flavor_herbal |
| 4 | Hemingway Special | 0.9412 | 1.000 | 1.000 | 0.960 | 1.000 | 0.667 | 0.650 | 17 | 3 | 2/4/0 | 1/0 | id:42 | flavor_citrus |
| 5 | Mint Daiquiri | 0.9095 | 1.000 | 0.800 | 0.987 | 0.750 | 1.000 | 0.743 | 20 | 3 | 3/4/0 | 2/0 | daiquiri | flavor_mint |
| 6 | Basil Limoncello | 0.8961 | 1.000 | 1.000 | 0.831 | 0.750 | 0.667 | 0.765 | 16 | 2 | 4/4/0 | 2/0 | id:139 | flavor_citrus |
| 7 | Lemon Drop Martini | 0.8886 | 1.000 | 1.000 | 0.987 | 1.000 | 0.000 | 0.825 | 23 | 3 | 4/4/0 | 1/0 | martini | flavor_citrus |
| 8 | South Side | 0.8781 | 1.000 | 0.800 | 0.822 | 0.750 | 1.000 | 0.773 | 15 | 2 | 3/4/0 | 2/0 | id:51 | flavor_mint |
| 9 | Tommy’s Margarita | 0.9258 | 1.000 | 1.000 | 0.978 | 0.750 | 0.667 | 0.773 | 19 | 3 | 3/4/0 | 2/0 | margarita | flavor_citrus |
| 10 | Florida Daiquiri | 0.9211 | 1.000 | 1.000 | 0.987 | 0.750 | 0.667 | 0.643 | 20 | 3 | 3/4/0 | 2/0 | daiquiri | flavor_citrus |

Pure-score top 5: Margarita, Caipirinha, Hemingway Special, Citrus Basil Smash, Lime Basil Margarita

Normalized weights: {"taste":0.3,"flavor":0.25,"alcohol":0.2,"texture":0.1,"occasion":0.1,"beginnerFit":0.05}

Top 5 reasons:

- Margarita: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 5/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.
- Caipirinha: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 5/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.
- Citrus Basil Smash: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 5/5로, 선택한 취향과 가까워요. 기분전환 적합도 3/3로, 선택한 취향과 가까워요.
- Hemingway Special: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 5/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.
- Mint Daiquiri: 새콤한 맛 4/4로, 선택한 취향과 가까워요. 시트러스 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 3/5로, 선택한 취향과 가까워요.

Top without beginner contribution: Caipirinha; with it: Margarita. Beginner contribution ceiling: 0.0500.

## Case C

Answers: {"taste":"BITTER","aroma":"HERBAL","alcohol":"STRONG","texture":"RICH","occasion":"SLOW","adventure":"5"}

| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | Black Manhattan | 0.9050 | 1.000 | 0.800 | 1.000 | 0.750 | 1.000 | 0.600 | 30 | 5 | 2/1/4 | 4/0 | manhattan | flavor_herbal, flavor_oak_caramel |
| 2 | Hanky Panky | 0.8459 | 1.000 | 0.800 | 0.871 | 0.750 | 0.667 | 0.600 | 29 | 4 | 2/1/4 | 4/0 | id:65 | flavor_herbal |
| 3 | Bobby Burns | 0.8450 | 0.800 | 0.800 | 1.000 | 0.750 | 1.000 | 0.600 | 30 | 5 | 3/0/3 | 4/0 | id:162 | flavor_herbal, flavor_oak_caramel |
| 4 | Boulevardier | 0.8292 | 1.000 | 0.600 | 0.871 | 0.750 | 1.000 | 0.600 | 29 | 4 | 2/1/4 | 4/0 | id:61 | flavor_oak_caramel |
| 5 | Vieux Carré | 0.8111 | 0.800 | 0.600 | 0.956 | 1.000 | 1.000 | 0.600 | 35 | 5 | 3/1/3 | 5/0 | id:83 | flavor_oak_caramel |
| 6 | Rabo de Galo | 0.8009 | 1.000 | 0.600 | 0.871 | 0.750 | 0.667 | 0.700 | 29 | 4 | 2/1/4 | 4/0 | id:81 | flavor_herbal |
| 7 | Mezcal Negroni | 0.7806 | 0.800 | 0.800 | 0.844 | 0.750 | 0.667 | 0.600 | 26 | 4 | 2/0/5 | 4/0 | negroni | flavor_smoky |
| 8 | Mugwort Martini | 0.7722 | 0.800 | 1.000 | 0.844 | 0.500 | 0.333 | 0.600 | 26 | 4 | 2/1/3 | 3/0 | martini | flavor_herbal |
| 9 | White Negroni | 0.7989 | 1.000 | 1.000 | 0.844 | 0.500 | 0.000 | 0.600 | 26 | 4 | 2/1/4 | 3/0 | negroni | flavor_herbal |
| 10 | Rob Roy | 0.7950 | 0.800 | 0.600 | 1.000 | 0.750 | 1.000 | 0.600 | 30 | 5 | 2/0/3 | 4/0 | id:420 | flavor_oak_caramel |

Pure-score top 5: Black Manhattan, Hanky Panky, Bobby Burns, Boulevardier, Vieux Carré

Normalized weights: {"taste":0.3,"flavor":0.25,"alcohol":0.2,"texture":0.1,"occasion":0.1,"beginnerFit":0.05}

Top 5 reasons:

- Black Manhattan: 쌉싸름한 맛 4/5로, 선택한 취향과 가까워요. 허브 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 5/5로, 선택한 취향과 가까워요.
- Hanky Panky: 쌉싸름한 맛 4/5로, 선택한 취향과 가까워요. 허브 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 4/5로, 선택한 취향과 가까워요.
- Bobby Burns: 쌉싸름한 맛 3/5로, 선택한 취향과 가까워요. 허브 향 4/5로, 선택한 취향과 가까워요. 체감 술맛 5/5로, 선택한 취향과 가까워요.
- Boulevardier: 쌉싸름한 맛 4/5로, 선택한 취향과 가까워요. 천천히 마시기 적합도 3/3로, 선택한 취향과 가까워요. 체감 술맛 4/5로, 선택한 취향과 가까워요.
- Vieux Carré: 쌉싸름한 맛 3/5로, 선택한 취향과 가까워요. 체감 술맛 5/5로, 선택한 취향과 가까워요. 천천히 마시기 적합도 3/3로, 선택한 취향과 가까워요.

Top without beginner contribution: Black Manhattan; with it: Black Manhattan. Beginner contribution ceiling: 0.0500.

## Case D

Answers: {"taste":"UNKNOWN","aroma":"UNKNOWN","alcohol":"MILD","texture":"FIZZY","occasion":"BRUNCH","adventure":"1"}

| Rank | Cocktail | Score | Taste | Flavor | Alcohol | Texture | Occasion | Beginner | ABV | Boozy | Sweet/Sour/Bitter | Body/Fizz | Family | Dominant flavor |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | White Sangria | 0.9759 | UNKNOWN | UNKNOWN | 0.973 | 1.000 | 1.000 | 0.890 | 9 | 1 | 4/2/0 | 2/4 | sangria | flavor_stone_orchard |
| 2 | Rose Champagne Punch | 0.9754 | UNKNOWN | UNKNOWN | 0.982 | 1.000 | 1.000 | 0.850 | 10 | 1 | 4/2/0 | 2/4 | punch | flavor_floral |
| 3 | Pimm's Cup | 0.9607 | UNKNOWN | UNKNOWN | 0.947 | 1.000 | 1.000 | 0.860 | 6 | 1 | 3/2/0 | 1/4 | id:395 | flavor_citrus, flavor_herbal |
| 4 | Ramos Fizz | 0.9127 | UNKNOWN | UNKNOWN | 0.871 | 1.000 | 1.000 | 0.730 | 11 | 2 | 4/3/0 | 5/4 | fizz | flavor_creamy_nutty |
| 5 | Mimosa | 0.9269 | UNKNOWN | UNKNOWN | 0.836 | 1.000 | 1.000 | 1.000 | 7 | 0 | 3/2/0 | 1/4 | id:14 | flavor_citrus |
| 6 | Lavender Lemonade Cocktail | 0.9014 | UNKNOWN | UNKNOWN | 0.982 | 1.000 | 0.667 | 0.850 | 10 | 1 | 4/4/0 | 1/4 | id:313 | flavor_citrus, flavor_floral |
| 7 | Elderflower Spritz | 0.9153 | UNKNOWN | UNKNOWN | 0.844 | 1.000 | 1.000 | 0.860 | 8 | 0 | 3/2/0 | 1/4 | spritz | flavor_floral |
| 8 | Sparkling Rose | 0.9272 | UNKNOWN | UNKNOWN | 0.871 | 1.000 | 1.000 | 0.860 | 11 | 0 | 3/1/0 | 2/4 | id:463 | flavor_berry_red |
| 9 | Strawberry Lemonade | 0.8959 | UNKNOWN | UNKNOWN | 0.773 | 1.000 | 1.000 | 0.970 | 0 | 0 | 4/4/0 | 1/4 | id:471 | flavor_berry_red |
| 10 | Green Tea Mojito | 0.8909 | UNKNOWN | UNKNOWN | 0.991 | 1.000 | 0.667 | 0.720 | 13 | 1 | 3/2/1 | 2/4 | mojito | flavor_mint |

Pure-score top 5: White Sangria, Rose Champagne Punch, Pimm's Cup, Sparkling Rose, Mimosa

Normalized weights: {"taste":0,"flavor":0,"alcohol":0.4444444444444445,"texture":0.22222222222222224,"occasion":0.22222222222222224,"beginnerFit":0.11111111111111112}

Top 5 reasons:

- White Sangria: 체감 술맛 1/5로, 선택한 취향과 가까워요. 브런치 적합도 3/3로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요.
- Rose Champagne Punch: 체감 술맛 1/5로, 선택한 취향과 가까워요. 브런치 적합도 3/3로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요.
- Pimm's Cup: 체감 술맛 1/5로, 선택한 취향과 가까워요. 브런치 적합도 3/3로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요.
- Ramos Fizz: 브런치 적합도 3/3로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요. 체감 술맛 2/5로, 선택한 취향과 가까워요.
- Mimosa: 브런치 적합도 3/3로, 선택한 취향과 가까워요. 탄산감 4/4로, 선택한 취향과 가까워요. 체감 술맛 0/5로, 선택한 취향과 가까워요.

Top without beginner contribution: Rose Champagne Punch; with it: White Sangria. Beginner contribution ceiling: 0.1111.

