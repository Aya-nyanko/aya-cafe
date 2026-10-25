const header = document.querySelector('.header');
const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#navigation');
toggle.hidden = false;
function closeNavigation(returnFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'メニューを開く');
  navigation.classList.remove('is-open');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeNavigation()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeNavigation(true); });
header.addEventListener('focusout', () => setTimeout(() => { if (!header.contains(document.activeElement)) closeNavigation(); }, 0));
document.addEventListener('click', event => { if (!header.contains(event.target)) closeNavigation(); });
const mobile = matchMedia('(max-width: 700px)');
function syncNav() { toggle.hidden = !mobile.matches; closeNavigation(); }
mobile.addEventListener('change', syncNav); syncNav();
const syncHeader = () => header.classList.toggle('scrolled', scrollY > 20);
window.addEventListener('scroll', syncHeader, { passive: true }); syncHeader();

const menuButtons = [...document.querySelectorAll('[data-menu]')];
const panels = [...document.querySelectorAll('[data-product]')];
document.querySelector('.menu-select').hidden = false;
function selectMenu(id) {
  menuButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.menu === id)));
  panels.forEach(panel => { panel.hidden = panel.dataset.product !== id; });
}
menuButtons.forEach(button => button.addEventListener('click', () => selectMenu(button.dataset.menu)));
selectMenu('coffee');

const form = document.querySelector('#drink-form');
form.querySelectorAll('[disabled]').forEach(control => { control.disabled = false; });
const bases = { coffee: {name:'コーヒー',title:'My Coffee'}, matcha:{name:'抹茶',title:'My Matcha'}, strawberry:{name:'ストロベリー',title:'My Strawberry'} };
// Toppings are represented as badges. Add optional asset paths here if transparent layers are supplied later.
const toppings = new Map(['ホイップクリーム','チョコレートソース','抹茶パウダー'].map(name => [name, { name, layer: null }]));
const result = document.querySelector('.completion');
function selection() {
  const data = new FormData(form);
  return { base: String(data.get('base') || 'coffee'), toppings: data.getAll('topping').map(String) };
}
function updatePreview() {
  const selected = selection();
  const img = document.querySelector('#custom-image');
  img.src = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/img/menu-${selected.base}.webp`;
  img.alt = `${bases[selected.base].name}ベースの参考イメージ`;
  document.querySelector('#custom-name').textContent = bases[selected.base].title;
  const badges = document.querySelector('#topping-badges');
  badges.replaceChildren(...(selected.toppings.length ? selected.toppings.map(name => toppings.get(name).name) : ['トッピングなし']).map(name => { const badge = document.createElement('span'); badge.textContent = name; return badge; }));
  result.replaceChildren();
}
form.addEventListener('change', updatePreview);
form.addEventListener('reset', () => setTimeout(updatePreview, 0));
form.addEventListener('submit', event => {
  event.preventDefault();
  const selected = selection();
  const title = document.createElement('strong'); title.textContent = 'あなたらしい一杯のできあがり！';
  const detail = document.createElement('p'); detail.textContent = `${bases[selected.base].name} ＋ ${selected.toppings.join('・') || 'トッピングなし'}`;
  result.replaceChildren(title, detail);
  result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
});
const motion = document.querySelector('.motion-toggle'); motion.hidden = false;
motion.addEventListener('click', () => {
  const paused = document.body.classList.toggle('motion-paused');
  motion.setAttribute('aria-pressed', String(paused));
  motion.setAttribute('aria-label', paused ? 'アニメーションを再生' : 'アニメーションを停止');
  motion.textContent = paused ? '▶' : 'Ⅱ';
});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
