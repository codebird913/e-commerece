const express = require('express');
const Product = require('../model/Product');
const router = express.Router()
const multer = require('multer');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.originalname.split('.').pop()
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
})

const upload = multer({ storage: storage })

router.post('/add', verifyToken, isAdmin, upload.single("productImage"), async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;
        console.log(productName, productDescription, productPrice, req.file.filename)


        await Product.create({
            productName, productDescription, productPrice, productImage: req.file.filename
        })

        res.status(200).json({
            message: 'Product is added'
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})


router.put('/edit/:editId', verifyToken, isAdmin, upload.single("productImage"), async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;
        const { editId } = req.params
        console.log(productName, productDescription, productPrice, req.file.filename)
        console.log(editId)

        const product = await Product.findById({ _id: editId });

        if (product) {

            await Product.findByIdAndUpdate(editId, {
                productName, productDescription, productPrice, productImage: req.file.filename
            }
            )

            res.status(200).json({
                message: 'Product is updated'
            })

        }
    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})


router.get('/list', async (req, res) => {
    try {

        const productList = await Product.find()
        res.status(200).json({
            productList: productList
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})


router.get('/product-detail/:id', async (req, res) => {
    try {

        const { id } = req.params


        const product = await Product.findById({ _id: id })
        res.status(200).json({
            product: product
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})
router.delete('/delete/:id', verifyToken, isAdmin, async (req, res) => {
    try {

        const { id } = req.params
        await Product.findByIdAndDelete({ _id: id })
        res.status(200).json({
            message: 'product is deleted'
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})



module.exports = router