const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    symbol: {
        type: String
    },
    shares: {
        type: Number
    },
    acquired: {
        type: Date
    }
  }, {timestamps: true});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;