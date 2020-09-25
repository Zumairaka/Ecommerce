const express = require('express');
const router = express.Router();
const {productModel} = require('../models/productModel');

// add product details by admin
router.post('/', async function(req, res, next) {
    var data = req.body;
    //console.log(data);
    var productData = {item_name: data.name, item_type: data.type, price: data.price, category: data.category, brand: data.brand, description: data.description, 
        aboutBrand: data.aboutBrand, offers: {value: data.offerValue, description: data.offerDescription}, manufacturingDate: data.manufacturingDate,
        expiryDate: data.expiryDate, imageUrl: data.imageUrl};
    //console.log(productData);

    productData = new productModel(productData);
    await productData.save((error, saveData) => {
        if(error) {
            res.json({'message' : 'Error With adding product', 'error' : 'true', 'data' : 'null'});
            throw error;
        }
        // successful
        else {
            //console.log(saveData);
            res.json({'message' : 'Successfully added product', 'error' : 'false', 'data' : saveData});
        }
    });
});

module.exports = router;