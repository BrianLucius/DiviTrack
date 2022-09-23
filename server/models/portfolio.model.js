const mongoose = require('mongoose');
const { Schema } = mongoose;

const PortfolioSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    symbol: {
        type: String
    },
    shares: {
        type: Number
    },
    acquired: {
        type: Date
    },
    dividendId: {
        type: Schema.Types.ObjectId, 
        ref: 'Dividends'
    }
  }, {timestamps: true});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;