const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }

});

const categoryModel = mongoose.model('category', categorySchema);
module.exports = {categoryModel};