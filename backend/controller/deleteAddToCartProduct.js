const addToCartModel = require('../models/addToCartModel'); // ✅ Add this

const deleteAddToCartProduct = async(req , res) =>{
    try{

        const currentUserId = req.userId
        const addToCaetProductId  = req.body._id

        const deleteproduct = await addToCartModel.deleteOne({_id : addToCaetProductId})

        res.status(200).json({
            message : "delete success fully",
            success : true,
            error : false,
            data : deleteproduct
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteAddToCartProduct;