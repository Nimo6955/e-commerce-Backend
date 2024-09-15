const router = require('express').Router();
const authController = require('../controllers/authController')

router.post('/signup', authController.signUpController)
router.post('/login', authController.logInController)
router.get('/', authController.getAllUser)
router.post('/forgotPassword', authController.forgotPassword)
router.post('/verifyOTP', authController.verifyOTP)
router.post('/updatePassword', authController.updatePassword)

module.exports = router