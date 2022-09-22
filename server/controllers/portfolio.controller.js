const Portfolio = require('../models/portfolio.model');

// Show all Portfolios
module.exports.showAllPortfolios = (req, res)=> {
    Portfolio.find()
        .then(foundPortfolios => res.json({data: foundPortfolios}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

//Create a new Portfolio
module.exports.createOnePortfolio = (req, res) => {
    Portfolio.create(req.body)
        .then(newPortfolio => res.json({data: newPortfolio}))
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

//Find one Portfolio
module.exports.findOnePortfolio = (req, res) => {
    Portfolio.findOne({_id: req.params.id})
        .then(foundPortfolio => res.json({data: foundPortfolio}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

//Find Portfolio By User
module.exports.findPortfolioByUser = (req, res) => {
    Portfolio.find({userId: req.params.userId})
        .then(foundPortfolio => res.json({data: foundPortfolio}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

//Update Portfolio by _id
module.exports.updatePortfolio = (req, res) => {
    Portfolio.findOneAndUpdate ({_id:req.params.id}, req.body, {new: true, runValidators: true}) //set the new option to true to return the document after update was applied
        .then(updatedPortfolio => res.json({data: updatedPortfolio}))
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

//Delete Portfolio
module.exports.deletePortfolio = (req, res) => {
    Portfolio.deleteOne({_id: req.params.id})
        .then(deletedPortfolio => res.json({data: deletedPortfolio}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}