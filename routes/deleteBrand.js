const express = require('express');
const router = express.Router();
const {brandModel} = require('../models/brandModel');

// delete brand name
router.post('/', async function(req, res, next) {
    var id = req.body.id;

    await brandModel.findOneAndDelete({_id: id}, (error, data) => {
        if (error) {
            res.json({'message' : 'Error with deleting brand name', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Successfully deleted the brand name', 'error' : 'false', 'data' : 'null'});
        }
    });
});

module.exports = router;