var GameController = function(view, model) {

    // set EventEmitter context to GameController context
    EventEmitter.call(this);

    // attrs
    this._view = view;
    this._model = model;
}

// extends GameController with EventEmitter
GameController.prototype = Object.create(EventEmitter.prototype);

// avoid constructor override
GameController.prototype.constructor = GameController;

// set view listener
GameController.prototype.listenToView = function(){

    // irrigate field
    this._view.on('irrigate', function(data) {
        this.model.irrigate(data.id);
    });

    // harvest fied
    this._view.on('harvest', function(data) {
        this.model.harvest(data.id);
    });

    // buy water
    this._view.on('buy-water', function(data) {
        this.model.buyWater(data.quantity);
    });
}