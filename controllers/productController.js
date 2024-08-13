const User = require('../models/User')
const Product = require('../models/Product')
const { error, success } = require('../Utils/responseWrapper');
const IMG_BASE_URL = 'http://localhost:5000/static/'



const createProductController = async (req, res)=>{
    
    try {

        const { productName , category, available, old_price, new_price } = req.body;
        productImage = req.files
        if(!productName || !category){
            res.send(error(400, 'All feilds are are required'))
        }  
        if(!productImage){            
            res.send(error(400, 'image not found'))
        }
        // if (!req.file) {
     
        //    return res.send(error(400, 'Image upload failed'))
        //   }
          const imageUrls = req.files.map(file => IMG_BASE_URL + file.filename);
        const product = await Product.create({
            productImage :  imageUrls,
            productName,
            category,
            new_price,
            old_price,
            available
        })

        return res.send(success(200, {product}))
    } catch (e) {
         return res.send(error(500, e.message))
    }

}

const getAllProducts = async (req, res)=>{

    try {
        const AllProducts = await Product.find()
        res.send(success(200, { AllProducts }))
    } catch (e) {
        return res.send(error(500, e.message))

    }
}

const updateProduct = async (req,res) =>{
    try {

        const { productName, category, available,old_price,new_price } = req.body;

        const id = req.params.id;
        const product = await Product.findById({_id: id})

        if(productName){
            product.productName = productName
        }
        if(category){
            product.category = category
        }
        if(new_price){
            product.new_price = new_price
        }
        if(old_price){
            product.old_price = old_price
        }
        if(available){
            product.available = available
        }
        await product.save()
        // console.log(product);
        return res.send(success(200, {product}))
    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const updateImage1 = async (req, res) => {  
    try {  
        const id = req.params.id;  
        const image = IMG_BASE_URL + req.file.filename;  
        
        let product = await Product.findById(id);  
        
        // Update the second element in the productImage array  
        product.productImage[0] = image;  
        
        const updatedProduct = await Product.findOneAndUpdate(  
            { _id: id },  
            { $set: { productImage: product.productImage } },  
            { new: true }  
        );  

        // Save the changes to the product  
        await product.save();  

        return res.send(success(200, { updatedProduct }));  
    } catch (e) {  
        return res.send(error(500, e.message));  
    }  
};
const updateImage2 = async (req, res) => {  
    try {  
        const id = req.params.id;  
        const image = IMG_BASE_URL + req.file.filename;  
        
        let product = await Product.findById(id);  
        
        // Update the second element in the productImage array  
        product.productImage[1] = image;  
        
        const updatedProduct = await Product.findOneAndUpdate(  
            { _id: id },  
            { $set: { productImage: product.productImage } },  
            { new: true }  
        );  

        // Save the changes to the product  
        await product.save();  

        return res.send(success(200, { updatedProduct }));  
    } catch (e) {  
        return res.send(error(500, e.message));  
    }  
};
const updateImage3 = async (req, res) => {  
    try {  
        const id = req.params.id;  
        const image = IMG_BASE_URL + req.file.filename;  
        
        let product = await Product.findById(id);  
        
        // Update the second element in the productImage array  
        product.productImage[2] = image;  
        
        const updatedProduct = await Product.findOneAndUpdate(  
            { _id: id },  
            { $set: { productImage: product.productImage } },  
            { new: true }  
        );  

        // Save the changes to the product  
        await product.save();  

        return res.send(success(200, { updatedProduct }));  
    } catch (e) {  
        return res.send(error(500, e.message));  
    }  
};
const updateImage4 = async (req, res) => {  
    try {  
        const id = req.params.id;  
        const image = IMG_BASE_URL + req.file.filename;  
        
        let product = await Product.findById(id);  
        
        // Update the second element in the productImage array  
        product.productImage[3] = image;  
        
        const updatedProduct = await Product.findOneAndUpdate(  
            { _id: id },  
            { $set: { productImage: product.productImage } },  
            { new: true }  
        );  

        // Save the changes to the product  
        await product.save();  

        return res.send(success(200, { updatedProduct }));  
    } catch (e) {  
        return res.send(error(500, e.message));  
    }  
};

const deleteProduct = async (req,res) =>{

    try {
        
        const { id } = req.body;
        const product = await Product.findByIdAndDelete(id)
        return res.send(success(200,  {product}))
    } catch (e) {
        console.log(e);
        return res.send(error(500, e.message))
    }

}

const addToKart = async (req,res) =>{
    try {
        const id = req.params.id;
        const {productId} = req.body
        const user = await User.findOne({ _id: id });
        const product = await Product.findById(productId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        user.karts.push(productId)
        await user.save()
        return res.send(success(200,  {user}))

    } catch (e) {
        return res.send(error(500, e.message))
        
    }

}

module.exports = {
    createProductController,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToKart,
    updateImage1,
    updateImage2,
    updateImage3,
    updateImage4
  }