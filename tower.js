console.log("tower.js loaded");

import Disc from "./disc.js";

export default class Tower {
  constructor(game, numDisks) {
    console.log("Tower constructor");
    this.game = game;
    this.numDisks = numDisks;
    this.discs = [];
    this.clickHandler = this.towerClick.bind(this);
    this.makeEl();
  }

  makeEl() {
    if (typeof this.el === "undefined") {
      this.el = document.createElement("div");
      this.el.classList.add("tower");
      this.game.el.appendChild(this.el);
      this.el.addEventListener("click", this.clickHandler);
    }
  }

  isFull() {
    return this.discs.length == this.numDisks;
  }
  isDone() {
    if (this.discs.length == this.numDisks) {
      let color = this.discs[0].color;
      for (let i = 1; i < this.discs.length; i++) {
        if (this.discs[i].color != color) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  isEmpty() {
    return this.discs.length == 0;
  }
  isValidMove(newDisc) {
    // anything can be place on an empty tower
    if (this.isEmpty()) {
      return true;
    }
    // is it full
    if (this.isFull()) {
      return false;
    }
    let topDisc = this.discs.at(-1);
    console.log("topDisc", topDisc.color, newDisc.color);
    if (Disc.matches(topDisc, newDisc)) {
      return true;
    }
    return false;
  }

  getTopDiscs() {
    if (this.length === 0) {
      return [];
    }
    let topDiscs = [this.removeDisc()];
    while (1) {
      if (this.discs.length === 0) {
        break;
      }
      if (Disc.matches(topDiscs[0], this.discs.at(-1))) {
        topDiscs.push(this.removeDisc());
      } else {
        break;
      }
    }
    console.log(topDiscs);
    return topDiscs;
  }

  addDiscElement(discEl) {
    this.el.appendChild(discEl);
  }

  removeDisc() {
    this.el.firstChild.remove();
    return this.discs.pop();
  }

  // add discs to the tower
  // params: disc - the disc to add
  //        checkIsValidMove - if true, then check if the move is valid
  //                         - if not then just add the discs (start of game)
  addDisc(disc, checkIsValidMove) {
    if (this.isFull()) {
      return false;
    }
    if (checkIsValidMove && !this.isValidMove(disc)) {
      return false;
    }

    if (this.discs.length > 0) {
      this.el.insertBefore(disc.el, this.el.firstChild);
    } else {
      this.el.appendChild(disc.el);
    }
    this.discs.push(disc);
    console.log("disc add", checkIsValidMove);

    if (!checkIsValidMove) {
      if (this.isDone()) {
        this.el.classList.add("done");
        // remove the event listener
        console.log("removing event listener");
        this.el.removeEventListener("click", this.clickHandler);

        this.game.checkDone();
      }
    }
    return true;
  }
  towerClick() {
    if (this.game.hand.isEmpty) {
      // pick up the top disc(s)
      console.log("picking up");

      this.game.hand.pickup(this);
    } else {
      console.log("placing");

      this.game.hand.place(this);
    }
  }
}
