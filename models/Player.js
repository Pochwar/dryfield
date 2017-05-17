function Player(initialMoney, initialWater, waterPrice, harvestPrice){
    EventEmitter.call(this);

    this.name;
    this.nbHarvest = 0;
    this.money = initialMoney;
    this.water = initialWater;
    this.waterPrice = waterPrice;
    this.harvestPrice = harvestPrice;
}

Player.prototype = Object.create(EventEmitter.prototype);
Player.prototype.constructor = Player;

Player.prototype.setNbHarvest = function(nbHarvest){
    this.nbHarvest = nbHarvest;
    this.emit("set-harvest", {money : this.money});
}

Player.prototype.setMoney = function(qtyMoney){
    this.money = qtyMoney;
    this.emit("set-money", {money : this.money});
}

Player.prototype.setWater = function(qtyWater){
    this.water = qtyWater;
    this.emit("set-water", {water : this.water});
}

Player.prototype.setWaterPrice = function(price){
    this.waterPrice = price;
    this.emit("set-water-price", {waterPrice : this.waterPrice});
}

Player.prototype.setHarvestPrice = function(price){
    this.harvestPrice = price;
    this.emit("set-harvest-price", {harvestPrice : this.harvestPrice});
}
