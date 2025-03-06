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

document.getElementById("darkmode").addEventListener("click", () => {
  document.body.classList.add("dark-mode");
});
document.getElementById("lightmode").addEventListener("click", () => {
  document.body.classList.remove("dark-mode");
});

document.getElementById("restart").addEventListener("click", () => {
  game.restart();
});

document.getElementById("start").addEventListener("click", () => {
  startgame();
});

document.getElementById("undo").addEventListener("click", () => {
  game.undo();
});

document.getElementById("save").addEventListener("click", () => {
  game.save();
});
document.getElementById("load").addEventListener("click", () => {
  game.load();
});

startgame();
