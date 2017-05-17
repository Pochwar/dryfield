//GameView
function GameView(player, fields) {
	EventEmitter.call(this);

	this.player = player;
	this.fields = fields;
	this.init();
	this.bindEvents();

	this.waterReserve
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

    $('#buy_water').css('visibility', 'hidden');
    $('#waterDisplay').css('visibility', 'hidden');

    //get emits
    this.fields.forEach(function(field) {
        field.on('set-waterReserve', this.setWaterReserve);
        field.on('set-harvest-state', this.setHarvestState);
    }, this);

    this.player.on("set-harvest", this.setHarvest);
    this.player.on("set-money", this.setMoney);
    this.player.on("set-water", this.setWater);
}

GameView.prototype.bindEvents = function() {
	this.fields.forEach((function(field) {
		$('#irrigate-' + field.number).click(this.irrigate.bind(this, field));
		$('#harvest-' + field.number).click(this.harvest.bind(this, field));
	}).bind(this));

	$('#waterDisplay').click(this.buyWater.bind(this));

    $('#closeBuyWater').click((function(){
        this.emit("start");
        $('#buy_water').css('visibility', 'hidden');
    }).bind(this));

    $('#buyWater').click((function(e){
        e.preventDefault();
        var waterQty = parseInt($('#waterQty').val());
        this.emit("start");
        this.emit("buy-water",{
            quantity: waterQty
        })
        $('#buy_water').css('visibility', 'hidden');
    }).bind(this));

	$('#go').click((function(ev) {
		var el = ev.target;
		if ($(el).hasClass('pause')) {
			this.emit('start');
			$(el).addClass('start');
			$(el).removeClass('pause');
			$(el).text('PAUSE');
            $('#waterDisplay').css('visibility', 'visible');
		}else{
			this.emit('stop');
			$(el).addClass('pause');
			$(el).removeClass('start');
			$(el).text('GO');
            $('#waterDisplay').css('visibility', 'hidden');
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
    this.emit('stop');
    $('#buy_water').css('visibility', 'visible');
}

GameView.prototype.setWaterReserve = function(data) {
    $('#' + data.field + "-value").text(data.waterReserve.toFixed(2) + "L");
}

GameView.prototype.setHarvestState = function(data) {
    console.log(data)
    // Object { field: "field0", state: "dead" }
    switch(data.state){
        case "dead" :
            $('#harvest-' + data.field).css("color", "#f00");
            break
        case "ok" :
            $('#harvest-' + data.field).css("color", "#0CBA00");
            break

        case "notRdy" :
            $('#harvest-' + data.field).css("color", "#000");
            break
    }
 }

GameView.prototype.setHarvest = function(data) {
    $("#harvest").text(data.nbHarvest + " Harvest");
}

GameView.prototype.setMoney = function(data) {
    $("#money").text(data.money + " $");
}

GameView.prototype.setWater = function(data) {
    $("#litres").text(data.water + " L");
}