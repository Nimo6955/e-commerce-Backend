const router = require('express').Router();
const productController = require('../controllers/productController')
const upload = require("../middleWare/multer")

router.get('/', productController.getAllProducts)
router.post('/createProduct', upload.array('productImage', 4), productController.createProductController)
router.put('/updateImage1/:id', upload.single('productImage',1), productController.updateImage1)
router.put('/updateImage2/:id', upload.single('productImage',1), productController.updateImage2)
router.put('/updateImage3/:id', upload.single('productImage',1), productController.updateImage3)
router.put('/updateImage4/:id', upload.single('productImage',1), productController.updateImage4)
router.put('/updateProduct/:id', productController.updateProduct)
router.delete('/deleteProduct', productController.deleteProduct)
router.post('/addToKart/:id', productController.addToKart)
// router.post('/login', authController.logInController)

module.exports = router