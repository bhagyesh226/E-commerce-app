const addToCartModel = require("../models/addToCartModel");

const updataAddToCartProduct = async (req, res) => {
    try {

        const currentUserId = req.userId
        const addToCartProductId = req.body._id
        const qty = req.body.quantity

        const updataProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId, userId: currentUserId },
            { $set: { quantity: qty } }
        );

        res.status(200).json({
            message: 'product updataed',
            dsta: updataProduct,
            success: true
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = updataAddToCartProduct;