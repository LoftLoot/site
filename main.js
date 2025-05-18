async function loadToys() {
  try {
    const res = await fetch('toys.json');
    const toys = await res.json();

    // Dynamically populate filters
    ['decade', 'type', 'brand'].forEach(key =>
      populateFilter(key + 'Filter', getUniqueValues(toys, key))
    );

    // Initial render
    renderCatalog(toys);

    // Bind filters
    ['decade', 'type', 'brand'].forEach(key => {
      document.getElementById(key + 'Filter').addEventListener('change', () =>
        filterToys(toys)
      );
    });
  } catch (err) {
    console.error("Failed to load or parse toys.json", err);
  }
}

function getUniqueValues(items, key) {
  return [...new Set(items.map(item => item[key]))].sort();
}

function populateFilter(selectId, values) {
  const select = document.getElementById(selectId);
  select.innerHTML = `<option value="all">All</option>` +
    values.map(val => `<option value="${val}">${val}</option>`).join('');
}

function filterToys(toys) {
  const filters = {
    decade: document.getElementById('decadeFilter').value,
    type: document.getElementById('typeFilter').value,
    brand: document.getElementById('brandFilter').value
  };

  const filtered = toys.filter(toy =>
    Object.entries(filters).every(([key, value]) =>
      value === 'all' || toy[key] === value
    )
  );

  renderCatalog(filtered);
}

function renderCatalog(toys) {
  const catalog = document.getElementById('catalog');
  catalog.innerHTML = '';

  for (const toy of toys) {
    const card = document.createElement('div');
    card.className = `card decade-${toy.decade}`;

    card.innerHTML = `
      <div class="image"></div>
      <div class="title">${toy.name}</div>
      <div class="note">${toy.note}</div>
      <div class="price">${toy.price}</div>
      <div class="actions">
        <a href="${toy.ebay}" class="ebay" target="_blank">eBay</a>
        <a href="${toy.etsy}" class="etsy" target="_blank">Etsy</a>
      </div>
    `;
    catalog.appendChild(card);
  }
}

loadToys();
