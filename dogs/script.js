/* Golden Paws Kennel - front-end behaviour
   Every dog listed is hypoallergenic. Prices range from $600 to $1,500. */

const IMG = (id) => `https://images.unsplash.com/${id}?w=900&q=75&auto=format&fit=crop`;

const DOGS = [
  { id: 'sunny',    name: 'Sunny',    breed: 'Labrador Retriever (Yellow)',            type: 'full', lab: true,  price: 1200, sex: 'Male',   weeks: 10, weight: '65-75 lb', coat: 'Short, low-shed', energy: 'High',     traits: ['Playful', 'Loyal', 'Great with kids'],   color: '#e6c07b', img: IMG('photo-1587300003388-59208cc962cb') },
  { id: 'mocha',    name: 'Mocha',    breed: 'Labrador Retriever (Chocolate)',         type: 'full', lab: true,  price: 1350, sex: 'Female', weeks: 9,  weight: '55-70 lb', coat: 'Short, low-shed', energy: 'High',     traits: ['Gentle', 'Food motivated', 'Water lover'], color: '#6b4226', img: IMG('photo-1579213838826-3a1e6ee1e7ea') },
  { id: 'onyx',     name: 'Onyx',     breed: 'Labrador Retriever (Black)',             type: 'full', lab: true,  price: 1150, sex: 'Male',   weeks: 11, weight: '65-80 lb', coat: 'Short, low-shed', energy: 'High',     traits: ['Confident', 'Eager to please', 'Retriever'], color: '#2f2a28', img: IMG('photo-1605897472359-85e4b94d685d') },
  { id: 'sterling', name: 'Sterling', breed: 'Labrador Retriever (Silver)',            type: 'full', lab: true,  price: 1500, sex: 'Female', weeks: 8,  weight: '55-70 lb', coat: 'Short, low-shed', energy: 'Moderate', traits: ['Rare coat', 'Calm', 'Affectionate'],       color: '#9aa1a8', img: IMG('photo-1518717758536-85ae29035b6d') },
  { id: 'coco',     name: 'Coco',     breed: 'Standard Poodle',                        type: 'full', lab: false, price: 1400, sex: 'Female', weeks: 12, weight: '45-60 lb', coat: 'Curly, non-shed',  energy: 'Moderate', traits: ['Intelligent', 'Elegant', 'Trainable'],     color: '#c9a071', img: IMG('photo-1616149562385-1d84e79478d1') },
  { id: 'marina',   name: 'Marina',   breed: 'Portuguese Water Dog',                   type: 'full', lab: false, price: 1450, sex: 'Female', weeks: 10, weight: '35-55 lb', coat: 'Wavy, non-shed',   energy: 'High',     traits: ['Athletic', 'Loyal', 'Swimmer'],            color: '#3d2b22', img: IMG('photo-1534361960057-19889db9621e') },
  { id: 'teddy',    name: 'Teddy',    breed: 'Labradoodle (Lab x Poodle)',             type: 'half', lab: true,  price: 950,  sex: 'Male',   weeks: 9,  weight: '50-65 lb', coat: 'Wavy, low-shed',   energy: 'Moderate', traits: ['Cuddly', 'Smart', 'Family favourite'],    color: '#c8a26c', img: IMG('photo-1583511655857-d19b40a7a54e') },
  { id: 'pip',      name: 'Pip',      breed: 'Mini Labradoodle (Lab x Mini Poodle)',   type: 'half', lab: true,  price: 1100, sex: 'Female', weeks: 10, weight: '25-40 lb', coat: 'Curly, low-shed',  energy: 'Moderate', traits: ['Apartment friendly', 'Sweet', 'Quick learner'], color: '#d9b98a', img: IMG('photo-1591160690555-5debfba289f0') },
  { id: 'rio',      name: 'Rio',      breed: 'Lab x Portuguese Water Dog',             type: 'half', lab: true,  price: 850,  sex: 'Male',   weeks: 11, weight: '45-65 lb', coat: 'Wavy, low-shed',   energy: 'High',     traits: ['Adventurous', 'Water lover', 'Loyal'],     color: '#5a3d2e', img: IMG('photo-1548199973-03cce0bbc87b') },
  { id: 'ziggy',    name: 'Ziggy',    breed: 'Lab x Schnauzer',                        type: 'half', lab: true,  price: 700,  sex: 'Male',   weeks: 12, weight: '40-55 lb', coat: 'Wiry, low-shed',   energy: 'Moderate', traits: ['Alert', 'Goofy', 'Good watchdog'],         color: '#7c7369', img: IMG('photo-1477884213360-7e9d7dcc1e48') },
  { id: 'daisy',    name: 'Daisy',    breed: 'Lab x Bichon Frise',                     type: 'half', lab: true,  price: 600,  sex: 'Female', weeks: 9,  weight: '25-40 lb', coat: 'Soft, low-shed',   energy: 'Low',      traits: ['Lap dog', 'Gentle', 'Great with seniors'], color: '#efe3cf', img: IMG('photo-1561037404-61cd46aa615b') },
  { id: 'bean',     name: 'Bean',     breed: 'Lab x Maltese',                          type: 'half', lab: true,  price: 650,  sex: 'Male',   weeks: 10, weight: '20-35 lb', coat: 'Silky, low-shed',  energy: 'Low',      traits: ['Tiny', 'Affectionate', 'Quiet'],           color: '#e8d9c0', img: IMG('photo-1507146426996-ef05306b995a') },
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => '$' + n.toLocaleString('en-US');
const typeLabel = (t) => (t === 'full' ? 'Full Breed' : 'Half Breed');
const byId = (id) => DOGS.find((d) => d.id === id);

/* ---------- Favorites (persisted per browser) ---------- */
const FAV_KEY = 'gp-favorites';
let favorites = new Set();
try { favorites = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); } catch { favorites = new Set(); }
function saveFavs() {
  try { localStorage.setItem(FAV_KEY, JSON.stringify([...favorites])); } catch { /* storage unavailable */ }
  const count = $('#fav-count');
  count.textContent = favorites.size;
  count.hidden = favorites.size === 0;
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ---------- Photo helper: real photo with illustrated fallback ---------- */
function photoHTML(d, cls, { attrs = '', overlay = '' } = {}) {
  return `
    <div class="${cls}" style="color:${d.color}" ${attrs}>
      <img src="${d.img}" alt="${d.name}, ${d.breed}" loading="lazy"
           onload="this.parentElement.classList.add('has-img')"
           onerror="this.remove()">
      <svg class="dog-svg" viewBox="0 0 120 120" aria-hidden="true"><use href="#dog-icon"/></svg>
      ${overlay}
    </div>`;
}

const HEART = '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
function favButton(d) {
  const on = favorites.has(d.id);
  return `<button class="fav ${on ? 'on' : ''}" data-fav="${d.id}" aria-label="Save ${d.name} to favorites" aria-pressed="${on}">${HEART}</button>`;
}

/* ---------- Listing ---------- */
const grid = $('#dog-grid');
const state = { type: 'all', max: 1500, sort: 'featured', q: '' };

function filtered() {
  let list = DOGS.filter((d) => d.price <= state.max);
  if (state.type === 'full' || state.type === 'half') list = list.filter((d) => d.type === state.type);
  if (state.type === 'lab') list = list.filter((d) => d.lab);
  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter((d) => d.name.toLowerCase().includes(q) || d.breed.toLowerCase().includes(q));
  }
  switch (state.sort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'age':        list.sort((a, b) => a.weeks - b.weeks); break;
    case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default: break;
  }
  return list;
}

function render() {
  const list = filtered();
  grid.innerHTML = list.map((d, i) => `
    <article class="dog-card" style="animation-delay:${i * 40}ms" data-id="${d.id}">
      ${photoHTML(d, 'dog-photo', {
        attrs: `data-open="${d.id}"`,
        overlay: `<span class="badge badge-${d.type}">${typeLabel(d.type)}</span>${favButton(d)}`,
      })}
      <div class="dog-body">
        <div class="dog-title"><h3>${d.name}</h3><span class="dog-price">${money(d.price)}</span></div>
        <p class="dog-breed">${d.breed}</p>
        <div class="dog-meta"><span>${d.sex}</span><span>${d.weeks} weeks</span><span>${d.energy} energy</span></div>
        <div class="dog-tags">
          <span class="badge badge-${d.type}">${typeLabel(d.type)}</span>
          <span class="badge badge-hypo">Hypoallergenic</span>
          ${d.lab ? '<span class="badge badge-lab">Lab</span>' : ''}
        </div>
        <div class="dog-actions">
          <button class="btn btn-ghost-dark" data-open="${d.id}">Details</button>
          <a href="#contact" class="btn btn-dark" data-reserve="${d.id}">Reserve</a>
        </div>
      </div>
    </article>
  `).join('');

  $('#empty').hidden = list.length > 0;
  $('#results-count').textContent = list.length
    ? `Showing ${list.length} of ${DOGS.length} dogs${state.type !== 'all' || state.max < 1500 || state.q ? ' (filtered)' : ''}`
    : '';
}

function setType(type) {
  state.type = type;
  $$('.chip').forEach((b) => b.classList.toggle('active', b.dataset.type === type));
  render();
}

$$('.chip').forEach((b) => b.addEventListener('click', () => setType(b.dataset.type)));
$$('[data-filter-link]').forEach((b) => b.addEventListener('click', () => {
  setType(b.dataset.filterLink);
  $('#dogs').scrollIntoView({ behavior: 'smooth' });
}));

const priceInput = $('#max-price');
priceInput.addEventListener('input', () => {
  state.max = Number(priceInput.value);
  $('#max-price-label').textContent = money(state.max);
  render();
});
$('#sort').addEventListener('change', (e) => { state.sort = e.target.value; render(); });

let searchTimer;
$('#search').addEventListener('input', (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 150);
});

$('#reset-filters').addEventListener('click', () => {
  state.max = 1500; priceInput.value = 1500; $('#max-price-label').textContent = '$1,500';
  state.q = ''; $('#search').value = '';
  state.sort = 'featured'; $('#sort').value = 'featured';
  setType('all');
});

/* ---------- Card interactions (delegated) ---------- */
grid.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) { toggleFav(fav.dataset.fav); return; }
  const open = e.target.closest('[data-open]');
  if (open) { openModal(open.dataset.open); return; }
  const reserve = e.target.closest('[data-reserve]');
  if (reserve) preselect(reserve.dataset.reserve);
});

function toggleFav(id) {
  const d = byId(id);
  if (favorites.has(id)) { favorites.delete(id); toast(`${d.name} removed from favorites`); }
  else { favorites.add(id); toast(`${d.name} saved to favorites`); }
  saveFavs();
  $$(`[data-fav="${id}"]`).forEach((b) => { b.classList.toggle('on', favorites.has(id)); b.setAttribute('aria-pressed', favorites.has(id)); });
  if (!$('#drawer').hidden) renderDrawer();
}

function preselect(id) {
  $('#dog-select').value = id;
  toast(`${byId(id).name} selected in the inquiry form`);
}

/* ---------- Detail modal ---------- */
const modal = $('#modal');
let lastFocus;
function openModal(id) {
  const d = byId(id);
  lastFocus = document.activeElement;
  $('#modal-body').innerHTML = `
    ${photoHTML(d, 'modal-photo')}
    <div class="modal-info">
      <div>
        <div class="dog-tags">
          <span class="badge badge-${d.type}">${typeLabel(d.type)}</span>
          <span class="badge badge-hypo">Hypoallergenic</span>
          ${d.lab ? '<span class="badge badge-lab">Lab</span>' : ''}
        </div>
        <h3 id="modal-title" style="margin-top:.6rem">${d.name}</h3>
        <p class="dog-breed">${d.breed}</p>
      </div>
      <span class="dog-price">${money(d.price)}</span>
      <div class="spec-grid">
        <div><span>Sex</span><strong>${d.sex}</strong></div>
        <div><span>Age</span><strong>${d.weeks} weeks</strong></div>
        <div><span>Adult weight</span><strong>${d.weight}</strong></div>
        <div><span>Coat</span><strong>${d.coat}</strong></div>
        <div><span>Energy</span><strong>${d.energy}</strong></div>
        <div><span>Ready to go home</span><strong>${d.weeks >= 8 ? 'Now' : `In ${8 - d.weeks} weeks`}</strong></div>
      </div>
      <div class="traits">${d.traits.map((t) => `<span class="trait">${t}</span>`).join('')}</div>
      <ul class="check-list">
        <li>Vaccinated, dewormed, and microchipped</li>
        <li>Full veterinary exam and health records</li>
        <li>Two-year genetic health guarantee</li>
        <li>${d.type === 'full' ? 'Pedigree papers and lineage records' : 'Parent records and photos of both parents'}</li>
      </ul>
      <div class="modal-actions">
        <button class="btn btn-ghost-dark" data-fav-modal="${d.id}">${favorites.has(d.id) ? 'Saved' : 'Save to favorites'}</button>
        <a href="#contact" class="btn btn-gold" data-reserve-modal="${d.id}">Reserve ${d.name}</a>
      </div>
      <p class="deposit-note">A $200 refundable deposit holds ${d.name}. Balance of ${money(d.price - 200)} due at pickup.</p>
    </div>`;
  modal.hidden = false;
  document.body.classList.add('locked');
  $('.modal-close', modal).focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('locked');
  if (lastFocus) lastFocus.focus();
}
modal.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeModal();
  const f = e.target.closest('[data-fav-modal]');
  if (f) { toggleFav(f.dataset.favModal); f.textContent = favorites.has(f.dataset.favModal) ? 'Saved' : 'Save to favorites'; }
  const r = e.target.closest('[data-reserve-modal]');
  if (r) { preselect(r.dataset.reserveModal); closeModal(); }
});

/* ---------- Favorites drawer ---------- */
const drawer = $('#drawer');
function renderDrawer() {
  const body = $('#drawer-body');
  const list = [...favorites].map(byId).filter(Boolean);
  if (!list.length) {
    body.innerHTML = '<p class="drawer-empty">No favorites yet. Tap the heart on any dog to save it here.</p>';
    return;
  }
  body.innerHTML = list.map((d) => `
    <div class="drawer-item">
      ${photoHTML(d, 'thumb')}
      <div><h4>${d.name}</h4><p>${d.breed}</p><p><strong>${money(d.price)}</strong> &bull; ${typeLabel(d.type)}</p></div>
      <button class="remove" data-fav="${d.id}" aria-label="Remove ${d.name}">&times;</button>
    </div>`).join('') +
    `<div class="drawer-foot"><a href="#contact" class="btn btn-gold btn-block" data-close-drawer>Ask about these dogs</a></div>`;
}
$('#fav-btn').addEventListener('click', () => { renderDrawer(); drawer.hidden = false; document.body.classList.add('locked'); });
drawer.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) { toggleFav(fav.dataset.fav); return; }
  if (e.target.closest('[data-close-drawer]')) { drawer.hidden = true; document.body.classList.remove('locked'); }
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!modal.hidden) closeModal();
  if (!drawer.hidden) { drawer.hidden = true; document.body.classList.remove('locked'); }
});

/* ---------- Contact form ---------- */
const dogSelect = $('#dog-select');
DOGS.forEach((d) => {
  const opt = document.createElement('option');
  opt.value = d.id;
  opt.textContent = `${d.name} - ${d.breed} (${typeLabel(d.type)}, ${money(d.price)})`;
  dogSelect.appendChild(opt);
});

const form = $('#contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const err = $('#form-error');
  let ok = true;
  $$('.field', form).forEach((f) => f.classList.remove('invalid'));
  $$('[required]', form).forEach((input) => {
    const valid = input.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value) : input.value.trim() !== '';
    if (!valid) { ok = false; input.closest('.field').classList.add('invalid'); }
  });
  if (!ok) { err.textContent = 'Please fill in your name, a valid email, and the dog you are interested in.'; err.hidden = false; return; }
  err.hidden = true;
  const name = $('#f-name').value.trim();
  const choice = dogSelect.value === 'undecided' ? 'a puppy match' : byId(dogSelect.value).name;
  form.innerHTML = `
    <div class="form-success">
      <span class="check">&#10003;</span>
      <h3>Thanks, ${name}!</h3>
      <p>Your inquiry about ${choice} has been noted. We reply to every message within 24 hours.</p>
    </div>`;
});

$('#newsletter').addEventListener('submit', (e) => {
  e.preventDefault();
  toast('Thanks! You are on the list for new litter announcements.');
  e.target.reset();
});

/* ---------- Header, nav, scroll effects ---------- */
const header = $('#header');
const navbar = $('#navbar');
const menuBtn = $('#menu-btn');
const backTop = $('#back-top');

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  backTop.hidden = y < 600;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuBtn.addEventListener('click', () => {
  const open = navbar.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
$$('a', navbar).forEach((a) => a.addEventListener('click', () => { navbar.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Highlight the nav link for the section in view.
const navLinks = $$('.navbar a:not(.nav-cta)');
const navObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('section[id]').forEach((s) => navObs.observe(s));

// Scroll reveal.
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } });
}, { threshold: .12 });
$$('.reveal').forEach((el) => revealObs.observe(el));

// Animated counters.
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || '';
  const dur = 1400, start = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const countObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { animateCount(en.target); countObs.unobserve(en.target); } });
}, { threshold: .5 });
$$('[data-count]').forEach((el) => countObs.observe(el));

/* ---------- Reviews slider ---------- */
const slides = $$('.slide');
const dots = $('#dots');
let current = 0, autoTimer;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.className = 'dot' + (i === 0 ? ' active' : '');
  b.setAttribute('aria-label', `Show review ${i + 1}`);
  b.addEventListener('click', () => { go(i); restartAuto(); });
  dots.appendChild(b);
});
function go(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
  $$('.dot', dots).forEach((d, idx) => d.classList.toggle('active', idx === current));
}
function restartAuto() { clearInterval(autoTimer); autoTimer = setInterval(() => go(current + 1), 6000); }
$('#prev').addEventListener('click', () => { go(current - 1); restartAuto(); });
$('#next').addEventListener('click', () => { go(current + 1); restartAuto(); });
$('#slider').addEventListener('mouseenter', () => clearInterval(autoTimer));
$('#slider').addEventListener('mouseleave', restartAuto);
restartAuto();

/* ---------- Init ---------- */
saveFavs();
render();
