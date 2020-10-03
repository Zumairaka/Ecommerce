const express = require('express');
const router = express.Router();
const {categoryModel} = require('../models/categoryModel');

// add new category
router.post('/', async function(req, res, next) {

    var category = req.body.category;
    var data = {name: category};
    data = new categoryModel(data);
    await categoryModel.find({name: {$regex: new RegExp(category), $options: 'i'}}, async (error, searchData) => {
        if (error) {
            res.json({'message' : 'Error', 'error':'true', 'data' : 'null'});
        }   
        else if (!searchData) {
            await data.save((error, saveData) => {
                if (error) {
                    res.json({'message' : 'Error with adding the category', 'error' : 'true', 'data' : 'null'});
                }
                else {
                    res.json({'message' : 'Successfully saved new category', 'error' : 'false', 'data' : saveData});
                }
            });
        }
        else {
            res.json({'message' : 'Category name already exists', 'error' : 'true', 'data' : 'null'});
        }
    });
});

module.exports = router;
