import { options } from "./options.js";
const mainDrinkButtons = document.querySelectorAll('.main-drink');
const additionalDrinkButtons = document.querySelectorAll('.additional-drink')
const screen = document.querySelector('.screen');
const cancelButton = document.querySelector('.cancel-button');
const cup = document.querySelector('.cup');
const pay = document.querySelector('.paybutton');
const middleCupCounter = document.querySelector('#middlecup-count');
const bigCupCounter = document.querySelector('#bigcup-count');
const milkIndicator = document.querySelector('.milk');
const milkBankVolumePerc = options.milk.count*0.01;

let drink = {
    mainDrink: '',
    selectedCup: '',
    totalVolume: 0,
    totalMilkVolume: 0,
    totalCherrySyrVolume: 0,
    totalVanillaSyrVolume: 0,
    totalBananaSyrVolume: 0,
    totalPrice: 0
}

function logger() {
    console.log(drink, '\n', options.milk.count);
}

pay.addEventListener('click', acceptPayment);
cancelButton.addEventListener('click', resetDrink);
mainDrinkButtons.forEach(element => {
    element.addEventListener('click', addMainDrink);
});

additionalDrinkButtons.forEach(element => {
    element.addEventListener('click', addAdditionalDrink);
})


function showScreen() {
    screen.innerHTML = '';
    screen.append(` Ваш заказ - ${drink.mainDrink}.`);
    screen.append(` Объем напитка - ${drink.totalVolume}.`);
    screen.append(` Стоимость напитка - ${drink.totalPrice}.`);
    screen.append(` Стакан - ${drink.selectedCup}.`);
    screen.append(` Молоко - ${drink.totalMilkVolume}.`);
    screen.append(` Вишневый сироп - ${drink.totalCherrySyrVolume}.`);
    screen.append(` Ванильный сироп - ${drink.totalVanillaSyrVolume}.`);
    screen.append(` Банановый сироп - ${drink.totalBananaSyrVolume}`);
    middleCupCounter.innerHTML = options.middlecup.count;
    bigCupCounter.innerHTML = options.bigcup.count;
}

function acceptPayment() {
    options.cherrysyrop.count -= drink.totalMilkVolume;
    options.bananasyrop.count -= drink.totalBananaSyrVolume;
    options.vanillasyrop.count -= drink.totalVanillaSyrVolume;
    options.milk.count -= drink.totalMilkVolume;
    if (drink.selectedCup == 'middlecup'){
        options.middlecup.count--;
    } else {
        options.bigcup.count--;
    }
    resetDrink();
    middleCupCounter.innerHTML = options.middlecup.count;
    bigCupCounter.innerHTML = options.bigcup.count;
    milkIndicator.style.height = `${(options.milk.count/(milkBankVolumePerc)) - (drink.totalMilkVolume/(milkBankVolumePerc))}%`;
}

function resetDrink() {
    drink.mainDrink = '';
    drink.selectedCup = '';
    drink.totalVolume = 0;
    drink.totalMilkVolume = 0;
    drink.totalCherrySyrVolume = 0;
    drink.totalVanillaSyrVolume = 0;
    drink.totalBananaSyrVolume = 0;
    drink.totalPrice = 0;
    screen.innerHTML = '';
}


function addMainDrink() {
    resetDrink();
    let keyName = this.dataset.key;
    drink.mainDrink = this.dataset.key;
    drink.totalVolume = options[`${keyName}`].volume;
    drink.totalPrice = options[`${keyName}`].price;
    if (keyName == 'bananalatte') {
        drink.totalBananaSyrVolume += 50;
    }
    if (keyName == 'vanillaсappuccino') {
        drink.totalVanillaSyrVolume += 50;
    }
    if (keyName == 'latte') {
        drink.totalMilkVolume += 100;
    }
    if (keyName == 'сappuccino') {
        drink.totalMilkVolume += 80;
    }
    if (keyName == 'flatwhite') {
        drink.totalMilkVolume += 120;
    }
    cupSelect();
    showScreen()
    logger();
}

function addAdditionalDrink() {
    let keyName = this.dataset.key;
    if (keyName == 'milk' && options.milk.count != 0 && drink.totalVolume < options.bigcup.value - 49) {
        drink.totalVolume += options[`${keyName}`].volume;
        drink.totalPrice += options[`${keyName}`].price;
        drink.totalMilkVolume += 50;
        cupSelect();
        showScreen();
        if (drink.mainDrink != '') {
            switch (drink.totalMilkVolume) {
                case 1:
                    screen.append(` с одной порцией молока.`);
                    break;
                case 2:
                    screen.append(` с двумя порциями молока.`);
                    break;
                case 3:
                    screen.append(` с тремя порциями молока.`);
                    break;
                case 4:
                    screen.append(` с четырмя порциями молока.`);
                    break;
                case 5:
                    screen.append(` с пятью порциями молока.`);
                    break;
            }
        } else {
            switch (drink.totalMilkVolume) {
                case 1:
                    screen.innerHTML = 'Одна порция молока.';
                    break;
                case 2:
                    screen.innerHTML = 'Две порции молока.';
                    break;
                case 3:
                    screen.innerHTML = 'Три порции молока.';
                    break;
                case 4:
                    screen.innerHTML = 'Четыре порции молока.';
                    break;
                case 5:
                    screen.innerHTML = 'Пять порций молока.';
                    break;
                case 6:
                    screen.innerHTML = 'Шесть порций молока.';
                    break;
                case 7:
                    screen.innerHTML = 'Семь порций молока.';
                    break;
            }
        }
    }
    if (keyName == 'cherrysyrop' && options.cherrysyrop.count != 0 && drink.totalVolume < options.bigcup.value - 49 && drink.totalCherrySyrVolume < 100 && drink.mainDrink != '') {
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
    if (drink.totalVolume <= 250) {
        drink.selectedCup = 'middlecup';
    } else {
        drink.selectedCup = 'bigcup';
    }
}