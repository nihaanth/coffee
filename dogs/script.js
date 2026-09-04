// Every dog listed is hypoallergenic. Prices range from $600 to $1,500.
const DOGS = [
  { name: 'Sunny',   breed: 'Labrador Retriever (Yellow)',       type: 'full', lab: true,  price: 1200, sex: 'Male',   age: '10 weeks', color: '#e6c07b' },
  { name: 'Mocha',   breed: 'Labrador Retriever (Chocolate)',    type: 'full', lab: true,  price: 1350, sex: 'Female', age: '9 weeks',  color: '#6b4226' },
  { name: 'Onyx',    breed: 'Labrador Retriever (Black)',        type: 'full', lab: true,  price: 1150, sex: 'Male',   age: '11 weeks', color: '#2f2a28' },
  { name: 'Sterling',breed: 'Labrador Retriever (Silver)',       type: 'full', lab: true,  price: 1500, sex: 'Female', age: '8 weeks',  color: '#9aa1a8' },
  { name: 'Coco',    breed: 'Standard Poodle',                   type: 'full', lab: false, price: 1400, sex: 'Female', age: '12 weeks', color: '#c9a071' },
  { name: 'Marina',  breed: 'Portuguese Water Dog',              type: 'full', lab: false, price: 1450, sex: 'Female', age: '10 weeks', color: '#3d2b22' },
  { name: 'Teddy',   breed: 'Labradoodle (Lab x Poodle)',        type: 'half', lab: true,  price: 950,  sex: 'Male',   age: '9 weeks',  color: '#c8a26c' },
  { name: 'Pip',     breed: 'Mini Labradoodle (Lab x Mini Poodle)', type: 'half', lab: true, price: 1100, sex: 'Female', age: '10 weeks', color: '#d9b98a' },
  { name: 'Rio',     breed: 'Lab x Portuguese Water Dog',        type: 'half', lab: true,  price: 850,  sex: 'Male',   age: '11 weeks', color: '#5a3d2e' },
  { name: 'Ziggy',   breed: 'Lab x Schnauzer',                   type: 'half', lab: true,  price: 700,  sex: 'Male',   age: '12 weeks', color: '#7c7369' },
  { name: 'Daisy',   breed: 'Lab x Bichon Frise',                type: 'half', lab: true,  price: 600,  sex: 'Female', age: '9 weeks',  color: '#efe3cf' },
  { name: 'Bean',    breed: 'Lab x Maltese',                     type: 'half', lab: true,  price: 650,  sex: 'Male',   age: '10 weeks', color: '#e8d9c0' },
];

const grid = document.getElementById('dog-grid');
const empty = document.getElementById('empty');
const priceInput = document.getElementById('max-price');
const priceLabel = document.getElementById('max-price-label');
const sortSelect = document.getElementById('sort');
const filterBtns = document.querySelectorAll('.filter-btn');
const dogSelect = document.getElementById('dog-select');

let activeType = 'all';

const money = (n) => '$' + n.toLocaleString('en-US');

function typeLabel(type) {
  return type === 'full' ? 'Full Breed' : 'Half Breed';
}

function render() {
  const max = Number(priceInput.value);
  let list = DOGS.filter((d) => d.price <= max);

  if (activeType === 'full' || activeType === 'half') list = list.filter((d) => d.type === activeType);
  if (activeType === 'lab') list = list.filter((d) => d.lab);

  switch (sortSelect.value) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default: break;
  }

  grid.innerHTML = list.map((d) => `
    <article class="dog-card">
      <div class="dog-photo" style="color:${d.color}">
        <span class="badge badge-${d.type}">${typeLabel(d.type)}</span>
        <svg class="dog-svg" viewBox="0 0 120 120" aria-hidden="true"><use href="#dog-icon"/></svg>
      </div>
      <div class="dog-body">
        <h3>${d.name}</h3>
        <p class="dog-breed">${d.breed}</p>
        <div class="dog-meta"><span>${d.sex}</span><span>${d.age}</span></div>
        <div class="dog-tags">
          <span class="badge badge-hypo">Hypoallergenic</span>
          ${d.lab ? '<span class="badge badge-full" style="background:#f3e8d6;color:#8a5a2b">Lab</span>' : ''}
        </div>
        <div class="dog-footer">
          <span class="dog-price">${money(d.price)}</span>
          <a href="#contact" class="btn btn-small" data-dog="${d.name}">Reserve</a>
        </div>
      </div>
    </article>
  `).join('');

  empty.hidden = list.length > 0;
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeType = btn.dataset.type;
    render();
  });
});

priceInput.addEventListener('input', () => {
  priceLabel.textContent = money(Number(priceInput.value));
  render();
});

sortSelect.addEventListener('change', render);

// Links from the Full vs Half Breed section pre-select the matching filter.
document.querySelectorAll('[data-filter-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const type = link.dataset.filterLink;
    filterBtns.forEach((b) => b.classList.toggle('active', b.dataset.type === type));
    activeType = type;
    render();
  });
});

// "Reserve" buttons pre-fill the contact form's dog picker.
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-dog]');
  if (btn) dogSelect.value = btn.dataset.dog;
});

// Populate the contact form dropdown.
DOGS.forEach((d) => {
  const opt = document.createElement('option');
  opt.value = d.name;
  opt.textContent = `${d.name} - ${d.breed} (${typeLabel(d.type)}, ${money(d.price)})`;
  dogSelect.appendChild(opt);
});

// Contact form (front-end only; no backend is wired up).
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('form-note').hidden = false;
  e.target.reset();
});

// Mobile menu.
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');
menuBtn.addEventListener('click', () => navbar.classList.toggle('open'));
navbar.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => navbar.classList.remove('open')));

render();
