// the hand class represents the pieces that the player is currently holding

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
        destTower.addDisc(disc, false);
      } else {
        this.srcTower.addDisc(disc, true);
      }
    }, this);
    this.isEmpty = true;
    this.discs = [];
  }
}
