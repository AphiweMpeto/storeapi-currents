const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, 'Please provide product name'],
        maxlength: 50
    },
    brand: {
        type: String,
        required: [true, 'Please provide brand name'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['stock', 'available', 'not avalable'],
    default: 'available',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'please provide user']
    }
    
},
{timestamps:true }
)

module.exports = mongoose.model('Product',ProductSchema)