const UserModel = require('../models/userModel'); 

async function allUsers(req, res) {
    try {
        const users = await UserModel.find({}, '-password');

        res.status(200).json({
            data: users,
            error: false,
            success: true,
            message: "All users retrieved successfully"
        });

       
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = allUsers;