import Hunt from "./hunt";

export default class Hunting {
  private hunts: Hunt[];

  private huntIdCounter = 0;

  public huntActive: Hunt;

  constructor() {
    this.hunts = [];
  }

  public addHunt() {
    const hunt = new Hunt(this.huntIdCounter);
    this.hunts.push(hunt);

    this.huntIdCounter++;
    this.huntActive = hunt;
  }
}