var express = require('express');
var router = express.Router();
const {registerModel} = require('../models/registerModel');
const {idsModel} = require('../models/idsModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


//registration router
router.post('/', async function(req, res, next) {
    var data = req.body;
    console.log(data);

    // phone verification before storing the details
    await registerModel.findOne({phone: data.phone}, async function(error, phoneData) {

        // phone does not exist
        if (!phoneData) {

            // email verification before storing the data
            await registerModel.findOne({email: data.email}, async function(error, emailData) {
                
                //email does not exist
                if (!emailData) {
                    
                    // jwt token
                    var user = {email: data.email, password: data.password};
                    var key = crypto.randomBytes(64).toString('hex');
                    var jwtToken = jwt.sign(user, key);
                    console.log(jwtToken);

                    // storing the data as new distributor
                    var regData = { fname: data.fname, mname: data.mname, lname: data.lname, dob: data.dob, gender: data.gender, add1: data.add1, add2: data.add2,
                        landmark: data.landmark, city: data.city, postOffice: data.postOffice, district: data.district, pincode: data.pincode, state: data.state,
                         email: data.email, password: data.password, phone: data.phone, phoneHome: {stdCode: data.stdCode, number: data.number}, token: jwtToken };
                    var distributorData = new registerModel(regData);
                    await distributorData.save( async (error, storeData) => {
                        if(error) {
                            res.json({'message' : 'Error With Registration', 'error' : 'true', 'data' : 'null'});
                            throw error;
                        }
                        // registration successful
                        else {
                            // update sponsor id of this distributor
                            var idData = {_id: storeData._id , sponsorId: data.sponsorId};
                            idData = new idsModel(idData);
                            await idData.save((error, saveData) => {
                                if (error) {
                                    res.json({'message' : 'Error with saving sponsor id', 'error' : 'true', 'data' : 'null'});
                                }
                                // updation successful
                                else {
                                    var resData = {'_id': storeData._id, 'email': storeData.email, 'phone' : storeData.phone, 'token' : storeData.token};
                                    res.json({'message' : 'Successfully Registered', 'error' : 'false', 'data' : resData});
                                }
                            });                            
                        }
                    });
                }
                // email exists
                else if (emailData) {
                    res.json({'message' : 'Email Already Exists', 'error' : 'true', 'data' : 'null'});
                }
                else {
                    res.json({'message' : 'Error With Registration', 'error' : 'true', 'data' : 'null'});
                }
            });
            
        }
        // phone exists
        else if (phoneData) {
            res.json({'message' : 'Phone Number Already Exists', 'error' : 'true', 'data' : 'null'});
        }
        else {
            res.json({'message' : 'Error With Registration', 'error' : 'true', 'data' : 'null'});
        } 
    });
});

module.exports = router;
