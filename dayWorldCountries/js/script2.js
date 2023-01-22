import { countries_data as database } from "../data/countries_data.js";
let numberOfLanguageCount = [];
let container = document.querySelector(".container");
let all_language = [];

database.forEach((e) => {
  all_language.push(...e.languages);
});

new Set(all_language).forEach((e) => {
  let language = [];
  for (let i = 0; i < all_language.length; i++)
    if (e == all_language[i]) language.push(e);

  numberOfLanguageCount.push({
    languageName: e,
    languageNumber: language.length,
  });
});

numberOfLanguageCount.sort((a, b) => {
  return b.languageNumber - a.languageNumber;
});

numberOfLanguageCount.forEach((e) => {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  createTable(e);

  table.appendChild(thead);
  table.appendChild(tbody);

  let j = 0;

  for (let i = 0; i < database.length; i++) {
    if (database[i].languages.includes(e.languageName)) {
      j++;
      bindData(j, database[i], tbody);
    }
  }

  container.appendChild(table);
});

function bindData(j, item, tbody) {
  let tr = document.createElement("tr");
  let id = document.createElement("td");
  let name = document.createElement("td");
  let capital = document.createElement("td");
  let region = document.createElement("td");
  let languages = document.createElement("td");
  let population = document.createElement("td");
  let area = document.createElement("td");

  id.textContent = j;
  name.textContent = item.name;
  capital.textContent = item.capital;
  region.textContent = item.region;
  languages.textContent = item.languages;
  population.textContent = item.population;
  area.textContent = item.area;

  tr.appendChild(id);
  tr.appendChild(name);
  tr.appendChild(capital);
  tr.appendChild(region);
  tr.appendChild(languages);
  tr.appendChild(population);
  tr.appendChild(area);
  tbody.appendChild(tr);
}

function createTable(e) {
  let titleTable = document.createElement("h3");
  let thead = document.createElement("thead");
  let trHaed = document.createElement("tr");
  let idHaed = document.createElement("th");
  let nameHaed = document.createElement("th");
  let capitalHaed = document.createElement("th");
  let regionHaed = document.createElement("th");
  let languagesHaed = document.createElement("th");
  let populationHaed = document.createElement("th");
  let areaHaed = document.createElement("th");

  titleTable.textContent = `Language ${e.languageName} with all countries speak it.`;
  idHaed.textContent = "#";
  nameHaed.textContent = "name";
  capitalHaed.textContent = "capital";
  regionHaed.textContent = "region";
  languagesHaed.textContent = "languages";
  populationHaed.textContent = "population";
  areaHaed.textContent = "area";

  container.appendChild(titleTable);
  trHaed.appendChild(idHaed);
  trHaed.appendChild(nameHaed);
  trHaed.appendChild(capitalHaed);
  trHaed.appendChild(regionHaed);
  trHaed.appendChild(languagesHaed);
  trHaed.appendChild(populationHaed);
  trHaed.appendChild(areaHaed);
  thead.appendChild(trHaed);
}
