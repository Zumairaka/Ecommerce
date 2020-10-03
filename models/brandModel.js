const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }

});

const brandModel = mongoose.model('brand', brandSchema);
module.exports = {brandModel};