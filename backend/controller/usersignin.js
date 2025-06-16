const UserModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config();

async function userSignin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) throw new Error("please enter email");
        if (!password) throw new Error("please enter password");

        const user = await UserModel.findOne({ email });
        if (!user) throw new Error("user not found");

        const checkpassword = await bcrypt.compare(password, user.password);
        if (!checkpassword) throw new Error("please check password");

        const tokendata = { _id: user._id, email: user.email };
        const token = jwt.sign(tokendata, process.env.JWT_TOKEN, {
            expiresIn: "1d"
        });

        // 🛡️ Cookie options based on environment
        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ only secure on deployed (HTTPS)
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ CORS-safe
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        };

        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            success: false,
            message: err.message,
            error: true
        });
    }
}

module.exports = userSignin;
