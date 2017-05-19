function Market() {
    EventEmitter.call(this);

    this.transactions = [];
    this.waterPrice;
    this.harvestPrice;
}

Market.prototype = Object.create(EventEmitter.prototype);
Market.prototype.constructor = Market;

Market.prototype.getTransactions = function() {
    return this.transactions;
}

Market.prototype.getWaterPrice = function() {
    return this.waterPrice;
}

Market.prototype.getHarvestPrice = function() {
    return this.harvestPrice;
}

Market.prototype.setTransactions = function(transactions) {
    this.transactions = transactions;
    this.emit('set-transactions', {
        transactions: transactions
    });
}

Market.prototype.setWaterPrice = function(waterPrice) {
    this.waterPrice = waterPrice;
    this.emit('set-waterprice', {
        price: waterPrice.toFixed(2)
    });
}

Market.prototype.setHarvestPrice = function(harvestPrice) {
    this.harvestPrice = harvestPrice;
    this.emit('set-harvestprice', {
        price: harvestPrice.toFixed(2)
    });
}