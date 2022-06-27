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
// LECTURES

/*

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE --> This method does not mutate the original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

//in oder to create a shallow copy of array, use slice method or spread operator
console.log(arr.slice()); //['a', 'b', 'c', 'd', 'e'];
console.log([...arr]); //['a', 'b', 'c', 'd', 'e'];


//SPLICE  --> Works exactly as SLICE method but this method mutate the original array 
console.log(arr.splice(2));
console.log('Original array mutated:', arr);


//REVERSE --> This method, reverse the array and mutate the originl array.
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT  --> This method does not mutate the original array.
const letter = arr.concat(arr2);
console.log(letter);

//JOIN  --> This method joins the array into a string.
console.log(letter.join('-'));

*/
/*


//AT method. ES2020 (This method works with both array and string)
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

//getting last array element
console.log(arr[arr.length - 1]);
console.log('Slice method', arr.slice(-1)[0]);
console.log('AT method', arr.at(-1));

//works on string
console.log('jonas'.at(0));
console.log('jonas'.at(-1));



*/
/*


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//useing for-of method
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i}: Credited amt ${movement}`);
  } else {
    console.log(`Movement ${i}: Debited amt ${Math.abs(movement)}`);
  }
}

//using forEach method
//forEach is a higher-order function which have a argument as a function.
console.log('----------FOR EACH-----------');
movements.forEach(function (movement, i) {  //NOTE: in forEach the arguments passed is always in perticular order --> 1st is value, 2nd is index and 3rd is array
  if (movement > 0) {
    console.log(`Movement ${i}: Credited amt ${movement}`);
  } else {
    console.log(`Movement ${i}: Debited amt ${Math.abs(movement)}`);
  }
});

//NOTE: We cannot use break by using forEach loop.


//forEach with MAP
console.log('----------forEach with MAP-----------');
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//forEach with SET
console.log('----------forEach with SET-----------');
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${_}: ${value}`);
});

//NOTE: Since set doesn't have key so both for key and value, value would be return.

//Over here, we are using '_' instead of key as we know that '_' is a throwaway varible which is not necessary.

*/
/*


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

const movementsUSDArrow = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSDArrow);


const movementsDescription = movements.map((movement, i) =>

  `Movement ${i + 1}: ${movement > 0 ? 'Credited' : 'Debited'} amt ${movement}`
);

console.log(movementsDescription);


// Find method
const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);


//some() method
//EQUALITY
console.log(movements.includes(-130));

//CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);



//every() method
console.log(movements.every(mov => mov > 0)); //false since it is checking for every element to be greater than 0
console.log(account4.movements.every(mov => mov > 0));  //true since every element in the array is a +ve number


//flat() function
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep);
console.log(arrDeep.flat(2)); //for 2nd level of nesting we are using 2

//Example:
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((accu, mov) => accu + mov, 0);
console.log(overallBalance);


//flatMap() method
const overallBalance1 = accounts
  .flatMap(acc => acc.movements)    //combines the flat and map method for better performance
  .reduce((accu, mov) => accu + mov, 0);
console.log(overallBalance);


*/



/////////////////////Sort() method
//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());


//Numbers
console.log(account1.movements);
//console.log(account1.movements.sort());

//here a and be are the consecutive numbers in the array.

//return < 0,  A , B  (keep order)
//return > 0,  B , A  (switch order)
// account1.movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   }
//   if (a < b) { return -1; }
// });

account1.movements.sort((a, b) => a - b);
console.log(account1.movements);

account1.movements.sort((a, b) => b - a);
console.log(account1.movements);


// Practicing array methods.
//1.
const bankDepositSum = accounts.flatMap(acc => acc.movements).reduce((accu, mov) => accu + mov, 0)
console.log(bankDepositSum);

//2.
// const countDeposits = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(countDeposits);

//doing the above ex in another way
const countDeposits = accounts
  .flatMap(acc => acc.movements)
  .reduce((accu, cur) => cur >= 1000 ? ++accu : accu, 0);
console.log(countDeposits);

//3.

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce((accu, cur) => {
    // cur > 0 ? (accu.deposits += cur) : (accu.withdrawals += cur)
    accu[cur > 0 ? 'deposits' : 'withdrawals'] += cur
    return accu;
  },
    { deposits: 0, withdrawals: 0 });

console.log(sums);


//4.
const firstLetterCapital = firstLetter => firstLetter[0].toUpperCase() + firstLetter.slice(1);

const converTitleCase = function (title) {
  const exceptions = ['and', 'a', 'an', 'the', 'but', 'or', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return firstLetterCapital(titleCase);


}
console.log(converTitleCase('this is a nice title'));
console.log(converTitleCase('this is a LONG title but not too long'));
console.log(converTitleCase('and here is another title with an EXAMPLE'));