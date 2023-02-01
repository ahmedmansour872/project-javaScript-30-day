import { countries_data as database } from "../data/countries_data.js";

let scrollUp = document.querySelector(".scroll");
let population = document.querySelector(".population");
let allData = document.querySelector(".show-counties");
let main = document.getElementById("stat");
let search = document.getElementById("search");
let CountryName = document.getElementById("CountryName");
let CountryCapital = document.getElementById("CountryCapital");
let CountryPopulation = document.getElementById("CountryPopulation");
let sortBY = document.getElementById("sortBY");
let typeOfSort = document.getElementById("typeOfSort");
let numberOfCountries = document.getElementById("numberOfCountries");
let graphs = document.createElement("div");

let result = [];
let numberOfPeople = 0;
let showCartInStart = 50;

numberOfCountries.textContent = showCartInStart;

database.forEach((e) => {
  numberOfPeople += e.population;
});

CountryName.addEventListener("click", (e) => {
  sortBY.innerHTML = "Name";
  allData.innerHTML = "";
  if (typeOfSort.textContent == "Increased") {
    typeOfSort.textContent = "Decreased";
    result.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
    });
  } else {
    typeOfSort.textContent = "Increased";
    result.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
    });
  }
  for (let i = 0; i < result.length; i++) {
    craeteAndBindData(i, result);
  }
  createElementsinDOM(result);
});

CountryCapital.addEventListener("click", (e) => {
  sortBY.innerHTML = "Capital";
  allData.innerHTML = "";

  if (typeOfSort.textContent == "Increased") {
    typeOfSort.textContent = "Decreased";
    result.sort((a, b) => {
      if (a.capital > b.capital) {
        return -1;
      }
      if (a.capital < b.capital) {
        return 1;
      }
    });
  } else {
    typeOfSort.textContent = "Increased";
    result.sort((a, b) => {
      if (a.capital > b.capital) {
        return 1;
      }
      if (a.capital < b.capital) {
        return -1;
      }
    });
  }
  for (let i = 0; i < result.length; i++) {
    craeteAndBindData(i, result);
  }
  createElementsinDOM(result);
});

CountryPopulation.addEventListener("click", (e) => {
  sortBY.innerHTML = "Population";
  allData.innerHTML = "";

  if (typeOfSort.textContent == "Increased") {
    typeOfSort.textContent = "Decreased";
    result.sort((a, b) => {
      return b.population - a.population;
    });
  } else {
    typeOfSort.textContent = "Increased";
    result.sort((a, b) => {
      return a.population - b.population;
    });
  }
  for (let i = 0; i < result.length; i++) {
    craeteAndBindData(i, result);
  }
  createElementsinDOM(result);
});

function displayData() {
  for (let i = 0; i < showCartInStart; i++) {
    craeteAndBindData(i, database);
    result.push(database[i]);
  }
  pop();
}

displayData();

function craeteAndBindData(i, database) {
  let cart = document.createElement("div");
  let picture = document.createElement("picture");
  let img = document.createElement("img");
  let NameOfCountry = document.createElement("h3");
  let capital = document.createElement("div");
  let language = document.createElement("div");
  let popu = document.createElement("div");

  picture.appendChild(img);
  cart.appendChild(NameOfCountry);
  cart.appendChild(picture);
  cart.appendChild(capital);
  cart.appendChild(language);
  cart.appendChild(popu);
  cart.prepend(picture);

  img.src = database[i].flag;
  NameOfCountry.textContent = database[i].name;
  capital.textContent = database[i].capital;
  language.textContent = database[i].languages;
  popu.textContent = database[i].population;
  img.src = database[i].flag;
  cart.classList.add("cart");
  allData.appendChild(cart);
}

search.addEventListener("input", (e) => {
  let searchName = e.target.value.toLowerCase();

  allData.innerHTML = "";
  result = database.filter((e) => {
    return e.name.toLowerCase().includes(searchName);
  });

  if (result.length == 250 || searchName == "") {
    numberOfCountries.textContent = showCartInStart;
    displayData();
  } else {
    for (let i = 0; i < result.length; i++) {
      craeteAndBindData(i, result);
    }
    numberOfCountries.textContent = result.length;
  }
  createElementsinDOM(result);
});

function createElementsinDOM(arr) {
  graphs.remove();
  graphs = document.createElement("div");
  graphs.className = "graphs";

  arr.forEach((e) => {
    let graph = document.createElement("div");
    let graphView = document.createElement("div");
    let counteryNameOrLang = document.createElement("div");
    let counteryNumber = document.createElement("div");
    let shap = document.createElement("span");

    graph.className = "graph";
    counteryNameOrLang.className = "counteryNameOrLang";
    counteryNumber.className = "counterynumber";
    graphView.className = "graphView";

    bindData({
      e,
      graph,
      graphView,
      counteryNameOrLang,
      counteryNumber,
      shap,
    });

    graph.appendChild(counteryNameOrLang);
    graphView.appendChild(shap);
    graph.appendChild(graphView);
    graph.appendChild(counteryNumber);
    graphs.appendChild(graph);
  });
  main.appendChild(graphs);
}

function bindData(obj) {
  obj.counteryNameOrLang.textContent = obj.e.name;
  obj.counteryNumber.textContent = obj.e.population;
  let rate = (obj.counteryNumber.textContent / numberOfPeople) * 100;
  let roundNumber = Math.ceil(
    (obj.counteryNumber.textContent / numberOfPeople) * 100
  );
  if (roundNumber == 1) rate = 0.1;

  obj.shap.textContent = `${rate.toFixed(1)}%`;
  setTimeout(() => {
    obj.shap.style.width = `${
      (obj.counteryNumber.textContent / numberOfPeople) * 100
    }%`;
  }, 0);
}

population.addEventListener("click", pop);

function pop() {
  createElementsinDOM(result);
}

window.onscroll = function () {
  if (document.documentElement.scrollTop >= 1000)
    scrollUp.style.display = "flex";
  else scrollUp.style.display = "none";
};

scrollUp.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
