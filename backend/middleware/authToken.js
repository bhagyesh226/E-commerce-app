const jwt = require("jsonwebtoken")
require('dotenv').config();

async function authtoken(req, res, next) {
    try {
     const token = req.cookies?.token || req.headers['authtoken'];


        if(!token){
            return res.status(200).json({
                message: "user not Login",
                error: true,
                success : false
            })
        }

        jwt.verify(token, process.env.JWT_TOKEN, function (err, decoded) {
            // console.log(err)
            // console.log('nuu',decoded)
            
            if(err){
                console.log("auth error",err)
            }
            req.userId = decoded?._id

            next()
        });

        

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            succss: false,
            data: []
        })
    }
}

module.exports = authtoken