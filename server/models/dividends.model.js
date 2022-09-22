const mongoose = require('mongoose');

const DividendSchema = new mongoose.Schema({
    cash_amount: {type: Number},
    currency: {type: String},
    declaration_date: {type: Date},
    dividend_type: {type: String},
    ex_dividend_date: {type: Date},
    frequency: {type: Number},
    pay_date: {type: Date},
    record_date: {type: Date}
});

const DividendsSchema = new mongoose.Schema({
    symbol: {
        type: String
    },
    dividendHistory: [DividendSchema]
  }, {timestamps: true});

const Dividends = mongoose.model('Dividends', DividendsSchema);
module.exports = Dividends;