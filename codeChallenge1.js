'use strict';

// Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const dogsJulia_1 = [3, 5, 2, 12, 7];
const dogsKate_1 = [4, 1, 15, 8, 3];

const dogsJulia_2 = [9, 16, 6, 8, 3];
const dogsKate_2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
    const dogsJuliaCopy = dogsJulia.slice();
    dogsJuliaCopy.splice(0, 1);
    dogsJuliaCopy.splice(-2);
    //console.log(dogsJuliaCopy);
    const mergedArray = dogsJuliaCopy.concat(dogsKate);
    //console.log(mergedArray);
    mergedArray.forEach(function (value, index) {
        console.log(`Dog number ${index + 1} is an ${value >= 3 ? 'adult' : 'puppy'}, and is ${value} years old`);
    })
}
checkDogs([...dogsJulia_1], [...dogsKate_1]);
console.log('///////next data///////');
checkDogs(dogsJulia_2, dogsKate_2);


//##CodeChallenge 2
//Data 1: [5, 2, 4, 1, 15, 8, 3]
// Data 2: [16, 6, 10, 5, 6, 1, 4]

const dogsAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogsAge2 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = function (dogsAge) {
    //calculating human Ages
    const humanAges = dogsAge.map(val =>
        val <= 2 ? 2 * val : 16 + val * 4
    )
    // filtering human ages having age atleast 18 years
    const adult = humanAges.filter(val => val >= 18);

    console.log('Human Ages: ', humanAges);
    console.log('Human Ages >18 yo: ', adult);

    //Calculate the average human age
    // const avgHumanAge = adult.reduce((acc, val) => acc + val, 0) / adult.length;
    const avgHumanAge = adult.reduce((acc, val, i, arr) => acc + val / arr.length, 0);
    console.log('Average Human Age: ', avgHumanAge);

}
calcAverageHumanAge(dogsAge1);
calcAverageHumanAge(dogsAge2);


//##CodeChallenge3
const calcAverageHumanAge1 = function (dogsAge) {
    const avgHumanAge = dogsAge.map(val => val <= 2 ? 2 * val : 16 + val * 4)
        .filter(val => val >= 18)
        .reduce((acc, val, i, arr) => acc + val / arr.length, 0);
    console.log('Average human age using method chaining: ', avgHumanAge);
}
calcAverageHumanAge1(dogsAge1);
calcAverageHumanAge1(dogsAge2);


///#CodeChallenge 4
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.map(acc => acc.recommendedFood = Math.trunc(acc.weight ** 0.75 * 28));
console.log(dogs);

//2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(dogSarah);
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'}`);

//3
const ownersEatTooMuch = dogs
    .filter(dog => dog.curFood > dog.recommendedFood)
    .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);


const ownersEatTooLittle = dogs
    .filter(dog => dog.curFood < dog.recommendedFood)
    .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);


//4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat 
too little!`);


//5
const dogEatingExactAmt = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log('Dog eating exact amount of food:', dogEatingExactAmt);

//6
const checkEatingOkay = dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10);

const dogEatingOkAmt = dogs.some(checkEatingOkay);
console.log('Dog eating exact okey of food:', dogEatingOkAmt);

//7
console.log(dogs.filter(checkEatingOkay));

//8
//sort it by recommended food portion in an ascending order 
const dogsCopySorted = dogs
    .slice()
    .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopySorted);

//in sorting we take two variables, a,b and then for ascending we do a-b and for decending b-a.
//NOTE: Since here the dogs array contained objects as its elements, we use a.recommendedFood as the parameter to sort the dogs array according to the given objective/challenge