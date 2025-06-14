const addToCartModel = require("../models/addToCartModel");

const addToCartViewPriduct =async(req,res)=>{
    try{

        const currentUser  = req.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate('productId')

        res.status(200).json({
            data : allProduct,
            success : true
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
}

module.exports = addToCartViewPriduct;