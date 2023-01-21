import { countries_data as database } from "../data/countries_data.js";

let tbody = document.querySelector("tbody");

let arr = database.sort((a, b) => {
  return b.population - a.population;
});

arr.forEach((e, i) => {
  let tr = document.createElement("tr");
  let id = document.createElement("th");
  let name = document.createElement("th");
  let capital = document.createElement("th");
  let region = document.createElement("th");
  let languages = document.createElement("th");
  let population = document.createElement("th");
  let area = document.createElement("th");

  id.textContent = i + 1;
  name.textContent = e.name;
  capital.textContent = e.capital;
  region.textContent = e.region;
  languages.textContent = e.languages;
  population.textContent = e.population;
  area.textContent = e.area;

  tr.appendChild(id);
  tr.appendChild(name);
  tr.appendChild(capital);
  tr.appendChild(region);
  tr.appendChild(languages);
  tr.appendChild(population);
  tr.appendChild(area);
  tbody.appendChild(tr);
});
