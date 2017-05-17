function Field(number, initialWaterReserve) {
    EventEmitter.call(this)
    this.number = number;
    this.waterReserve = initialWaterReserve;
    this.maturity = false;
    this.dayCount = 0;
    this.harvestState= ""; // 'notRdy', 'ok', 'dead'
    this.harvestStateEnum = ['notRdy', 'ok', 'dead'];
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;
    


Field.prototype.setWaterReserve = function(quantity) {
    this.waterReserve = quantity;
    this.emit('set-waterReserve', {
        waterReserve : this.waterReserve
    });
}

Field.prototype.setMaturity = function(bool) {
    this.maturity = bool ;
    this.emit('set-maturity', {maturity : this.maturity});
}

Field.prototype.incrementDayCount = function() {
    this.dayCount++;
}

Field.prototype.setHarvestState = function(state) {
    
    if( !this.harvestStateEnum.indexOf(state)) {
        console.warn('State '+state+' is not allowed in field.js model');
    }

    this.harvestState = state;
}