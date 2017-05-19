function SoundEmitter() {
    
    EventEmitter.call(this);
    this.sounds= {};
}

SoundEmitter.prototype = Object.create(EventEmitter.prototype);
SoundEmitter.prototype.constructor = SoundEmitter;

SoundEmitter.prototype.addSound = function(eventName, sound) {
    this.sounds[eventName] = this.sounds[eventName] || [];

    this.sounds[eventName].push(sound);
}

SoundEmitter.prototype.removeSound = function(eventName, sound) {

    if(!this.sounds[eventName]) {
        return;
    }

    var id = this.sounds[eventName].indexof(sound);
    if( id == -1) {
        return;
    }

    delete this.sounds[eventName][id];
}

// override
SoundEmitter.prototype.emit = function(eventName, data) {

    // On pourrait appeller la méthode parente
    // EventEmitter.emit.call(this, eventName, data);
    // mais on redéfinit trop de choses

    if( !this.events[eventName] && !this.sounds[eventName]) {
        return;
    }

    if( this.events[eventName]) {
        this.events[eventName].forEach( function(fn) {
            fn(data);
        });
    }

    if( this.sounds[eventName]) {
        this.sounds[eventName].forEach(function(s){
            var audio = new Audio(s);
            audio.play();
        });
    }

}