var MockView = function(view, user, fields) {

    // set EventEmitter context to MockView context
    EventEmitter.call(this);

    this.listen();
}

// extends MockView with EventEmitter
MockView.prototype = Object.create(EventEmitter.prototype);

// avoid constructor override
MockView.prototype.constructor = MockView;

// set view listener
MockView.prototype.listen = function(){

    document.querySelector('#irrigate').onclick = (function(e) {
        this.emit('irrigate', {'data':'data'});
    }).bind(this);

    document.querySelector('#harvest').onclick = (function(e) {
        this.emit('harvest');
    }).bind(this);

    document.querySelector('#buy-water').onclick = (function(e) {
        this.emit('buy-water');
    }).bind(this);

    document.querySelector('#start').onclick = (function(e) {
        console.log(this);
        this.emit('start');
    }).bind(this);

    document.querySelector('#stop').onclick = (function(e) {
        this.emit('stop');
    }).bind(this);
}

// start game
MockView.prototype.startGame = function() {
    this.invertal = setInterval( this.runGame, 1000);
}

// stop game
MockView.prototype.stopGame = function() {
    clearInterval( this.interval);
}

// run the game
MockView.prototype.runGame = function(){
}

// irrigate field
MockView.prototype.irrigate = function(){
}

// harvest field
MockView.prototype.harvest = function() {
}

// buy water
MockView.prototype.buyWater = function(){
}