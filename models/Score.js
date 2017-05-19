function Score() {
    EventEmitter.call(this)
    this.scores= [];
}

Score.prototype = Object.create(EventEmitter.prototype);
Score.prototype.constructor = Score;
    
Score.prototype.setScores = function(scores) {
    this.scores= scores;
    this.emit('set-scores', {
        scores : this.scores
    });
}