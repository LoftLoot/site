fetch('toys.json')
  .then(res => res.json())
  .then(data => renderCatalog(data));

function renderCatalog(toys) {
  const container = document.getElementById('catalog');
  container.innerHTML = '';
  const grouped = toys.reduce((acc, toy) => {
    acc[toy.decade] = acc[toy.decade] || [];
    acc[toy.decade].push(toy);
    return acc;
  }, {});

  Object.entries(grouped).forEach(([decade, items]) => {
    const section = document.createElement('section');
    section.dataset.decade = decade;
    section.id = decade;

    const title = document.createElement('h2');
    title.textContent = decade;
    section.appendChild(title);

    items.forEach(toy => {
      const card = document.createElement('div');
      card.className = 'toy-card';
      card.innerHTML = \`
        <h3>\${toy.name}</h3>
        <p>\${toy.description}</p>
        <a href="\${toy.link}" target="_blank">Buy</a>
      \`;
      section.appendChild(card);
    });

    container.appendChild(section);
  });
}

function filterDecade(decade) {
  document.querySelectorAll('main section').forEach(sec => {
    if (decade === 'all' || sec.dataset.decade === decade) {
      sec.style.display = '';
    } else {
      sec.style.display = 'none';
    }
  });
}
