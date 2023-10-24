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

let gameOver = false; // Variável para rastrear o estado do jogo

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
    return; // O jogo já terminou, não faça nada
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
      // Exibir o último clique antes do popup
      turnPlayer.innerText = `Winner: ${currentPlayer}`;
      // Aguardar por um breve momento antes de exibir o popup
      setTimeout(() => {
        gameOver = true; // Define o estado do jogo para terminado
        boxes.forEach((box, index) => {
          box.removeEventListener("click", () => mark(index));
        });
        // Exibir um popup com o nome do jogador vencedor
        const winner = currentPlayer;
        const confirmation = window.confirm(`Winner: ${winner}\n\nClick OK to restart the game.`);
        if (confirmation) {
          // Reiniciar o jogo
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
  gameOver = false; // Reinicia o estado do jogo
  board.forEach((row) => row.fill(null)); // Limpa o tabuleiro
  boxes.forEach((box) => {
    box.innerText = ""; // Limpa o conteúdo das caixas
    box.classList.add("box");
    box.classList.remove("boxClear");
  });
  // Limpa os inputs e o turnPlayer
  document.getElementById("player1").value = "";
  document.getElementById("player2").value = "";
  turnPlayer.innerText = "";
  startGame(); // Inicia um novo jogo
}

button.addEventListener("click", startGame);

startGame();
