var GameController = function(view, user, fields) {

    // set EventEmitter context to GameController context
    EventEmitter.call(this);

    // attrs
    this._view = view;
    this._user = user;
    this._fields = fields;

    // game interval
    this.interval = null;

    // bind methods to this
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.irrigate = this.irrigate.bind(this);
    this.harvest = this.harvest.bind(this);
    this.buyWater = this.buyWater.bind(this);

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
    this.invertal = setInterval( this.runGame, 1000);
}

// stop game
GameController.prototype.stopGame = function() {
    clearInterval( this.interval);
}

// run the game
GameController.prototype.runGame = function(){
}

// irrigate field
GameController.prototype.irrigate = function(data){
    
    // index
    var id = data.field;

    // check index
    if( id < 0 || id > this._fields.length) {
        return;
    }

    // get water 
    var water = this._fields[id].waterReserve;
    
    if( water >= CONF.irrigateAmount) {
        this._fields[id].setWaterReserve( water - CONF.irrigation.amount);
    }
}

// harvest field
GameController.prototype.harvest = function(data) {
}

// buy water
GameController.prototype.buyWater = function(data){
}