var GameController = function(view, player, fields) {

    // set EventEmitter context to GameController context
    EventEmitter.call(this);

    // attrs
    this._view = view;
    this._player = player;
    this._fields = fields;

    // game interval
    this._interval = null;

    // bind methods to this
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.irrigate = this.irrigate.bind(this);
    this.harvest = this.harvest.bind(this);
    this.buyWater = this.buyWater.bind(this);
    this.runGame = this.runGame.bind(this);

    // listen
    this.listenToView();
}

// extends GameController with EventEmitter
GameController.prototype = Object.create(EventEmitter.prototype);

// avoid constructor override
GameController.prototype.constructor = GameController;

// set view listener
GameController.prototype.listenToView = function(){

    // start game
    this._view.on('start', this.startGame);

    // stop game
    this._view.on('stop', this.stopGame);

    // irrigate field
    this._view.on('irrigate', this.irrigate);

    // harvest fied
    this._view.on('harvest', this.harvest);

    // buy water
    this._view.on('buy-water', this.buyWater);
}

// start game
GameController.prototype.startGame = function() {
    if( this._interval) {
        return;
    }

    this._interval = setInterval( this.runGame, 1000);
    
}

// stop game
GameController.prototype.stopGame = function() {
    clearInterval( this._interval);
    this._interval = null;
}

// run the game
GameController.prototype.runGame = function(){
   
    // loop all fields
    this._fields.forEach(function(element) {

        // increase days by 1
        element.incrementDayCount();

        // field is rdy to harvest
        if( element.maturity) {
            return;
        }

        // TODO : add water consumption function
        var waterConsumption = this.waterConsumption();

        // fields water reserve
        var water = element.waterReserve;
        
        // not enough water to mature => harvest is lost
        if( water < waterConsumption) {
            element.setWaterReserve(0);
            element.setHarvestState('dead');
            element.setMaturity(false);
            return;
        }
        
        // harvest grows
        element.setWaterReserve( water - waterConsumption);
        
        // is harvest rdy ?
        if( element.dayCount == CONF.game.daysToHarvest) {
            element.setHarvestState('ok');
            element.setMaturity(true);
        }

    }, this);
}

// irrigate field
GameController.prototype.irrigate = function(data){
    
    // index
    var id = this.findId( data.field);
    
    // check index
    if( id == -1 ) {
        return;
    }

    // get water 
    var water = this._fields[id].waterReserve;
    
    this._fields[id].setWaterReserve( water + CONF.game.irrigationAmount);
    
}

// harvest field
GameController.prototype.harvest = function(data) {

     // index
    var id = this.findId( data.field);
    
    // check index
    if( id == -1 ) {
        return;
    }

    // harvest field
    if( this._fields[id].maturity) {
        
        // player scores
        this._player.setNbHarvest( this._player.nbHarvest + 1);

        // reset field
        this._fields[id].maturity = false;
        this._fields[id].dayCount = 0;
    }
}

// buy water
GameController.prototype.buyWater = function(data){

    // quantity
    var quantity = data.quantity;

    // cost
    var cost = quantity * this._player.waterPrice;

    // enough money ?
    if( this._player.money < cost) {
        alert('Pas assez d\'argent!!');
    }

    // set data
    this._player.setMoney( Player.money - cost);
    this._player.setWater( player.water + quantity);
}

// water consumption
GameController.prototype.waterConsumption = function(){
    // TODO : calculate this...
    return 1;
}

// find field id
GameController.prototype.findId = function(id){

    var limit = this._fields.length;
    for( i=0; i < limit; i++) {
        if (this._fields[i].number == id) {
            return i;
        }
    }

    return -1;
}