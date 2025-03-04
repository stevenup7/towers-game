/*
    todo:
        add a move counter
        indication of tower height 
        
*/

const availableColors = [
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

import Tower from "./tower.js";
import shuffle from "./utils.js";
import Disc from "./disc.js";
import Hand from "./hand.js";

export default class Game {
  constructor() {
    console.log("Game constructor");
  }

  start(numTowers, numDisks, emptyTowers = 2) {
    console.log("Game started");
    this.el = document.getElementById("game-body");
    this.towers = [];
    this.emptyTowers = emptyTowers;
    this.hand = new Hand();
    this.numColors = numTowers;
    this.numTowers = numTowers + this.emptyTowers;
    this.numDisks = numDisks;

    this.colors = availableColors.slice(0, this.numColors);
    this.initTowers();
  }
  checkDone() {
    let done = true;
    this.towers.map((tower) => {
      if (!tower.isEmpty() && !tower.isDone()) {
        done = false;
      }
    });
    if (done) {
      setTimeout(() => {
        alert("you are a winner");
      }, 200);
    }
    return done;
  }
  initTowers() {
    this.clearEventListeners();

    // clear the game element
    while (this.el.childNodes.length !== 0) {
      this.el.removeChild(this.el.firstChild);
    }
    // make the towers
    for (let i = 0; i < this.numTowers; i++) {
      this.towers.push(new Tower(this, this.numDisks));
    }

    // set up the css grid
    let gridTemplateColumns = new Array(this.numTowers).fill("1fr").join(" ");
    this.el.style.gridTemplateColumns = gridTemplateColumns;

    // make the disks
    let disks = [];
    for (let i = 0; i < this.numColors; i++) {
      for (let j = 0; j < this.numDisks; j++) {
        let disc = new Disc(this.colors[i]);
        disks.push(disc);
      }
    }
    shuffle(disks);
    shuffle(disks);
    console.log(disks);

    this.towers.map((tower) => {
      for (let j = 0; j < this.numDisks; j++) {
        if (disks.length > 0) {
          let disc = disks.pop();
          tower.addDisc(disc, false);
        }
      }
    });
  }
  clearEventListeners() {
    this.towers.map((tower) => {
      tower.el.removeEventListener("click", tower.towerClick);
    });
  }
}
