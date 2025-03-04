export default class Hand {
  constructor() {
    this.discs = [];
    this.srcTower = undefined;
    this.isEmpty = true;
  }

  pickup(srcTower) {
    this.discs = srcTower.getTopDiscs();
    this.srcTower = srcTower;
    this.isEmpty = false;
  }

  place(destTower) {
    this.discs.map((disc) => {
      if (destTower.isValidMove(disc)) {
        destTower.addDisc(disc);
      } else {
        this.srcTower.addDisc(disc);
      }
    }, this);
    this.isEmpty = true;
    this.discs = [];
  }
}
