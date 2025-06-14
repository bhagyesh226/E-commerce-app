const ProductModel = require("../models/productModel");

const getCategoryWiseProduct = async(req ,res) =>{
    try{
        const {category} = req?.body
        const product = await ProductModel.find({category})


         res.status(200).json({
            success: true,
            data : product
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = getCategoryWiseProduct;