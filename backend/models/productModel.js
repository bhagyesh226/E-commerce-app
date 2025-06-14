const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    brands: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
    },

    image: [],

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true
    },

    selling: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model('product', productSchema);

module.exports = ProductModel;