async function loadToys() {
  const res = await fetch('toys.json');
  const toys = await res.json();
  renderCatalog(toys);

  document.getElementById('decadeFilter').addEventListener('change', () => filterToys(toys));
  document.getElementById('typeFilter').addEventListener('change', () => filterToys(toys));
  document.getElementById('brandFilter').addEventListener('change', () => filterToys(toys));
}

function filterToys(toys) {
  const decade = document.getElementById('decadeFilter').value;
  const type = document.getElementById('typeFilter').value;
  const brand = document.getElementById('brandFilter').value;

  const filtered = toys.filter(toy =>
    (decade === 'all' || toy.decade === decade) &&
    (type === 'all' || toy.type === type) &&
    (brand === 'all' || toy.brand === brand)
  );
  renderCatalog(filtered);
}

function renderCatalog(toys) {
  const catalog = document.getElementById('catalog');
  catalog.innerHTML = '';
  toys.forEach(toy => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = \`
      <div class="image"></div>
      <div class="title">\${toy.name}</div>
      <div class="note">\${toy.note}</div>
      <div class="price">\${toy.price}</div>
      <div class="actions">
        <a href="\${toy.ebay}" class="ebay" target="_blank">eBay</a>
        <a href="\${toy.etsy}" class="etsy" target="_blank">Etsy</a>
      </div>
    \`;
    catalog.appendChild(card);
  });
}

loadToys();
