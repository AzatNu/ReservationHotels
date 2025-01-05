const mongoose = require('mongoose');


const reservationSchema = new mongoose.Schema({
    room_id: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    peoples: {
        type: Number,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    hotel_name: {
        type: String,
        required: true
    },
    hotel_adress: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    }
}, { timestamps: true });




const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation