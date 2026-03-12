const express = require('express');
const Product = require('../model/Product');
const router = express.Router()

const { verifyToken } = require('../middleware/authMiddleware');
const AddToCart = require('../model/AddToCart');




router.post('/add', verifyToken, async (req, res) => {
    try {
        const { productId, userId } = req.body;

        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({
            message: "Product Not Found"
        })

        let cart = await AddToCart.findOne({ userId })

        if (!cart) {
            cart = new AddToCart({
                userId,
                items: []
            })
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)


        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1
        } else {
            cart.items.push({
                productId,
                productDescription: product.productDescription,
                productImage: product.productImage,
                productPrice: product.productPrice,
                productName: product.productName

            })
        }

        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.productPrice * item.quantity, 0
        )

        await cart.save()

        res.status(200).json({
            message: 'Product is added in cart'
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})


router.get('/list', verifyToken, async (req, res) => {
    try {

        const cart = await AddToCart.findOne({
            userId: req.user._id
        })
        res.json({ cart })
    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})

router.put('/update/:productId', verifyToken, async (req, res) => {
    try {

        const { quantity } = req.body
        console.log(quantity, "quantity")
        const cart = await AddToCart.findOne({
            userId: req.user._id
        })
        console.log(cart, "cart")

        const item = cart.items.find(
            item => item.productId.toString() === req.params.productId
        )

        console.log(item, "item")

        if (item) {
            item.quantity = quantity

            cart.totalAmount = cart.items.reduce(
                (acc, item) => acc + item.productPrice * item.quantity, 0
            )
        }
        await cart.save();
        res.json({ cart })

    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})

router.delete('/remove/:productId', verifyToken, async (req, res) => {
    try {
        const cart = await AddToCart.findOne({
            userId: req.user._id
        })
        console.log(cart, "cart")

        cart.items = cart.items.filter(
            item => item.productId.toString() !== req.params.productId
        )

        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.productPrice * item.quantity, 0
        )

        await cart.save();
        res.json({ cart })

    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})




module.exports = router