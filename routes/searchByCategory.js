const express = require('express');
const router = express.Router();
const {productModel} = require('../models/productModel');

// search by category
router.post('/', async function(req, res, next) {
    var category = req.body.category;

    await productModel.find({category: category}, (error, searchResult) => {
        if (error) {
            res.json({'message' : 'Error with searching', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Searching result', 'error' : 'false', 'data' : searchResult});
        }
    }) 
});

module.exports = router;