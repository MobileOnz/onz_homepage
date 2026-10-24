# 로컬 추천 화면에서 하이브리드 검색 사용

`/recommend/`의 기존 여섯 질문과 결과 카드를 그대로 사용한다. `HYBRID_SEARCH_BASE_URL`이 설정되면 `/api/recommendations` 서버 어댑터가 답변을 맛·향·분위기 선호 문장으로 바꾸고 Spring의 `/api/v2/cocktails/search/hybrid`를 호출한다. 설정을 지우면 원래 CSV 추천 엔진을 사용한다. 백엔드 장애 시 CSV 결과로 자동 대체하지 않는다.

1. Cocktail_backend에서 PostgreSQL(55439)과 Ollama(11434)를 실행한다. 기존 `docs/hybrid-search/README.md` 참조.
2. 백엔드 루트에서 실행한다:

```bash
python3 scripts/hybrid_search/normalize.py data/hybrid-search/onz_cocktails_105.csv
JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home ./gradlew hybridSearchLocal
```

테스트 클래스패스 전용 런처가 실제 검색 컨트롤러/서비스를 `127.0.0.1:8091/onz`에 띄운다. 기본 로컬 테스트 DB 안의 `onz_homepage_demo` 스키마에 CSV의 105건만 보관한다. 기존 서비스·운영 테이블을 건드리지 않고, 재시작 시 기존 임베딩을 재사용한다. 이 런처에는 운영 인증이 없으므로 루프백에서만 사용한다.

3. 이 홈페이지 루트의 `.env.local`:

```dotenv
HYBRID_SEARCH_BASE_URL=http://127.0.0.1:8091/onz
```

4. `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort` 후 `http://127.0.0.1:5173/recommend/` 접속.

서버 환경변수라 브라우저에 백엔드 설정이나 인증정보가 노출되지 않는다. 같은 출처의 Vite 서버를 경유하므로 CORS 변경도 필요 없다. `npm run preview`에서도 같은 어댑터를 사용한다.

## 확인

- 여섯 답변 선택 → 결과 5개와 원본 맛/향 태그, 도수 범위, 재료, 이야기 표시.
- 개발자 도구 Network의 `/api/recommendations` 응답이 `mode: "hybrid"`, `degraded: false`인지 확인.
- 임베딩 장애 시 `mode: "keyword"`, `degraded: true`이며 화면에 키워드 기준으로 찾았다는 안내 표시.
- API 중단 시 재시도 오류 화면; 빈 결과는 빈 결과 안내. 다른 추천 엔진으로 조용히 전환하지 않음.
- `npm test`, `npm run build`, `npm run lint`.

새 추천 경로는 이전 JSON의 수치화된 단맛/친숙도 속성을 재사용하지 않는다. 취향은 원본 프로필의 의미 검색에 대한 선호이며 모두 일치한다고 보장하지 않는다. `BARELY`는 기존 추천의 안전 상한 24%를 원본 `abv_max`에 적용하되, 낮은 도수·무알코올을 보장하지 않는다. RRF 점수는 백분율로 표시하지 않는다. 실제 원문에 없는 이야기는 생성하지 않으며, 이야기만 기존 홈페이지의 동일 ID·동일 이름 레코드에서 가져온다.
