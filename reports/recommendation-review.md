# 추천 UI 코드 검수

기준: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

범위: recommend/index.html, app.js, style.css. 정적 코드 검수이며 브라우저/실기기 시각 검증은 수행하지 못했습니다.

## 1차

- 🔴 Critical: 발견 없음.
- 🟡 Warning — `recommend/app.js:115`: 맛·향 UNKNOWN에도 ‘선택한 맛과 향’으로 설명. ‘답변을 바탕으로’로 수정.
- 🟢 Suggestion — `recommend/index.html:10`: 폰트 preload 고려. 현재 font-display: swap 적용.
- 🟢 Suggestion — `recommend/app.js:63`: ‘다음’ 버튼에 다음 단계명 추가 고려.
- 🟢 Suggestion — `recommend/app.js:3`: 새로고침 후 진행 복원은 미구현. 향후 필요하면 세션 상태 보존 검토.

## 수정 후 재검수

- 🔴 Critical: 발견 없음.
- 🟡 Warning: 위 문구 수정 완료, 새 경고 발견 없음.
- 🟢 Suggestion: 위 3개 유지, 수정하지 않음.

이미지 대체 텍스트/크기·하단 사진 lazy loading, h1/h2/h3 위계, label+radio, 키보드 포커스, skip link, reduced motion, 로딩 status/오류 alert, WebView safe-area 및 native details 키보드 동작을 코드에서 확인했습니다. 선택 전 다음 버튼 비활성화와 짧은 전환 중 재입력 방지는 기존 단계형 설문 동작을 유지한 것입니다. 전체 가이드라인을 모든 경우에 자동 보장한다는 의미는 아닙니다.
