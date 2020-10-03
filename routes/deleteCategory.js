const express = require('express');
const router = express.Router();
const {categoryModel} = require('../models/categoryModel');

// delete category
router.post('/', async function(req, res, next) {
    var id = req.body.id;
    await categoryModel.findOneAndDelete({_id: id}, (error, data) => {
        if (error) {
            res.json({'message' : 'Error deleting the category', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Successfully deleted the category', 'error' : 'false', 'data' : 'null'});
        }
    });
});

module.exports = router;
