const unavailableColors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

let availableColors = [
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
import shuffle from "./utils.js";

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
    this.el.style.backgroundColor = availableColors[color];
  }

  toString() {
    return this.color;
  }

  fromString(str) {
    this.color = str;
  }

  static shuffleColors() {
    shuffle(availableColors);
  }

  static matches(disc1, disc2) {
    return disc1.color === disc2.color;
  }
}
