// the hand class represents the pieces that the player is currently holding
var audio = new Audio("./click.wav");

export default class Hand {
  constructor() {
    this.discs = [];
    this.srcTower = undefined;
    this.isEmpty = true;
    this.el = document.createElement("div");
    this.el.innerText = "";
    this.el.classList.add("hand");
  }

  pickup(srcTower) {
    this.discs = srcTower.getTopDiscs();
    this.el.innertHTML = "";
    this.discs.map((disc) => {
      this.el.appendChild(disc.el);
    }, this);
    this.srcTower = srcTower;
    this.isEmpty = false;

    this.srcTower.el.insertBefore(this.el, this.srcTower.el.firstChild);
  }

  place(destTower) {
    this.el.parentElement.removeChild(this.el);
    this.discs.map((disc) => {
      if (destTower.isValidMove(disc)) {
        console.log("click");
        audio.play();
        destTower.addDisc(disc, false);
      } else {
        this.srcTower.addDisc(disc, true);
      }
    }, this);
    this.isEmpty = true;
    this.discs = [];
  }
}
