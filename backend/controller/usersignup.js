const { request } = require("express");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignup (req, res) {
    try {

    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
if (user) {
  throw new Error("User already exists with this email");
}

    if (!name ) {
      throw new Error("Name is required");
    }
    if (!email ) {
      throw new Error("email is required");
    }
    if (!password ) {
      throw new Error("Password is required");
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if(!hashedPassword){
        throw new Error("Error hashing password");
    }

    const payload = {
        ...req.body,
        role:'GENERAL',
        password: hashedPassword
    }   
    const UserDate = new UserModel(payload);
    const savedUser = await UserDate.save();

    res.status(201).json({
        success: true,
        message: "User created successfully",
        error: false,
        data: savedUser
    });
}catch (err) {
    res.json({
        success: false,
         message: err.message,
        error: true
    });
    }
  
} 

module.exports = userSignup;