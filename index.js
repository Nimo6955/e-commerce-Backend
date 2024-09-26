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
const cloudinary = require('cloudinary').v2;  



dotenv.config()
app.use(express.json())
app.use(cors({
    origin: process.env.Server_App,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))



app.use(morgan('common'))
app.use('/static', express.static(__dirname + '/Public/Images'))

// Configure Cloudinary with your cloud name, API key, and API secret  
cloudinary.config({  
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}); 
mongoose.connect(process.env.Mongo_Url)


app.use('/auth', authRouters)
app.use('/product', productRouters)
app.use('/user', userRouter)
app.use('/order', orderRouter); 


app.listen('5000', () => {
    console.log("Server is running on port 5000")
    console.log("Mongodb is Connected")
   })