const ProductModel = require("../models/productModel");

const getcategoryProduct = async (req, res) => {
    try{
        const product = await ProductModel.distinct("category");


        const productCategory = [];

        for (const category of product) {
            const products = await ProductModel.findOne( {category : category} )

            if (products) {
                productCategory.push(products);
            }
        }

      

        res.status(200).json({
            success: true,
            message: "Category Products fetched successfully",
            data: productCategory
        });


    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getcategoryProduct;