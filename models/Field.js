function Field(number, initialWaterReserve) {
    SoundEmitter.call(this)
    this.number = number;
    this.waterReserve = initialWaterReserve;
    this.dayCount = 0;
    this.harvestState= "notRdy"; // 'notRdy', 'ok', 'dead'
    this.harvestStateEnum = ['notRdy', 'ok', 'dead'];

    this.addSound('set-waterReserve', CONF.sounds.root+CONF.sounds.field.irrigate);
}

Field.prototype = Object.create(SoundEmitter.prototype);
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
    this.emit('day-count', {
        field: this.number,
        dayCount : this.dayCount
    });
}

Field.prototype.setDayCount = function(day) {
    this.dayCount = day;
    this.emit('day-count', {
        field: this.number,
        dayCount : this.dayCount
    });
}

Field.prototype.setHarvestState = function(state) {
    
    if( this.harvestStateEnum.indexOf(state) == -1) {
        console.warn('State '+state+' is not allowed in field.js model');
    }

    this.harvestState = state;
    this.emit("set-harvest-state",{
        field: this.number,
        state: this.harvestState
    })
}