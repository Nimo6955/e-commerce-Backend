const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')


router.post('/createOrder', orderController.createOrder)
router.put('/updateorder/:id', orderController.updateOrder);
router.get('/order/:id', orderController.getOrderById);
router.delete('/removeOrder', orderController.removeOrder);
router.get('/allorders', orderController.allOrders);


module.exports = router;