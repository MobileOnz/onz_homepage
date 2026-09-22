# 맞춤추천 통합

기존 Cocktail_Web의 선택 플로우를 홈페이지의 `/recommend/`로 이전했습니다. 홈페이지 메뉴의 **맞춤추천**으로 진입합니다. 기존 React 매거진은 그대로 유지하고, 추천 페이지는 Vite의 두 번째 HTML 진입점으로 빌드합니다. iframe이나 별도 운영 웹 서버는 필요하지 않습니다.

## 로컬 실행

Node 22.12 이상을 사용하세요. 프로젝트의 Vite 8이 요구하는 버전입니다.

```sh
npm ci
cp .env.example .env
npm run dev -- --host 0.0.0.0 --port 5174
```

- 홈페이지: `http://localhost:5174/`
- 추천: `http://localhost:5174/recommend/`
- Android 기본 에뮬레이터: `http://10.0.2.2:5174/recommend/`
- `npm run build`, `npm run lint`, `npm test`로 검증합니다.
- Vite 개발 서버와 preview 서버에서도 실제 배포 함수와 동일한 API 핸들러를 사용합니다.

## 배포

Vercel의 기존 Vite 빌드(`npm run build`, 출력 `dist`)를 유지합니다. 루트 `api/config.js`, `api/recommendation.js`는 Node 서버 함수입니다. `vercel.json`은 추천 HTML과 매거진 상세 경로를 각각 연결하며 API 경로를 SPA HTML로 덮지 않습니다.

Vercel 환경 변수:

| 이름 | 용도 |
| --- | --- |
| `API_BASE_URL` | 기존 백엔드 주소, 예: `https://onz-cocktail.kr/onz` |
| `API_AUTHORIZATION` | 필요한 경우에만 서버 측 인증 값 |

변수에 `VITE_` 접두사를 붙이지 마세요. 인증 값은 브라우저 번들에 포함하지 않습니다. API 주소를 지정하지 않으면 기존과 동일하게 명시적인 고정 모히토 데모로 동작합니다. 실제 API 실패 시 데모로 대체하지 않습니다.

앱 배포 시 `Cocktail_Front/.env`의 `RECOMMENDATION_WEB_URL`을 `https://<홈페이지 도메인>/recommend/`로 설정하고 앱 번들을 갱신하세요. 현재 로컬 앱 주소는 기존 테스트를 유지하기 위해 바꾸지 않았습니다. 닫기는 `onz:close`, Android 뒤로가기는 `onz:native-back`을 그대로 사용합니다. 웹의 로고는 홈페이지로 돌아갑니다.

## 수정 위치와 유지한 동작

- `recommend/app.js`: 5단계 답변 상태, 선택 피드백, 전환, 결과·재시도·답변 수정
- `recommend/questions.js`: 기존 선택지 코드와 검증
- `recommend/style.css`: 모바일 WebView 레이아웃, safe-area, 하단 CTA, 사진 전체 폭 및 좌측 하단 한글·영문 오버레이
- `public/recommend-assets/`: 기존 선택 아이콘과 Pretendard
- `server/recommendation.mjs`: 기존 추천 API 어댑터
- `server/handler.mjs`: 개발 서버와 배포에서 공유하는 HTTP 핸들러
- `server/handler.test.mjs`: 답변 코드, 자산, 요청 계약, 중복 쿼리, 데모·빈 결과·실패 검증

추천 CSS는 별도 문서에서만 로드되어 매거진 스타일에 영향을 주지 않습니다. 빌드된 CSS/JS에는 Vite가 콘텐츠 해시를 붙여 수정 후 이전 파일 캐시가 남는 문제를 줄입니다. 질문·추천 알고리즘·인증 방식은 변경하지 않았고, 새 런타임 라이브러리도 추가하지 않았습니다.

참고: [Vite multi-page build](https://vite.dev/guide/build#multi-page-app), [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js).
