const express = require('express');
const router = express.Router();
const {brandModel} = require('../models/brandModel');

// get brands
router.get('/', async function(req, res, next) {
    await brandModel.find({}, (error, data) => {
        if (error) {
            res.json({'message' : 'Error retrieving the brand names'});
        }
        else {
            res.json({'message' : 'Available brands are', 'error' : 'false', 'data' : data});
        }
    });
});

module.exports = router;