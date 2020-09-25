const express = require('express');
const router = express.Router();
const {productModel} = require('../models/productModel');

// search by product Id
router.get('/:id', async function(req, res, next) {
    var id = req.params.id;

    await productModel.findOne({_id: id}, (error, searchResult) => {
        if (error) {
            res.json({'message' : 'Error with searching', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Searching result', 'error' : 'false', 'data' : searchResult});
        }
    }) 
});

module.exports = router;