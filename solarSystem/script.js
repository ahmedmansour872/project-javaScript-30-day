let calc = document.getElementById("calculate");
let massage = document.getElementById("massage");
let img = document.querySelector("img");
let input = document.querySelector("input");
let select = document.querySelector("select");
let pra = document.createElement("p");
let planetName = document.createElement("span");
let calcNumber = document.createElement("p");
let planet;
let weightPlanets = [3.7, 8.9, 9.8, 1.6, 3.7, 23.1, 9, 8.7, 11, 0.7];

calc.onclick = function () {
  massage.style.display = "block";
  pra.className = "mass";

  massage.appendChild(pra);
  if (input.value == "") massEmpty();
  else if (select.value == "none") planetNameEmpty();
  else calcWiightPlanet();
};

function massEmpty() {
  img.parentElement.style.display = "none";
  pra.textContent = "Mass is Required";
  calcNumber.remove();
}

function planetNameEmpty() {
  img.parentElement.style.display = "none";
  pra.textContent = "You did not choose a planet yet";
  calcNumber.remove();
}

function calcWiightPlanet() {
  let weight = input.value;
  let weightPlanet = weightPlanets[select.value.slice(-1)];

  planet = select.value.slice(0, -2);

  img.parentElement.style.display = "block";
  planetName.textContent = planet;

  calcNumber.className = "calc";
  calcNumber.textContent = `${(weight * weightPlanet).toFixed(2)} N`;

  pra.textContent = `The weight of the object on `;

  img.src = `images/${planet}.png`;

  massage.appendChild(calcNumber);
  pra.appendChild(planetName);
}
