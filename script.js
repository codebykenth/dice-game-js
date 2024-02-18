'use strict';

/* OWN METHOD
// Selecting element
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
let player0Score = 0;
let player1Score = 0;
let playerTurn = 0;

// Starting conditions
score0El.textContent = player0Score;
score1El.textContent = player1Score;
diceEl.classList.add('hidden');

const displayCurrentScore = function (currentScore) {
  if (playerTurn % 2 === 0) {
    current0El.textContent = currentScore;
  } else {
    current1El.textContent = currentScore;
  }
};

const addPlayerScore = function (playerTurn) {
  // Add current score to total score
  if (playerTurn % 2 === 0) {
    player0Score += currentScore;
    score0El.textContent = player0Score;
  } else {
    player1Score += currentScore;
    score1El.textContent = player1Score;
  }
};

// Player win condition
const playerWin = function (playerTurn) {
  if (playerTurn % 2 === 0) {
  } else {
  }
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');

  // 3. Check for rolled 1:
  diceEl.src = `dice-${dice}.png`; // Random dice image

  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    displayCurrentScore(currentScore);
  } else {
    // Switch to next player
    currentScore = 0;
    displayCurrentScore(currentScore);
    playerTurn++;
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (player0Score <= 100 && player1Score <= 100) {
    // Game continues
    addPlayerScore(playerTurn);
  } else {
    // Player wins
    playerWin(playerTurn);
  }
  currentScore = 0;
  displayCurrentScore(currentScore);
  playerTurn++;
});

// New game functionality
btnNew.addEventListener('click', function () {
  // Set all scores to 0
  player0Score = 0;
  player1Score = 0;
  currentScore = 0;
  score0El.textContent = player0Score;
  score1El.textContent = player1Score;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  // Set player 1 as starting player
  playerTurn = 0;
});
*/

'use strict';

// Selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing, scores, currentScore, activePlayer = 0;

// Starting conditions
const init = function () {
    playing = true;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

    scores = [0, 0];
 currentScore = 0;

activePlayer = 0; 
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');

    // 3. Check for rolled 1:
    diceEl.src = `dice-${dice}.png`; // Random dice image

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
