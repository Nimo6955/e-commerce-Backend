const mongoose = require('mongoose');  

const OrderSchema = new mongoose.Schema({  
    userId: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'users',  
        required: true  
    },  
    items: [  
        {  
            product: { // Change from productId to product  
                type: Object, // You can also define a separate Product schema if needed  
                required: true  
            },  
            quantity: {  
                type: Number,  
                required: true  
            }  
        }  
    ],  
    totalAmount: {  
        type: Number,  
        required: true  
    },  
    paymentMethod: {  
        type: String,  
        required: true  
    },  
    status: {  
        type: String,  
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],  
        default: 'Pending'  
    },  
    address: {  
        type: String,  
        required: true  
    },  
    pincode: {  
        type: String,  
        required: true  
    }  
}, { timestamps: true });  

const OrderModel = mongoose.model('orders', OrderSchema);  

module.exports = OrderModel;