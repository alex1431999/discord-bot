import { User } from "discord.js";

type Waste = {
  user: User,
  amount: number,
}

export default class Hunt {
  public id: number;
  public wasteList: Waste[];
  public lootValue: number;

  constructor(id: number) {
    this.id = id;
    this.wasteList = [];
    this.lootValue = 0;
  }
  
  public addWaste(waste: Waste) {
    const existingWaste = this.wasteList.find(wasteCurrent => wasteCurrent.user.id === waste.user.id)

    if (existingWaste) {
      existingWaste.amount += waste.amount;
    } else {
      this.wasteList.push(waste);
    }
  }

  public get wasteTotal() {
    return this.wasteList.reduce((total, waste) => {
      return total + waste.amount;
    }, 0)
  }

  public get profitTotal() {
    return this.lootValue - this.wasteTotal;
  }

  public get profitEach() {
    if (this.profitTotal === 0) {
      return 0;
    }
    
    return this.profitTotal / this.wasteList.length;
  }
}

