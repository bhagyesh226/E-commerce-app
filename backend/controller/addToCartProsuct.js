const addToCartModel = require("../models/addToCartModel");

const addToCartProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId; 

    if (!productId || !currentUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing productId or user" });
    }

    const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

    if (isProductAvailable) {
      return res.json({ 
        success: false, 
        message: "Already added" });
    }

    const payload = {
      productId,
      quantity: 1,
      userId: currentUser
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      success: true,
      message: "Product added to cart",
      data: saveProduct
    });

  } catch (err) {
    // console.error("AddToCart Error:", err.message);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = addToCartProduct;
