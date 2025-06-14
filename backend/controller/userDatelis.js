const UserModel = require("../models/userModel")

async function userDatelis(req,res){
    try{

const user = await UserModel.findById(req.userId)

res.status(200).json({
    data : user,
    error: false,
    success : true,
    message: "user data"
})


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error: true,
            succss: false
        })
    }
}

module.exports = userDatelis