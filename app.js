/**
 * Created by poch on 16/05/2017.
 */


// create field1
/*var player = new Player()
var field0 = new Field('field0');
var field1 = new Field('field1');
var field2 = new Field('field2');*/
var fields = ['field0', 'field1', 'field2'];

var view = new GameView(fields);
// create controller
var gameCtrl = new GameController();