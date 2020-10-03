const express = require('express');
const router = express.Router();
const {brandModel} = require('../models/brandModel');

// add new brand
router.post('/', async function(req, res, next) {

    var brand = req.body.brand;
    var data = {name: brand};
    data = new brandModel(data);
    await brandModel.find({name: {$regex: new RegExp(brand), $options: 'i'}}, async (error, searchData) => {
        if (error) {
            res.json({'message' : 'Error', 'error':'true', 'data' : 'null'});
        }   
        else if (!searchData) {
            await data.save((error, saveData) => {
                if (error) {
                    res.json({'message' : 'Error with adding the brand', 'error' : 'true', 'data' : 'null'});
                }
                else {
                    res.json({'message' : 'Successfully saved new brand name', 'error' : 'false', 'data' : saveData});
                }
            });
        }
        else {
            res.json({'message' : 'Brand name already exists', 'error' : 'true', 'data' : 'null'});
        }
    });
});

module.exports = router;