function Field(number, initialWaterReserve) {
    EventEmitter.call(this)
    this.number = number;
    this.waterReserve = initialWaterReserve;
    this.dayCount = 0;
    this.harvestState= "notRdy"; // 'notRdy', 'ok', 'dead'
    this.harvestStateEnum = ['notRdy', 'ok', 'dead'];
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;
    


Field.prototype.setWaterReserve = function(quantity) {
    this.waterReserve = quantity;
    this.emit('set-waterReserve', {
        field: this.number,
        waterReserve : this.waterReserve
    });
}


Field.prototype.incrementDayCount = function() {
    this.dayCount++;
}

Field.prototype.setDayCount = function(day) {
    this.dayCount = day;
}

Field.prototype.setHarvestState = function(state) {
    
    if( !this.harvestStateEnum.indexOf(state)) {
        console.warn('State '+state+' is not allowed in field.js model');
    }

    this.harvestState = state;
    this.emit("set-harvest-state",{
        field: this.number,
        state: this.harvestState
    })
}