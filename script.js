const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");
const newGameButton = document.getElementById("newGame");
let currentPlayer = "X";
let isGameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (e) => {
  const cell = e.target;
  const index = parseInt(cell.getAttribute("data-index"));

  if (cell.textContent !== "" || !isGameActive) return;

  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    showResult(`Player ${currentPlayer} wins!`);
    isGameActive = false;
    return;
  }
  if (checkDraw()) {
    showResult("It's a draw!");
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s Turn`;
};

const checkWin = (player) => {
  return winningCombos.some((combo) => {
    return combo.every((index) => {
      return cells[index].textContent === player;
    });
  });
};

const checkDraw = () => {
  return [...cells].every((cell) => {
    return cell.textContent !== "";
  });
};

const showResult = (msg) => {
  gameScreen.style.display = "none";
  resultScreen.style.display = "block";
  resultMessage.textContent = msg;
};

const restartGame = () => {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  currentPlayer = "X";
  isGameActive = true;
  message.textContent = "Player X's Turn";
  gameScreen.style.display = "block";
  resultScreen.style.display = "none";
};

cells.forEach((cell, index) => {
  cell.setAttribute("data-index", index);
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
newGameButton.addEventListener("click", restartGame);
