import type { Answers, Question } from './types.ts';
export const questions: readonly Question[] = [
  { key: 'taste', label: '맛', title: '오늘은 어떤 맛이 끌리세요?', options: [
    ['SWEET', '달콤하게'], ['SOUR', '새콤상큼하게'], ['BITTER', '쌉싸름하게'], ['BALANCED', '달콤하고 새콤하게'], ['UNKNOWN', '잘 모르겠어요'],
  ] },
  { key: 'aroma', label: '향', title: '어떤 향이 끌리세요?', options: [
    ['CITRUS', '상큼한 과일', '레몬 · 라임 · 오렌지'], ['FRUIT', '달콤한 과일', '열대과일 · 복숭아 · 사과'], ['BERRY', '베리류'],
    ['HERBAL', '허브 & 상쾌함', '허브 · 민트'], ['COFFEE', '커피 & 초콜릿'], ['CREAMY', '부드럽고 고소함'],
    ['DEEP', '깊고 묵직한 향', '오크 · 캐러멜 · 향신료'], ['UNKNOWN', '잘 모르겠어요'],
  ] },
  { key: 'alcohol', label: '술맛', title: '술맛은 어느 정도가 좋아요?', options: [
    ['BARELY', '거의 안 느껴지는 게 좋아요', '무알코올만을 뜻하지는 않아요'], ['MILD', '살짝 느껴지는 정도'],
    ['MEDIUM', '적당히 느껴지는 게 좋아요'], ['STRONG', '술맛이 확실한 게 좋아요'], ['UNKNOWN', '잘 모르겠어요'],
  ] },
  { key: 'texture', label: '느낌', title: '어떤 느낌으로 마시고 싶나요?', options: [
    ['FIZZY', '톡톡 터지는 청량함'], ['LIGHT', '가볍고 산뜻함'], ['BALANCED', '균형 잡힌 느낌'], ['RICH', '묵직하고 진한 느낌'], ['UNKNOWN', '잘 모르겠어요'],
  ] },
  { key: 'occasion', label: '순간', title: '어떤 순간에 마실 예정인가요?', options: [
    ['PARTY', '친구들과 즐길 때'], ['MEAL', '음식과 함께'], ['DESSERT', '디저트처럼'], ['SLOW', '천천히 한 잔'],
    ['REFRESH', '시원하게 기분전환'], ['APERITIF', '식사 전에'], ['BRUNCH', '브런치와 함께'], ['UNKNOWN', '아직 정하지 않았어요'],
  ] },
  { key: 'adventure', label: '새로운 맛', title: '새로운 맛에 얼마나 도전해보고 싶나요?', options: [
    ['1', '누구나 편하게 마실 맛'], ['2', '부담 없지만 조금 새로운 맛'], ['3', '조금 특별해도 괜찮음'], ['4', '색다른 칵테일도 좋음'], ['5', '개성 강한 맛도 좋음'],
  ] },
];
export function validateAnswers(value: unknown): value is Answers {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return Object.keys(record).length === questions.length && questions.every(q =>
    Object.hasOwn(record, q.key) && q.options.some(([code]) => code === record[q.key]));
}
export function toRequest(value: unknown): URLSearchParams {
  if (!validateAnswers(value)) throw new Error('여섯 가지 질문에 모두 답해주세요.');
  return new URLSearchParams(questions.map(q => [q.key, value[q.key]] as [string, string]));
}
