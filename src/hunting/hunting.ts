import Hunt from "./hunt";

export default class Hunting {
  private hunts: Hunt[];

  private huntIdCounter = 0;

  public huntActive: Hunt;

  constructor() {
    this.hunts = [];
    this.addHunt();
  }

  public addHunt() {
    const hunt = new Hunt(this.huntIdCounter);
    this.hunts.push(hunt);

    this.huntIdCounter++;
    this.huntActive = hunt;
  }

  public distributeLoot() {
    if (this.huntActive.wasteList.length === 0) {
      return 'No waste added yet';
    }

    let lootDistributionString = '';

    this.huntActive.wasteList.forEach(({ user, amount }) => {      
      lootDistributionString += `👤 ${user.username} ${amount + this.huntActive.profitEach}k \n`
    });

    return lootDistributionString;
  }
}