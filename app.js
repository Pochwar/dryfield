/**
 * Created by poch on 16/05/2017.
 */


// create model
var player = new Player(CONF.player.initialMoney, CONF.player.initialWater, CONF.player.waterPrice, CONF.player.harvestPrice)
var field0 = new Field('field0', CONF.field.initialWaterReserve);
var field1 = new Field('field1', CONF.field.initialWaterReserve);
var field2 = new Field('field2', CONF.field.initialWaterReserve);
var fields = [field0, field1, field2];
var score = new Score();
var market = new Market();

// game
var gameView = new GameView(player, fields, market);

var scoreView = new ScoreView(score);
var gameCtrl = new GameController(gameView, scoreView, player, fields, score, market);