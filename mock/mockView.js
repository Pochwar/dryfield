var MockView = function(user, fields) {

    // set EventEmitter context to MockView context
    EventEmitter.call(this);

    this._fields = fields;

    this.listen();
}

// extends MockView with EventEmitter
MockView.prototype = Object.create(EventEmitter.prototype);

// avoid constructor override
MockView.prototype.constructor = MockView;

// set view listener
MockView.prototype.listen = function(){

    // to button
    document.querySelector('#irrigate').onclick = (function(e) {
        this.emit('irrigate', {field: 0});
    }).bind(this);

    document.querySelector('#harvest').onclick = (function(e) {
        this.emit('harvest', {field: 1});
    }).bind(this);

    document.querySelector('#buy-water').onclick = (function(e) {
        this.emit('buy-water', {quantity: 5});
    }).bind(this);

    document.querySelector('#start').onclick = (function(e) {
        this.emit('start');
    }).bind(this);

    document.querySelector('#stop').onclick = (function(e) {
        this.emit('stop');
    }).bind(this);

    // to model
    this._fields.forEach( function(element) {
        
        element.on('set-waterReserve', function(data){
            console.log('set-water-reserve');
            console.log(data);
        });

        element.on('set-maturity', function(data){
            console.log('set-maturity');
            console.log(data);
        });


    }, this);
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