import type { Article, ArticleSummary, HomeSection, PopularItem } from '../types/article'

// 상세 아티클이 실제로 존재하는 글. 다른 카드들은 아직 상세 페이지가 없어 링크되지 않습니다.
export const articles: Article[] = [
  {
    slug: 'remember-the-maine-and-tipperary',
    category: '스토리 · 클래식',
    title: '전쟁이 이름을 준 위스키 클래식 두 잔',
    meta: '읽는 데 6분',
    imageKey: 'remember-the-maine',
    dek: '바에서 \'리멤버 더 메인\'을 시키는 사람은 있어도, 이 이름이 전쟁에서 왔다는 걸 아는 사람은 드물어요. 알고 마시면 사연이 꽤 무거운 두 잔의 이야기.',
    author: 'onz 에디터',
    heroCaption: '리멤버 더 메인 — 라이 위스키에 체리와 압생트를 더한 클래식',
    content: [
      { type: 'paragraph', text: '\'리멤버 더 메인\'. 바에서 이 칵테일을 시키는 사람은 가끔 있어도 이름의 출처를 아는 사람은 드물어요. 1898년 2월, 쿠바 아바나 항에 정박해 있던 미국 군함 메인호가 폭발합니다. 승조원 266명이 그 자리에서 죽었어요. 원인은 끝내 밝혀지지 않았는데, 당시 미국 신문들이 먼저 움직였죠. 허스트와 퓰리처의 신문이 판매 부수 경쟁을 벌이던 시절이었고, 두 신문은 증거도 없이 스페인을 범인으로 몰았습니다. "메인호를 기억하라, 스페인에 지옥을." 이 구호가 신문을 팔았고 여론을 끓게 했고, 결국 미국-스페인 전쟁으로 이어졌어요.' },
      { type: 'paragraph', text: '반전은 한참 뒤에 옵니다. 1974년 미 해군이 다시 조사했더니 폭발이 배 안에서 시작됐다는 결론이 나왔어요. 석탄고에 붙은 불이 옆 탄약고를 건드린 사고였을 가능성이 크다는 거죠. 스페인은 처음부터 관계가 없었을지도 모릅니다. 확인되지 않은 기사 한 줄이 전쟁을 만든 셈이에요. 칵테일 이름은 바로 그 구호에서 왔습니다.' },
      { type: 'paragraph', text: '무거운 사연이죠. 그런데 오늘 같이 볼 또 한 잔도 전쟁에서 이름을 받았어요. 게다가 둘은 뜯어보면 같은 뼈대를 공유합니다. 단맛 칵테일이 좀 물렸다면 넘어가기 딱 좋은 조합이고요.' },
      { type: 'heading', text: '포탄 소리에 끊긴 잔, 리멤버 더 메인' },
      { type: 'paragraph', text: '정작 이 칵테일이 기록된 건 1898년이 아니에요. 1939년, 찰스 베이커라는 미국 작가의 책 『신사의 동반자(The Gentleman\'s Companion)』에 처음 등장합니다. 베이커는 좀 특이한 인물이었어요. 세계를 떠돌며 각 도시의 술과 음식을 수집해 기록한 사람이거든요. 요즘으로 치면 원조 미식 여행 작가에 가까워요.' },
      { type: 'paragraph', text: '그가 이 칵테일을 만난 건 1933년 쿠바였어요. 하필 또 혁명의 한복판이었죠. 베이커는 그날 밤을 이렇게 적었습니다.' },
      { type: 'quote', text: '프라도 거리에 폭탄이 터지고 호텔 나시오날로 포탄이 날아들던 밤. 한 모금 한 모금이 그 소리에 끊겼다.', cite: '찰스 베이커, 『신사의 동반자』(1939)' },
      { type: 'paragraph', text: '술 한 잔에 이런 문장을 남기다니 좀 멋있지 않나요. 그는 이 칵테일을 꼭 시계방향으로 저으라고 고집했어요. 그래야 \'항해를 견딘다\'면서요. 근거는 없지만 이름에 어울리는 미신이죠.' },
      { type: 'paragraph', text: '맛은 맨해튼을 떠올리면 가까워요. 라이 위스키에 스위트 베르무트가 들어가는 맨해튼, 여기에 체리 리큐어와 압생트를 더한 게 리멤버 더 메인입니다. 압생트 몇 방울이 향을 확 끌어올리고 체리 리큐어가 뒤에서 단맛을 잡아줘요. 그래서 맨해튼보다 한 단계 더 스파이시하고 복잡합니다. 도수는 32도쯤. 얼음에 젓기만 하고 흔들지 않아요. 향과 질감이 흐트러지니까요. 묵직하니 천천히 마시는 편이 좋습니다.' },
      { type: 'spec', spec: { nameKo: '리멤버 더 메인', nameEn: 'Remember the Maine', imageKey: 'remember-the-maine', base: '라이 위스키', abv: '약 32%', style: '스터드·스피릿', keyLiqueur: '체리·압생트' } },
      { type: 'heading', text: '5실링 내기에서 태어난 노래, 티퍼러리' },
      { type: 'paragraph', text: '전쟁에서 이름을 받은 클래식이 메인호만 있는 건 아니에요. 티퍼러리도 그렇습니다. 이름은 1차 세계대전 때 병사들이 행진하며 부르던 노래 \'It\'s a Long Way to Tipperary\'에서 왔어요. 그런데 이 노래부터가 사연이 있습니다. 1912년, 잭 저지라는 가수가 술자리에서 "하룻밤이면 새 노래 하나 뚝딱 만든다"며 5실링 내기를 걸었대요. 그리고 다음 날 진짜로 이 곡을 불렀죠. 그게 몇 년 뒤 전쟁터에서 가장 많이 불린 노래가 됩니다. 내기로 지은 노래가 한 세대의 군가가 된 거예요.' },
      { type: 'paragraph', text: '칵테일은 1916년 뉴욕에서 태어났어요. 호텔 월릭 바의 바텐더 휴고 엔슬린이 만들었습니다. 한 손님이 그 노래를 흥얼거리며 들어와 술을 청했고 엔슬린이 즉석에서 만들어 이름을 붙였다는 이야기예요. 엔슬린은 지금은 낯선 이름이지만, 그가 남긴 책 『Recipes for Mixed Drinks』(1916)는 금주법 직전 미국 칵테일을 담은 마지막 기록 중 하나예요. 훗날 유명한 사보이 칵테일북이 여기서 여러 레시피를 그대로 가져다 썼을 만큼 중요한 책이고요.' },
      { type: 'paragraph', text: '원래 레시피는 아이리시 위스키, 그린 샤르트뢰즈, 스위트 베르무트를 딱 1:1:1로 넣는 구성이었어요. 여기서 핵심은 샤르트뢰즈입니다. 프랑스 카르투지오 수도회 수도사들이 1737년부터 만들어온 초록색 리큐어인데 130가지 약초가 들어간다고 알려져 있어요. 레시피는 지금도 전 세계에서 단 두 명의 수도사만 안다고 하죠. 이 한 스푼이 칵테일의 향을 깊은 허브 쪽으로 확 끌고 갑니다. 도수는 28도쯤. 리멤버 더 메인보다 가볍고 향이 화사해요.' },
      { type: 'spec', spec: { nameKo: '티퍼러리', nameEn: 'Tipperary', imageKey: 'tipperary', base: '아이리시 위스키', abv: '약 28%', style: '스터드·허브', keyLiqueur: '그린 샤르트뢰즈' } },
      { type: 'heading', text: '결국 같은 술의 두 얼굴' },
      { type: 'paragraph', text: '두 칵테일을 나란히 놓으면 재밌는 게 보여요. 뼈대가 똑같습니다. 위스키에 스위트 베르무트. 갈리는 건 그 위에 뭘 한 스푼 얹느냐예요. 티퍼러리는 샤르트뢰즈로 허브 쪽으로 가고 리멤버 더 메인은 압생트와 체리로 스파이시한 쪽으로 갑니다. 같은 골격에 리큐어 하나 바꿨을 뿐인데 맛은 완전히 달라져요.' },
      { type: 'paragraph', text: '이게 클래식을 파고드는 제일 큰 재미라고 생각해요. 유명한 칵테일 상당수가 이렇게 \'공통 뼈대 + 한 끗\'으로 연결돼 있거든요. 맨해튼을 알면 이 두 잔이 쉽게 들어오고, 이 두 잔을 알면 또 다음 변주가 보여요. 집에 위스키와 스위트 베르무트가 있다면 샤르트뢰즈든 압생트든 하나만 더 들여서 번갈아 만들어보세요. 그 차이가 혀에 확 옵니다.' },
      { type: 'paragraph', text: '전쟁에서 이름을 받은 두 칵테일. 그런데 정작 마시는 자리는 늘 조용한 바 한구석이라는 게 묘하게 어울려요.' },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

const rememberTheMaine: ArticleSummary = articles[0]
const tuxedo: ArticleSummary = { category: '베이스 · 진', title: '드라이 마티니의 사촌, 턱시도', meta: '읽는 데 4분', imageKey: 'tuxedo' }
const nakedAndFamous: ArticleSummary = { category: '모던 클래식', title: '라스트 워드에서 갈라져 나온 한 잔', meta: '읽는 데 5분', imageKey: 'naked-and-famous' }
const paradise: ArticleSummary = { category: '계절 · 봄', title: '봄밤에 어울리는 진 클래식, 파라다이스', meta: '읽는 데 3분', imageKey: 'paradise' }
const maiTai: ArticleSummary = { category: '휴양지', title: '휴양지가 그리울 땐 마이타이 한 잔', meta: '읽는 데 4분', imageKey: 'mai-tai' }
const kir: ArticleSummary = { category: '가벼운 식전', title: '가볍게 시작하는 프랑스식 식전주, 키르', meta: '읽는 데 3분', imageKey: 'kir' }
const piscoSour: ArticleSummary = { category: '기분 전환', title: '새콤함이 필요할 땐 피스코 사워', meta: '읽는 데 4분', imageKey: 'pisco-sour' }

export const homeSections: HomeSection[] = [
  {
    id: 'mood',
    title: '오늘 뭐 마실지 고민된다면',
    subtitle: '기분과 상황에 맞는 한 잔',
    moreHref: '#',
    items: [maiTai, nakedAndFamous, tuxedo, kir, piscoSour],
  },
  {
    id: 'story',
    title: '한 잔에 담긴 이야기',
    subtitle: '알고 마시면 더 깊어지는 뒷이야기',
    moreHref: '#',
    items: [rememberTheMaine, { ...rememberTheMaine, slug: undefined, category: '클래식', title: '5실링 내기에서 태어난 노래, 티퍼러리', meta: '읽는 데 4분', imageKey: 'tipperary' }, nakedAndFamous, paradise],
  },
  {
    id: 'base',
    title: '베이스로 파고들기',
    subtitle: '진·위스키·럼, 한 병을 제대로',
    moreHref: '#',
    items: [tuxedo, { ...rememberTheMaine, slug: undefined, category: '위스키', title: '맨해튼에서 한 걸음 더, 리멤버 더 메인' }, maiTai, piscoSour],
  },
  {
    id: 'season',
    title: '계절 한 잔',
    subtitle: '계절이 바뀌면 마시는 것도',
    moreHref: '#',
    items: [paradise, { ...maiTai, category: '여름', title: '더위엔 시원한 티키, 마이타이' }, { ...rememberTheMaine, slug: undefined, category: '가을·겨울', title: '쌀쌀해지면 묵직한 위스키 한 잔' }, { ...kir, category: '사계절', title: '언제 마셔도 좋은 식전주, 키르' }],
  },
]

export const relatedArticles: ArticleSummary[] = [tuxedo, nakedAndFamous, paradise]

export const popularItems: PopularItem[] = [
  { rank: 1, title: '전쟁이 이름을 준 위스키 클래식 두 잔', category: '스토리' },
  { rank: 2, title: '드라이 마티니의 사촌, 턱시도', category: '베이스' },
  { rank: 3, title: '휴양지가 그리울 땐 마이타이 한 잔', category: '무드' },
  { rank: 4, title: '하루를 닫는 한 잔, 네이키드 앤 페이머스', category: '무드' },
  { rank: 5, title: '5실링 내기에서 태어난 노래, 티퍼러리', category: '스토리' },
  { rank: 6, title: '봄밤에 어울리는 진 클래식, 파라다이스', category: '계절' },
]
