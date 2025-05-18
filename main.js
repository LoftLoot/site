async function loadToys() {
  try {
    const res = await fetch('toys.json');
    const toys = await res.json();

    setupFilters(toys);
    renderCatalog(toys);

    document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', () => {
        const filtered = filterToys(toys);
        renderCatalog(filtered);
      });
    });
  } catch (err) {
    console.error("Failed to load or parse toys.json", err);
  }
}

function setupFilters(toys) {
  generateCheckboxes(toys, 'decade', 'filter-decade');
  generateCheckboxes(toys, 'type', 'filter-type');
  generateCheckboxes(toys, 'brand', 'filter-brand');
}

function generateCheckboxes(data, key, containerId) {
  const container = document.getElementById(containerId);
  const values = [...new Set(data.map(item => item[key]))].sort();
  container.innerHTML = values.map(value => `
    <label>
      <input type="checkbox" name="${key}" value="${value}" />
      ${value}
    </label>
  `).join('');
}

function filterToys(toys) {
  const selected = {
    decade: getCheckedValues('decade'),
    type: getCheckedValues('type'),
    brand: getCheckedValues('brand')
  };

  return toys.filter(toy =>
    (!selected.decade.length || selected.decade.includes(toy.decade)) &&
    (!selected.type.length || selected.type.includes(toy.type)) &&
    (!selected.brand.length || selected.brand.includes(toy.brand))
  );
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
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
