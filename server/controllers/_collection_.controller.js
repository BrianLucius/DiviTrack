const _Collection_ = require('../models/_collection_.model');

// Show all _Collection_s
module.exports.showAll_Collection_s = (req, res)=> {
    _Collection_.find()
        .then(found_Collection_s => res.json({data: found_Collection_s}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

//Create a new _Collection_
module.exports.createOne_Collection_ = (req, res) => {
    _Collection_.create(req.body)
        .then(new_Collection_ => res.json({data: new_Collection_}))
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

//Find one _Collection_
module.exports.findOne_Collection_ = (req, res) => {
    _Collection_.findOne({_id: req.params.id})
        .then(found_Collection_ => res.json({data: found_Collection_}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

//Update _Collection_ by _id
module.exports.update_Collection_ = (req, res) => {
    _Collection_.findOneAndUpdate ({_id:req.params.id}, req.body, {new: true, runValidators: true}) //set the new option to true to return the document after update was applied
        .then(updated_Collection_ => res.json({data: updated_Collection_}))
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

//Delete _Collection_
module.exports.delete_Collection_ = (req, res) => {
    _Collection_.deleteOne({_id: req.params.id})
        .then(deleted_Collection_ => res.json({data: deleted_Collection_}))
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}