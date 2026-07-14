export type ImageKey =
  | 'remember-the-maine'
  | 'tipperary'
  | 'tuxedo'
  | 'naked-and-famous'
  | 'paradise'
  | 'mai-tai'
  | 'kir'
  | 'pisco-sour'

// 지금은 정적 CDN URL 맵입니다. 나중에 이미지 API가 생기면 이 맵 대신
// 이 함수 내부만 fetch(`/api/cocktails/${key}/image`) 등으로 바꾸면 됩니다.
// 화면 쪽 컴포넌트는 getCocktailImageUrl(key)만 알면 되므로 수정할 필요가 없습니다.
const IMAGE_URLS: Record<ImageKey, string> = {
  'remember-the-maine': 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Remember_the_Maine.webp',
  tipperary: 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Tipperary.webp',
  tuxedo: 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Tuxedo.webp',
  'naked-and-famous': 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Naked_and_Famous.webp',
  paradise: 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Paradise.webp',
  'mai-tai': 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Mai_Tai.webp',
  kir: 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Kir.webp',
  'pisco-sour': 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Pisco_Sour.webp',
}

export function getCocktailImageUrl(key: ImageKey): string {
  return IMAGE_URLS[key]
}
