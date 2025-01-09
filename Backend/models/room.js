const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    hotel_id: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type:  String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true,
    }
}, { timestamps: true });




const Room = mongoose.model('Room', roomSchema);

module.exports = Room