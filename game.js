/*
    todo:
        add a move counter
        indication of tower height
        dark mode

*/
import Tower from "./tower.js";
import shuffle from "./utils.js";
import Disc from "./disc.js";
import Hand from "./hand.js";

export default class Game {
  constructor() {
    console.log("Game constructor");
  }

  start(numTowers, numDisks, emptyTowers = 2) {
    this.el = document.getElementById("game-body");
    this.towers = [];
    this.emptyTowers = emptyTowers;
    this.hand = new Hand();
    this.numColors = numTowers;
    this.numTowers = numTowers + this.emptyTowers;
    this.numDisks = numDisks;
    this.history = [];
    this.wasLastMoveUndo = false;
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
    } else {
      this.history.push(this.toString());
      this.wasLastMoveUndo = false;
    }
    return done;
  }
  restart() {
    let state = this.history[0];
    this.history = [state, state]; // todo fix this;
    this.fromString(state);
  }
  undo() {
    console.log("undo");

    if (this.history.length > 0) {
      console.log("undoing history length", this.history.length);
      if (!this.wasLastMoveUndo) {
        this.history.pop();
      }
      // use the starting state or if there is a history use the last in the list
      let lastState = this.history[0];
      if (this.history.length > 1) {
        lastState = this.history.pop();
      }

      this.fromString(lastState);
    }
    this.wasLastMoveUndo = true;
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
    let gridTemplateColumns = "1fr 1fr 1fr 1fr"; // new Array(this.numTowers).fill("1fr").join(" ");
    this.el.style.gridTemplateColumns = gridTemplateColumns;

    // make the disks
    let disks = [];
    for (let color = 0; color < this.numColors; color++) {
      for (let i = 0; i < this.numDisks; i++) {
        let disc = new Disc(color);
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
          tower.addDisc(disc, true);
        }
      }
    });

    // get the heigth of the 1st tower and use it to set the height of the other towers
    let height = this.towers[0].el.offsetHeight;
    this.towers.map((tower) => {
      tower.el.style.height = parseInt(height * 1.1) + "px";
    });
    // clear out the undo history
    this.history = [];
    // then push the current state to the history
    this.checkDone();
  }
  clearEventListeners() {
    this.towers.map((tower) => {
      tower.el.removeEventListener("click", tower.towerClick);
    });
  }
  toString() {
    let str = "";
    this.towers.map((tower) => {
      str += tower.toString() + "\n";
    });
    return str;
  }

  fromString(str) {
    let towerStrings = str.split("\n");
    console.log("loading from string", towerStrings);

    this.towers.map((tower, i) => {
      console.log("loading tower", i, towerStrings[i]);

      tower.fromString(towerStrings[i]);
    });
  }
}
