const express = require('express');
const router = express.Router();
const {productModel} = require('../models/productModel');

// search by item type
router.post('/', async function(req, res, next) {
    var type = req.body.type;

    await productModel.find({item_type: type}, (error, searchResult) => {
        if (error) {
            res.json({'message' : 'Error with searching', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Searching result', 'error' : 'false', 'data' : searchResult});
        }
    });
});

module.exports = router;