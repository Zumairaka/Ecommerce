const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {adminModel} = require('../models/adminModel');

// to send mail for resetting password
router.post('/', async function(req, res, next) {
    var adminEmail = req.body.email;
    var key = crypto.randomBytes(64).toString('hex');
    var token = jwt.sign({email: adminEmail}, key);
    // store this token in db
    await adminModel.findOneAndUpdate({email: adminEmail}, {resetPassword: token}, (error, updateData) => {
        if (error) {
            res.json({'message' : 'Error updating the token', 'error' : 'true', 'data' : 'null'});
        }
        else {
            // transport
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sumairaka.virtualgain90@gmail.com',
                    pass: 'virtualgain123'
                }
            });

            // mail options
            var mailOptions = {
                from: 'sumairaka.virtualgain90@gmail.com',
                to: adminEmail,
                subject: 'Renz Global: Link for password Reset',
                text: `Click the link below to reset password`,
                html: '<p>https://renzglobal.com/token</p>'
            };

            // sending mail
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.json({'message' : 'Error with sending password reset code'});
                }
                else {
                    res.json({'message' : 'Verification code sent', 'error' : 'false', 'data' : info.response});
                }
            });
        }
    });

});

module.exports = router;