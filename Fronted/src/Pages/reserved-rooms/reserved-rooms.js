import reservedRoomsStyle from "./reserved-rooms.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userloginSelector, userIdSelector, getAllReservationSelector, refreshPageSelector, getReservationsRoomsByUserLoginSelector, errorsSelector, isLoadingSelector, userRoleSelector, updateReservationByIdSuccessSelector, deleteReservationByIdSuccessSelector } from "../../selectors";
import { Warning, ErrorNotAvailable, LoadingSpinner, PageTitle, Search, CustomSelect, ErrorToast, SuccessToast } from "../components";
import { getReservationRoomsByUserLogin, deleteReservationById, updateReservationById, getAllReservation } from "../../requests";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ReservedRooms = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingSelector);
    const userRole = useSelector(userRoleSelector);
    const userLogin = useSelector(userloginSelector);
    const refreshPage = useSelector(refreshPageSelector);
    const reservationRooms = useSelector(getReservationsRoomsByUserLoginSelector);
    const deleteReservationByIdSuccess = useSelector(deleteReservationByIdSuccessSelector);
    const updateReservationByIdSuccess = useSelector(updateReservationByIdSuccessSelector);
    const errors = useSelector(errorsSelector);
    const allReservation = useSelector(getAllReservationSelector);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("priceAsc");
    const [flag, setFlag] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        dispatch(getReservationRoomsByUserLogin(userLogin));
        dispatch(getAllReservation());
    }, [dispatch, userLogin, refreshPage]);

    if (errors) {
        ErrorToast(errors);
            dispatch({ type: "SET_ERROR", error: null });
    } else if (deleteReservationByIdSuccess) {
        SuccessToast("Бронирование успешно удалено!");  
            dispatch({ type: "SET_DELETE_RESERVATION_BY_ID_SUCCESS", deleteReservationByIdSuccess: false });
    }
    if (updateReservationByIdSuccess) {
        SuccessToast("Даты бронирования успешно изменены!");
        dispatch({ type: "SET_UPDATE_RESERVATION_BY_ID_SUCCESS", updateReservationByIdSuccess: false });
    }
    console.log(updateReservationByIdSuccess);

    return (
        <>
            {userRole !== "3" ? (
                <>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className={reservedRoomsStyle["reservedRoomsHeader"]}>
                                <PageTitle>Ваши забронированные номера</PageTitle>
                                <CustomSelect
                                    options={[
                                        { value: "Без сортировки", label: "Без сортировки" },
                                        { value: "priceAsc", label: "По возрастанию цены" },
                                        { value: "priceDesc", label: "По убыванию цены" },
                                        { value: "single", label: " Сначала одиночные номера" },
                                        { value: "double", label: " Сначала двухместные номера" },
                                        { value: "triple", label: "Сначала трехместные номера" }
                                    ]}
                                    value={sortQuery}
                                    onChange={(e) => setSortQuery(e.value)}
                                    placeholder="Сортировка"
                                />
                                <Search placeholder="Поиск номера" buttonTitle="Сбросить поиск" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onClickButton={() => setSearchQuery("")} />
                            </div>
                            <div className={reservedRoomsStyle["reservedRoomsContainer"]}>
                                {reservationRooms?.length > 0 ? (
                                    reservationRooms
                                        .filter((room) =>
                                            room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            room.price.toString().includes(searchQuery)
                                        )
                                        .sort((a, b) => {
                                            if (sortQuery === "priceAsc") {
                                                return a.price - b.price;
                                            } else if (sortQuery === "priceDesc") {
                                                return b.price - a.price;
                                            } else if (sortQuery === "single") {
                                                return a.type.localeCompare(b.type);
                                            } else if (sortQuery === "double") {
                                                return a.type.localeCompare(b.type);
                                            } else if (sortQuery === "triple") {
                                                return a.type.localeCompare(b.type);
                                            }
                                            return 0;
                                        })
                                        .map((room) => (
                                            <>
                                                <div key={`${room.id}-${room.number}`} className={reservedRoomsStyle["reservedRoomsCard"]}>
                                                    <h2>Номер: {room.number}</h2>
                                                    <div className={reservedRoomsStyle["roomInfo"]}>
                                                        <div className={reservedRoomsStyle["roomInfoText"]}>
                                                            <h3>Количество людей: {room.peoples}</h3>
                                                            <h3>Название отеля: {room.hotel_name}</h3>
                                                            <h3>Адрес отеля: {room.hotel_adress}</h3>
                                                            <h3>Цена бронирования: ${room.price}</h3>
                                                            <h3>Тип номера: {room.type}</h3>
                                                            <div>
                                                                <h3>Брони других пользователей: </h3>
                                                                {allReservation
                                                                    .filter((res, index) => res.user !== userLogin)
                                                                    .map((res, index) => (
                                                                        <span key={`${res.id}-${index}`}>
                                                                            {new Date(res.start_date).toLocaleDateString("ru")} - {new Date(res.end_date).toLocaleDateString("ru")} {res.user}
                                                                        </span>
                                                                    ))}
                                                            </div>
                                                            <div className={reservedRoomsStyle["roomInfoTitle"]}>
                                                                <h3>Описание</h3>
                                                            </div>
                                                            <p>{room.description}</p>
                                                        </div>
                                                        <div className={reservedRoomsStyle["reservationCode"]}>
                                                            {flag ? (<button onClick={() => setFlag(!flag)}>Скрыть</button>) :
                                                                <button onClick={() => setFlag(!flag)}>Показать код</button>}
                                                            {flag && <h3>Код бронирования: {room.code}</h3>}
                                                        </div>
                                                        <div className={reservedRoomsStyle["roomData"]}>
                                                            <h3>Дата заезда:</h3>
                                                            <input
                                                                type="date"
                                                                defaultValue={new Date(room.start_date).toISOString().split("T")[0]}
                                                                disabled={!updateFlag}
                                                                onChange={(e) => setStartDate(new Date(e.target.value))}
                                                                value={startDate ? startDate.toISOString().split("T")[0] : undefined}
                                                            />
                                                            <h3>Дата выезда:</h3>
                                                            <input
                                                                disabled={!updateFlag}
                                                                type="date"
                                                                defaultValue={new Date(room.end_date).toISOString().split("T")[0]}
                                                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                                                value={endDate ? endDate.toISOString().split("T")[0] : undefined}
                                                            />
                                                        </div>
                                                        <div className={reservedRoomsStyle["reservationButtonContainer"]}>
                                                            <button className={reservedRoomsStyle["deleteReservationButton"]}
                                                                onClick={() => dispatch(deleteReservationById(room.id))}>Удалить бронь </button>
                                                            <button className={reservedRoomsStyle["editReservationButton"]} onClick={() => setUpdateFlag(!updateFlag)}  >{updateFlag ? "Выйти из редактирования" : "Изменить бронь"}</button>
                                                        </div>
                                                        {updateFlag && (
                                                            <button className={reservedRoomsStyle["saveReservationButton"]}
                                                                onClick={() => {
                                                                    if (startDate && endDate && startDate < endDate) {
                                                                        const isReserved = allReservation.some(res => res.room_id === room.room_id && res.user !== userLogin && new Date(res.start_date) < endDate && new Date(res.end_date) > startDate);
                                                                        if (isReserved) {
                                                                            ErrorToast("Дата бронирования занята");
                                                                        } else {
                                                                            dispatch(updateReservationById(room.id, startDate, endDate));
                                                                        }
                                                                    } else {
                                                                        ErrorToast("Дата выезда не может быть раньше даты заезда");
                                                                    }
                                                                }} >Сохранить изменения </button>
                                                        )}
                                                    </div>
                                                </div >
                                            </>
                                        ))
                                ) : (
                                    <Warning>У вас нет забронированных номеров</Warning>
                                )}
                            </div>
                        </>

                    )}
                </>
            ) : (
                <ErrorNotAvailable style={{ color: 'red' }} />
            )}
            <ToastContainer />
        </>
    );
}


