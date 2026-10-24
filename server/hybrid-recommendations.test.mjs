import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hybridQuery, hybridRecommendations } from './hybrid-recommendations.ts';
import { cocktails } from '../recommendation/data.ts';
import handler from './recommendations.ts';
const answers = { taste: 'SOUR', aroma: 'HERBAL', alcohol: 'BARELY', texture: 'FIZZY', occasion: 'REFRESH', adventure: '2' };
const item = { cocktailId: 15, nameKo: '모히또', nameEn: 'Mojito', base_raw: '럼', image_url: 'http://onz-cocktail.kr/uploads/cocktails/onz_cocktail_Mojito.webp', ingredients_raw: '화이트 럼, 라임 주스, 민트', abv_min: 10, abv_max: 12, taste_tags: ['민트', '라임', '상큼'], aroma_tags: [], matchReasons: ['재료_원문: 민트'] };
const response = (items = [item], extras = {}) => new Response(JSON.stringify({ code: 1, data: { items, mode: 'hybrid', degraded: false, ...extras } }), { headers: { 'Content-Type': 'application/json' } });
test('six answers become preferences; BARELY uses upper ABV; real rank/range/source facts survive', async () => {
  const result = await hybridRecommendations(answers, cocktails, 'http://127.0.0.1:8091/onz', async (url, options) => {
    const target = new URL(url);
    assert.equal(target.pathname, '/onz/api/v2/cocktails/search/hybrid');
    assert.equal(target.searchParams.get('abvMax'), '24');
    assert.equal(target.searchParams.get('requiredIngredients'), null);
    assert.match(target.searchParams.get('query'), /상큼.*허브향.*탄산/);
    assert.equal(options.redirect, 'error');
    return response();
  });
  assert.equal(result.mode, 'hybrid');
  assert.equal(result.data[0].cocktail.id, 15);
  assert.equal(result.data[0].cocktail.abvLabel, '10–12');
  assert.equal(result.data[0].cocktail.imageUrl, 'https://raw.githubusercontent.com/rlaaudgjs2/onz-cocktail-images/main/cocktail_image_file/old/onz_cocktail_Mojito.webp');
  assert.equal(result.data[0].cocktail.imageFallbackUrl, 'https://onz-cocktail-images.s3.ap-northeast-2.amazonaws.com/cocktails/onz_cocktail_Mojito.png');
  assert.equal(result.data[0].cocktail.originText, cocktails.find(c => c.id === 15).originText);
  assert.equal(result.data[0].score, undefined);
  assert.deepEqual(result.data[0].reasons, ['맛: 민트','맛: 라임','맛: 상큼']);
  assert.equal(hybridQuery({ taste:'UNKNOWN',aroma:'UNKNOWN',alcohol:'UNKNOWN',texture:'UNKNOWN',occasion:'UNKNOWN',adventure:'1' }), '편안한 익숙한 칵테일');
});
test('empty stays empty; fallback is visible; malformed/upstream errors never become old CSV results', async () => {
  assert.deepEqual((await hybridRecommendations(answers,cocktails,'http://localhost', async () => response([]))).data, []);
  const degraded=await hybridRecommendations(answers,cocktails,'http://localhost', async () => response([item],{mode:'keyword',degraded:true}));
  assert.equal(degraded.degraded,true); assert.match(degraded.notice,/키워드/);
  await assert.rejects(hybridRecommendations(answers,cocktails,'http://localhost',async()=>new Response('',{status:503})));
  await assert.rejects(hybridRecommendations(answers,cocktails,'http://localhost',async()=>response([{...item,abv_max:'unknown'}])));
});
test('actual homepage handler selects configured backend and keeps validation', async () => {
  const previous=globalThis.fetch;
  globalThis.fetch=async()=>response();
  try {
    let code,body;
    const res={writeHead(status){code=status;},end(text){body=JSON.parse(text);}};
    await handler({method:'GET',url:'/api/recommendations?'+new URLSearchParams(answers)},res,{HYBRID_SEARCH_BASE_URL:'http://localhost:8091/onz'});
    assert.equal(code,200);assert.equal(body.mode,'hybrid');assert.equal(body.data[0].cocktail.id,15);
    await handler({method:'GET',url:'/api/recommendations?taste=SOUR'},res,{HYBRID_SEARCH_BASE_URL:'http://localhost:8091/onz'});
    assert.equal(code,400);
  } finally {globalThis.fetch=previous;}
});
