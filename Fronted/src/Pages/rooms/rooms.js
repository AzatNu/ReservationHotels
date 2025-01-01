import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import roomsStyle from "./rooms.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    userRoleSelector,
    getRoomsByHotelIdSelector,
    isLoadingSelector,
    userloginSelector,
    userIdSelector,
    userBalanceSelector,
    newBalanceSelector,
    refreshPageSelector,
    errorsSelector,
    getReservationByRoomIdSelector,
    getHotelByIdSelector
} from "../../selectors";
import { updateUserBalance } from "../../bff/api/users-hook/update-user-balance"
import { useEffect, useState } from "react";
import {
    Search,
    LoadingSpinner,
    PageTitle,
    Warning,
    ImageCarousel,
    ErrorAlert,
    CustomSelect
} from "../components";
import { getRoomsByHotelId, getReservationByRoomId, getHotelById, patchReserveRoom } from "../../requests";


export const Rooms = () => {
    const errors = useSelector(errorsSelector);
    const refreshPage = useSelector(refreshPageSelector);
    const userRole = useSelector(userRoleSelector);
    const newUserBalance = useSelector(newBalanceSelector);
    const userBalance = useSelector(userBalanceSelector);
    const userId = useSelector(userIdSelector);
    const rooms = useSelector(getRoomsByHotelIdSelector);
    const isLoading = useSelector(isLoadingSelector);
    const user = useSelector(userloginSelector);
    const reservation = useSelector(getReservationByRoomIdSelector);
    const hotel = useSelector(getHotelByIdSelector);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [peoples, setPeoples] = useState(1);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        Promise.all([
            dispatch(getHotelById(id)),
            dispatch(getRoomsByHotelId(id)),
            dispatch(getReservationByRoomId())
        ]);
    }, [dispatch, id, refreshPage]);
    const handleReserve = (roomId, startDate, endDate, user, roomNumber, roomPrice, peoples, description, type) => {
        if (startDate && endDate) {
            const daysReserved = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
            const reservationPrice = roomPrice * daysReserved;
            const newBalance = Number((userBalance - reservationPrice).toFixed(2));
            if (newUserBalance < reservationPrice) {
                toast.error(`Ошибка! Недостаточно средств на балансе!`, {
                    position: "bottom-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    style: {
                        fontSize: "2rem",
                        minWidth: "600px",
                        color: "#0a0a0a",
                        marginBottom: "130px",
                    },
                });
                setStartDate(null);
                setEndDate(null);
                setFlag(false);
                return;
            } else if (!errors) {
                dispatch(updateUserBalance(userId, newBalance));
                dispatch(patchReserveRoom(roomId, startDate, endDate, user, reservationPrice, peoples, roomNumber, description, type, hotel.hotel.name, hotel.hotel.address));
                dispatch({ type: "SET_NEW_BALANCE", newBalance: newBalance });
                setStartDate(null);
                setEndDate(null);
                setFlag(false);
                toast.success(`Номер ${roomNumber} успешно забронирован! Дата заезда: ${startDate.toLocaleDateString('ru')}`, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    style: {
                        fontSize: "2rem",
                        minWidth: "600px",
                        backgroundColor: "#3DD9EB",
                        color: "#0a0a0a",
                        marginBottom: "130px",
                    },
                });
            } else {
                toast.error(`${errors}`, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    style: {
                        fontSize: "2rem",
                        minWidth: "600px",
                        color: "#0a0a0a",
                        marginBottom: "130px",
                    },
                });
            }
        }
    };
    console.log(reservation);
    return (
        <>
            {userRole !== "3" ? (
                isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div>
                        <div className={roomsStyle["roomsHeader"]}>
                            <PageTitle>Доступные номера </PageTitle>
                            <CustomSelect
                                options={[{ value: "default", label: "Без сортировки" },
                                { value: "priceAsc", label: "Cначала дешевые" },
                                { value: "priceDesc", label: "Cначала дорогие" },
                                { value: "single", label: "Сначала одиночные" },
                                { value: "double", label: "Сначала двухместные" },
                                { value: "triple", label: "Сначала трехместные" },
                                ]}
                                onChange={(e) => setSortQuery(e.value)}
                                value={sortQuery}
                            />
                            <Search
                                placeholder="Поиск номера"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                                buttonTitle="Сбросить поиск"
                                onClickButton={() => setSearchQuery("")}
                            />
                        </div>
                        <div className={roomsStyle["roomsContainer"]}>
                            {rooms?.length > 0 ? (
                                rooms
                                    ?.filter((room) =>
                                        room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        room.price.toString().includes(searchQuery)
                                    )
                                    .sort((a, b) => {
                                        if (sortQuery === "priceAsc") {
                                            return a.price - b.price;
                                        } else if (sortQuery === "priceDesc") {
                                            return b.price - a.price;
                                        } else if (sortQuery === "single") {
                                            return a.type === "одиночный" ? -1 : 1;
                                        } else if (sortQuery === "double") {
                                            return a.type === "двойной" ? -1 : 1;
                                        } else if (sortQuery === "triple") {
                                            return a.type === "тройной" ? -1 : 1;
                                        }
                                        return 0;
                                    })
                                    .map((room) => (
                                        <div key={room.id} className={roomsStyle["roomCard"]}>
                                            <h2>Номер: {room.number}</h2>
                                            <ImageCarousel images={room.images} />
                                            <div className={roomsStyle["roomInfo"]}>
                                                <div className={roomsStyle["roomInfoContainer"]}>
                                                    <div className={roomsStyle["roomInfoText"]}>
                                                        <h3>Цена за сутки: ${room.price}</h3>
                                                        <h3>Тип номера: {room.type}</h3>
                                                        <div className={roomsStyle["roomInfoTitle"]}>
                                                            <h3>Описание</h3>
                                                        </div>
                                                        <p>{room.description}</p>
                                                        <div className={roomsStyle["roomReservationDate"]}>
                                                            <p>Данный номер забронирован на:</p>
                                                            {reservation.filter((res) => res.room_id === room.id).map((reservation) => (
                                                                <div key={reservation.id}>
                                                                    <p>{new Date(reservation.start_date).toLocaleDateString('ru')} - {new Date(reservation.end_date).toLocaleDateString('ru')}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={roomsStyle["openReservationContainer"]}
                                                onClick={() => setFlag(!flag)} style={flag ? { backgroundColor: "red" } : {}}>
                                                {flag ? '✖' : 'Забронировать'}
                                            </button>
                                            <div className={roomsStyle["roomReservationContainer"]}
                                                style={{ display: flag ? "block" : "none" }}>
                                                <div className={roomsStyle["roomData"]}>
                                                    <h2>Выберите дату заезда и выезда</h2>
                                                    <h3>Укажите дату заезда:</h3>
                                                    <input
                                                        type="date"
                                                        min={new Date().toISOString().split("T")[0]}
                                                        value={startDate ? startDate.toISOString().split("T")[0] : ""}
                                                        onChange={(e) => {
                                                            const selectedDate = new Date(e.target.value);
                                                            if (reservation && reservation.some(res => (new Date(res.start_date) <= selectedDate && new Date(res.end_date) > selectedDate) && res.room_id === room.id)) {
                                                                e.target.value = '';
                                                                setStartDate(null);
                                                                toast.error("Выбранная дата заезда занята", {
                                                                    position: "bottom-right",
                                                                    autoClose: 6000,
                                                                    hideProgressBar: false,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: true,
                                                                    draggable: true,
                                                                    progress: undefined,
                                                                    theme: "colored",
                                                                    style: {
                                                                        fontSize: "2rem",
                                                                        minWidth: "600px",
                                                                        color: "#0a0a0a",
                                                                        marginBottom: "130px",
                                                                    },
                                                                });
                                                            } else {
                                                                setStartDate(selectedDate);
                                                            }
                                                        }}
                                                    />
                                                    <h3>Укажите дату выезда:</h3>
                                                    <input
                                                        type="date"
                                                        min={startDate ? new Date(startDate.getTime() + 86400000).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                                                        value={endDate ? endDate.toISOString().split("T")[0] : ""}
                                                        onChange={(e) => {
                                                            const selectedDate = new Date(e.target.value);
                                                            if (reservation && reservation.some(res => (new Date(res.start_date) <= selectedDate && new Date(res.end_date) > selectedDate) && res.room_id === room.id)) {
                                                                e.target.value = '';
                                                                setEndDate(null);
                                                                toast.error("Выбранная дата выезда занята", {
                                                                    position: "bottom-right",
                                                                    autoClose: 6000,
                                                                    hideProgressBar: false,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: true,
                                                                    draggable: true,
                                                                    progress: undefined,
                                                                    theme: "colored",
                                                                    style: {
                                                                        fontSize: "2rem",
                                                                        minWidth: "600px",
                                                                        color: "#0a0a0a",
                                                                        marginBottom: "130px",
                                                                    },
                                                                });
                                                            } else {
                                                                setEndDate(selectedDate);
                                                            }
                                                        }}
                                                        disabled={startDate === null}
                                                    />
                                                    <h3>Укажите количество человек:</h3>
                                                    <input
                                                        disabled={startDate === null || endDate === null || (reservation && reservation.some(reservation => (reservation.start_date <= endDate && reservation.end_date > endDate) || (reservation.start_date < startDate && reservation.end_date >= startDate)))}
                                                        onChange={(e) => setPeoples(e.target.value)}
                                                        placeholder={`Количество человек`}
                                                        type="number"
                                                    />
                                                </div>
                                                {startDate && endDate && (
                                                    <div className={roomsStyle["roomData"]}>
                                                        {(endDate <= startDate || peoples <= 0 || peoples > (room.type === "одиночный" ? 1 : room.type === "двойной" ? 2 : room.type === "тройной" ? 3 : 0)) ? (
                                                            <>
                                                                {endDate <= startDate && <ErrorAlert>Дата выезда не может быть равной или меньше даты заезда</ErrorAlert>}
                                                                {peoples <= 0 && <ErrorAlert>Количество человек не может быть равно или меньше нуля</ErrorAlert>}
                                                                {peoples > (room.type === "одиночный" ? 1 : room.type === "двойной" ? 3 : room.type === "тройной") && <ErrorAlert>Количество человек не соответствует типу номера</ErrorAlert>}
                                                            </>
                                                        ) : (
                                                            <div className={roomsStyle["roomReserveButtonContainer"]}
                                                                style={{ display: startDate === null || endDate === null || peoples === null ? "none" : "flex" }}>
                                                                <button
                                                                    className={roomsStyle["roomReserveButton"]}
                                                                    onClick={() => {
                                                                        handleReserve(room.id, startDate, endDate, user, room.number, room.price, peoples, room.description, room.type);
                                                                    }}
                                                                >
                                                                    Забронировать за ${((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)).toFixed(2) * room.price}
                                                                </button>
                                                                <button className={roomsStyle["roomReserveButton"]} onClick={() => { setStartDate(null); setEndDate(null); }}>Отменить</button>
                                                            </div>
                                                        )}
                                                        <p>*Отсчет начинается с момента получения ключей на ресепшене</p>
                                                        <p>*Количество людей в номерах строго ограничено типом номера</p>
                                                        <p>*Для подтверждения брони необходимо на ресепшене предьявить уникальный код, который вы сможете найти  во вкладке "Ваши заброрнированные номера"</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <Warning>Доступные номера не найдены</Warning>
                            )}
                        </div>
                    </div>
                )
            ) : (
                <Warning style={{ color: "red" }}  > Ошибка 403. У гостей нет доступа к этой странице, пожалуйста, авторизуйтесь</Warning>
            )}
            <ToastContainer />
        </>
    );
};

