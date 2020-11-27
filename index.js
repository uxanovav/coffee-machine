import {options} from "./options.js";
const mainDrinkButtons = document.querySelectorAll('.main-drink');
const additionalDrinkButtons = document.querySelectorAll('.additional-drink')
const screen = document.querySelector('.screen');
const cancelButton = document.querySelector('.cancel-button');
const cup = document.querySelector('.cup');

let drink = {
    mainDrink: '',
    optionalDrink: '',
    selectedCup: '',
    totalVolume: 0,
    totalMilkVolume: 0, //
    totalSyropVolume: 0,//
    totalPrice: 0
}

cancelButton.addEventListener('click', resetDrink)


function resetDrink() {
    drink.mainDrink = '';
    drink.optionalDrink = '';
    drink.selectedCup ='';
    drink.totalVolume = 0;
    drink.totalPrice = 0;
    screen.innerHTML = `Объем напитка - ${drink.totalVolume}.  Стоимость напитка - ${drink.totalPrice}. Стакан - ${drink.selectedCup}`;
}

mainDrinkButtons.forEach(element => {
    element.addEventListener('click', addMainDrink);
});

additionalDrinkButtons.forEach(element => {
    element.addEventListener('click', addAdditionalDrink);
})

function addMainDrink() {
        let keyName = this.dataset.key;
        drink.mainDrink = this.dataset.key;
        drink.totalVolume = options[`${keyName}`].volume;
        drink.totalPrice = options[`${keyName}`].price;
        cupSelect();
        screen.innerHTML = `Объем напитка - ${drink.totalVolume}.  Стоимость напитка - ${drink.totalPrice}. Стакан - ${drink.selectedCup}`;
    }

function addAdditionalDrink() {
    let keyName = this.dataset.key;
    drink.totalVolume += options[`${keyName}`].volume;
    drink.totalPrice += options[`${keyName}`].price;
    cupSelect();
    screen.innerHTML = `Объем напитка - ${drink.totalVolume}.  Стоимость напитка - ${drink.totalPrice}. Стакан - ${drink.selectedCup}`;
}

function cupSelect(){
    if (drink.totalVolume == 250){
        drink.selectedCup = 'middlecup';
    } else {
        drink.selectedCup = 'bigcup';
    }
    cup.innerHTML = `Средние стаканы - ${options.middlecup.count}. Большие стаканы - ${options.bigcup.count}`;
}