import { questions, toRequest } from './questions.js';
const app = document.querySelector('#app');
let step = 0;
let answers = {};
let busy = false;
let transitioning = false;
let selectedAt = 0;
const navBack = document.querySelector('#nav-back');
const embedded = !!window.ReactNativeWebView;
document.documentElement.classList.toggle('embedded', embedded);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function updateNavigation() {
  navBack.disabled = busy || transitioning || (!embedded && step === 0 && !!app.querySelector('form'));
  navBack.setAttribute('aria-label', app.querySelector('form') && step > 0 ? '이전 질문' : embedded ? '앱으로 돌아가기' : '답변 수정');
}
function updateProgress() {
  document.querySelector('#progress-region').hidden = false;
  document.querySelector('#step-label').textContent = `취향 찾기 · ${questions[step].label}`;
  document.querySelector('#step-count').textContent = `${step + 1} / ${questions.length}`;
  document.querySelector('#progress').setAttribute('aria-valuenow', step + 1);
  document.querySelector('#progress').setAttribute('aria-valuetext', `${questions.length}개 질문 중 ${step + 1}번째, ${questions[step].label}`);
  document.querySelector('#progress-fill').style.transform = `scaleX(${(step + 1) / questions.length})`;
}
async function animateBody(element, entering, direction) {
  if (!element || reducedMotion.matches || typeof element.animate !== 'function') return;
  const frames = entering
    ? [{ opacity: 0, transform: `translateY(${direction * 22}px)` }, { opacity: 1, transform: 'translateY(0)' }]
    : [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: `translateY(${-direction * 16}px)` }];
  const animation = element.animate(frames, {
    duration: entering ? 220 : 120, easing: entering ? 'cubic-bezier(.22,1,.36,1)' : 'ease-in', fill: 'forwards',
  });
  try { await animation.finished; } catch (error) { if (error.name !== 'AbortError') throw error; }
  finally { animation.cancel(); }
}
async function changeStep(nextStep, reset = false, send = false) {
  if (transitioning || busy || nextStep < 0 || nextStep >= questions.length) return;
  transitioning = true;
  const direction = nextStep < step || reset ? -1 : 1;
  app.inert = true;
  updateNavigation();
  try {
    // A quick confirmation still lets the user see their selected answer first.
    const feedbackRemaining = reducedMotion.matches ? 0 : 180 - (performance.now() - selectedAt);
    if (feedbackRemaining > 0) await new Promise(resolve => setTimeout(resolve, feedbackRemaining));
    await animateBody(app.querySelector('.question-body, .result-body'), false, direction);
    if (send) { submit(); return; }
    if (reset) answers = {};
    step = nextStep;
    render();
    await animateBody(app.querySelector('.question-body'), true, direction);
  } finally {
    app.inert = false;
    transitioning = false;
    updateNavigation();
    focusTitle();
  }
}
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function focusTitle() { app.querySelector('h2')?.focus({ preventScroll: true }); }
function render(moveFocus = false) {
  const q = questions[step];
  app.innerHTML = `<form class="question-form"><div class="question-body"><h2 tabindex="-1">${q.title}</h2><p class="hint">가장 끌리는 한 가지를 선택해주세요.</p><fieldset><legend class="sr-only">${q.title}</legend><div class="options">${q.options.map(([code, label, icon, desc]) => `<label class="option ${answers[q.key] === code ? 'selected' : ''}"><input type="radio" name="answer" value="${code}" ${answers[q.key] === code ? 'checked' : ''}><img src="/recommend-assets/${icon}" alt=""><span>${label}${desc ? `<small>${desc}</small>` : ''}</span><span class="check" aria-hidden="true"></span></label>`).join('')}</div></fieldset></div><div class="actions"><button class="primary" type="submit" ${answers[q.key] ? '' : 'disabled'}>${step === questions.length - 1 ? '나의 칵테일 찾기' : '다음'}</button></div></form>`;
  app.querySelector('form').onchange = event => {
    if (transitioning || busy || !q.options.some(([code]) => code === event.target.value)) return;
    answers[q.key] = event.target.value;
    selectedAt = performance.now();
    app.querySelectorAll('.option').forEach(option => option.classList.toggle('selected', option.querySelector('input').checked));
    app.querySelector('.primary').disabled = false;
  };
  app.querySelector('form').onsubmit = event => {
    event.preventDefault();
    if (!answers[q.key] || transitioning || busy) return;
    if (step < questions.length - 1) changeStep(step + 1);
    else changeStep(step, false, true);
  };
  updateProgress();
  updateNavigation();
  if (moveFocus) focusTitle();
}
function resultActions() {
  app.querySelector('#restart').onclick = () => changeStep(0, true);
  app.querySelector('#edit').onclick = () => changeStep(0);
}
function layoutResult() {
  const actions = app.querySelector('.actions');
  const content = document.createElement('div');
  content.className = 'result-body';
  content.append(...app.childNodes);
  app.append(content);
  if (actions) app.append(actions);
}
async function submit() {
  if (busy) return;
  busy = true;
  updateNavigation();
  document.querySelector('#progress-region').hidden = true;
  app.innerHTML = '<div class="message" role="status"><div class="spinner"></div><h2 tabindex="-1">취향에 맞는 한 잔을 찾고 있어요</h2><p>잠시만 기다려주세요.</p></div>';
  focusTitle();
  try {
    const response = await fetch(`/api/recommendation?${toRequest(answers)}`, { signal: AbortSignal.timeout(15000) });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || '추천을 불러오지 못했어요.');
    const d = body.data;
    const chips = questions.map(q => `<span>${escape(q.options.find(([code]) => code === answers[q.key])[1])}</span>`).join('');
    let image = '';
    if (d) {
      try { const url = new URL(d.imageUrlDetail || d.imageUrl); if (['https:', 'http:'].includes(url.protocol)) image = `<img class="result-image" src="${escape(url.href)}" alt="${escape(d.korName)}" referrerpolicy="no-referrer">`; } catch {}
    }
    app.innerHTML = `<p class="eyebrow">${body.mode === 'demo' ? 'DEMO PREVIEW · 고정 예시' : 'YOUR COCKTAIL'}</p>${image}<h2 tabindex="-1">${d ? escape(d.korName) : '딱 맞는 칵테일을 찾지 못했어요'}</h2>${d ? `<p class="english">${escape(d.engName)}</p><p class="description">${escape(d.originText)}</p>${d.base ? `<p class="detail">베이스 · ${escape(d.base)}</p>` : ''}${Number.isFinite(d.minAlcohol) && Number.isFinite(d.maxAlcohol) ? `<p class="detail">도수 · ${escape(d.minAlcohol)}–${escape(d.maxAlcohol)}%</p>` : ''}${Array.isArray(d.ingredients) ? `<h3>재료</h3><p class="description">${d.ingredients.map(escape).join(' · ')}</p>` : ''}` : '<p class="description">취향을 조금 바꿔 다시 찾아보세요.</p>'}<h3>내가 고른 취향</h3><div class="chips">${chips}</div><div class="actions"><button id="edit" class="back">취향 수정</button><button id="restart" class="primary">처음부터 다시</button></div>`;
    const resultImage = app.querySelector('.result-image');
    if (resultImage) {
      const hero = document.createElement('div');
      hero.className = 'result-hero';
      const names = document.createElement('div');
      names.className = 'result-names';
      names.append(app.querySelector('h2'), app.querySelector('.english'));
      resultImage.before(hero);
      hero.append(resultImage, names);
      resultImage.addEventListener('error', () => {
        hero.classList.add('without-image');
        resultImage.remove();
      });
    }
    layoutResult(); resultActions(); focusTitle();
  } catch (error) {
    app.innerHTML = `<div role="alert"><p class="eyebrow">잠시만요</p><h2 tabindex="-1">추천을 가져오지 못했어요</h2><p class="description">${escape(error.name === 'TimeoutError' ? '응답 시간이 초과됐어요. 다시 시도해주세요.' : error.message)}</p><div class="actions"><button class="back">답변 수정</button><button class="primary">다시 시도</button></div></div>`;
    layoutResult();
    app.querySelector('.back').onclick = () => changeStep(step);
    app.querySelector('.primary').onclick = submit;
    focusTitle();
  } finally { busy = false; updateNavigation(); }
}
render();
function goBack() {
  if (transitioning || busy) return;
  if (app.querySelector('form') && step > 0) changeStep(step - 1);
  else if (embedded) window.ReactNativeWebView.postMessage('onz:close');
  else if (!app.querySelector('form')) changeStep(step);
}
navBack.onclick = goBack;
if (embedded) {
  document.querySelector('.brand').addEventListener('click', event => {
    event.preventDefault();
    window.ReactNativeWebView.postMessage('onz:close');
  });
  window.addEventListener('onz:native-back', goBack);
}
fetch('/api/config').then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(config => {
  const mode = document.querySelector('#mode');
  mode.hidden = config.mode !== 'demo';
  mode.textContent = config.mode === 'demo' ? '데모 모드 · 결과는 고정 예시입니다' : '';
}).catch(() => {
  const mode = document.querySelector('#mode');
  mode.hidden = false;
  mode.textContent = '연결 상태를 확인할 수 없습니다';
});
