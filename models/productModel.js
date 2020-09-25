const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    item_name: {
        type: String,
        required: true
    },
    item_type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    aboutBrand: {
        type: String,
        required: true
    },
    offers: {
        value: {
            type: Number
        },
        description: {
            type: String
        }
    },
    manufacturingDate: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    numberOfCustomersBought: {
        type: Number
    },
    numberOfCustomersRated: {
        type: Number
    }

});

const productModel = mongoose.model('product', productSchema);
productModel.createIndexes();
module.exports = {productModel};