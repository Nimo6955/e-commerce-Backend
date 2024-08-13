const mongoose = require('mongoose');


const createProduct = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },
    productImage:{
        type: [String],
        required: true  
    },
    category:{
        type: String,
        default: 'Accessories',
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    available:{
        type: Boolean,
        default: true,
    }
})

const Product = mongoose.model('product',createProduct)

module.exports = Product;