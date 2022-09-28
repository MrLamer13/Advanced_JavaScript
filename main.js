'use strict';

// 01-02----------------------------------------------------

let text = document.querySelector('.text');

document.querySelector('.btn1').addEventListener('click', () => {
    text.innerText = text.innerText.replace(/\'/g, '"');
});

document.querySelector('.btn2').addEventListener('click', () => {
    let reGexp = /\'/;
    if (reGexp.test(text.innerText)) {
        text.innerText = text.innerText.replace(/\B\'/g, '"');
    } else {
        text.innerText = text.innerText.replace(/\b\"/g, "'");
    }
});

// 03---------------------------------------------------------

class Check {
    constructor(checkError, checkErrorValue) {
        this.name = checkError;
        this.input = document.querySelector(`.${this.name}`);
        this.divText = checkErrorValue[0];
        this.reGexp = checkErrorValue[1];
        this._getCheck();
    }

    _getCheck() {
        if (!this.reGexp.test(this.input.value)) {
            this._error();
        } else {
            this._notError();
        }
    }

    _error() {
        if (!this.input.classList.contains('red')) {
            this.input.classList.add('red');
            this.input.insertAdjacentHTML('afterend', this._addError())
        }
    }

    _addError() {
        return `
        <div class="error error-${this.name}">${this.divText}</div>
        `
    }

    _notError() {
        if (this.input.classList.contains('red')) {
            this.input.classList.remove('red');
            document.querySelector(`.error-${this.name}`).remove();
        }
    }
}

const checkErrors = {
    name: [
        'Имя должно включать только русские буквы!',
        /^[а-яА-ЯёЁ]+$/
    ],
    phone: [
        'Номер телефона доолжен быть в формате +7(XXX)XXX-XXXX!',
        /^\+7\(\d{3}\)\d{3}-\d{4}$/
    ],
    email: [
        'email должен быть в виде mail@mail.ru!',
        /^([A-Za-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/
    ]
};
let formBtn = document.querySelector('.formBtn');

formBtn.addEventListener('click', () => {
    for (let checkError in checkErrors) {
        let check = new Check(checkError, checkErrors[checkError]);
    }

});