const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { error, success } = require('../Utils/responseWrapper');


const signUpController = async (req, res) =>{
    try {
       const {name, email, password} = req.body;
       if(!email || !password || !name){
        // return res.status(400).send('All feilds are required')
        return res.send(error(400, 'All feilds are required'))
       }

       const oldUser = await User.findOne({email});

       if(oldUser){
        // return res.status(409).send('User is alredy registered')
        return res.send(error(409, 'User is alredy registered'))
       }

       const hashedPassword = await bcrypt.hash(password, 10);

       const user = await User.create({
        name,
        email,
        password: hashedPassword,
       });
       const accessToken = generateAccessToken({_id: user._id,})

    return res.send(success(201,{user,accessToken}))


    } catch (e) {
        // return res.send(error(500, e.massage))
    }
}
const logInController = async (req, res) =>{
    try {
        
        const {email, password} = req.body;
       if(!email || !password){
        // return res.status(400).send('All feilds are required')
        return res.send(error(400, 'All feilds are required'))
       }

       const user = await User.findOne({email}).select('+password');

       if(!user){
        // return res.status(404).send('User is not registered')
        return res.send(error(404, 'User is not registered'))
       }

       const matched = await bcrypt.compare(password, user.password);
       if(!matched){
        // return res.status(403).send('Incorrect Password')
        return res.send(error(403, 'Incorrect Password'))
       }



       const accessToken = generateAccessToken({user})
       return res.send(success(200, accessToken))
    } catch (e) {
        // return res.send(error(500, e.massage))
    }
}
const getAllUser = async (req,res) =>{
    try {
        const user = await User.find()
       return res.send(success(200, {user}))
        
    } catch (e) {
        
    }
}
const generateAccessToken = (data) =>{
    try {
        const token = jwt.sign(data, "my-secret-key", {
            expiresIn: "1d",
        })
        console.log(token);
        return token
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    signUpController,logInController,getAllUser
}