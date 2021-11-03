type Waste = {
  userId: string,
  amount: number,
}

export default class Hunt {
  public id: number;
  public wasteList: Waste[];
  public lootValue: number;

  constructor(id: number) {
    this.id = id;
  }
  
  public addWaste(waste: Waste) {
    this.wasteList.push(waste);
  }

  public get wasteTotal() {
    return this.wasteList.reduce((total, waste) => {
      return total + waste.amount;
    }, 0)
  }

  public get profit() {
    return this.lootValue - this.wasteTotal;
  }
}

