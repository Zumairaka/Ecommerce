const express = require('express');
const router = express.Router();
const {idsModel} = require('../models/idsModel');

// verify sponsor ID
router.post('/', async function(req, res, next) {
    var sponsorId = req.body.sponsorId;

    await idsModel.findOne({distributorId: sponsorId}, (error, idData) => {
        if (error) {
            res.json({'message' : 'Error retrieving the data', 'error' : 'true', 'data' : 'null'});
        }
        else if (!idData) {
            res.json({'message' : 'Sponsor Id does not exist, verification failed', 'error' : 'true', 'data' : 'null'});
        }
        else {
            var resData = {sponsorId: sponsorId};
            res.json({'message' : 'Verification Successful', 'error' : 'false', 'data' : resData});
        }
    }) ;
});

module.exports = router;