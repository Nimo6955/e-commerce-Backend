const OrderModel = require('../models/Order');
const mongoose = require('mongoose');
const User = require('../models/User');
const { error, success } = require('../Utils/responseWrapper');
const ProductModel = require('../models/Product')


const createOrder = async (req, res) => {  
    try {  
        const { userId, items, totalAmount, paymentMethod, address, pincode, status } = req.body;  

        // Validate required fields  
        if (!userId || !items || !totalAmount || !paymentMethod || !address || !pincode) {  
            return res.send(error(400, 'All fields are required'));  
        }  

        // Fetch product details for each item  
        const orderItems = await Promise.all(items.map(async item => {  
            const product = await ProductModel.findById(item.productId); // Fetch the entire product  
            if (!product) {  
                throw new Error(`Product with ID ${item.productId} not found`);  
            }  
            return {  
                product, // Store the entire product object  
                quantity: item.quantity  
            };  
        }));
        // Create the order with the complete product details  
        const order = await OrderModel.create({  
            userId,  
            items: orderItems,  
            totalAmount,  
            paymentMethod,  
            address,  
            pincode,  
            status: status || 'Pending',  
        });  

        // Find the user and update their orders  
        const user = await User.findById(userId);  
        if (!user) {  
            return res.send(error(400, 'User not found'));  
        }  

        user.orders.push(order._id);  
        await user.save();  

        return res.send(success(200, { order }));  
    } catch (e) {  
        return res.send(error(500, e.message)); // Fixed typo from e.massage to e.message  
    }  
};


const updateOrder = async (req, res) => {
    const { id ,status } = req.body;

    if (!status) {
        res.send(error(400, 'status is required'))
    }
    try {
        const order = await OrderModel.findByIdAndUpdate(id, {
            status,
        }, { new: true });

        if (!order) {
            res.send(error(400, 'order not found'))
        }

        return res.send(success(200, { order}))
    } catch (e) {
        return res.send(error(500, e.massage))
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await OrderModel.findById(orderId);
        if (!order) {
            res.send(error(400, 'order not found'))
        }
        return res.send(success(200, { order}))
    } catch (e) {
        return res.send(error(500, e.massage))
    }
};

const removeOrder = async (req, res) => {  
    try {  
        const { userId, orderId } = req.body;  

        // Validate required fields  
        if (!userId || !orderId) {  
            return res.send(error(400, 'User ID and Order ID are required'));  
        }  

        // Find the user  
        const user = await User.findById(userId);  
        if (!user) {  
            return res.send(error(400, 'User not found'));  
        }  

        // Check if the order exists in the user's orders  
        const orderIndex = user.orders.indexOf(orderId);  
        if (orderIndex === -1) {  
            return res.send(error(400, 'Order not found in user orders'));  
        }  

        // Remove the order ID from the user's orders  
        user.orders.splice(orderIndex, 1);  
        await user.save();  

        // Optionally, you can also delete the order from the OrderModel if needed  
        await OrderModel.findByIdAndDelete(orderId);  

        return res.send(success(200, { message: 'Order removed successfully' }));  
    } catch (e) {  
        return res.send(error(500, e.message));  
    }  
};
const allOrders = async (req, res) => {
    try {
        let orders = await OrderModel.find({});
        return res.send(success(200, { orders}))
    } catch (e) {
        return res.send(error(500, e.massage))
    }
};
module.exports = {
    createOrder,
    updateOrder,
    getOrderById,
    removeOrder,
    allOrders
}