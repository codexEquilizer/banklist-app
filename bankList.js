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
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

//console.log(movements);
// console.log(movementsUSD);


const movementsDescription = movements.map((movement, i) =>

    `Movement ${i + 1}: ${movement > 0 ? 'Credited' : 'Debited'} amt ${movement}`
);

// console.log(movementsDescription);




//inserting movements rows into the movement container.
const displayMovements = function (movements, sort = false) {
    //emptying the already existing movement-rows
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, index) {

        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
            <div class="movements__value">${mov}€</div>
        </div> `;
        //console.log(html);
        //addin the html to the movements--row
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
//displayMovements(account1.movements);


//computing usernames to the object:
//iterating the entire accounts array, and then iterating the account1,account2... objects to add a username to each object
const createUserNames = function (accounts) {   //accounts
    accounts.forEach(function (acc) {   //account1, account 2, account 3, account 4
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');              // js, jd, stw, ss
    });
}

createUserNames(accounts);
console.log(accounts);


//filtering out all the -ve values of movements
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

//filtering out all the +ve values of movements
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);



//calculating the entire balance of the account. NOTE: balance will not be an array but a variable having single value since we are using reduce method to reduce the movements array.
// acc--> this is a accumulator.
// We have this only in reduce method.
const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce(function (acc, mov) {
        return acc + mov;
    }, 0);  // here when we use 0, then we are initializing the accumulator
    labelBalance.textContent = `${acc.balance} EUR`;
}
//calcDisplayBalance(account1.movements);

//Maximum value using reduce method
const max = movements.reduce(function (acc, mov) {
    return acc > mov ? acc : mov;
}, movements[0]);
console.log(max);


//PIPELINE (method chaining)
//Calculate the total deposit
const totalDepositsUSD = movements.filter(mov => mov > 0)
    .map(mov => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);


//display summary
const calcDisplaySummary = function (acc) {
    const income = acc.movements.filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${income}€`;

    const outcome = acc.movements.filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(outcome)}€`;

    const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter(int => int >= 1).reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`

}
//calcDisplaySummary(accounts);


//updating UI function
const updateUI = function (acc) {
    //Display Movements
    displayMovements(acc.movements);
    //Display balance
    calcDisplayBalance(acc);
    //Display summary
    calcDisplaySummary(acc);
}



//Event Handlers Login
let currentAccount;
btnLogin.addEventListener('click', function (e) {
    e.preventDefault(); //Preventing form from submitting
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        console.log('LOGIN');
        //Display the UI welcome message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;    //fistname of the user

        containerApp.style.opacity = 100;

        //clear the input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        //update UI
        updateUI(currentAccount);

        //Start logout timer
    }
});



//Transfer funds
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);

    //finding the reciever account username to which i want to transfer amount.
    const recieverAcc = accounts.find(acc =>
        acc.username === inputTransferTo.value
    )
    // console.log(amount, recieverAcc);

    // console.log(currentAccount);

    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();

    if (amount > 0 &&
        recieverAcc &&
        amount <= currentAccount.balance &&
        recieverAcc?.username !== currentAccount.username) {

        console.log('Transfer valid');

        //add a -ve movement to the current user
        currentAccount.movements.push(-amount);
        //add +ve movement to the reciepent
        recieverAcc.movements.push(amount);

        //update ui
        updateUI(currentAccount);
    }


});



//Request Loan
btnLoan.addEventListener('click', (e) => {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    //loan condition
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.10)) {
        console.log('Loan sanctioned');

        //add +ve movement to the current data
        currentAccount.movements.push(amount);

        //update UI
        updateUI(currentAccount);
    }
})









//Close account
btnClose.addEventListener('click', function (e) {
    e.preventDefault();


    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        //finding the index to be deleted
        const index = accounts.findIndex(acc =>
            acc.username === currentAccount.username
        )
        console.log(index);

        //deleting the account
        accounts.splice(index, 1);

        //hide UI
        containerApp.style.opacity = 0;
        labelWelcome.textContent = 'Log in to get started';
    }

    inputCloseUsername.value = inputClosePin.value = '';

})


//sort functionality
let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});