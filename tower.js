// represents a single tower

import Disc from "./disc.js";

export default class Tower {
  constructor(game, numDisks) {
    this.game = game; // refrence to the game runner
    this.numDisks = numDisks; // how many disks fit on the tower
    this.discs = [];
    // click handler - reference is used to have a clean way to remove the event listener
    this.clickHandler = this.towerClick.bind(this);
    // make the html element
    this.makeEl();
  }

  towerClick() {
    if (this.game.hand.isEmpty) {
      this.game.hand.pickup(this);
    } else {
      this.game.hand.place(this);
      this.game.checkDone();
    }
  }

  // is hte tower full of discs
  isFull() {
    return this.discs.length == this.numDisks;
  }
  isDone() {
    if (this.isFull()) {
      let firstDisc = this.discs[0];
      for (let i = 1; i < this.discs.length; i++) {
        if (!Disc.matches(this.discs[i], firstDisc)) {
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
    /// make sure the new disc is the same color as the top disc
    let topDisc = this.discs.at(-1);

    if (Disc.matches(topDisc, newDisc)) {
      return true;
    }
    return false;
  }

  // returns an array of discs that are on the top of the tower and of the same color
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
    if (this.discs.length > 0) {
      this.el.insertBefore(discEl, this.el.firstChild);
    } else {
      this.el.appendChild(discEl);
    }
  }
  // add discs to the tower
  // params: disc - the disc to add
  //        forcePlace - if true dont check if the move is valid (shuffled start of the game)
  addDisc(disc, forcePlace) {
    if (this.isFull()) {
      return false;
    }
    if (!forcePlace && !this.isValidMove(disc)) {
      return false;
    }

    this.addDiscElement(disc.el);
    this.discs.push(disc);

    if (!forcePlace) {
      if (this.isDone()) {
        this.el.classList.add("done");
        // remove the event listener

        this.el.removeEventListener("click", this.clickHandler);
      }
    }
    return true;
  }

  makeEl() {
    if (typeof this.el === "undefined") {
      this.el = document.createElement("div");
      this.el.classList.add("tower");
      this.game.el.appendChild(this.el);
      this.el.addEventListener("click", this.clickHandler);
    }
  }

  toString() {
    return this.discs.map((disc) => disc.toString()).join(",");
  }

  removeDisc() {
    this.el.firstChild.remove();
    return this.discs.pop();
  }
  removeAllDiscs() {
    while (this.discs.length > 0) {
      this.removeDisc();
    }
  }
  fromString(str) {
    this.el.removeEventListener("click", this.clickHandler);
    this.removeAllDiscs();
    this.el.addEventListener("click", this.clickHandler);
    this.el.classList.remove("done");
    if (str === "") {
      return;
    }
    let discsStrings = str.split(",");
    discsStrings.map((discsString) => {
      let disc = new Disc(discsString);
      this.addDisc(disc, true);
    });
  }
}
