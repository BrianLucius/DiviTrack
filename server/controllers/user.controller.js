const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.FIRST_SECRET_KEY;

module.exports.register = async (req, res) => {
    const errorText = {errors: {email: {name: "RegistrationError", message: "Email is already in use. Please choose another."}}};
    const user = await User.findOne({ email: req.body.email });
    if (user !== null) {
        return res.status(400).json(errorText);
    } 
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({id: user._id}, secret);

            res.cookie("usertoken", userToken, {httpOnly: true})
                .json({ message: "Registration success for user: ", user: user });
        })
        .catch(err => res.status(400).json(err));
    }

module.exports.login = async(req, res) => {
    const errorText = {errors: {auth: {name: "AuthenticationError", message: "There was an error logging in. Please try again."}}};
    const user = await User.findOne({ email: req.body.email });
    if(user === null) {
        // email not found in users collection
        return res.status(400).json(errorText);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) {
        // password wasn't a match!
        return res.status(400).json(errorText);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({id: user._id}, secret);

    // note that the response object allows chained calls to cookie and json
    res.cookie("usertoken", userToken, {httpOnly: true})
        .json({ message: "Login success!" });
}

module.exports.getAll = (req, res) => {
    return res.json({loggedInUserId: req.userId});
}

module.exports.logout = (req, res) => {
        res.clearCookie("usertoken");
        res.status(200).json({message: "User logged out."});
    }