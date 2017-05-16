function Field(number, initialWaterReserve) {
    EventEmitter.call(this)
    this.number = number;
    this.waterReserve = initialWaterReserve;
    this.maturity = false;
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;
    


Field.prototype.setWaterReserve = function(quantity) {
    this.waterReserve = quantity;
    this.emit('set-waterReserve', {waterReserve : this.waterReserve});
}

Field.prototype.setMaturity = function(bool) {
    this.maturity = bool ;
    this.emit('set-maturity') {maturity : this.maturity}
}