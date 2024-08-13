const router = require('express').Router();
const authController = require('../controllers/authController')

router.post('/signup', authController.signUpController)
router.post('/login', authController.logInController)
router.get('/', authController.getAllUser)

module.exports = router