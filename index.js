import { options } from "./options.js";
const mainDrinkButtons = document.querySelectorAll(".main-drink");
const additionalDrinkButtons = document.querySelectorAll(".additional-drink");
const screen = document.querySelector(".screen");
const cancelButton = document.querySelector(".cancel-button");
const cup = document.querySelector(".cup");
const pay = document.querySelector(".paybutton");
const middleCupCounter = document.querySelector("#middlecup-count");
const bigCupCounter = document.querySelector("#bigcup-count");
const milkIndicator = document.querySelector(".milk");
const milkBankVolumePerc = options.milk.count * 0.01;
const cherryIndicator = document.querySelector(".cherry");
const cherryBankVolumePerc = options.cherrysyrop.count * 0.01;
const vanillaIndicator = document.querySelector(".vanilla");
const vanillaBankVolumePerc = options.vanillasyrop.count * 0.01;
const bananaIndicator = document.querySelector(".banana");
const bananaBankVolumePerc = options.bananasyrop.count * 0.01;
var cupIs = true;

milkIndicator.innerHTML = `${options.milk.count}мл`;
bananaIndicator.innerHTML = `${options.bananasyrop.count}мл`;
cherryIndicator.innerHTML = `${options.cherrysyrop.count}мл`;
vanillaIndicator.innerHTML = `${options.vanillasyrop.count}мл`;

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
    createDrink();
    resetDrink();
    showOptionChange();
  }
}

function showOptionChange() {
  middleCupCounter.innerHTML = options.middlecup.count;
  bigCupCounter.innerHTML = options.bigcup.count;
  milkIndicator.style.height = `${
    options.milk.count / milkBankVolumePerc -
    drink.totalMilkVolume / milkBankVolumePerc
  }%`;
  milkIndicator.innerHTML = `${options.milk.count}мл`;
  bananaIndicator.style.height = `${
    options.bananasyrop.count / bananaBankVolumePerc -
    drink.totalBananaSyrVolume / bananaBankVolumePerc
  }%`;
  bananaIndicator.innerHTML = `${options.bananasyrop.count}мл`;
  cherryIndicator.style.height = `${
    options.cherrysyrop.count / cherryBankVolumePerc -
    drink.totalCherrySyrVolume / cherryBankVolumePerc
  }%`;
  cherryIndicator.innerHTML = `${options.cherrysyrop.count}мл`;
  vanillaIndicator.style.height = `${
    options.vanillasyrop.count / vanillaBankVolumePerc -
    drink.totalVanillaSyrVolume / vanillaBankVolumePerc
  }%`;
  vanillaIndicator.innerHTML = `${options.vanillasyrop.count}мл`;
}

function createDrink() {
  options.cherrysyrop.count -= drink.totalCherrySyrVolume;
  options.bananasyrop.count -= drink.totalBananaSyrVolume;
  options.vanillasyrop.count -= drink.totalVanillaSyrVolume;
  options.milk.count -= drink.totalMilkVolume;
  checkStatus();
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
}

function checkStatus() {
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
  }
  if (keyName == "vanillaсappuccino") {
    drink.totalVanillaSyrVolume += 50;
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
}

function addAdditionalDrink() {
  checkStatus();
  let keyName = this.dataset.key;
  if (
    keyName == "milk" &&
    options.milk.count != 0 &&
    drink.totalVolume < options.bigcup.value - 49
  ) {
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
    switch (drink.totalCherrySyrVolume) {
      case 1:
        screen.append(` с одной порцией вишневого сиропа.`);
        break;
      case 2:
        screen.append(` с двумя порциями вишневого сиропа.`);
        break;
    }
  }
  logger();
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
