import Game from "./game.js";
import Disc from "./disc.js";
let game = new Game();

function startgame() {
  let numTowers = parseInt(document.getElementById("numTowers").value, 0);
  let numDisks = parseInt(document.getElementById("numDisks").value, 0);
  let numSpaces = parseInt(document.getElementById("numSpaces").value, 0);
  Disc.shuffleColors();
  game.start(numTowers, numDisks, numSpaces);
}

document.getElementById("start").addEventListener("click", () => {
  startgame();
});

document.getElementById("undo").addEventListener("click", () => {
  game.undo();
});

startgame();
