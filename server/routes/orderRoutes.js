const express = require('express');

const router = express.Router()

const { verifyToken } = require('../middleware/authMiddleware');
const razorpayInstance = require('../config/razorpay');

const crypto = require('crypto');

// import models used in verify-payment
const Cart = require('../model/AddToCart');
const Order = require('../model/Order');

// Endpoint to create an order
router.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency || 'INR',
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating RazorPay order');
    }
});



router.post('/verify-payment', verifyToken, async (req, res) => {

    try {
        console.log("verify-payment body", req.body);
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const signature = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(signature)
            .digest('hex');
        if (razorpay_signature !== expectedSignature) {
            return res.status(400).json({ message: "Invalid signature" })

        }
        const cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            return res.status(400).json({ message: "Cart is empty" })
        }

        const newOrder = new Order({
            userId: req.user._id,
            items: cart.items.map(item => ({
                productId: item.productId,
                productImage: item.productImage,
                productDescription: item.productDescription,
                productPrice: item.productPrice,
                productName: item.productName,
                quantity: item.quantity
            })),
            totalAmount: cart.totalAmount,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            Signature: razorpay_signature,
            paymentStatus: 'paid',
            orderStatus: 'processing'
        })

        await newOrder.save();

        // clear the cart after creating order
        await Cart.findOneAndDelete({ userId: req.user._id });
        res.status(200).json({ message: "Payment verified successfully" })
    }
    catch (err) {
        console.error("verify-payment error", err);
        res.status(500).json({ message: "Server error", error: err.message })
    }
});

router.get('/order-list', verifyToken, async (req, res) => {
    try {
        const order = await Order.find({ userId: req.user._id });
        res.status(200).json({ orderList: order });
    } catch (err) {         

       res.status(500).json({ message: "Server error", error: err.message })

}


})

router.get('/admin/order-list', verifyToken, async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json({ orderList: order });
    } catch (err) {         

       res.status(500).json({ message: "Server error", error: err.message })

}


})
module.exports = router