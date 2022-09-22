const Dividend = require('../models/dividends.model');

// Show all Dividends
module.exports.showAllDividends = (req, res)=> {
    Dividend.find()
        .then(foundDividends => res.json({data: foundDividends}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

//Create a new Dividend
module.exports.createOneDividend = (req, res) => {
    Dividend.create(req.body)
        .then(newDividend => res.json({data: newDividend}))
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

//Find one Dividend
module.exports.findOneDividend = (req, res) => {
    Dividend.findOne({_id: req.params.id})
        .then(foundDividend => res.json({data: foundDividend}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

//Find Dividend By User
module.exports.findDividendBySymbol = (req, res) => {
    Dividend.find({symbol: req.params.symbol})
        .then(foundDividend => res.json({data: foundDividend}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

//Update Dividend by _id
module.exports.updateDividend = (req, res) => {
    Dividend.findOneAndUpdate ({_id:req.params.id}, req.body, {new: true, runValidators: true}) //set the new option to true to return the document after update was applied
        .then(updatedDividend => res.json({data: updatedDividend}))
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

//Delete Dividend
module.exports.deleteDividend = (req, res) => {
    Dividend.deleteOne({_id: req.params.id})
        .then(deletedDividend => res.json({data: deletedDividend}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}