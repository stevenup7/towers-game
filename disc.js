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
    this.el.style.backgroundColor = color;
  }

  static matches(disc1, disc2) {
    return disc1.color === disc2.color;
  }
}
