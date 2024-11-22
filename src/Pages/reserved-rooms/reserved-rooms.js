import reservedRoomsStyle from "./reserved-rooms.module.css";
export const ReservedRooms = () => {
    return (
        <div className={reservedRoomsStyle["reservedRoomsContainer"]}>
            <h2>Ваши забронированные номера</h2>
        </div>
    );
};
