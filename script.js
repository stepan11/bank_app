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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}???`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}???`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}???`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

// Event handler
btnLogin.addEventListener('click', e => {
  // Prevent form from submitting
  e.preventDefault();
  console.log('LOGIN');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI abd message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
// checkDogs1([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs1([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//
/////////////////////////////////////////////////
// Coding Challenge 2
/*
function calcAverageHumanAge(ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(`Dogs human age: ${humanAge}`);
  const adults = humanAge.filter(dog => dog >= 18);
  console.log(`Adult dogs only : ${adults}`);
  //   return Math.trunc(
  //     adults.reduce((acc, curr) => acc + curr, 0) / adults.length
  //   );
  return Math.trunc(
    adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0)
  );
}
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

//
/////////////////////////////////////////////////
// Coding Challenge 3
/*
const calcAverageHumanAge = ages =>
  Math.trunc(
    ages
      .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
      .filter(dog => dog >= 18)
      .reduce((acc, age, i, arr) => acc + age / arr.length, 0)
  );

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

/*
// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
console.log(arr.slice());
console.log([...arr]);

// SPLICE
// console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2);
console.log(arr);

// REVERSE
arr = ['A', 'B', 'C', 'D', 'E', 'F'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));
*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited a ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// console.log('----- FOREACH -----');

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited a ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 0: function(450)
// 0: function(400)
// ...
*/

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'EUR', 'USD']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movementsUSD);
console.log(movements);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSD);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
*/

/*
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const depositsFor = [];

for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
*/
// console.log(movements);

// accumulator -> SNOWBALL
const balance = movements.reduce((acc, curr) => acc + curr, 0);

// console.log(balance);
let balance2 = 0;
for (const mov of movements) balance2 += mov;
// console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
// console.log(max);

const eurToUsd = 1.1;
// console.log(movements);

// PIPELINE
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map((mov, index, array) => {
    // console.log(array);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositUSD);

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
