import shuffle from "./utils.js";
import colorsys from "./colorsys.js";

export default class Disc {
  constructor(color) {
    this.color = color;
    console.log("Disc constructor");
    this.createElement(this.color);
  }

  createElement(color) {
    this.el = document.createElement("div");
    this.el.classList.add("disc");
    // this.el.innerText = "disc";
    // this.el.style.backgroundColor = Disc.availableColors[color];
    console.log(color);
    let colorDark = colorsys.darken(
      colorsys.parse_css(Disc.availableColors[color]),
      0.5
    );
    colorDark = colorsys.rgbToHex(colorDark);

    let gradient = `linear-gradient(90deg, ${Disc.availableColors[color]} ,${colorDark})`;
    console.log(gradient);
    this.el.style.background = gradient;
  }

  toString() {
    return this.color;
  }

  fromString(str) {
    this.color = str;
  }

  static shuffleColors() {
    shuffle(Disc.availableColors);
  }

  static matches(disc1, disc2) {
    return disc1.color === disc2.color;
  }
}

Disc.availableColors = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#808080",
];
