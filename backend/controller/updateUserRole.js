const UserModel = require('../models/userModel');

async function updateUserRole(req, res) {
    const { name, email, role } = req.body;
    const { id } = req.params;

    try {
        // Update all fields sent in request body
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser

        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = updateUserRole;


