const mongoose = require('mongoose');
const ROLE = require('../constants/role');
const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role_id: {
        type: String,
        default: ROLE.USER
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User