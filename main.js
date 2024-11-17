//Variable Declarations
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartBtn");
const winConditions = [
  //Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diag
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initGame();

function initGame() {
  //Assigns callback functions for click events and sets running to true
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn.`;
  running = true;
}
function cellClicked() {
  //Assigns cellIndex from cellIndex attribute ex: 1,2,3 etc..
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn.`;
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    //Gets Iterates through each win condition assigning them to cellA cellB cellC
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  cells.forEach((cell) => (cell.textContent = ""));
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s turn.`;
  running = true;
}
