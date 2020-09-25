const express = require('express');
const router = express.Router();
const {productModel} = require('../models/productModel');

// delete product by admin
router.get('/:id', async function(req, res, next) {
    var id = req.params.id;

    await productModel.findOneAndDelete({_id: id}, (error, data) => {
        if (error) {
            res.json({'message' : 'Error, deletion is unsuccessful', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Successfully deleted', 'error' : 'false', 'data' : data});
        }
    })
});

module.exports = router;