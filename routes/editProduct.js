const express = require('express');
const router = express.Router();
const {productModel} = require('../models/productModel');

// edit product at admin level
router.post('/', async function(req, res, next) {
    var data = req.body;

    await productModel.findOneAndUpdate({_id: data.id}, {item_name: data.name, item_type: data.type, price: data.price, category: data.category, brand: data.brand, description: data.description, 
        aboutBrand: data.aboutBrand, offers: {value: data.offerValue, description: data.offerDescription}, manufacturingDate: data.manufacturingDate,
        expiryDate: data.expiryDate, imageUrl: data.imageUrl}, (error, updateData) => {
            if (error) {
                res.json({'message' : 'Error, updation is unsuccessful', 'error' : 'true', 'data' : 'null'});
            }
            else {
                res.json({'message' : 'Successfully updated', 'error' : 'false', 'data' : 'null'});
            }
        });
});

module.exports = router;