var ScoreController = function(view, score) {

    // set EventEmitter context to ScoreController context
    EventEmitter.call(this);

    // attrs
    this._view = view;
    this._score = score;

    // bind method to this
    this.getScores = this.getScores.bind(this);

    // init
    this.listenToView();
}

// extends ScoreController with EventEmitter
ScoreController.prototype = Object.create(EventEmitter.prototype);

// avoid constructor override
ScoreController.prototype.constructor = ScoreController;

// set view listener
ScoreController.prototype.listenToView = function(){

    // download score
    this._view.on('show-scores', this.getScores);

}

ScoreController.prototype.getScores = function(){
    console.log(this._score);
    $.ajax({
        type: "GET",
        url:  CONF.general.apiUrl + '/scores/',
        dataType: 'json',
        success: (function(data) {
            console.log(this._score);
            this._score.setScores(  data.list);
        }).bind(this),
        error : function(err) {
            console.warn(err);
        }
    });
}