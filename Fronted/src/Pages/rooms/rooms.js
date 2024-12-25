import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import roomsStyle from "./rooms.module.css";
import { Link, useParams } from "react-router-dom";
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
    errorsSelector
} from "../../selectors";
import { updateUserBalance } from "../../bff/api/users-hook/update-user-balance"
import { useEffect, useState } from "react";
import {
    Search,
    LoadingSpinner,
    PageTitle,
    Warning,
    ImageCarousel,
    ErrorAlert
} from "../components";
import { getRoomsByHotelId, patchReserveRoom } from "../../requests";


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
    const { id } = useParams();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [flag, setFlag] = useState(false);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        dispatch(getRoomsByHotelId(id));
    }, [dispatch, id, refreshPage]);
    const handleReserve = (roomId, startDate, endDate, user, roomNumber, roomPrice) => {
        if (startDate && endDate) {
            let daysReserved = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
            let newBalance = Number((userBalance - (roomPrice * daysReserved)).toFixed(2));
            if (newUserBalance < (roomPrice * daysReserved)) {
                toast.error(`Ошибка! Недостаточно средств на балансе!`, {
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
                setStartDate(null);
                setEndDate(null);
                setFlag(false);
                return;
            }
            else if (!errors) {
                dispatch(updateUserBalance(userId, newBalance));
                dispatch(patchReserveRoom(roomId, startDate, endDate, user));
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
    console.log(errors)
    return (
        <>
            {userRole !== "3" ? (
                isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div>
                        <div className={roomsStyle["roomsHeader"]}>
                            <PageTitle>Доступные номера </PageTitle>
                            <Search
                                placeholder="Поиск номера"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                            />
                        </div>
                        <div className={roomsStyle["roomsContainer"]}>
                            {rooms?.length > 0 ? (
                                rooms
                                    ?.filter((room) =>
                                        room.number.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
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
                                                    <h3>Дата заезда:</h3>
                                                    <input
                                                        type="date"
                                                        min={new Date().toISOString().split("T")[0]}
                                                        value={startDate ? startDate.toISOString().split("T")[0] : ''}
                                                        onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                                                        onClick={(e) => { if (e.target.value) e.target.value = ''; setStartDate(null); }}
                                                    />
                                                    <h3>Дата выезда:</h3>
                                                    <input
                                                        disabled={startDate === null}
                                                        type="date"
                                                        min={startDate ? new Date(startDate.getTime() + 86400000).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                                                        value={endDate ? endDate.toISOString().split("T")[0] : ''}
                                                        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                                                        onClick={(e) => { if (e.target.value) e.target.value = ''; setEndDate(null); }
                                                    }
                                                    />
                                                </div>
                                                {startDate && endDate && (
                                                    <div className={roomsStyle["roomData"]}>
                                                        {endDate < startDate || endDate === startDate ? (
                                                            <ErrorAlert >Дата выезда не может  равнятся  или быть меньше даты заезда</ErrorAlert>
                                                        ) : (
                                                            <button
                                                                className={roomsStyle["roomReserveButton"]}
                                                                onClick={() => {
                                                                    handleReserve(room.id, startDate, endDate, user, room.number, room.price);
                                                                }}
                                                            >
                                                                Забронировать за ${((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * room.price}
                                                            </button>
                                                        )}
                                                        <p>*Отсчет начинается с момента получения ключей на ресепшене</p>
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

