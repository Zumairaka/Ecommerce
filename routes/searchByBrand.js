const express = require('express');
const router = express.Router();
const {productModel} = require('../models/productModel');

// search by brand
router.post('/', async function(req, res, next) {
    var brand = req.body.brand;

    await productModel.find({brand: brand}, (error, searchResult) => {
        if (error) {
            res.json({'message' : 'Error with searching', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Searching result', 'error' : 'false', 'data' : searchResult});
        }
    }) 
});

module.exports = router;