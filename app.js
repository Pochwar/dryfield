/**
 * Created by poch on 16/05/2017.
 */


// create field1
var player = new Player(CONF.player.initialMoney, CONF.player.initialWater, CONF.player.waterPrice, CONF.player.harvestPrice)
var field0 = new Field('field0', CONF.field.initialWaterReserve);
var field1 = new Field('field1', CONF.field.initialWaterReserve);
var field2 = new Field('field2', CONF.field.initialWaterReserve);
var fields = [field0, field1, field2];

var view = new GameView(player, fields);
// create controller
var gameCtrl = new GameController(view, player, fields);