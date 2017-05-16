/**
 * Created by poch on 16/05/2017.
 */

// create controller

    var view = new MockView();
    var fields= [];
    fields[0] = new Field(0, CONF.field.initialWaterReserve);
    fields[1] = new Field(1, CONF.field.initialWaterReserve);
    fields[2] = new Field(2, CONF.field.initialWaterReserve);
    var gameCtrl = new GameController(view, user, fields);