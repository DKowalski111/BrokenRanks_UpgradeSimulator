class UpgradeProperties{
  rank:number;
  durability:number;
  platinum:number;
  essence:number;
  reol:number;
  dvigg:number;
  upgradeTarget:number;
  iterations:number;
  constructor(rank:number,durability:number,platinum:number,essence:number,reol:number,dvigg:number,upgradeTarget:number,iterations:number){
    this.rank = rank;
    this.durability = durability;
    this.platinum = platinum;
    this.essence = essence;
    this.reol = reol;
    this.dvigg = dvigg;
    this.upgradeTarget = upgradeTarget;
    this.iterations = iterations;
  }
}

export default UpgradeProperties;