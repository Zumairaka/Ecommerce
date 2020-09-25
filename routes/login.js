const express = require('express');
const router = express.Router();
const {registerModel} = require('../models/registerModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// login router
router.post('/', async function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    // retrieving the registered pin
    await registerModel.findOne({email: email}, async(error, data) => {
        console.log(data);

        // email exists
        if (data) {

            // password matches
            if (data.password == password) {

                // generate new token
                var key = crypto.randomBytes(64).toString('hex');
                var user = {email: email, password: password};
                var jwtToken = jwt.sign(user, key);

                // replacing the token at the databse
                await registerModel.findOneAndUpdate({email: email}, {token: jwtToken}, async (error, updateData) => {

                    // login successful
                    if (updateData) {
                        //console.log(updateData);  
                        var resData = {_id: updateData._id, token: updateData.token};  
                        res.json({'message' : 'Login Successful', 'error' : 'false', 'data' : resData});
                    }
                    else if (error) {
                        res.json({'message' : 'Token Updation Failed', 'error': 'true', 'data' : 'null'});
                    }
                });
            }
            else {
                res.json({'message' : 'Wrong Password', 'error' : 'true', 'data' : 'null'});
            }
        }
        else if (!data) {
            res.json({'message' : 'Email is not registered', 'error' : 'true', 'data' : 'null'});
        }
        else if (error) {
            res.json({'message' : 'Error', 'error' : 'true', 'data' : 'null'});  
        }
    });
});

module.exports = router;