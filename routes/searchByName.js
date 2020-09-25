const express = require('express');
const router = express.Router();
const {productModel} = require('../models/productModel');

// search by brand
router.post('/', async function(req, res, next) {
    var name = req.body.name;

    // create index for searching
    await productModel.find({item_name: {$regex: new RegExp(name), $options: 'i'}}, (error, searchResult) => {
        if (error) {
            res.json({'message' : 'Error with searching', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Searching result', 'error' : 'false', 'data' : searchResult});
        }
    }) 
});

module.exports = router;