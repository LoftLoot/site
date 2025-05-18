fetch('toys.json')
  .then(response => response.json())
  .then(data => {
    renderCatalog(data);
  });

function renderCatalog(toys) {
  const container = document.getElementById('catalog');
  const grouped = toys.reduce((acc, toy) => {
    if (!acc[toy.decade]) acc[toy.decade] = [];
    acc[toy.decade].push(toy);
    return acc;
  }, {});

  Object.entries(grouped).forEach(([decade, toys]) => {
    const section = document.createElement('section');
    section.id = decade;
    section.dataset.decade = decade;
    const header = document.createElement('h2');
    header.textContent = decade;
    section.appendChild(header);

    toys.forEach(toy => {
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
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => {
    if (decade === 'all' || sec.dataset.decade === decade) {
      sec.style.display = '';
    } else {
      sec.style.display = 'none';
    }
  });
}
