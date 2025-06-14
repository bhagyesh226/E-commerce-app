const ProductModel = require("../models/productModel");


const searchProductData = async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase();

    const products = await ProductModel.find({
      $or: [
        { category: { $regex: query, $options: "i" } },
        { brands: { $regex: query, $options: "i" } }
      ]
    });

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = searchProductData;
