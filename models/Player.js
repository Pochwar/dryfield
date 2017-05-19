function Player(){
    EventEmitter.call(this);

    this.name;
    this.nbHarvest = 0;
    this.money;
    this.water;
}

Player.prototype = Object.create(EventEmitter.prototype);
Player.prototype.constructor = Player;

Player.prototype.setNbHarvest = function(nbHarvest){
    this.nbHarvest = nbHarvest;
    this.emit("set-harvest", {nbHarvest : this.nbHarvest});
}

Player.prototype.setMoney = function(qtyMoney){
    this.money = qtyMoney;
    this.emit("set-money", {money : this.money});
}

Player.prototype.setWater = function(qtyWater){
    this.water = qtyWater;
    this.emit("set-water", {water : this.water});
}
