const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    
    fname: {
        type: String,
        required: true
    },
    mname: String,
    lname: String,
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    add1: {
        type: String,
        required: true
    },
    add2: String,
    landmark: String,
    city: {
        type: String,
        required: true
    },
    postOffice: String,
    district: String,
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    phoneHome: {
        stdCode: {
            type: Number 
        },
        number: {
            type: Number
        }
    },
    token: {
        type: String,
        required: true
    }

});

const registerModel = mongoose.model('distributor', registerSchema);
module.exports = {registerModel};