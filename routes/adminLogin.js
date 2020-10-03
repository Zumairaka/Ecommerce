const express = require('express');
const router = express.Router();
const {adminModel} = require('../models/adminModel');

// admin login
router.post('/', async function(req, res, next) {
    var data = req.body;

    await adminModel.findOne({email: data.email, password: data.password}, (error, data) => {
        if (error) {
            res.json({'message' : 'Error retrieving the admin data', 'error' : 'true', 'data' : 'null'});
        }
        else if (!data) {
            res.json({'message' : 'Incorrect Username or password', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Successfully logged in as admin', 'error' : 'false', 'data' : data});
        }
    });
});

module.exports = router;