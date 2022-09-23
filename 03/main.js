'use strict';

class Hamburger {
    constructor(data) {
        this.data = data;
        this.form = document.form;
        this.formValues = {};
        this.itogPrice = 0;
        this.itogCalories = 0;
        this._getDataHamburger();
    }

    // Получить состав гамбургера 
    _getDataHamburger() {
        for (let i = 0; i < this.form.elements.length; i++) {
            let elName = this.form.elements[i].name;
            let elValue = this.form.elements[i].value;
            if (this.form[i].checked) {
                this.formValues[elName] = elValue;
            };
        }
    }

    // Узнать цену 
    calculatePrice() {
        for (let value of this.data) {
            if (value[0] in this.formValues && value[1] == this.formValues[value[0]]) {
                this.itogPrice += value[2];
            };
        }
        return this.itogPrice;
    }

    // Узнать калорийность 
    calculateCalories() {
        for (let value of this.data) {
            if (value[0] in this.formValues && value[1] == this.formValues[value[0]]) {
                this.itogCalories += value[3];
            };
        }
        return this.itogCalories;
    }

    // Сформировать строку для вывода
    render() {
        return `Стоимость: ${this.calculatePrice()} рублей. Калорийность: ${this.calculateCalories()} калорий.`;
    }
}

let button = document.querySelector('.btn');
const ITOG = document.querySelector('.itog');
const DATA = [
    ['size', 'small', 50, 20],
    ['size', 'big', 100, 40],
    ['stuffing', 'cheese', 10, 20],
    ['stuffing', 'salad', 20, 5],
    ['stuffing', 'potatoes', 15, 10],
    ['seasoning', 'on', 15, 0],
    ['mayo', 'on', 20, 5]
];
let hamburger;

button.addEventListener('click', () => {
    hamburger = new Hamburger(DATA);
    ITOG.innerHTML = hamburger.render();

});






/*
let button = document.querySelector('.btn');
const ITOG = document.querySelector('.itog');
const DATA = [
    ['size', 'small', 50, 20],
    ['size', 'big', 100, 40],
    ['stuffing', 'cheese', 10, 20],
    ['stuffing', 'salad', 20, 5],
    ['stuffing', 'potatoes', 15, 10],
    ['seasoning', 'on', 15, 0],
    ['mayo', 'on', 20, 5]
];


button.addEventListener('click', () => {
    const FORM_VALUES = {};
    let form = document.form;
    let itogPrice = 0;
    let itogCalories = 0;

    for (let i = 0; i < form.elements.length; i++) {
        let elName = form.elements[i].name;
        let elValue = form.elements[i].value;
        if (form[i].checked) {
            FORM_VALUES[elName] = elValue;
        };
    }

    for (let data of DATA) {
        if (data[0] in FORM_VALUES && data[1] == FORM_VALUES[data[0]]) {
            itogPrice += data[2];
            itogCalories += data[3];
        };
    }
    ITOG.innerHTML = `Стоимость: ${itogPrice} рублей. Калорийность: ${itogCalories} калорий`;
});
*/