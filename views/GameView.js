
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

		console.log(field.number);

		$('#irrigate-' + field.number).click(this.irrigate.bind(this, field));
		$('#harvest-' + field.number).click(this.harvest.bind(this, field));
		
	}).bind(this));


	$('#waterDisplay').click(this.buyWater, this.pause);

	$('#go').click((function(ev) {
		var el = ev.target;

		if ($(el).hasClass('pause')) {

			this.emit('start');

			$(el).addClass('start');

			$(el).removeClass('pause');

			$(el).text('PAUSE');

		}else{

			this.emit('pause');

			$(el).addClass('pause');

			$(el).removeClass('start');

			$(el).text('GO');
		}			
	
	}).bind(this));
	


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


	this.emit('irrigate', {

		field: field.number
	});

}


GameView.prototype.harvest = function(field) {


	this.emit('harvest', {

		field: field.number
	});

}

GameView.prototype.buyWater = function() {

	console.log('buyWater');
}

