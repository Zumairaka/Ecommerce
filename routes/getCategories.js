const express = require('express');
const router = express.Router();
const {categoryModel} = require('../models/categoryModel');

// get all the categories
router.get('/', async function(req, res, next) {
    await categoryModel.find({}, (error, data) => {
        if (error) {
            res.json({'message' : 'Error retrieving the data' , 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Available categories', 'error' : 'false', 'data' : data});
        }
    });
});

module.exports = router;