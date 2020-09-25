const mongoose = require('mongoose');
const idsSchema = new mongoose.Schema({

    distributorId: {
        type: Number,
        unique: true
    },
    sponsorId: {
        type: Number,
        required: true
    }
    
});

const idsModel = mongoose.model('id', idsSchema);
module.exports = {idsModel};