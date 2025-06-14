const ProductModel = require("../models/productModel");

const getProduct = async (req, res) => {
    try {   

        const appProcut = await ProductModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: appProcut
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = getProduct;