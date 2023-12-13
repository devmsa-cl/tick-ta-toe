const cells = [...document.querySelectorAll(".cell")];
const board = document.querySelector(".board");
const turnEl = document.querySelector(".player h2");
const playerXScore = document.querySelector(".player-x");
const playerOScore = document.querySelector(".player-o");
const winningEffectSound = document.querySelector("audio");
const playerShadowMove = document.querySelector(".cell");
const resetGamesBtn = document.querySelector("button");

const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], //  middle  column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6],
];

let playerX = "cell-x";
let playerO = "cell-o";
let winCombo = null;
let currentPlayer = playerX;
const scores = {
  playerX: 0,
  playerO: 0,
};

let isGameStarted = false;

const checkWinner = () => {
  return winningCombos.some((combo) => {
    const win = combo.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
    if (win) {
      winCombo = combo;
      return true;
    }
    return false;
  });
};

const selectCellByPlayer = (event) => {
  event.target.classList.add(currentPlayer);

  if (checkWinner()) {
    playWinningEffect();
    highlightWinCombo();
    updateScore();
    setTimeout(() => {
      resetGames();
    }, 1750);
    return;
  }

  // is the game draw

  if (isDraw()) resetGames();

  switchPlayer();
  displayCurrentPlayerUI();
};
const isDraw = () => {
  return cells.every(
    (cell) =>
      cell.classList.contains("cell-o") || cell.classList.contains("cell-x")
  );
};
const playWinningEffect = () => {
  winningEffectSound.play();
};
const stopWinningEffect = () => {
  winningEffectSound.pause();
};
const displayCurrentPlayerUI = () => {
  turnEl.textContent = currentPlayer === playerX ? "X Turn" : "O Turn";
};
const updateScoreBoardUI = () => {
  playerXScore.textContent = scores.playerX;
  playerOScore.textContent = scores.playerO;
};
const highlightWinCombo = () => {
  winCombo.forEach((index) => {
    cells[index].classList.add("highlight");
  });
};
const switchPlayer = () => {
  currentPlayer = currentPlayer === playerX ? playerO : playerX;
};
const updateScore = () => {
  scores[currentPlayer] += 1;
  scores[currentPlayer === playerX ? "playerX" : "playerO"] += 1;
  updateScoreBoardUI();
};
const resetScoreBoard = () => {
  scores["playerX"] = 0;
  scores["playerO"] = 0;
};
const resetBoard = () => {
  cells.forEach((cell) => {
    cell.classList.remove("highlight", playerO, playerX);
  });
};
const addMarkOnHover = (e) => {
  if (
    e.target.classList.contains(playerO) | e.target.classList.contains(playerX)
  )
    return;
  e.target.classList.toggle(currentPlayer === playerX ? "x" : "o");
};
const removeMarkOnOutFocus = (e) => {
  e.target.classList.remove("x", "o");
};
const resetGames = () => {
  resetBoard();
  switchPlayer();
  displayCurrentPlayerUI();
  startGame();
};

function startGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", selectCellByPlayer, { once: true });
    cell.addEventListener("mouseover", addMarkOnHover);
    cell.addEventListener("mouseleave", removeMarkOnOutFocus);
  });

  resetGamesBtn.addEventListener("click", () => {
    resetScoreBoard();
    resetBoard();
    updateScoreBoardUI();
    startGame();
  });
}

startGame();
