const mongoose = require('mongoose');


const hotelSchema = new mongoose.Schema({
    id:
    {
        type: String,
        required: true,
        unique: true
    },
    name:
    {
        type: String,
        required: true
    },
    address:
    {
        type: String,
        required: true
    },
    stars:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    profileImage:
    {
        type: String,
        required: true
    },
    images:
    {
        type: String,
        required: true
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel