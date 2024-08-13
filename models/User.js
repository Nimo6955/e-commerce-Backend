const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        publicId: String,
        url: String
    },
    karts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    address: {
        type: [
            {
                // index: {
                //     type: Number,
                //     required: true,
                // },
                name: {
                    type: String,
                    required: true,
                },
                pincode: {
                    type: String,
                    required: true,
                },
                mobileNumber: {
                    type: String,
                    required: true,
                },
                houseNo: {
                    type: String,
                    required: true,
                },
                area: {
                    type: String,
                    required: true,
                },
                landmark: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                state: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
    },
    gender: {
        type: String,
        default: 'Male'
    },
    mobileNumber: {
        type: String,
        default: ''
    },
    pincode: {
        type: String,
        validate: {
            validator: function (value) {
                return value === '' || /^\d{6}$/.test(value);
            },
            message: 'Invalid pincode format'
        },
        default: ''
    },
    resetPasswordOTP: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    }]
});

const User = mongoose.model('user', userSchema);
module.exports = User