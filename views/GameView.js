//GameView
function GameView(player, fields) {
	EventEmitter.call(this);

	this.player = player;
	this.fields = fields;
	this.init();
	this.bindEvents();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.init = function() {
    //display default values
    $('#harvest').text(this.player.nbHarvest + ' Harvest(s)');
    $('#litres').text(this.player.water + ' L');
    $('#money').text(this.player.money + ' $');

    this.fields.forEach((function(field) {
        $('#' + field.number + "-value").text(field.waterReserve + "L");
    }).bind(this));

    //get emits
    this.fields.forEach((function(field) {
        field.on('set-waterReserve', this.setWaterReserve);
        $('#' + field.number + "-value").text(field.waterReserve + "L");
    }).bind(this));
}

GameView.prototype.bindEvents = function() {
	this.fields.forEach((function(field) {
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
			this.emit('stop');
			$(el).addClass('pause');
			$(el).removeClass('start');
			$(el).text('GO');
		}
	}).bind(this));
}



GameView.prototype.irrigate = function(field) {
// add player to view
	this.emit('irrigate', {
		field: field.number,
		waterReserve: field.waterReserve
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

