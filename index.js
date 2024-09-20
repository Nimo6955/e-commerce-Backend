const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan') 
const authRouters = require('./routers/authRouter')
const productRouters = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')
const orderRouter = require('./routers/orderRouter'); 
const dotenv = require('dotenv')
const app = express();

dotenv.config()
app.use(express.json())
app.use(cors({
    origin: process.env.Server_App,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(morgan('common'))
app.use('/static', express.static(__dirname + '/Public/Images'))
mongoose.connect(process.env.Mongo_Url)


app.use('/auth', authRouters)
app.use('/product', productRouters)
app.use('/user', userRouter)
app.use('/order', orderRouter); 


app.listen('5000', () => {
    console.log("Server is running on port 5000")
    console.log("Mongodb is Connected")
   })