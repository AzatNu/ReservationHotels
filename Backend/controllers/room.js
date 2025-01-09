const generateId = require("../helper/generateId");
const Room = require("../models/room");
const getRooms = async () => {
    return Room.find();
}
const getRoomById = async (id) => {
    return Room.findById(id)
}
const deleteRoom = async (id) => {
    return Room.deleteOne({ _id: id })
}
const postRoom = async ({ hotel_id, number, type, price, description, images }) => {
    const room = await Room.create({ id: generateId(), hotel_id, number, type, price, description, images });
    return room;
};

module.exports = {
    getRooms,
    getRoomById,
    deleteRoom,
    postRoom
}