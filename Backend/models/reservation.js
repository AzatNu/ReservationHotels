const mongoose = require('mongoose');


const reservationSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    room_id: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
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

}, { timestamps: true });




const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation