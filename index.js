let currentPlayer;
let player1;
let player2;

const turnPlayer = document.getElementById("turnPlayer");
const button = document.getElementById("submit");

const boxes = Array.from(document.querySelectorAll(".box"));
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let gameOver = false; 

function isGameOver() {
  return gameOver;
}

function startGame() {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;
 
  currentPlayer = player1;

  boxes.forEach((box, index) => {
    box.addEventListener("click", () => mark(index));
  });

  turnPlayer.innerText = `Turn: ${currentPlayer}`;
}

function mark(index) {
  if (isGameOver()) {
    return; 
  }
  if (player1.trim() === "" || player2.trim() === "") {
    alert("Please enter the names of both players before starting the game.");
    return;
  }

  const box = boxes[index];

  if (box.innerText === "") {
    box.innerText = currentPlayer === player1 ? "X" : "O";
    box.classList.add("boxClear");
    box.classList.remove("box");

    const row = Math.floor(index / 3);
    const col = index % 3;

    board[row][col] = currentPlayer;

    if (checkWinner(currentPlayer, row, col)) {
      
      turnPlayer.innerText = `Winner: ${currentPlayer}`;
      
      setTimeout(() => {
        gameOver = true; 
        boxes.forEach((box, index) => {
          box.removeEventListener("click", () => mark(index));
        });
        
        const winner = currentPlayer;
        const confirmation = window.confirm(`Winner: ${winner}\n\nClick OK to restart the game.`);
        if (confirmation) {
          
          resetGame();
        }
      }, 500);
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      turnPlayer.innerText = `Turn: ${currentPlayer}`;
    }
  }
}

function checkWinner(player, row, col) {
  if (
    board[row][0] === player &&
    board[row][1] === player &&
    board[row][2] === player
  ) {
    return true;
  }

  if (
    board[0][col] === player &&
    board[1][col] === player &&
    board[2][col] === player
  ) {
    return true;
  }

  if (
    (row === col &&
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) ||
    (row + col === 2 &&
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player)
  ) {
    return true;
  }

  return false;
}

function resetGame() {
  gameOver = false; 
  board.forEach((row) => row.fill(null)); 
  boxes.forEach((box) => {
    box.innerText = ""; 
    box.classList.add("box");
    box.classList.remove("boxClear");
    
  });
  
  document.getElementById("player1").value = null
  document.getElementById("player2").value = null
  turnPlayer.innerText = "";
 startGame()
 
}

button.addEventListener("click", startGame);


