import { questions, toRequest } from '../recommendation/questions.ts';
import { readRecommendationResponse } from './response.js';
import loadingVideoUrl from '../src/video/recommend.mp4?url';
const app = document.querySelector('#app');
const themeToggle = document.querySelector('#theme-toggle');
themeToggle.onclick = () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  themeToggle.textContent = next === 'dark' ? '라이트' : '다크';
  themeToggle.setAttribute('aria-label', `${next === 'dark' ? '라이트' : '다크'} 모드로 전환`);
  themeToggle.title = `${next === 'dark' ? '라이트' : '다크'} 모드로 전환`;
  document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#0d0812' : '#ffffff';
  try { localStorage.setItem('onz-theme', next); } catch { /* Theme still applies for this page. */ }
};
let step = 0;
let answers = {};
let busy = false;
let transitioning = false;
let selectedAt = 0;
const navBack = document.querySelector('#nav-back');
const embedded = !!window.ReactNativeWebView;
document.documentElement.classList.toggle('embedded', embedded);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function setupLoadingVideo() {
  const video = app.querySelector('.pour-video');
  const film = app.querySelector('.loading-film');
  const toggle = app.querySelector('.video-toggle');
  if (!video || !film || !toggle) return () => {};
  let playing = !reducedMotion.matches;
  const syncToggle = () => {
    film.classList.toggle('paused', !playing);
    toggle.textContent = playing ? '일시 정지' : '재생';
    toggle.setAttribute('aria-label', playing ? '영상 일시 정지' : '영상 재생');
    toggle.setAttribute('aria-pressed', String(playing));
  };
  const togglePlayback = async () => {
    if (video.paused) {
      try { await video.play(); } catch { playing = false; syncToggle(); }
    } else {
      video.pause();
    }
  };
  const updateMotionPreference = () => {
    if (reducedMotion.matches) {
      video.pause();
      film.classList.add('still-mode');
      toggle.hidden = true;
    } else {
      film.classList.remove('still-mode');
      toggle.hidden = false;
    }
  };
  const handleError = () => {
    film.classList.add('still-mode');
    video.hidden = true;
    toggle.hidden = true;
    playing = false;
    syncToggle();
  };
  const handlePlay = () => { playing = true; syncToggle(); };
  const handlePause = () => { playing = false; syncToggle(); };
  toggle.addEventListener('click', togglePlayback);
  video.addEventListener('playing', handlePlay);
  video.addEventListener('pause', handlePause);
  video.addEventListener('error', handleError);
  reducedMotion.addEventListener('change', updateMotionPreference);
  updateMotionPreference();
  syncToggle();
  return () => {
    toggle.removeEventListener('click', togglePlayback);
    video.removeEventListener('playing', handlePlay);
    video.removeEventListener('pause', handlePause);
    video.removeEventListener('error', handleError);
    reducedMotion.removeEventListener('change', updateMotionPreference);
    video.pause();
  };
}
function waitForLoadingVideo(video) {
  if (!video || reducedMotion.matches) return Promise.resolve();
  return new Promise(resolve => {
    const finish = () => {
      video.removeEventListener('ended', finish);
      video.removeEventListener('error', finish);
      reducedMotion.removeEventListener('change', onMotionChange);
      resolve();
    };
    const onMotionChange = () => { if (reducedMotion.matches) finish(); };
    if (video.ended || video.error) return finish();
    video.addEventListener('ended', finish, { once: true });
    video.addEventListener('error', finish, { once: true });
    reducedMotion.addEventListener('change', onMotionChange);
  });
}
// The result and error screens keep `step` on the last question, so back returns to it.
function stepBackTarget() {
  if (!app.querySelector('.question-form')) return step;
  return step > 0 ? step - 1 : -1;
}
function updateNavigation() {
  navBack.disabled = busy || transitioning;
  const label = stepBackTarget() >= 0 ? '이전 질문' : embedded ? '앱으로 돌아가기' : '홈으로 이동';
  navBack.setAttribute('aria-label', label);
  navBack.title = label;
}
function updateProgress() {
  document.querySelector('#progress-region').hidden = false;
  document.querySelector('#step-label').textContent = `취향 찾기 · ${questions[step].label}`;
  document.querySelector('#step-count').textContent = `${step + 1} / ${questions.length}`;
  document.querySelector('#progress').setAttribute('aria-valuenow', step + 1);
  document.querySelector('#progress').setAttribute('aria-valuemax', questions.length);
  document.querySelector('#progress').setAttribute('aria-valuetext', `${questions.length}개 질문 중 ${step + 1}번째, ${questions[step].label}`);
  document.querySelector('#progress-fill').style.transform = `scaleX(${(step + 1) / questions.length})`;
}
async function animateBody(element, entering, direction) {
  if (!element || reducedMotion.matches || typeof element.animate !== 'function') return;
  const frames = entering
    ? [{ opacity: 0, transform: `translateY(${direction * 22}px)` }, { opacity: 1, transform: 'translateY(0)' }]
    : [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: `translateY(${-direction * 16}px)` }];
  const animation = element.animate(frames, {
    duration: entering ? 220 : 120, easing: entering ? 'cubic-bezier(.22,1,.36,1)' : 'cubic-bezier(.4,0,1,1)', fill: 'forwards',
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
function focusTitle() { app.querySelector('h1')?.focus({ preventScroll: true }); }
function render(moveFocus = false) {
  const q = questions[step];
  app.innerHTML = `<form class="question-form"><div class="question-body"><div class="question-intro"><div class="glass-mark" aria-hidden="true"><svg viewBox="0 0 36 48"><path class="glass-bowl" d="M5 7h26L18 23 5 7Z"/><path class="glass-stem" d="M18 23v16m-8 0h16"/><path class="glass-glint" d="m11 10 5 6"/></svg><i></i></div><p class="eyebrow">취향을 고르는 시간</p><h1 tabindex="-1">${q.title}</h1><p class="hint">가장 끌리는 한 가지를 선택해주세요.</p></div><fieldset><legend class="sr-only">${q.title}</legend><div class="options">${q.options.map(([code, label, desc], index) => `<label class="option ${answers[q.key] === code ? 'selected' : ''}" style="--option-index:${index}"><input type="radio" name="answer" value="${code}" ${answers[q.key] === code ? 'checked' : ''}><span class="option-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span class="option-copy">${label}${desc ? `<small>${desc}</small>` : ''}</span><span class="check" aria-hidden="true"></span></label>`).join('')}</div></fieldset></div><div class="actions"><button class="primary" type="submit" ${answers[q.key] ? '' : 'disabled'}><span>${step === questions.length - 1 ? '나의 칵테일 찾기' : '다음'}</span><span class="button-arrow" aria-hidden="true">→</span></button></div></form>`;
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
function resultCard(result) {
  const d = result.cocktail;
  let photo = '';
  try {
    const url = new URL(d.imageUrl);
    if (url.protocol === 'https:') photo = `<img class="result-image" width="800" height="600" src="${escape(url.href)}" alt="${escape(d.korName)} 칵테일" ${result.rank === 1 ? 'fetchpriority="high"' : 'loading="lazy"'} referrerpolicy="no-referrer">`;
  } catch { /* An unavailable image gets an honest text state below. */ }
  return `<article class="recommendation-card"><div class="result-photo">${photo}<p class="image-unavailable" ${photo ? 'hidden' : ''}>${escape(d.korName)} 사진을 불러올 수 없어요.</p></div><div class="recommendation-info"><p class="eyebrow">${result.rank === 1 ? '가장 가까운 취향' : '함께 살펴볼 한 잔'} · ${result.rank}</p><h2>${escape(d.korName)}</h2><p class="english">${escape(d.engName)}</p><p class="detail">${escape(d.base)} · 도수 ${escape(d.features.v2_abv)}%</p><ul class="reasons">${result.reasons.map(reason => `<li>${escape(reason)}</li>`).join('')}</ul><details><summary>재료와 이야기</summary><h3>재료</h3><p class="description">${escape(d.ingredients)}</p><h3>이야기</h3><p class="description">${escape(d.originText)}</p></details></div></article>`;
}
async function submit() {
  if (busy) return;
  busy = true;
  document.body.classList.add('loading-screen');
  let cleanupLoadingVideo = () => {};
  updateNavigation();
  document.querySelector('#progress-region').hidden = true;
  app.innerHTML = '<div class="message" role="status" aria-live="polite"><div class="loading-film">' +
    '<svg class="film-still" viewBox="0 0 180 360" aria-hidden="true"><path d="M42 68h96L90 139 42 68Z M90 139v118m-42 0h84" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M59 80h62" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".45"/><circle cx="126" cy="54" r="3" fill="currentColor"/></svg>' +
    '<video class="pour-video" ' + (reducedMotion.matches ? '' : 'autoplay') + ' muted playsinline preload="' + (reducedMotion.matches ? 'none' : 'auto') + '" aria-hidden="true"><source src="' + escape(loadingVideoUrl) + '" type="video/mp4"></video>' +
    '<div class="film-shade" aria-hidden="true"></div>' +
    '<button class="video-toggle" type="button" aria-label="영상 일시 정지" aria-pressed="true" ' + (reducedMotion.matches ? 'hidden' : '') + '>일시 정지</button>' +
    '<div class="film-copy"><p class="film-eyebrow" translate="no">ONZ · RECOMMENDATION</p><h1 tabindex="-1">취향에 맞는 한 잔을 찾고 있어요…</h1><p>선택한 취향을 칵테일에 담고 있어요.</p><span class="film-progress" aria-hidden="true"></span></div>' +
    '</div></div>';
  cleanupLoadingVideo = setupLoadingVideo();
  const loadingPlaybackDone = waitForLoadingVideo(app.querySelector('.pour-video'));
  focusTitle();
  try {
    const response = await fetch(`/api/recommendations?${toRequest(answers)}`, { signal: AbortSignal.timeout(15000) });
    const body = await readRecommendationResponse(response);
    if (!Array.isArray(body.data) || !body.data.length) throw new Error('추천 결과가 없습니다. 답변을 바꿔 다시 시도해주세요.');
    await loadingPlaybackDone;
    const chips = questions.map(q => `<span>${escape(q.options.find(([code]) => code === answers[q.key])[1])}</span>`).join('');
    app.innerHTML = `<p class="eyebrow">나를 위한 한 잔</p><h1 tabindex="-1">취향에 가까운 칵테일 ${body.data.length}잔</h1><p class="hint">답변을 바탕으로, 서로 다른 매력의 칵테일을 골랐어요.</p><div class="recommendation-list">${body.data.map(resultCard).join('')}</div><h2>내가 고른 취향</h2><div class="chips">${chips}</div><div class="actions"><button id="edit" class="back">취향 수정</button><button id="restart" class="primary">처음부터 다시</button></div>`;
    app.querySelectorAll('.result-image').forEach(img => {
      img.addEventListener('error', () => {
        // Never replace a missing cocktail photo with a different cocktail.
        img.hidden = true;
        img.nextElementSibling.hidden = false;
      });
    });
    layoutResult(); resultActions(); focusTitle();
  } catch (error) {
    await loadingPlaybackDone;
    app.innerHTML = `<div role="alert"><p class="eyebrow">잠시만요</p><h1 tabindex="-1">추천을 가져오지 못했어요</h1><p class="description">${escape(error.name === 'TimeoutError' ? '응답 시간이 초과됐어요. 다시 시도해주세요.' : error.message)}</p><div class="actions"><button class="back">답변 수정</button><button class="primary">다시 시도</button></div></div>`;
    layoutResult();
    app.querySelector('.back').onclick = () => changeStep(step);
    app.querySelector('.primary').onclick = submit;
    focusTitle();
  } finally { cleanupLoadingVideo(); document.body.classList.remove('loading-screen'); busy = false; updateNavigation(); }
}
render();
function goBack() {
  if (transitioning || busy) return;
  const target = stepBackTarget();
  // Leaving is only for the first question; elsewhere back keeps the answers already given.
  if (target >= 0) return void changeStep(target);
  if (embedded) window.ReactNativeWebView.postMessage('onz:close');
  else window.location.assign('/');
}
navBack.onclick = goBack;
if (embedded) {
  document.querySelector('.brand').addEventListener('click', event => {
    event.preventDefault();
    window.ReactNativeWebView.postMessage('onz:close');
  });
  window.addEventListener('onz:native-back', goBack);
}
