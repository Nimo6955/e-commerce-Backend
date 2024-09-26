const User = require('../models/User')
const Product = require('../models/Product')
const { error, success } = require('../Utils/responseWrapper');
const cloudinary = require('cloudinary').v2;  
const IMG_BASE_URL = `${process.env.Server_App}/static/`

const createProductController = async (req, res) => {  
    try {  
        const {  
            productName,  
            category,  
            available,  
            old_price,  
            new_price,  
            description  
        } = req.body;  

        const productImages = req.files; 
        

        if (!productName || !category) {  
            return res.status(400).send(error(400, 'All fields are required'));  
        }  

        if (!productImages || productImages.length === 0) {  
            return res.status(400).send(error(400, 'Images not found'));  
        }  

        // Upload each image to Cloudinary and collect their URLs  
        const imageUploadPromises = productImages.map(file => {  
            return cloudinary.uploader.upload(file.path ,{
                folder: "e-commerce"
            }) // Use file.path for local upload  
                .then(result => result.secure_url); // Get the secure URL  
        });  

        const imageUrls = await Promise.all(imageUploadPromises);  

        const product = await Product.create({  
            productImage: imageUrls,  
            productName,  
            category,  
            new_price,  
            old_price,  
            available,  
            description  
        });  

        return res.status(200).send(success(200, { product }));  
    } catch (e) {  
        console.log(e)
        return res.status(500).send(error(500, e.message));  
    }  
};

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
        const image = req.file;  
        
        let product = await Product.findById(id);  
          
        const result = await cloudinary.uploader.upload(image.path,{
            folder: 'e-commerce'
        }); 
        const newImageUrl = result.secure_url; 

        product.productImage[0] = newImageUrl;  
        
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
        const image = req.file;  
        
        let product = await Product.findById(id);  
          
        const result = await cloudinary.uploader.upload(image.path,{
            folder: 'e-commerce'
        }); 
        const newImageUrl = result.secure_url; 

        product.productImage[1] = newImageUrl; 
        
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
        const image = req.file;  
        
        let product = await Product.findById(id);  
          
        const result = await cloudinary.uploader.upload(image.path,{
            folder: 'e-commerce'
        }); 
        const newImageUrl = result.secure_url; 

        product.productImage[2] = newImageUrl; 
        
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
        const image = req.file;  
        
        let product = await Product.findById(id);  
          
        const result = await cloudinary.uploader.upload(image.path,{
            folder: 'e-commerce'
        }); 
        const newImageUrl = result.secure_url; 

        product.productImage[3] = newImageUrl; 
        
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