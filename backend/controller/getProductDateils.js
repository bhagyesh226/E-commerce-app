const ProductModel = require("../models/productModel");

const getProductDateils = async(req,res)=>{
    try{
        const {productId} = req.body


const product = await ProductModel.findById(productId)

res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data : product
        });

    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

module.exports = getProductDateils;