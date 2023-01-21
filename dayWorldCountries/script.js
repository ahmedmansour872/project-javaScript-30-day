import { countries_data as database } from "./data/countries_data.js";

let main = document.getElementById("stat");

let population = document.querySelector(".population");
let languages = document.querySelector(".languages");
let graphTitle = document.querySelector(".graph-title");
let footer = document.querySelector("footer");

let pagenation = document.createElement("ul");
let graphs = document.createElement("div");
let greaterThan = document.createElement("span");
let lesserThan = document.createElement("span");

let flag = false;
let numberOfPeople = 0;
let startSlice = 0;
let listItems = [];
let showItems = 5;
let removeAndAddItemsFromGreatherThan = 0;
let dataForView = [];

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
  if (flag) {
    obj.counteryNameOrLang.textContent = obj.e.languageName;
    obj.counteryNumber.textContent = obj.e.languageNumber;
    obj.shap.textContent = `${obj.counteryNumber.textContent}%`;
    setTimeout(() => {
      obj.shap.style.width = `${obj.counteryNumber.textContent}%`;
    }, 0);
  } else {
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
}

function viewDataInPagination(arr) {
  let items = document.querySelectorAll(".pagenation li");
  listItems = items;
  items.forEach((e, i) => {
    if (i < showItems) {
      if (items[i].classList.contains("hide"))
        items[i].classList.remove("hide");

      items[i].classList.add("show");
    }

    lesserThan.style.display = "none";
    greaterThan.style.display = "inline-block";

    e.addEventListener("click", (ev) => {
      removeClassActive(items);

      ev.target.classList.add("active");
      startSlice = ev.target.textContent;

      if (startSlice == items.length)
        createElementsinDOM(arr.slice((Number(startSlice) - 1) * 10));
      else
        createElementsinDOM(
          arr.slice((Number(startSlice) - 1) * 10, Number(startSlice) * 10)
        );
    });
  });
  if (startSlice == items.length)
    createElementsinDOM(arr.slice((Number(startSlice) - 1) * 10));
  else createElementsinDOM(arr.slice(0, 10));
}

function createPagenationList(arr) {
  let lengthOfArr = Math.ceil(arr.length / 10);
  pagenation.remove();
  pagenation = document.createElement("ul");
  pagenation.className = "pagenation";
  footer.appendChild(pagenation);

  for (let i = 0; i < lengthOfArr; i++) {
    let list = document.createElement("li");
    list.classList.add("hide");
    list.textContent = i + 1;
    pagenation.appendChild(list);
  }
  pagenation.firstElementChild.classList.add("active");

  lesserThan.innerHTML = "&lt;&lt;";
  greaterThan.innerHTML = "&gt;&gt;";
  pagenation.prepend(lesserThan);
  pagenation.appendChild(greaterThan);

  viewDataInPagination(arr);
}

function selectLanguageOrCunterFromDatabase(data) {
  if (flag) {
    let all_language = [];
    data.forEach((e) => {
      all_language.push(...e.languages);
    });
    return displayLanguageAndNumberSpeaker(all_language);
  } else {
    let allCountryName = [];
    numberOfPeople = 0;
    data.forEach((e) => {
      allCountryName.push({ name: e.name, population: e.population });
      numberOfPeople += e.population;
    });
    allCountryName.unshift({ name: "World", population: numberOfPeople });
    allCountryName.sort((a, b) => {
      return b.population - a.population;
    });
    dataForView = [...allCountryName];
    createPagenationList(allCountryName);
  }
}

function displayLanguageAndNumberSpeaker(all_language) {
  let numberOfLanguageCount = [];
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
  dataForView = [...numberOfLanguageCount];
  return createPagenationList(numberOfLanguageCount);
}

languages.addEventListener("click", () => {
  removeAndAddItemsFromGreatherThan = 0;
  startSlice = 0;
  flag = languages.textContent == "Languages" ? true : false;
  graphTitle.textContent = "10 most Spoken languages in the world";
  selectLanguageOrCunterFromDatabase(database);
});

population.addEventListener("click", () => {
  removeAndAddItemsFromGreatherThan = 0;
  startSlice = 0;
  flag = languages.textContent == "Languages" ? false : true;
  graphTitle.textContent = "10 Most populated countries in the world";
  selectLanguageOrCunterFromDatabase(database);
});

greaterThan.addEventListener("click", () => {
  let item = document.querySelector(".pagenation .active");

  removeClassActive(listItems);

  item.nextElementSibling.classList.add("active");

  removeAndAddItemsArrowRight(removeAndAddItemsFromGreatherThan);

  showAndHideArrow();

  createElementsinDOM(
    dataForView.slice((startSlice - 1) * 10, startSlice * 10 + 1)
  );
});

lesserThan.addEventListener("click", () => {
  let item = document.querySelector(".pagenation .active");

  removeClassActive(listItems);

  item.previousElementSibling.classList.add("active");

  removeAndAddItemsArrowLft(removeAndAddItemsFromGreatherThan);
  showAndHideArrow();

  createElementsinDOM(
    dataForView.slice((startSlice - 1) * 10, startSlice * 10 + 1)
  );
});

function showAndHideArrow() {
  if (listItems[listItems.length - 1].classList.contains("show"))
    greaterThan.style.display = "none";
  else greaterThan.style.display = "inline-block";

  if (listItems[0].classList.contains("show"))
    lesserThan.style.display = "none";
  else lesserThan.style.display = "inline-block";

  let activeItem = document.querySelector(".pagenation .active");
  startSlice = activeItem.textContent;
}

function removeAndAddItemsArrowRight(removeAndAddItem) {
  listItems[removeAndAddItem].classList.remove("show");
  listItems[removeAndAddItem].classList.add("hide");

  listItems[removeAndAddItem + showItems].classList.remove("hide");
  listItems[removeAndAddItem + showItems].classList.add("show");

  removeAndAddItemsFromGreatherThan++;
}

function removeAndAddItemsArrowLft(removeAndAddItem) {
  listItems[removeAndAddItem - 1].classList.remove("hide");
  listItems[removeAndAddItem - 1].classList.add("show");

  listItems[removeAndAddItem + showItems - 1].classList.remove("show");
  listItems[removeAndAddItem + showItems - 1].classList.add("hide");

  removeAndAddItemsFromGreatherThan--;
}

function removeClassActive(arrayOfData) {
  arrayOfData.forEach((e) => {
    if (e.classList.contains("active")) e.classList.remove("active");
  });
}
