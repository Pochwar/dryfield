var CONF = {
    general: {
        apiUrl : 'http://10.1.108.8:3000',
        soundsRoot : './sounds'
    },
    game: {
        irrigationAmount: 1,
        daysToHarvest: 20,
        harvestReward: 40,
        initialWaterConsumption: 1,
        maxWaterConsumption: 2,
        waterConsumptionIncrease : 0.02,
    },
    player : {
        initialMoney: 50, 
        initialWater: 3,
        waterPrice: 1,
        harvestPrice: 40
    },
    field : {
        initialWaterReserve: 3
    },
    sounds: {
        root: './sounds/',
        field: {
            'irrigate': 'irrigate.wav'
        }
    }
};