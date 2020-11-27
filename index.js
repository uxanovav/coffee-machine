import { options } from "./options.js";
const mainDrinkButtons = document.querySelectorAll('.main-drink');
const additionalDrinkButtons = document.querySelectorAll('.additional-drink')
const screen = document.querySelector('.screen');
const cancelButton = document.querySelector('.cancel-button');
const cup = document.querySelector('.cup');

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
cancelButton.addEventListener('click', resetDrink)

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

mainDrinkButtons.forEach(element => {
    element.addEventListener('click', addMainDrink);
});

additionalDrinkButtons.forEach(element => {
    element.addEventListener('click', addAdditionalDrink);
})

function addMainDrink() {
    resetDrink();
    let keyName = this.dataset.key;
    drink.mainDrink = this.dataset.key;
    drink.totalVolume = options[`${keyName}`].volume;
    drink.totalPrice = options[`${keyName}`].price;
    cupSelect();
    showScreen()
    logger();
}

function addAdditionalDrink() {
    let keyName = this.dataset.key;
    if (keyName == 'milk' && options.milk.count != 0 && drink.totalVolume < options.bigcup.value - 49) {
        drink.totalVolume += options[`${keyName}`].volume;
        drink.totalPrice += options[`${keyName}`].price;
        drink.totalMilkVolume++;
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
    if (keyName == 'cherrysyrop' && options.cherrysyrop.count != 0 && drink.totalVolume < options.bigcup.value - 49 && drink.totalCherrySyrVolume < 2 && drink.mainDrink != '') {
        drink.totalVolume += options[`${keyName}`].volume;
        drink.totalPrice += options[`${keyName}`].price;
        drink.totalCherrySyrVolume++;
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
    cup.innerHTML = `Средние стаканы - ${options.middlecup.count}. Большие стаканы - ${options.bigcup.count}`;
}