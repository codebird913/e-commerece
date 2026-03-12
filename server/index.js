const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./model/User');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')


dotenv.config()

require("node:dns/promises").setServers(["8.8.8.8", "1.1.1.1"]);

app.use(cors({  // Enable CORS for all routes
    origin: 'http://localhost:5173',  // Replace with your frontend's origin (e.g., dev server port)
    credentials: true  // If using cookies or auth headers
}));
app.use(express.json());
app.use('/upload',express.static('upload'))
  


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ Mongo Error:", err);
  });

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, number } = req.body
    console.log(fullName, email, password, number)
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User is already register"
      })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName, email, password: hashPassword, number, role: "user"
    })

    res.status(200).json({
      message: 'User is registered'
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Server Error"
    })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return res.status(400).json({
        message: "Email id invalid"
      })
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({
        message: "Password id invalid"
      })
    }

    const token = await jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1D' }
    )
    res.status(200).json({
      token: token,
      user: existingUser,
      message: 'User is Login'
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Server Error"
    })
  }
})

app.use('/product', require('./routes/productRoutes'))
app.use('/cart', require('./routes/cartRoutes'))
app.use('/order', require('./routes/orderRoutes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
