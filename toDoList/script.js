let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let country = document.getElementById("country");
let playScore = document.getElementById("playScore");
let addPlayer = document.getElementById("addPlayer");
let error = document.querySelector(".error");
let main = document.querySelector(".main");
let allCarts = [];

addPlayer.addEventListener("click", (e) => {
  validationFiled();
});

function createCart() {
  main.innerHTML = "";
  allCarts.forEach((e, i) => {
    let cart = document.createElement("div");
    cart.classList.add("cart");
    cart.innerHTML = `          
  <div class="name">
    <h4>${e.FullName}</h4>
    <div class="date">${e.date}</div>
  </div>
  <div class="country">${e.country}</div>
  <div class="play-score" id="player${i + 1}">${e.playScore}</div>
  <div class="setting">
    <span>De</span>
    <span>+5</span>
    <span>-5</span>
  </div>`;
    main.appendChild(cart);
    cart.addEventListener("click", (ev) => {
      let idOfPlayer = cart.children[2].id;
      let playerScore = document.getElementById(idOfPlayer);
      if (ev.target.textContent == "+5") {
        playerScore.textContent = +playerScore.textContent + 5;
        e.playScore = playerScore.textContent;
        sortPlayerByScore();
      }

      if (ev.target.textContent == "-5") {
        playerScore.textContent = +playerScore.textContent - 5;
        e.playScore = playerScore.textContent;
        sortPlayerByScore();
      }

      if (ev.target.textContent == "De") {
        for (let i = 0; i < allCarts.length; i++)
          if (allCarts[i].date == e.date) allCarts.splice(i, 1);

        cart.remove();
      }
    });
  });
}

function validationFiled() {
  if (!firstName.value && !lastName.value && !country.value && !playScore.value)
    error.textContent = "All filed are required";
  else if (!firstName.value) error.textContent = "First Name is required";
  else if (!lastName.value) error.textContent = "Last Name is required";
  else if (!country.value) error.textContent = "Country is required";
  else if (!playScore.value) error.textContent = "Play Score is required";
  else {
    error.textContent = "";
    addPlayerInCart();
  }
}

function addPlayerInCart() {
  let date = new Date().toUTCString();
  allCarts.push({
    FullName: firstName.value + " " + lastName.value,
    country: country.value,
    playScore: playScore.value,
    date: date,
  });

  sortPlayerByScore();
}

function sortPlayerByScore() {
  allCarts.sort((a, b) => {
    return b.playScore - a.playScore;
  });
  createCart();
}
