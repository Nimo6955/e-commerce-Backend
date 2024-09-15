const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { error, success } = require('../Utils/responseWrapper');
const { sendMail } = require('../middleWare/nodeMailer');


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


const generateOTP = () => {  
    return Math.floor(100000 + Math.random() * 900000).toString();   
};  


const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const otp = generateOTP();
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();
        await sendMail(user.email, 'Password Reset OTP', `Your OTP for password reset is ${otp}`);
        return res.send(success(200, { message: 'OTP sent to your email' }))
    } catch (err) {
        console.log("err :",err)
        res.status(500).json({ error: 'Internal server error' });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log('Received OTP verification request:', { email, otp });
    if (!email || !otp) {
        return res.send(error(400, {error: 'Email and OTP are required.' }))
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found for email:', email);
            return res.send(error(400, {  error: 'Invalid email or OTP.'  }))
        }
        console.log('User found:', user);
        if (user.resetPasswordOTP !== otp) {
            console.error('Invalid OTP for user:', email);
            return res.send(error(400, {  error: 'Invalid OTP.'  }))
        }
        if (user.resetPasswordExpires < Date.now()) {
            console.error('Expired OTP for user:', email);
            return res.send(error(400, {  error: 'OTP expired.' }))
        }
        return res.send(success(200, { message: 'OTP verified successfully' }))
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.resetPasswordOTP !== otp || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordOTP = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error in updatePassword:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
    signUpController,logInController,getAllUser,forgotPassword,verifyOTP,updatePassword
}