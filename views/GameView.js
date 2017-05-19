//GameView
function GameView(player, fields) {
	EventEmitter.call(this);

	this.player = player;
	this.fields = fields;
	this.init();
	this.bindEvents();

	this.goListener = null;

    // bind methods
    this.lock = this.lock.bind(this);
    this.unlock = this.unlock.bind(this);
    this.enableStart = this.enableStart.bind(this);
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
    $('#saveScore').css('visibility', 'hidden');
    $("#waterQty").attr('max', this.player.money / CONF.player.waterPrice);

    //get emits
    this.fields.forEach(function(field) {
        field.on('set-waterReserve', this.setWaterReserve);
        field.on('set-harvest-state', this.setHarvestState);
        field.on('day-count', this.setDayCount);
    }, this);

    this.player.on("set-harvest", this.setHarvest);
    this.player.on("set-money", this.setMoney);
    this.player.on("set-water", this.setWater);
}

GameView.prototype.bindEvents = function() {
    $('#play').click((function(){
        this.emit("show-game");
    }).bind(this));

    $('#scores').click((function(){
        this.emit("show-scores");
    }).bind(this));
	
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
        $('#waterQty').val(0);
    }).bind(this));


    $('#saveCoreSubmit').click((function(e){
        e.preventDefault();
        var name = $('#saveScoreName').val();
        if (!name) {
            alert('Veuillez indiquer votre nom');
            return;
        }
        this.emit("set-name",{
            name: name
        })
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

GameView.prototype.setDayCount = function(data) {
    $('#progress-' + data.field).val(data.dayCount);
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
    $("#waterQty").attr('max', data.money * CONF.player.waterPrice);
}

GameView.prototype.setWater = function(data) {
    $("#litres").text(data.water + " L");
}

GameView.prototype.show = function(data) {
    $("#affichage").css("display", "block");
}

GameView.prototype.hide = function(data) {
    $("#affichage").css("display", "none");
}

GameView.prototype.showForm = function(data) {
    $("#saveScore").css("visibility", "visible");
}

GameView.prototype.hideForm = function(data) {
    $("#saveScore").css("visibility", "hidden");
}

GameView.prototype.reset = function() {
    $('#go').addClass('pause');
    $('#go').removeClass('start');
    $('#go').text('GO');
    $('#waterDisplay').css('visibility', 'hidden');
    $('#buy_water').css('visibility', 'hidden');
}

GameView.prototype.lock = function() {
    document.querySelector('#go').removeEventListener('click', this.enableStart);
    $('#waterDisplay').css('visibility', 'hidden');
    $('#buy_water').css('visibility', 'hidden');
}

GameView.prototype.unlock = function() {
   document.querySelector('#go').addEventListener('click', this.enableStart);
}

GameView.prototype.enableStart = function(ev) {
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
        $('#buy_water').css('visibility', 'hidden');
    }
}
