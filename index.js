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
    totalPrice: 0
}

cancelButton.addEventListener('click', resetDrink)


function resetDrink() {
    drink.mainDrink = '';
    drink.optionalDrink = '';
    drink.selectedCup ='',
    drink.totalVolume = 0,
    drink.totalPrice = 0
}

mainDrinkButtons.forEach(element => {
    element.addEventListener('click', addMainDrink);
});

function addMainDrink() {
        let keyName = this.dataset.key;
        drink.mainDrink = this.dataset.key;
        drink.totalVolume = options[`${keyName}`].volume;
        drink.totalPrice = options[`${keyName}`].price;
        console.log(drink);
}