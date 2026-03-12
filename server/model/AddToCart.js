const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        productImage: String,
        productDescription: String,
        productPrice: String,
        productName: String,
        quantity: {
            type: Number,
            default: 1
        }
    }
)

const addToCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [cartItemSchema],
    totalAmount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('AddToCart', addToCartSchema)