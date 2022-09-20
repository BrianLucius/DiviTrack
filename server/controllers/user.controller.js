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
        return res.status(400).json(errorText);
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) {
        return res.status(400).json(errorText);
    }

    const userToken = jwt.sign({id: user._id}, secret);
    res.cookie("usertoken", userToken, {httpOnly: true})
        .json({ message: "Login success!" });
}

module.exports.checkUser = async(req, res, next) => {
    let currentUser;

    if (req.cookies.jwt) {
        const token=req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, secret);
        currentUser = await User.findById(decoded.id);
    } else {
        currentUser = null;
    }
    res.status(200).send({ currentUser })
}

module.exports.getAll = (req, res) => {
    return res.json({loggedInUserId: req.userId});
}

module.exports.logout = (req, res) => {
        res.clearCookie("usertoken");
        res.status(200).json({message: "User logged out."});
    }