
//GameView-----------+

function GameView(fields) {

	EventEmitter.call(this);

	this.fields = fields;

	this.bindEvents();


}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.constructor = GameView;




GameView.prototype.bindEvents = function() {

	this.fields.forEach((function(field) {

		console.log(field);

		$('#irrigate-' + field).click(this.irrigate.bind(this, field));
		$('#harvest-' + field).click(this.harvest.bind(this, field));
		
	}).bind(this));


	$('#waterDisplay').click(this.buyWater, this.pause);

	$('#go').click(function() {

		console.log(this);
		
	});
	


}




GameView.prototype.start = function() {

	console.log('start');
	this.emit('start', {});

}


GameView.prototype.pause = function() {

	console.log('pause');
	this.emit('pause', {});
}

GameView.prototype.irrigate = function(field) {

	console.log(field);
	this.emit('irrigate', {

		field: field
	});

}


GameView.prototype.harvest = function(field) {

	console.log(field);
	this.emit('harvest', {

		field: field
	});

}

GameView.prototype.buyWater = function() {

	console.log('buyWater');
}

