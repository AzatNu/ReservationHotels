import reservedRoomsStyle from "./reserved-rooms.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userloginSelector, userIdSelector, newBalanceSelector } from "../../selectors";
import { Warning, LoadingSpinner, PageTitle, Search, CustomSelect } from "../components";
import { refreshPageSelector, getReservationsRoomsByUserLoginSelector, errorsSelector, isLoadingSelector, userRoleSelector, deleteReservationByIdSuccessSelector } from "../../selectors";
import { getReservationRoomsByUserLogin, deleteReservationById } from "../../requests";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { newBalance } from "../../reducers";

export const ReservedRooms = () => {
    const dispatch = useDispatch();
    const balance = useSelector(newBalanceSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userRole = useSelector(userRoleSelector);
    const userLogin = useSelector(userloginSelector);
    const refreshPage = useSelector(refreshPageSelector);
    const reservationRooms = useSelector(getReservationsRoomsByUserLoginSelector);
    const deleteReservationByIdSuccess = useSelector(deleteReservationByIdSuccessSelector);
    const errors = useSelector(errorsSelector);
    const userId = useSelector(userIdSelector);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("priceAsc");
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        dispatch(getReservationRoomsByUserLogin(userLogin));
    }, [userLogin, refreshPage]);
    if (errors) {
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
        dispatch({ type: "SET_ERROR", error: null });
    } else if (deleteReservationByIdSuccess) {
        toast.success(`Бронь успешно удалена, возвратные средства поступят на баланс в течение 24 часов`, {
            position: "bottom-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                backgroundColor: "#3DD9EB",
                fontSize: "2rem",
                minWidth: "600px",
                color: "#0a0a0a",
                marginBottom: "130px",
            },
        });
        dispatch({ type: "SET_DELETE_RESERVATION_BY_ID_SUCCESS", deleteReservationByIdSuccess: false });
    }
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
                                                <div key={room.id} className={reservedRoomsStyle["reservedRoomsCard"]}>
                                                    <h2>Номер: {room.number}</h2>
                                                    <div className={reservedRoomsStyle["roomInfo"]}>
                                                        <div className={reservedRoomsStyle["roomInfoText"]}>
                                                            <h3>Количество людей: {room.peoples}</h3>
                                                            <h3>Название отеля: {room.hotel_name}</h3>
                                                            <h3>Адрес отеля: {room.hotel_adress}</h3>
                                                            <h3>Цена бронирования: ${room.price}</h3>
                                                            <h3>Тип номера: {room.type}</h3>
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
                                                                defaultValue={room.start_date?.split("T")[0]}
                                                                disabled={true}
                                                            />
                                                            <h3>Дата выезда:</h3>
                                                            <input
                                                                disabled={true}
                                                                type="date"
                                                                defaultValue={room.end_date?.split("T")[0]}
                                                            />
                                                        </div>
                                                        <div className={reservedRoomsStyle["cancelReservationButtonContainer"]}><button
                                                            onClick={() => dispatch(deleteReservationById(room.id, room.price, balance, userId))}>Удалить бронь </button></div>
                                                    </div>
                                                </div>
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
                <Warning style={{ color: "red" }}>
                    Ошибка 403. У гостей нет доступа к этой странице, пожалуйста авторизуйтесь.
                </Warning>
            )}
            <ToastContainer />
        </>
    )
}

