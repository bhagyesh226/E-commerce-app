const UserModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config();

async function userSignin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please enter email");
        }
        if (!password) {
            throw new Error("Please enter password");
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new Error("Incorrect password");
        }

        const tokenData = {
            _id: user._id,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.JWT_TOKEN, {
            expiresIn: "1d"
        });

        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true only in prod (Render)
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // necessary for cross-origin cookies
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        };

        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Login successful",
            data: token,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            error: true
        });
    }
}

module.exports = userSignin;
