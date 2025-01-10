
const Reservation = require("../models/reservation");
const generateId = require("../helper/generateId");

const getRservations = async () => {
    return Reservation.find();
}

const getReservationByRoomId = async (RoomId) => {
    return Reservation.find({ room_id: RoomId });
};

const postReservation = async ({ room_id, start_date, end_date, user, code, peoples, number, price, description, type, hotel_name, hotel_adress }) => {
    return await Reservation.create({
        id: generateId(),
        room_id,
        start_date,
        end_date,
        user,
        code,
        peoples,
        number,
        price,
        description,
        type,
        hotel_name,
        hotel_adress
    });
};
const deleteReservationById = async (id) => {
    return Reservation.deleteOne({ _id: id });
}
const editReservationById = async (id, { start_date, end_date }) => {
    return Reservation.findByIdAndUpdate(id, { start_date, end_date }, { returnDocument: 'after' });
};

module.exports = {
    getRservations,
    getReservationByRoomId,
    postReservation,
    deleteReservationById,
    editReservationById
}