const router = require('express').Router();
const userController = require('../controllers/userController')



router.get('/getOneUser/:id', userController.getOneUser)
router.put('/updateUser/:id', userController.updateUser)
router.post('/addAddress/:id', userController.addAddress)
router.put('/updateAddress/:id', userController.updateAddress)
router.delete('/deleteAddress/:id', userController.deleteAddress)



module.exports = router