// create controller

    var fields= [];
    fields[0] = new Field(0, CONF.field.initialWaterReserve);
    fields[1] = new Field(1, CONF.field.initialWaterReserve);
    fields[2] = new Field(2, CONF.field.initialWaterReserve);
    
    var view = new MockView(null, fields);
    var player = new Player(CONF.player.initialMoney, CONF.player.initialWater, CONF.player.waterPrice, CONF.player.harvestPrice);

    var gameCtrl = new GameController(view, player, fields);