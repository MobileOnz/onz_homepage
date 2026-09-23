# 초보자 맞춤추천 리뉴얼

이 저장소는 React + Vite 매거진과 별도 HTML `/recommend/` 화면으로 구성됩니다. React Native 소스는 없습니다. 추천 화면은 모바일 앱의 WebView에서도 사용되므로 기존 safe-area, `onz:close`, `onz:native-back`, 이전 질문/답변 수정, 짧은 Web Animations 전환을 유지했습니다. UI를 React Native로 임의 이식하지 않았습니다.

## 기존 구조와 데이터 부족

- `src/App.tsx`: 매거진 홈 `/`, 글 상세 `/article/:slug`만 React 라우팅.
- `recommend/index.html`, `app.js`, `style.css`: 독립 HTML 진입점. 모듈 변수 `step`, `answers`, `busy`, `transitioning`으로 상태 관리. 별도 상태 라이브러리 없음.
- 이전 `recommend/questions.js`: 맛/분위기/계절/스타일/도수 5문항의 `[code, label, icon, description?]` 튜플.
- 이전 `server/recommendation.mjs`: 외부 `/api/v2/cocktails/recommendation`의 한 건 응답을 전달. URL 미설정 시 사진이 없는 모히토 데모. 전체 530개 후보의 수치 속성은 이 응답으로 확보할 수 없음.
- 그래서 첨부 CSV를 명시적 데이터 소스로 사용하는 **새 `/api/recommendations`**를 추가했습니다. 기존 단수 API, 설정 API, 질문 모듈과 테스트는 이전 호출자 호환을 위해 유지합니다. 새 UI는 데모나 기존 백엔드 응답으로 자동 대체하지 않습니다.
- 디자인 기준: `src/styles/tokens.css`의 Pretendard, 웜크림, 플럼. 기존 추천 화면 CSS와 선택/다음/뒤로가기 구조를 재사용합니다.

## 변경 파일과 역할

| 파일 | 역할 |
|---|---|
| `onz_cocktails_530.csv` | 사용자가 제공한 원본. 수정하지 않음 |
| `scripts/prepare_recommendations.py` | Python 표준 CSV 파서로 BOM·따옴표·여러 줄 처리, 필수 값/범위/ID/사진 URL 검증, JSON·분포 보고서 생성 |
| `recommendation/data/cocktails.json`, `data.ts` | 실제 CSV 530개, 32개 수치 속성 및 표시/다양성 속성. 브라우저에 전체 데이터를 전송하지 않음 |
| `recommendation/types.ts` | Cocktail, LIKE/UNKNOWN/DISLIKE, 결과/근거 타입 |
| `recommendation/questions.ts` | 초보자 6문항과 서버/클라이언트 공용 답변 검증 |
| `recommendation/config.ts` | 질문 목표값, 그룹 매핑, 점수·MMR 가중치와 임계값 |
| `recommendation/preferenceMapper.ts` | 답변을 UNKNOWN 기본 벡터로 변환 |
| `recommendation/similarity.ts` | CSV의 관측 범위와 거리 기반 유사도 |
| `recommendation/scoring.ts` | 최소 제외, 카테고리 점수, 재정규화, 실제 기여 근거 생성 |
| `recommendation/beginnerReranker.ts` | Q6에 따른 초보자 점수 |
| `recommendation/diversityReranker.ts` | 계열·베이스·스타일·지배 향·서빙을 사용한 MMR |
| `recommendation/recommendCocktails.ts` | 전체 파이프라인, Top N 진입 함수 |
| `recommendation/cases.ts` | A–D 평가 답변 |
| `server/recommendations.ts`, `api/recommendations.ts` | 검증 후 Top 5 JSON 응답; 로컬/배포에서 동일 핸들러 |
| `vite.config.ts` | 개발·preview 서버에서 신규 API 연결 |
| `tsconfig.node.json` | 엔진·API·평가 스크립트 strict TypeScript 검사 |
| `recommend/app.js`, `index.html`, `style.css` | 6문항, 사진이 있는 Top 5, 실제 근거·재료·유래, 이전/수정/재시도 |
| `server/recommendations.test.mjs` | 실제 530개 데이터 기반 회귀·계약 테스트 |
| `scripts/evaluate_recommendations.ts` | A–D Top 10과 점수·속성·근거 보고서 생성 |
| `reports/recommendation-data.md` | 전체 컬럼 분포와 데이터 품질 |
| `reports/recommendation-cases.md` | 최종 A–D Top 10, 점수 breakdown, 속성, 가족, 근거 |
| `reports/recommendation-images.json` | 결과 사진의 HTTP 검사 기록 |

원래 작업 트리에 있던 `package.json`의 react-router-dom 제거 변경은 이번 작업에서 수정하지 않았습니다. 기존 의존성만 사용합니다.

## 최종 질문 → CSV 매핑

| 질문 | 선택 → 속성/목표값 |
|---|---|
| Q1 맛 | 달콤함 → `taste_sweet=4`; 새콤함 → `taste_sour=4`; 쌉싸름함 → `taste_bitter=4`; 달콤·새콤 → sweet=3, sour=3; 모름 → 전부 UNKNOWN |
| Q2 향 | 상큼한 과일 → `flavor_citrus`; 달콤한 과일 → `flavor_tropical` OR `flavor_stone_orchard`; 베리 → `flavor_berry_red`; 허브·상쾌함 → `flavor_herbal` OR `flavor_mint`; 커피·초콜릿 → `flavor_coffee_choco`; 부드럽고 고소함 → `flavor_creamy_nutty`; 깊고 묵직함 → `flavor_oak_caramel` OR `flavor_spice`; 모름 → UNKNOWN. 선택한 향의 목표 강도=5 |
| Q3 술맛 | 거의 안 느낌 → boozy=0 / ABV=6; 살짝 → 1 / 12; 적당히 → 3 / 21.5; 확실하게 → 5 / 30; 모름 → UNKNOWN |
| Q4 질감 | 청량함 → `taste_fizz=4`; 가벼움 → `taste_body=1`; 균형 → body=3; 묵직함 → body=5; 모름 → UNKNOWN |
| Q5 순간 | 친구 → `occasion_party`; 음식 → `occasion_with_meal`; 디저트 → `occasion_dessert`; 천천히 → `occasion_slow_sip`; 기분전환 → `occasion_refresh`; 식전 → `occasion_aperitif`; 브런치 → `occasion_brunch`; 미정 → UNKNOWN. 목표=3 |
| Q6 도전 | 1–5. `approachability`, `familiarity`, `complexity`, `polarizing` 보정 |

달콤함을 선택해도 sour/bitter는 0이 아닌 UNKNOWN입니다. 현재 UI는 싫어함을 묻지 않지만, 엔진의 DISLIKE는 지정 강도와 멀수록 높은 점수를 주며 UNKNOWN과 구분합니다. 복수 향 그룹은 OR이므로 허브만 강한 음료도 허브·민트 그룹과 잘 맞습니다. 희소 `flavor_floral/smoky/anise/savory`도 데이터·벡터·점수 함수·다양성에 남아 있습니다.

초기 목표 강도는 서비스의 해석값입니다. CSV에 사용자의 취향 목표가 존재하는 것은 아닙니다. 단맛 4는 3–4에 몰린 분포와 ‘달콤함’의 의미를 고려한 시작점이며, 이후 사용자 평가로 보정해야 합니다. Q3 ABV 목표는 각 boozy 값의 실제 중앙값(6/12/21.5/30)을 사용합니다. ‘술맛이 거의 없음’은 무알코올 보장이 아닙니다.

## 점수와 선정 과정

1. CSV 전체에서 각 속성의 관측 min/max를 계산합니다. 필터 이후 범위를 다시 계산하지 않습니다.
2. Q3=거의 안 느낌일 때만 boozy>3 또는 ABV>24를 제외합니다. 다른 맛·향 선택으로는 제외하지 않습니다.
3. LIKE 유사도 = `clamp(1 - abs(target - value)/(max-min), 0, 1)`. DISLIKE는 그 거리값. 상수 컬럼은 별도 처리. UNKNOWN은 null로 생략합니다.
4. 맛/질감/상황은 활성 속성의 평균, 향은 선택한 OR 그룹의 최대 유사도를 사용합니다. 명시적 DISLIKE 속성은 각각 반영됩니다.
5. Alcohol = boozy 유사도 × 0.60 + ABV 유사도 × 0.40.
6. 기본 가중치: **맛 .30 / 향 .25 / 술맛 .20 / 질감 .10 / 상황 .10 / 초보자 .05**. UNKNOWN 카테고리를 빼고 남은 가중치 합으로 나눕니다.
7. `FinalScore = Σ(활성 가중치 × 카테고리 유사도) / Σ(활성 가중치)`.
8. 순수 FinalScore 상위 30개에서 1위는 고정합니다. 2–5위는 `0.85 × FinalScore + 0.15 × (1 - 이미 선택한 후보와의 최대 유사도)`로 선정합니다.
9. 후보 간 유사도는 family .60 + bases Jaccard .16 + style 일치 .06 + dominant flavor Jaccard .12 + serve 일치 .06입니다. 지배 향은 동률을 모두 보존합니다.
10. 다양성 때문에 정확도가 떨어지지 않도록 해당 시점의 최고 잔여 후보 대비 전체 점수 차이 ≤.05, 맛/향/술맛 각 유사도 하락 ≤.20을 지킵니다. 후보를 영구 제외하지 않고 다음 순위에서 재검토합니다.
11. 동점은 CSV ID로 결정하며 랜덤 추천을 하지 않습니다. `score`는 MMR을 섞지 않은 설명 가능한 FinalScore이므로 다양성 적용 후 순서가 점수 내림차순과 다를 수 있습니다.

평가 초기에 Case B의 Top 10에 낮은 술맛의 무알코올 결과가 다양성 때문에 진입했습니다. 위의 MMR 적합도 하락 제한을 추가한 뒤 B Top 10의 boozy가 모두 2–3으로 유지되었습니다. 네 사례에 맞추기 위해 기본 카테고리 가중치나 min-max 척도를 변경하지 않았습니다.

이 데이터는 맛/향이 0에 몰리는 유한 척도입니다. 분위기는 0–3, polarizing은 0/1입니다. 백분위로 바꾸면 ‘향 없음’이나 희소한 1을 과대평가할 수 있어 원래 거리 의미를 보존했습니다. sour/fizz의 관측 최대는 4, body의 관측 범위는 1–5입니다.

### BeginnerFit

`o=(Q6-1)/4`, 각 속성은 실제 범위로 정규화한 `a/f/c/p`입니다.

`B = .50*a + .20*(o+(1-o)*f) + .15*(1-(1-o)*c) + .15*(1-(1-o)*p)`

Q6=1이면 제시된 .50 접근성 + .20 친숙함 + .15 역복잡성 + .15 역호불호와 같습니다. Q6=5이면 익숙하지 않음·복잡성·호불호 벌점이 없어집니다. 복잡하거나 낯설다는 이유만으로 취향보다 우대하지 않습니다. 전체 질문이 활성화되면 BeginnerFit의 총점 영향은 최대 .05입니다.

Case D는 맛·향이 UNKNOWN이므로 alcohol .4444 / texture .2222 / occasion .2222 / beginner .1111로 재정규화합니다. UNKNOWN을 0점 처리하지 않습니다. Q1–Q5 모두 모르면 Q6만으로 추천하며, 이유에 이 사실을 명시합니다.

### 설명 가능성

응답의 `scoreBreakdown`(UNKNOWN은 null), `normalizedWeights`, `evidence`에 카테고리·실제 CSV 값·목표·유사도·총점 기여도를 반환합니다. `reasons`는 기여도가 높은 속성 중 유사도 ≥.70인 상위 3개로 만듭니다. 맞지 않는 속성을 맞는다고 설명하지 않으며, 충분히 일치하는 근거가 없으면 타협 결과임을 명시합니다. 일치 점수를 적중 확률로 표시하지 않습니다.

## 결과와 사진

`GET /api/recommendations?taste=SWEET&aroma=FRUIT&alcohol=MILD&texture=FIZZY&occasion=PARTY&adventure=1`

`{ mode: 'csv', datasetCount: 530, data: CocktailRecommendation[5] }`

모든 결과에 실제 CSV 사진, 한글·영문 이름, numeric v2 ABV, 베이스, 계산 근거, 재료·유래를 표시합니다. 사진이 실패하면 다른 칵테일 사진으로 대체하지 않고 실패 상태를 표시합니다. 105개 ONZ HTTP 이미지 주소는 검증한 HTTPS로 변환하고 425개 GitHub HTTPS 주소는 유지합니다. 추천 UI에서 외부 백엔드 API 키는 필요하지 않습니다.

## 재현과 검증

로컬 테스트는 Node 25.6.1에서 수행했습니다. TypeScript 직접 실행에는 Node 22.18+ 또는 24+를 사용하세요. API 진입점은 Vercel TypeScript 함수입니다.

```sh
python3 scripts/prepare_recommendations.py
node scripts/evaluate_recommendations.ts
npm test
npm run lint
npm run build
npm run dev -- --host 127.0.0.1 --port 5174
```

- A: 달콤/과일/살짝 술맛/탄산/파티/도전1
- B: 새콤/시트러스/적당한 술맛/가벼움/기분전환/도전2
- C: 쌉싸름/허브/강한 술맛/묵직함/천천히/도전5
- D: 맛·향 모름/살짝 술맛/탄산/브런치/도전1

각 Top 10과 최종 속성은 `reports/recommendation-cases.md`에 있습니다. Top 1 보존, family 쏠림, 수치 회계, UNKNOWN, DISLIKE, 희소 향, 알코올 조합, 초보자 영향 상한, API 부정 입력을 테스트합니다. 기존 단수 API 테스트도 유지합니다.

연결된 브라우저가 없어 실기기 터치/화면 렌더링 검증은 아직 하지 못했습니다. HTTP API와 사진 응답 확인은 시각 검증을 대신하지 않습니다.

## 데이터 품질과 다음 개선

- `Trinidad Sour`: v2 ABV=28과 기존 18–20 범위가 충돌합니다. 계산·표시는 v2=28로 일관되게 사용하며 원본 수정은 하지 않습니다.
- `recipeStatus=needs_review` 162개, `source=image_old` 425개. 맛 벡터 자체가 검증된 관능평가라는 보장은 없습니다.
- `polarizing`의 523개가 0입니다. 0을 좋아한다는 뜻으로 바꾸지 않습니다.
- cocktail family는 원본에 없으므로 이름 기반 추정입니다. `Hemingway Special`처럼 이름이 다른 같은 계열이나 알려지지 않은 변형은 놓칠 수 있습니다. 검증된 family ID가 생기면 교체해야 합니다.
- 알레르겐 빈칸은 안전 판정에 쓰지 않습니다. 이번 질문은 알레르기나 음주 가능 여부를 조사하지 않습니다.
- A의 과일향, B의 시트러스가 상위에 많은 것은 명시된 취향에 따른 결과입니다. D에서는 향을 모르므로 향을 추천 이유로 주장하지 않으며 상위 향도 분산됩니다.
- 사용자 저장/싫어요/실제 시음 평점을 쌓아 목표 강도와 가중치를 시간 분리 검증셋으로 보정하고, 초보자/기존 사용자별 적합도·노출 편향·다양성 변화를 함께 평가할 수 있습니다.
- 레시피/도수/향 속성 검수와 family 메타데이터 보강을 먼저 수행하면 추천 설명의 신뢰도가 높아집니다. 네 가지 수동 Case 통과는 실제 사용자 만족도 검증이 아닙니다.
