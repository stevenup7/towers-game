import Game from "./game.js";

let game = new Game();

function startGame() {
  let numTowers = parseInt(document.getElementById("numTowers").value, 0);
  let numDisks = parseInt(document.getElementById("numDisks").value, 0);
  let numSpaces = parseInt(document.getElementById("numSpaces").value, 0);
  game.start(numTowers, numDisks, numSpaces);
}

document.getElementById("start").addEventListener("click", () => {
  startGame();
});

startGame();
