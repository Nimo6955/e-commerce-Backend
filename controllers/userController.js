const User = require('../models/User')
const { error, success } = require('../Utils/responseWrapper');


const getOneUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById({ _id: id })
        return res.send(success(200, { user }))

    } catch (e) {

    }
}


const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const { address, gender, mobileNumber, pincode, email, name } = req.body
        const user = await User.findByIdAndUpdate({ _id: id })


        if (name) {
            user.name = name
        }
        if (email) {
            user.email = email
        }
        if (address) {
            user.address = address
        }
        if (gender) {
            user.gender = gender
        }
        if (mobileNumber) {
            user.mobileNumber = mobileNumber
        }
        if (pincode) {
            user.pincode = pincode
        }

        await user.save()
        return res.send(success(200, { user }))

    } catch (e) {

    }
}

// const addAddress = async (req, res) => {
//     const id = req.params.id
//     const { address } = req.body
//     const user = await User.findById({ _id: id })

//     user.address.push(address)
//     await user.save()
//     return res.send(success(200, { user }))

// }


// const addAddress1 = async (req, res) => {  
//     const id = req.params.id;  
//     const { address } = req.body;  
    
//     // Ensure the address object has an id property to identify it uniquely  
//     const addressWithId = {  
//         id: uuidv4(), // Generate a unique id for the new address  
//         ...address // Spread the existing address properties  
//     };  

//     const user = await User.findById({ _id: id });  

//     // Add the new address with the unique id to the user's address array  
//     user.address.push(addressWithId);  
//     await user.save();  

//     return res.send(success(200, { user }));  
// }
const addAddress = async (req, res) => {  
    const id = req.params.id;  
    const { name, mobileNumber, city, state, pincode, houseNo,landmark,area } = req.body; // Make sure address is an object with a string property  

    const user = await User.findById({ _id: id });  

    // Create the new index for the address  
    // const newIndex = user.name.length > 0 ? user.name[user.name.length - 1].index + 1 : 1;  

    // Ensure the address from the request body is correctly formatted  
    const addressWithIndex = {  
        // index: newIndex, // Numeric index, e.g., 1, 2, 3, ...  
        name: name,
        state: state,   
        houseNo: houseNo,   
        city: city,   
        mobileNumber: mobileNumber,   
        pincode: pincode,   
        landmark: landmark,   
        area: area,   
           
    };  

    // Add the new address to the user's address array  
    user.address.push(addressWithIndex);  

    await user.save(); // Save the updated user document  

    return res.send(success(200, { user }));  
};


const updateAddress = async (req, res) => {  
    const userId = req.params.id; // The user's ID from the route parameter  
    // const addressId = req.body; // The address ID to be updated from the route parameter  
    const { addressId, name, mobileNumber, city, state, pincode, houseNo,landmark,area  } = req.body; // The new address string coming from the request  

    try {  
        // Find the user by their ID  
        const user = await User.findById(userId);  
        if (!user) {  
            return res.status(404).send({ message: 'User not found' });  
        }  

        // Find the index of the address to update  
        const addressIndex = user.address.findIndex(addr => addr._id.toString() === addressId);  
        if (addressIndex === -1) {  
            return res.status(404).send({ message: 'Address not found' });  
        }  

        // Update the address at the found index  
        if(name){
            user.address[addressIndex].name = name
        }
        if(mobileNumber){
            user.address[addressIndex].mobileNumber = mobileNumber
        }
        if(city){
            user.address[addressIndex].city = city
        }
        if(state){
            user.address[addressIndex].state = state
        }
        if(pincode){
            user.address[addressIndex].pincode = pincode
        }
        if(houseNo){
            user.address[addressIndex].houseNo = houseNo
        }
        if(landmark){
            user.address[addressIndex].landmark = landmark
        }
        if(area){
            user.address[addressIndex].area = area
        }

        // Save the updated user document  
        await user.save();  

        return res.send({ message: 'Address updated successfully', user });  
    } catch (e) {  
        return res.send(error(500, e.message))  
    }  
};


const deleteAddress = async (req, res) => {  
    const userId = req.params.id; // The user's ID from the route parameter  
    const { addressId } = req.body; // The address ID to be deleted from the request body  

    try {  
        // Find the user by their ID  
        const user = await User.findById(userId);  
        if (!user) {  
            return res.status(404).send({ message: 'User not found' });  
        }  

        // Find the index of the address to delete  
        const addressIndex = user.address.findIndex(addr => addr._id.toString() === addressId);  
        if (addressIndex === -1) {  
            return res.status(404).send({ message: 'Address not found' });  
        }  

        // Remove the address from the array  
        user.address.splice(addressIndex, 1);  

        // Save the updated user document  
        await user.save();  

        return res.send({ message: 'Address deleted successfully', user });  
    } catch (e) {    
        return res.send(error(500, e.message))
    }  
};

const changeRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.error('User not found');
            return res.send(success(404, {message: 'User not found'}))
        }

        if(user.role == 'admin'){
            user.role = 'user'
        }
        else if(user.role == 'user'){
            user.role = 'admin'
        }
        await user.save();
        return res.send(success(200, {message: 'User role updated' , user}))
    } catch (e) {
        return res.send(error(500, e.message))
    }
};

module.exports = {
    getOneUser, updateUser, addAddress,updateAddress,deleteAddress,changeRole
}