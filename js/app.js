/*-------------------------------- Constants --------------------------------*/
const winningCombinations = [
  //rows
  { combo: [0, 1, 2] },
  { combo: [3, 4, 5] },
  { combo: [6, 7, 8] },
  //columns
  { combo: [0, 3, 6] },
  { combo: [1, 4, 7] },
  { combo: [2, 5, 8] },
  //diagonals
  { combo: [0, 4, 8] },
  { combo: [2, 4, 6] },
]

/*---------------------------- Variables (state) ----------------------------*/

const tiles = document.querySelectorAll(".tile")
const playerX = "X";
const playerO = "O";
let turn = playerX;

/*------------------------ Cached Element References ------------------------*/

const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");

/*----------------------------- Event Listeners -----------------------------*/

tiles.forEach(tile => tile.addEventListener('click', tileClick)); //event handler

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = [
    null, null, null,
    null, null, null,
    null, null, null
  ]

  turn = 1
  playerX = 1
  playerO = -1
  winner = null
  render()
}

const boardState = Array(tiles.length);
boardState.fill(null);

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }
  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText !== "") {
    return;
  }
  if (turn === playerX) {
    tile.innerText = playerX;
    boardState[tileNumber] = playerX;
    turn = playerO;
  }
  else {
    tile.innerText = playerO;
    boardState[tileNumber] = playerO
    turn = playerX
  }
  getWinner();
}

function getWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo } = winningCombination;
    const tileValue1 = boardState[combo[0]];
    const tileValue2 = boardState[combo[1]];
    const tileValue3 = boardState[combo[2]];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      gameOverScreen(tileValue1);
      return;
    }
  }

  //Check for a draw
  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "It seems we have a draw!";
  if (winnerText != null) {
    text = `Player ${winnerText} won!`;
    confetti.start(2000)
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

function startNew() {
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach(tile => (tile.innerText = ""));
  turn = playerX;
}

