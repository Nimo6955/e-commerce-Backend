const OrderModel = require('../models/Order');
const mongoose = require('mongoose');
const User = require('../models/User');
const { error, success } = require('../Utils/responseWrapper');

const createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, paymentMethod, address, pincode, status } = req.body;
        if (!userId || !items || !totalAmount || !paymentMethod || !address || !pincode) {
            res.send(error(400, 'All feilds are are required'))
        }

        const order = await OrderModel.create({
            userId,
            items,
            totalAmount,
            paymentMethod,
            address,
            pincode,
            status: status || 'pending',
        });

        const user = await User.findById(userId);
        if (!user) {
            res.send(error(400, 'user not found'))
        }

        user.orders.push(order._id);
        await user.save();

        return res.send(success(200, {user, order}))
    } catch (e) {
       return res.send(error(500, e.massage))

    }
};


const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

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
        const { id } = req.body;
        const order = await OrderModel.findByIdAndDelete(id);
        return res.send(success(200, {"order removed successfuly": order}))
       
    } catch (error) {
        return res.send(error(500, e.massage))
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