let box1 = document
  .getElementById("box1")
  .addEventListener("click", mark, false);
let box2 = document
  .getElementById("box2")
  .addEventListener("click", mark, false);
let box3 = document
  .getElementById("box3")
  .addEventListener("click", mark, false);
let box4 = document
  .getElementById("box4")
  .addEventListener("click", mark, false);
let box5 = document
  .getElementById("box5")
  .addEventListener("click", mark, false);
let box6 = document
  .getElementById("box6")
  .addEventListener("click", mark, false);
let box7 = document
  .getElementById("box7")
  .addEventListener("click", mark, false);
let box8 = document
  .getElementById("box8")
  .addEventListener("click", mark, false);
let box9 = document
  .getElementById("box9")
  .addEventListener("click", mark, false);

let registPlayers = document
  .getElementById("submit")
  .addEventListener("click", registerPlayers(), false);

function registerPlayers(ev) {
  let player1 = document.getElementById("player1").value;
  let player2 = document.getElementById("player2").value;
  return console.log(player1, player2);
}
function mark(ev) {
  let target = ev.currentTarget;
  let turn = player1;

  if (turn === player1) {
    target.innerText = "X";
    target.classList.add("boxClear");
    target.classList.remove("box");
    target.removeEventListener("click", mark);
  } else {
    target.innerText = "O";
    target.classList.add("boxClear");
    target.classList.remove("box");
    target.removeEventListener("click", mark);
  }
  if (turn === player1) {
    return (turn = player2);
  }
}
teste;
dwldm;
dkwsmd;
