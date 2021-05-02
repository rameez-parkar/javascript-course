'use strict';

const min = 1;
const max = 20;
let target = setRandomTarget();
let userInput = 0;
let score = max;
let highScore = 0;

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const input = document.querySelector('.guess');
const message = document.querySelector('.message');
const scoreText = document.querySelector('.score');
const highScoreText = document.querySelector('.highscore');
const targetText = document.querySelector('.number');
const body = document.querySelector('body');

checkButton.addEventListener('click', function() {
  if (isInputValid()) {
    updateScore();
  }
  else {
    message.textContent = `Invalid input😐 Please enter a number between ${min} and ${max}`;
  }
});

againButton.addEventListener('click', function() {
  resetGame();
});

function setRandomTarget() {
  return Math.floor(Math.random() * (max-min+1) + min);
}

function isInputValid() {
  const value = Number(input.value);
  if (value && value >= min && value <= max) {
    userInput = value;
    return true;
  }
  return false;
}

function updateScore() {
  if (userInput === target) {
    message.textContent = `BINGO! You got it right!🎊`;
    body.style.backgroundColor = '#60b347';
    endGame();
  }
  else {
    score -= 1;
    scoreText.textContent = `${score}`;
    if (score > 0) {
      message.textContent = userInput < target ? `Guess higher...` : `Guess Lower...`;
    }
    else {
      message.textContent = `You lost the game...😢`;
      body.style.backgroundColor = '#ED0800';
      endGame();
    }
  }
}

function resetGame() {
  target = setRandomTarget();
  targetText.textContent = '?';
  checkButton.disabled = false;
  input.readOnly = false;
  input.value = '';
  message.textContent = 'Start guessing...';
  highScoreText.textContent = `${highScore}`;
  score = max;
  scoreText.textContent = `${score}`;
  body.style.backgroundColor = '#222';
}

function endGame() {
  targetText.textContent = target;
  checkButton.disabled = true;
  input.readOnly = true;
  updateHighScore();
  highScoreText.textContent = `${highScore}`;
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
  }
}