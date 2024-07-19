document.addEventListener("DOMContentLoaded", () => {
  fetchMonsters(1);
});

let currentPage = 1;

function fetchMonsters(page) {
  fetch(`http://localhost:3000`)
    .then(response => response.json())
    .then(monsters => displayMonsters(monsters))
    .catch(error => console.error('Error fetching monsters:', error));
}

function displayMonsters(monsters) {
  const monsterContainer = document.getElementById("monster-container");
  monsters.forEach(monster => {
    const monsterDiv = document.createElement("div");
    monsterDiv.innerHTML = `
      <h2>${monster.name}</h2>
      <p>Age: ${monster.age}</p>
      <p>${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);
  });
}

document.getElementById("monster-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const description = document.getElementById("description").value;

  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      age: parseFloat(age),
      description: description
    })
  })
  .then(response => response.json())
  .then(newMonster => {
    const monsterContainer = document.getElementById("monster-container");
    const monsterDiv = document.createElement("div");
    monsterDiv.innerHTML = `
      <h2>${newMonster.name}</h2>
      <p>Age: ${newMonster.age}</p>
      <p>${newMonster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);
  })
  .catch(error => console.error('Error creating monster:', error));

  e.target.reset();
});

document.getElementById("load-more").addEventListener("click", () => {
  currentPage++;
  fetchMonsters(currentPage);
});
