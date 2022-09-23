const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.FIRST_SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            req.userId = payload.id;
            req.firstName = payload.firstName;
            req.lastName = payload.lastName;
        next();
        }
    });
}

