const addToCartModel = require("../models/addToCartModel");

const CountAddToCartProduct = async (req , res)=>{
    try{
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId :userId
        })
 res.json({
    data : {
        count :count
    },
    message:'good',
    success : true,
    error : false
 })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
            error: true
        });
    }
}

module.exports = CountAddToCartProduct;