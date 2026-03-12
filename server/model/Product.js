const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String
    },
    productImage: {
        type: String
    },
    productDescription: {
        type: String
    },
    productPrice: {
        type: String
    }
})

module.exports = mongoose.model('Product', productSchema)