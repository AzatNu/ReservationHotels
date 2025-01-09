
const Reservation = require("../models/reservation");

const getRservations = async () => {
    return Reservation.find();

}

const getReservationByRoomId = async (RoomId) => {
    return Reservation.find({ room_id: RoomId });
};

const postReservation = async ({  room_id, start_date, end_date, user, code, peoples, number, price, description, type, hotel_name, hotel_adress }) => {
    const reservation = await Reservation.create({
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
    return reservation;
};
const deleteReservationById = async (id) => {
    return Reservation.deleteOne({ _id: id });
}
const editReservationById = async (id, { startDate, endDate }) => {
    return Reservation.findByIdAndUpdate(id, { start_date: startDate, end_date: endDate }, { returnDocument: 'after' });
};

module.exports = {
    getRservations,
    getReservationByRoomId,
    postReservation,
    deleteReservationById,
    editReservationById
}