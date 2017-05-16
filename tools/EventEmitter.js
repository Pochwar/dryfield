function EventEmitter(){
    this.events = {}
}

EventEmitter.prototype.on = function(eventName, fn){
    if(typeof fn !== 'function' || typeof eventName !== 'string') return
    this.events[eventName] = this.events[eventName]|| [];
    this.events[eventName].push(fn);
}

EventEmitter.prototype.off = function(eventName, fn){
    if(typeof fn !== 'function' || typeof eventName !== 'string') return
    if (!this.events[eventName]) return;
    var index = this.events[eventName].indexOf(fn);
    if (index !== -1) {
        this.events[eventName].splice(index, 1);
    }
}

EventEmitter.prototype.emit = function(eventName, data){
    if (!this.events[eventName]) return;

    this.events[eventName].forEach(function(fn){
        fn(data);
    })
}
