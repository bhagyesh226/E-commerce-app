const ProductModel = require("../models/productModel");


async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const deleted = await ProductModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = deleteProduct;
