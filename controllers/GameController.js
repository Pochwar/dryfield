var GameController = function(gameView, scoreView, player, fields, score) {

    // set EventEmitter context to GameController context
    EventEmitter.call(this);

    // attrs
    this._gameView = gameView;
    this._scoreView = scoreView;
    this._player = player;
    this._fields = fields;
    this._score = score;

    // water consumption 
    this._waterConsumption = CONF.game.initialWaterConsumption;
    this.gameDuration = 0;

    // game interval
    this._interval = null;

    // bind methods to this
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.irrigate = this.irrigate.bind(this);
    this.harvest = this.harvest.bind(this);
    this.buyWater = this.buyWater.bind(this);
    this.runGame = this.runGame.bind(this);
    this.showGame = this.showGame.bind(this);
    this.showScores = this.showScores.bind(this);
    this.showForm = this.showForm.bind(this);
    this.postScore = this.postScore.bind(this);
    this.getScores = this.getScores.bind(this);

    // listen to stop/start
    this._gameView.on('start', this.startGame);
    this._gameView.on('stop', this.stopGame);

    // listen to menu
    this._gameView.on('show-game', this.showGame);
    this._gameView.on('show-scores', this.showScores);

    // listen to form
    this._gameView.on('set-name', this.postScore);

    // unlock game
    this.unlockGame();
}

// extends GameController with EventEmitter
GameController.prototype = Object.create(EventEmitter.prototype);

// avoid constructor override
GameController.prototype.constructor = GameController;

// set view listener
GameController.prototype.addGameControls = function(){

    // irrigate field
    this._gameView.on('irrigate', this.irrigate);

    // harvest fied
    this._gameView.on('harvest', this.harvest);

    // buy water
    this._gameView.on('buy-water', this.buyWater);
}

// remove view listener
GameController.prototype.removeGameControls = function(){
    this._gameView.off('irrigate', this.irrigate);
    this._gameView.off('harvest', this.harvest);
    this._gameView.off('buy-water', this.buyWater);
}

// start game
GameController.prototype.startGame = function() {
    if( this._interval) {
        return;
    }

    this._interval = setInterval( this.runGame, 1000);
    
    // listen
    this.addGameControls();
}

// stop game
GameController.prototype.stopGame = function() {
    
    // clear interval
    clearInterval( this._interval);
    this._interval = null;

    // Remove events listeners
    this.removeGameControls();

}

// run the game
GameController.prototype.runGame = function(){
    
    // game duration
    this.gameDuration ++;

    // calcalulate new water consumption
    this.calculateWaterConsumption();
    
    // has player lost ?    
    var totalFieldsWater = this._fields.reduce( function(acc, el) {
        return acc + el.waterReserve;
    }, 0);

    if( totalFieldsWater == 0 ) {
        this.gameLost();
        return;
    }

    // loop all fields
    this._fields.forEach(function(element) {

        // field is rdy to harvest or dead
        if( element.harvestState == 'ok' || element.harvestState == 'dead') {
            return;
        }

         // increase days by 1
        element.incrementDayCount();

        // fields water reserve
        var water = element.waterReserve;
        
        // not enough water to mature => harvest is lost
        if( water < this._waterConsumption) {
            element.setWaterReserve(0);
            element.setHarvestState('dead');
            return;
        }
        
        // harvest grows
        element.setWaterReserve( water - this._waterConsumption);
        
        // is harvest rdy ?
        if( element.dayCount == CONF.game.daysToHarvest) {
            element.setHarvestState('ok');
        }

    }, this);

}

// irrigate field
GameController.prototype.irrigate = function(data){    
    // index
    var id = this.findId(data.field);
    
    // check index
    if( id == -1 ) {
        return;
    }

    // get water 
    var water = this._fields[id].waterReserve;
    
    // enough water in player reserve ?
    var playerWater = this._player.water;
    if( CONF.game.irrigationAmount > playerWater ) {
        return;
    }

    // take water from player
    this._player.setWater(playerWater - CONF.game.irrigationAmount);

    // reinit fields if harvest is already dead
    if( this._fields[id].harvestState == 'dead') {
        this._fields[id].setWaterReserve(water + CONF.game.irrigationAmount);    
        this._fields[id].setHarvestState('notRdy');    
        this._fields[id].setDayCount(0);    
    }
    // add water to field
    else {
        this._fields[id].setWaterReserve(water + CONF.game.irrigationAmount);
    }
    
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
    if( this._fields[id].harvestState == 'ok') {
        
        // player scores
        this._player.setNbHarvest( this._player.nbHarvest + 1);

        // player money
        this._player.setMoney( this._player.money + CONF.game.harvestReward);

        // reset field
        this._fields[id].setDayCount(0);

        // reset harvest state
        this._fields[id].setHarvestState('notRdy');
    }
}

// buy water
GameController.prototype.buyWater = function(data){

    // quantity
    var quantity = data.quantity;

    // invalid quantity
    if( isNaN(quantity) || quantity < 0) {
        alert('Bien tenté Ronan...');
        return;
    }

    // cost
    var cost = quantity * this._player.waterPrice;

    // enough money ?
    if( this._player.money < cost) {
        alert('Pas assez d\'argent!!');
        return;
    }

    // set data
    this._player.setMoney( this._player.money - cost);
    this._player.setWater( this._player.water + quantity);
}

// water consumption
GameController.prototype.calculateWaterConsumption = function(){
    
    this._waterConsumption = CONF.game.initialWaterConsumption + this.gameDuration * CONF.game.waterConsumptionIncrease; 
    this._waterConsumption = Math.min( this._waterConsumption, CONF.game.maxWaterConsumption);
    
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

// game is lost
GameController.prototype.gameLost = function() {
    
    // stop game
    this.stopGame();

    // reset game
    //this.reset();

    // lock game
    this.lockGame();

    // show score form
    this.showForm();
    
}

// score player score
GameController.prototype.postScore = function(data) {
    
    if(data.name == '') {
        return;
    }
    
    $.ajax({
        type: "POST",
        url:  CONF.general.apiUrl + '/scores/',
        dataType: 'application/json',
        data: {
            name: data.name,
            score: this._player.nbHarvest
        },
        success: (function(data) {
            console.log(data.responseText);
        }).bind(this),
        error : (function(err) {
            console.warn(err);
        }).bind(this),
        complete: (function(){
            this.showScores();
            this.reset();
            this.unlockGame();
            this.hideForm();
        }).bind(this)
    });

}

// reset game
GameController.prototype.reset = function() {
    
    // reset player
    this._player.setMoney( CONF.player.initialMoney);
    this._player.setWater( CONF.player.initialWater);
    this._player.setNbHarvest( 0);

    // reset fields
    this._fields.forEach(function(field) {

        field.setWaterReserve( CONF.field.initialWaterReserve);
        field.setDayCount(0);
        field.setHarvestState('notRdy');

    }, this);

    // reset view
    this._gameView.reset();
}

// show game display
GameController.prototype.showGame = function(){
    this._gameView.show();
    this._scoreView.hide();
}

// show scores display
GameController.prototype.showScores = function(){
    this._gameView.hide();
    this._scoreView.show();

    this.getScores();
}

// show form display
GameController.prototype.showForm = function(){
    this._gameView.showForm();
}

// hide form display
GameController.prototype.hideForm = function() {
    this._gameView.hideForm();
}

// download scores
GameController.prototype.getScores = function(){
    
    $.ajax({
        type: "GET",
        url:  CONF.general.apiUrl + '/scores/',
        dataType: 'json',
        success: (function(data) {
            this._score.setScores(  data.list);
        }).bind(this),
        error : function(err) {
            console.warn(err);
            alert('erreur de téléchargement');
        }
    });
}

// lock game
GameController.prototype.lockGame = function() {
    this._gameView.lock();
}

// unlock game
GameController.prototype.unlockGame = function() {
    this._gameView.unlock();
}