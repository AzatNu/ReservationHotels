const Hotel = require("../models/hotel")
const getHotels = async () => {
    return Hotel.find()
}
const getHotelById = async (id) => {
    return Hotel.findById(id)
}
module.exports = {
    getHotels,
    getHotelById
}
