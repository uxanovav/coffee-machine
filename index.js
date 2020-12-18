import { options } from "./options.js";
const mainDrinkButtons = document.querySelectorAll(".main-drink");
const additionalDrinkButtons = document.querySelectorAll(".additional-drink");
const screen = document.querySelector(".screen");
const cancelButton = document.querySelector(".cancel-button");
const cup = document.querySelector(".cup");
const pay = document.querySelector(".paybutton");
const imageCup = document.querySelector(".image-cup");
const middleCupCounter = document.querySelector("#middlecup-count");
const bigCupCounter = document.querySelector("#bigcup-count");
const progressBar = document.querySelector(".progress-bar");
const milkIndicator = document.querySelector(".milk");
const milkBankVolumePerc = options.milk.count * 0.01;
const cherryIndicator = document.querySelector(".cherry");
const cherryBankVolumePerc = options.cherrysyrop.count * 0.01;
const vanillaIndicator = document.querySelector(".vanilla");
const vanillaBankVolumePerc = options.vanillasyrop.count * 0.01;
const bananaIndicator = document.querySelector(".banana");
const bananaBankVolumePerc = options.bananasyrop.count * 0.01;
var img = "";
var cupIs = true;
var customDrink = false;
var interval = 0;
var audioCoffee = new Audio();
var audioDone = new Audio();
audioCoffee.preload = 'auto';
audioDone.preload = 'auto';
audioCoffee.src = './audioCoffe.mp3';
audioDone.src = './audioDone.mp3';

milkIndicator.innerHTML = `${options.milk.count}мл`;
bananaIndicator.innerHTML = `${options.bananasyrop.count}мл`;
cherryIndicator.innerHTML = `${options.cherrysyrop.count}мл`;
vanillaIndicator.innerHTML = `${options.vanillasyrop.count}мл`;
middleCupCounter.innerHTML = options.middlecup.count;
bigCupCounter.innerHTML = options.bigcup.count;

let drink = {
  mainDrink: "",
  selectedCup: "",
  totalVolume: 0,
  totalMilkVolume: 0,
  totalCherrySyrVolume: 0,
  totalVanillaSyrVolume: 0,
  totalBananaSyrVolume: 0,
  totalPrice: 0,
};

function logger() {
  console.log(drink, "\n", options.milk.count);
}

pay.addEventListener("click", acceptPayment);
cancelButton.addEventListener("click", resetDrink);
mainDrinkButtons.forEach((element) => {
  element.addEventListener("click", addMainDrink);
});

additionalDrinkButtons.forEach((element) => {
  element.addEventListener("click", addAdditionalDrink);
});

checkStatus();

function showScreen() {
  checkStatus();
  screen.innerHTML = "";
  screen.append(` Ваш заказ - ${drink.mainDrink}.`);
  screen.append(` Объем напитка - ${drink.totalVolume}.`);
  screen.append(` Стоимость напитка - ${drink.totalPrice}.`);
  screen.append(` Молоко - ${drink.totalMilkVolume}.`);
  screen.append(` Вишневый сироп - ${drink.totalCherrySyrVolume}.`);
  screen.append(` Ванильный сироп - ${drink.totalVanillaSyrVolume}.`);
  screen.append(` Банановый сироп - ${drink.totalBananaSyrVolume}`);
  middleCupCounter.innerHTML = options.middlecup.count;
  bigCupCounter.innerHTML = options.bigcup.count;
}

function acceptPayment() {
  if (drink.cupSelect != "") {
    drink.selectedCup.count--;
    showOptionChange();
    createDrink();
  }
}

function showOptionChange() {
  middleCupCounter.innerHTML = options.middlecup.count;
  bigCupCounter.innerHTML = options.bigcup.count;
  milkIndicator.style.height = `${
    options.milk.count / milkBankVolumePerc -
    drink.totalMilkVolume / milkBankVolumePerc
  }%`;
  bananaIndicator.style.height = `${
    options.bananasyrop.count / bananaBankVolumePerc -
    drink.totalBananaSyrVolume / bananaBankVolumePerc
  }%`;
  cherryIndicator.style.height = `${
    options.cherrysyrop.count / cherryBankVolumePerc -
    drink.totalCherrySyrVolume / cherryBankVolumePerc
  }%`;
  vanillaIndicator.style.height = `${
    options.vanillasyrop.count / vanillaBankVolumePerc -
    drink.totalVanillaSyrVolume / vanillaBankVolumePerc
  }%`;
}

function createDrink() {
  options.cherrysyrop.count -= drink.totalCherrySyrVolume;
  options.bananasyrop.count -= drink.totalBananaSyrVolume;
  options.vanillasyrop.count -= drink.totalVanillaSyrVolume;
  options.milk.count -= drink.totalMilkVolume;
  setImageAndInterval();
  changeProgress();
  checkStatus();
  muteAll();
  pay.classList.add("muted");
}

function setImageAndInterval() {
  if (drink.mainDrink == "" && drink.totalMilkVolume > 0) {
    img = "./milk.jpg";
    showImg();
  }
  if (drink.mainDrink != "") {
    switch (drink.mainDrink) {
      case "espresso":
        interval = 3000;
        img = "./espresso.jpg";
        break;
      case "latte":
        interval = 3000;
        img = "./kofe-latte.jpg";
        break;
      case "сappuccino":
        interval = 3000;
        img = "./cappuccino.jpg";
        break;
      case "bananalatte":
        interval = 5000;
        img = "./bananalatte.jpg";
        break;
      case "vanillaсappuccino":
        interval = 5000;
        img = "./vcap.jpg";
        break;
      case "flatwhite":
        interval = 5000;
        img = "./flat.jpg";
        break;
    }
    if (customDrink) {
      interval = 8000;
    }
    showImg();
  }
}

function showImg() {
  imageCup.innerHTML = `<img src=${img} class="coffee-image"  width = 100% height = "100px">`;
}

function changeProgress() {
  progressBar.style.width = "100%";
  progressBar.style.transition = `${interval / 1000}.0s`;
  audioCoffee.play();
  setTimeout(() => {
    progressBar.innerHTML = "<p>Your drink is ready!</p>";
    showCup();
  }, interval);
  setTimeout(() => {
    audioDone.play();
  }, interval);
  milkIndicator.innerHTML = `${options.milk.count}мл`;
  bananaIndicator.innerHTML = `${options.bananasyrop.count}мл`;
  cherryIndicator.innerHTML = `${options.cherrysyrop.count}мл`;
  vanillaIndicator.innerHTML = `${options.vanillasyrop.count}мл`;
}

function showCup() {
  cup.innerHTML = "<img class = 'coffe-cup' src = './finalcup.png' />";
  cup.addEventListener("click", () => {
    resetDrink();
  });
}

function resetDrink() {
  drink.mainDrink = "";
  drink.selectedCup = "";
  drink.totalVolume = 0;
  drink.totalMilkVolume = 0;
  drink.totalCherrySyrVolume = 0;
  drink.totalVanillaSyrVolume = 0;
  drink.totalBananaSyrVolume = 0;
  drink.totalPrice = 0;
  screen.innerHTML = "";
  progressBar.style.width = "0%";
  progressBar.innerHTML = "";
  progressBar.style.transition = `0s`;
  cup.innerHTML = "";
  cup.removeEventListener("click", resetDrink, false);
  interval = 0;
  customDrink = false;
  checkStatus();
  imageCup.innerHTML = "";
}

function checkStatus() {
  setImageAndInterval();
  mainDrinkButtons.forEach((element) => {
    element.classList.remove("muted");
  });
  if (drink.mainDrink == "") {
    pay.classList.add("muted");
  } else {
    pay.classList.remove("muted");
  }
  if (drink.totalMilkVolume != 0) {
    pay.classList.remove("muted");
  }
  if (options.milk.count >= 50) {
    additionalDrinkButtons.forEach((element) => {
      if (element.dataset.key == "milk") {
        element.classList.remove("muted");
      }
    });
  }
  if (options.cherrysyrop.count >= 50) {
    additionalDrinkButtons.forEach((element) => {
      if (element.dataset.key == "cherrysyrop") {
        element.classList.remove("muted");
      }
    });
  }
  if (options.cherrysyrop.count <= drink.totalCherrySyrVolume) {
    additionalDrinkButtons.forEach((element) => {
      if (element.dataset.key == "cherrysyrop") {
        element.classList.add("muted");
      }
    });
  }
  if (options.bananasyrop.count < 50) {
    mainDrinkButtons.forEach((element) => {
      if (element.dataset.key == "bananalatte") {
        element.classList.add("muted");
      }
    });
  }
  if (options.vanillasyrop.count < 50) {
    mainDrinkButtons.forEach((element) => {
      if (element.dataset.key == "vanillaсappuccino") {
        element.classList.add("muted");
      }
    });
  }
  if (drink.totalMilkVolume + 50 > options.milk.count) {
    additionalDrinkButtons.forEach((element) => {
      if (element.dataset.key == "milk") {
        element.classList.add("muted");
      }
    });
  }
  if (drink.totalVolume >= drink.selectedCup.value && options.milk.count < 50) {
    additionalDrinkButtons.forEach((element) => {
      if (element.dataset.key == "milk") {
        element.classList.add("muted");
      }
    });
  }

  if (drink.totalVolume > 320) {
    additionalDrinkButtons.forEach((element) => {
      element.classList.add("muted");
    });
  }
  cupSelect();
  if (!cupIs) {
    muteAll();
  }
  if (options.bigcup.count == 0) {
    mainDrinkButtons.forEach((element) => {
      if (
        element.dataset.key == "bananalatte" ||
        element.dataset.key == "vanillaсappuccino" ||
        element.dataset.key == "flatwhite"
      ) {
        element.classList.add("muted");
      }
    });
  }
  if (
    drink.totalVolume + 50 > drink.selectedCup.value &&
    options.bigcup.count == 0 &&
    drink.selectedCup.key != "bigcup"
  ) {
    additionalDrinkButtons.forEach((element) => {
      element.classList.add("muted");
    });
  }
  if (
    drink.totalVolume + 50 > drink.selectedCup.value &&
    options.bigcup.count == 0
  ) {
    additionalDrinkButtons.forEach((element) => {
      element.classList.add("muted");
    });
  }
  if (options.milk.count < 120) {
    mainDrinkButtons.forEach((element) => {
      if (element.dataset.key == "flatwhite") {
        element.classList.add("muted");
      }
    });
  }
  if (options.milk.count < 100) {
    mainDrinkButtons.forEach((element) => {
      if (
        element.dataset.key == "latte" ||
        element.dataset.key == "bananalatte"
      ) {
        element.classList.add("muted");
      }
    });
  }
  if (options.milk.count < 80) {
    mainDrinkButtons.forEach((element) => {
      if (
        element.dataset.key == "сappuccino" ||
        element.dataset.key == "vanillaсappuccino"
      ) {
        element.classList.add("muted");
      }
    });
  }
}

function muteAll() {
  mainDrinkButtons.forEach((element) => {
    element.classList.add("muted");
  });

  additionalDrinkButtons.forEach((element) => {
    element.classList.add("muted");
  });
}

function addMainDrink() {
  checkStatus();
  resetDrink();
  let keyName = this.dataset.key;
  drink.mainDrink = this.dataset.key;
  drink.totalVolume = options[`${keyName}`].volume;
  drink.totalPrice = options[`${keyName}`].price;
  if (keyName == "bananalatte") {
    drink.totalBananaSyrVolume += 50;
    drink.totalMilkVolume += 100;
  }
  if (keyName == "vanillaсappuccino") {
    drink.totalVanillaSyrVolume += 50;
    drink.totalMilkVolume += 80;
  }
  if (keyName == "latte") {
    drink.totalMilkVolume += 100;
  }
  if (keyName == "сappuccino") {
    drink.totalMilkVolume += 80;
  }
  if (keyName == "flatwhite") {
    drink.totalMilkVolume += 120;
  }
  cupSelect();
  showScreen();
  logger();
  checkStatus();
}

function addAdditionalDrink() {
  checkStatus();
  let keyName = this.dataset.key;
  if (keyName == "milk") {
    drink.totalVolume += options[`${keyName}`].volume;
    drink.totalPrice += options[`${keyName}`].price;
    drink.totalMilkVolume += 50;
    cupSelect();
    showScreen();
  }
  if (
    keyName == "cherrysyrop" &&
    options.cherrysyrop.count != 0 &&
    drink.totalVolume < options.bigcup.value - 49 &&
    drink.totalCherrySyrVolume < 100 &&
    drink.mainDrink != ""
  ) {
    drink.totalVolume += options[`${keyName}`].volume;
    drink.totalPrice += options[`${keyName}`].price;
    drink.totalCherrySyrVolume += 50;
    cupSelect();
    showScreen();
  }
  customDrink = true;
}

function cupSelect() {
  if (drink.totalVolume <= 250 && options.middlecup.count > 0) {
    drink.selectedCup = options.middlecup;
  } else if (options.bigcup.count != 0) {
    drink.selectedCup = options.bigcup;
  }
  if (options.bigcup.count == 0 && options.middlecup.count == 0) {
    cupIs = false;
  }
}
