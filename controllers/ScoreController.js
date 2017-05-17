var ScoreController = function(view, model) {

    // set EventEmitter context to ScoreController context
    EventEmitter.call(this);

    // attrs
    this._view = view;
    this._model = model;
}

// extends ScoreController with EventEmitter
ScoreController.prototype = Object.create(EventEmitter.prototype);

// avoid constructor override
ScoreController.prototype.constructor = ScoreController;

// set view listener
ScoreController.prototype.listenToView = function(){

    // download score
    this._view.on('show-scores', function(data) {
        this.model.getScores();
    });

    // add score
    this._view.on('add-score', function(data) {
        this.model.addScore(data.username, data.score);
    });
}