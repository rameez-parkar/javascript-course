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
let currentAccount;
let isSorted = false;

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

const displayMovements = function(movements, sort=false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a,b) => a-b): movements;
  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calculateDisplayBalance = function(account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account?.balance}€`;
}

const calculateDisplaySummary = function(account) {
  const deposits = account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${deposits}€`;

  const withdrawals = account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

  const interests = account.movements.filter(mov => mov > 0).map(mov => mov*(account.interestRate/100)).filter(int => int >= 1).reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interests}€`;
}

const updateUI = function(currentAccount) {
  displayMovements(currentAccount?.movements);
  calculateDisplayBalance(currentAccount);
  calculateDisplaySummary(currentAccount);
}

const createUsername = function(accounts) {
  accounts.forEach((account) => {
    const username = account.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
    account.username = username;
  });
}
createUsername(accounts);

btnLogin.addEventListener('click', function(e) {
  e.preventDefault();

  currentAccount = accounts.find((account) => account.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = inputLoginPin.value = '';
    labelWelcome.textContent = `Welcome back, ${currentAccount?.owner?.split(' ')[0]}`;
    updateUI(currentAccount);
    containerApp.style.opacity = 1;
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const transferAccount = accounts.find(account => account.username === inputTransferTo.value);
  if (transferAccount && transferAccount.username !== currentAccount.username && transferAmount > 0 && transferAmount <= currentAccount.balance) {
    inputTransferAmount.value = inputTransferTo.value = '';
    transferAccount?.movements?.push(transferAmount);
    currentAccount?.movements?.push(-transferAmount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if(loanAmount > 0 && currentAccount?.movements?.some(mov => mov >= (0.1*loanAmount))) {
    inputLoanAmount.value = '';
    currentAccount?.movements?.push(loanAmount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  const closeAccount = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);
  if (closeAccount === currentAccount.username && closePin === currentAccount.pin) {
    inputCloseUsername.value = inputClosePin.value = '';
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !isSorted);
  isSorted = !isSorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
