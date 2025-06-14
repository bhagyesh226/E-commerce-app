const ProductModel = require('../models/productModel');


async function uplodeProduct(req, res) {
    try {

        const uplodeProcut = new ProductModel(req.body)

        const savedProduct = await uplodeProcut.save();


        res.status(200).json({
            success : true,
            message : "Product uploaded successfully",
            data : savedProduct
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || err,
            error: true
        });
    }
}

module.exports = uplodeProduct;