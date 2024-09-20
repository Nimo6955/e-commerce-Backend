const User = require('../models/User')
const Product = require('../models/Product')
const { error, success } = require('../Utils/responseWrapper');
const IMG_BASE_URL = `${process.env.Server_App}/static/`



const createProductController = async (req, res)=>{
    
    try {

        const { productName , category, available, old_price, new_price,description } = req.body;
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
            available,
            description
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

        const { productName, category, available,old_price,new_price,description } = req.body;

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
        if(description){
            product.description = description
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
const removeOneFromKart = async (req,res) =>{
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
        user.karts.pop(productId)
        await user.save()
        return res.send(success(200,  {user}))

    } catch (e) {
        return res.send(error(500, e.message))
        
    }

}

const removeFromKart = async (req, res) => {  
    try {  
        const id = req.params.id;  
        const { productId } = req.body;  
        const user = await User.findOne({ _id: id });  

        if (!user) {  
            return res.status(404).send({ message: 'User not found' });  
        }  

        // Check how many times the productId appears in the kart  
        const initialKartSize = user.karts.length;  
        user.karts = user.karts.filter(item => item.toString() !== productId);  

        // If no products were removed, send a message  
        if (user.karts.length === initialKartSize) {  
            return res.status(404).send({ message: 'Product not found in kart' });  
        }  

        await user.save();  
        return res.send(success(200, { user }));  

    } catch (e) {  
        return res.send(error(500, e.message));  
    }  
};

const getKarts = async (req, res) => {  
    try {  
        const id = req.params.id;  
        const user = await User.findOne({ _id: id });  

        if (!user) {  
            return res.status(404).send({ message: 'User not found' });  
        }  

        // Create a frequency map for the products in the user's karts  
        const productCountMap = user.karts.reduce((acc, productId) => {  
            acc[productId] = (acc[productId] || 0) + 1;  
            return acc;  
        }, {});  

        // Fetch all unique products that are in the user's karts  
        const productIds = Object.keys(productCountMap);  
        const products = await Product.find({ _id: { $in: productIds } });  

        // Map products to include their counts  
        const productsWithCount = products.map(product => ({  
            ...product.toObject(),  
            quantity: productCountMap[product._id.toString()] // Add count to each product  
        }));  

        return res.send(success(200, { products: productsWithCount }));  

    } catch (e) {  
        return res.send(error(500, e.message));  
    }  
};

module.exports = {
    createProductController,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToKart,
    removeOneFromKart,
    removeFromKart,
    updateImage1,
    updateImage2,
    updateImage3,
    updateImage4,
    getKarts
  }