import Game from "./game.js";
import Disc from "./disc.js";
import colorsys from "./colorsys.js";

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

document.getElementById("newpallet").addEventListener("click", () => {
  let numTowers = 16; // parseInt(document.getElementById("numTowers").value, 0);
  let startColor = colorsys.anyToHsl(colorsys.random());
  let newPallet = [];
  startColor.l = 50;
  startColor.s = 70;

  // clear out the pallet

  let hueStep = 360 / Math.min(numTowers, 8);
  let hue = startColor.h;
  let saturation = startColor.s;
  let isGreen = false;
  let previousIsGreen = false;

  document.getElementById("pallet").innerHTML = `huestep = ${hueStep} <br/>`;

  // the greens are hard to tell apart so we desaturate them
  // green range is from about 100 - 190 so if we get consecutive greens we desaturate them
  for (let i = 0; i < numTowers; i++) {
    if (i == 9) {
      isGreen = false;
      previousIsGreen = false;
    }
    saturation = startColor.s;
    let colorstring = "";
    hue = (hue + hueStep) % 360;

    if (hue > 80 && hue < 170) {
      isGreen = true;
    } else {
      isGreen = false;
    }
    if (isGreen && previousIsGreen) {
      saturation = 0;
    } else {
      saturation = startColor.s;
    }
    let lightness = 40;
    if (i >= 8) {
      lightness = 80;
    }

    colorstring = `hsl(${hue} , ${saturation}%, ${lightness}%)`;
    // console.log(colorstring);

    let el = document.createElement("div");
    el.innerHTML = `${hue} - ${isGreen}  `;
    el.style.backgroundColor = colorstring;
    newPallet.push(el.style.backgroundColor);
    Disc.availableColors = newPallet;
    document.getElementById("pallet").appendChild(el);
    previousIsGreen = isGreen;
  }
});

startgame();
