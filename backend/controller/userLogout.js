async function userLogout (req,res){
    try{
res.clearCookie("token")

res.json({
    message:"user Logout",
    error:false,
    success:true,
    data:[]
})
    }catch(err){
         res.status(400).json({
            message : err.message || err,
            error: true,
            succss: false
        })
    }
}

module.exports = userLogout