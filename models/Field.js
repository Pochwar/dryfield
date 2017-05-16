function Field(number, initialWaterReserve) {
    EventEmitter.call(this)
    this.number = number;
    this.consumption;
    this.waterReserve = initialWaterReserve;
    this.maturity = false;
    
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;
    


Field.prototype.setWaterReserve = function() {
   this.waterReserve -= this.consumption;
   this.emit('set-waterReserve') {waterReserve : this.waterReserve}
    }

Field.prototype.setConsumption = function () {
   /* this.consumption = ;*/
    this.emit('set-consumption') {consumption : this.consumption}
}

Field.prototype.setMaturity = function(bool) {
    this.maturity = bool ;
    this.emit('set-maturity') {maturity : this.maturity}
}