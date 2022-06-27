'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2022-06-20T17:01:17.194Z',
        '2022-06-22T23:36:17.929Z',
        '2022-06-26T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2022-06-20T17:01:17.194Z',
        '2022-06-22T23:36:17.929Z',
        '2022-06-24T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

//////////////////////FUNCTIONS

//creating user name for the owner
const getUserName = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner                //acc.owner === 'Jonas Schmedtmann'
            .toLowerCase().split(' ')
            .map(val => val[0]).join('');
    })
}
getUserName(accounts);
console.log(accounts);

//movement date
const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return `Today`;
    else if (daysPassed === 1) return `Yesterday`;
    else if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
        // const day = `${date.getDate()}`.padStart(2, 0);
        // const month = `${date.getMonth()}`.padStart(2, 0);
        // const year = `${date.getFullYear()}`.padStart(2, 0);
        // return `${date}/${month}/${year}`
        return new Intl.DateTimeFormat(locale).format(date);
    }

}

//movement currency
const formatCur = function (value, locale, cur) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: cur
    }).format(value);
}



//inserting movements to the container movements
const displayMovements = function (acc, sort = false) {

    //removing the already existing movements
    containerMovements.textContent = ``;

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach((mov, index) => {


        //date formatted
        const date = new Date(acc.movementsDates[index]);
        const displayDate = formatMovementDate(date, acc.locale);

        //currency formatted
        const formatedMov = formatCur(mov, acc.locale, acc.currency);

        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>        
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatedMov}</div>
        </div>`

        containerMovements.insertAdjacentHTML('afterbegin', html);
    })

}



//calculating balance
const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acu, mov) => acu + mov, 0);
    labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
}
// calcDisplayBalance(account1);


//calculate Summary
const calcDisplaySummary = function (acc) {
    const income = acc.movements
        .filter(mov => mov > 0)
        .reduce((acu, mov) => acu + mov, 0);
    labelSumIn.textContent = formatCur(income, acc.locale, acc.currency);

    const outcome = acc.movements
        .filter(mov => mov < 0)
        .reduce((acu, mov) => acu + mov, 0);
    labelSumOut.textContent = formatCur(outcome, acc.locale, acc.currency);

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => deposit * acc.interestRate / 100)
        .filter(int => int >= 1)
        .reduce((acu, int) => acu + int, 0);
    labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}
// calcDisplaySummary(account1);


//Update UI
const updateUI = function (acc) {
    //display movements
    displayMovements(acc, sorted);

    //calculate balance
    calcDisplayBalance(acc);

    //calulate summary
    calcDisplaySummary(acc);
}

//timer
const startLogoutTimer = function () {

    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(Math.trunc(time % 60)).padStart(2, 0);

        //In each call, print the remaining time to UI
        labelTimer.textContent = `${min}:${sec}`;

        //if timer=0 then logout user
        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = `Log in to get started`;
            containerApp.style.opacity = 0;
        }

        //Decrease 1 second
        time--;
    }

    //set time to 5 mins
    let time = 300;

    tick();
    const timer = setInterval(tick, 1000);
    return timer;
}


/////////////////////EVENT Handlers

let currentAccount, timer;

//login event
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

    if (currentAccount?.pin === +inputLoginPin.value) {
        //display UI with welcome message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(` `)[0]}`
        containerApp.style.opacity = 100;

        //date
        const curDate = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }

        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(curDate);


        //clearing the login creds
        inputLoginUsername.value = inputLoginPin.value = ``;
        inputLoginPin.blur();

        //start/restart timer
        if (timer) clearInterval(timer);
        timer = startLogoutTimer();

        //update UI
        updateUI(currentAccount);
    }

});


//Transfer funds
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    //storing the amount
    const amount = +inputTransferAmount.value;

    //reciever's account
    const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    // console.log(recieverAcc);

    //clearing the trasnfer creds
    inputTransferAmount.value = inputTransferTo.value = ``;

    //check if transfer to user is valid
    if (amount > 0 &&
        recieverAcc &&
        amount <= currentAccount.balance &&
        recieverAcc?.username !== currentAccount.username) {

        console.log(`Transfer valid`);
        //add -ve movement to the current user
        currentAccount.movements.push(-amount);

        //add +ve movement to the recieptant
        recieverAcc.movements.push(+amount);

        //add transfer dates
        currentAccount.movementsDates.push(new Date().toISOString());
        recieverAcc.movementsDates.push(new Date().toISOString);

        //update the ui
        updateUI(currentAccount);

        //reset timer
        clearInterval(timer);
        timer = startLogoutTimer();

    }
});


//Request loan
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    //loan amount
    const loanAmt = +inputLoanAmount.value;


    //check if any deposit is >10% of request
    if (loanAmt > 0 && currentAccount.movements.some(mov => mov > loanAmt * 0.10)) {

        setTimeout(function () {
            console.log(`Loan sanctioned`);
            //adding +ve movement to the current user
            currentAccount.movements.push(loanAmt)

            //add Loan date
            currentAccount.movementsDates.push(new Date().toISOString());

            //update ui
            updateUI(currentAccount)

            //reset timer
            clearInterval(timer);
            timer = startLogoutTimer();

        }, 3000)
    }

    //clearing the loan amount
    inputLoanAmount.value = ``;

});


//Close account
btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    //check correct credentials
    if (currentAccount?.username === inputCloseUsername.value && currentAccount?.pin === +inputClosePin.value) {

        //find the index of current user
        const index = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
        console.log(index);

        //delete user form data
        accounts.splice(index, 1);

        //hide UI
        containerApp.style.opacity = 0;
        labelWelcome.textContent = 'Log in to get started';
    }
    //clearing the close creds
    inputCloseUsername.value = inputClosePin.value = ``;
});


//sorting movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});