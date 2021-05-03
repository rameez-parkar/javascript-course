'use strict';

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const p1ScoreEl = document.querySelector('#score--0');
const p2ScoreEl = document.querySelector('#score--1');
const p1CurrentEl = document.querySelector('#current--0');
const p2CurrentEl = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const rollDiceEl = document.querySelector('.btn--roll');
const holdEl = document.querySelector('.btn--hold');
const newGameEl = document.querySelector('.btn--new');

let scores, currentScore, dice, activePlayer;
const winningScore = 100;


const resetGame = function() {
  scores = [0, 0];
  currentScore = 0;
  dice = 0;
  activePlayer = 1;

  p1ScoreEl.textContent = scores[0];
  p2ScoreEl.textContent = scores[1];
  p1CurrentEl.textContent = currentScore;
  p2CurrentEl.textContent = currentScore;
  rollDiceEl.disabled = false;
  holdEl.disabled = false;
  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
}

resetGame();

rollDiceEl.addEventListener('click', function() {
  rollDice();
  updateCurrentScore();
  if (dice === 1) {
    switchActivePlayer();
  }
});

holdEl.addEventListener('click', function() {
  updateScore();
  currentScore = 0;  
  scores[activePlayer-1] >= winningScore ? endGame() : switchActivePlayer();
});

newGameEl.addEventListener('click', resetGame);

function rollDice() {
  dice = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');
}

function updateCurrentScore() {
  currentScore = dice !== 1 ? currentScore + dice : 0;
  if (currentScore > 0) {
    if (activePlayer === 1) {
      p1CurrentEl.textContent = currentScore;
    }
    else {
      p2CurrentEl.textContent = currentScore;
    }
  }
}

function updateScore() {
  scores[activePlayer-1] += currentScore;
  if (activePlayer === 1) {
    p1ScoreEl.textContent = scores[activePlayer-1];
  }
  else {
    p2ScoreEl.textContent = scores[activePlayer-1];
  }
}

function endGame() {
  activePlayer === 1 ? player1.classList.add('player--winner') : player2.classList.add('player--winner');
  rollDiceEl.disabled = true;
  holdEl.disabled = true;
  diceEl.classList.add('hidden');
}

function switchActivePlayer() {
  if (activePlayer === 1) {
    activePlayer = 2;
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    p1CurrentEl.textContent = 0;
  }
  else {
    activePlayer = 1;
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    p2CurrentEl.textContent = 0;
  }
}
 