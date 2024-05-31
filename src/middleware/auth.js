const jwt = require("jsonwebtoken");
const DiagnosisUser = require("../models/newUser");
require("dotenv").config();

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

        const user = await DiagnosisUser.findOne({ _id: verifyUser._id });

        req.token = token;
        req.user = user;

        next();

    } catch (e) {
        res.send(e).status(401);
    }
}

module.exports = auth;

