// controller/UpdataProduct.js
const ProductModel = require("../models/productModel");

async function UpdataProduct(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = UpdataProduct;
