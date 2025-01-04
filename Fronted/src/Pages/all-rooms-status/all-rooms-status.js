import allRoomsStatusStyle from "./all-rooms-status.module.css";
import { getAllReservationSelector, isLoadingSelector, userRoleSelector, newBalanceSelector, refreshPageSelector, errorsSelector, deleteReservationByIdSuccessSelector } from "../../selectors";
import { useEffect } from "react";
import { Warning, LoadingSpinner, PageTitle, ErrorToast, SuccessToast } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getAllReservation, deleteReservationById } from "../../requests";
import { ToastContainer, toast } from 'react-toastify';

export const AllRoomStatus = () => {
    const reservations = useSelector(getAllReservationSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userRole = useSelector(userRoleSelector);
    const refreshPage = useSelector(refreshPageSelector);

    const errors = useSelector(errorsSelector);
    const deleteReservationByIdSuccess = useSelector(deleteReservationByIdSuccessSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReservation());
    }, [dispatch, refreshPage]);
    if (errors) {
        ErrorToast(errors);
    } else if (deleteReservationByIdSuccess) {
        SuccessToast("Бронь успешно удалена!");
        dispatch({ type: "SET_DELETE_RESERVATION_BY_ID_SUCCESS", deleteReservationByIdSuccess: false });
    }

    return (
        <>
            {userRole !== "3" ? (
                <>
                    <div className={allRoomsStatusStyle["allRoomsStatusHeader"]}>
                        <PageTitle>Статусы всех забронированных номеров</PageTitle>
                    </div>
                    <div className={allRoomsStatusStyle["allRoomsStatusContainer"]}>
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className={allRoomsStatusStyle["allRoomsStatusCard"]}>
                                {reservations.length > 0 ? (
                                    <table className={allRoomsStatusStyle["allRoomsStatusTable"]}>
                                        <thead>
                                            <tr>
                                                <th>Номер</th>
                                                <th>Отель</th>
                                                <th>Дата заезда</th>
                                                <th>Дата выезда</th>
                                                <th>Стоимость</th>
                                                <th>Количество человек</th>
                                                <th>Пользователь</th>
                                                <th>Тип номера</th>
                                                <th>Управление</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservations.map((reservation, index) => (
                                                <tr key={index}>
                                                    <td>{reservation.number}</td>
                                                    <td>{reservation.hotel_name}</td>
                                                    <td>{new Date(reservation.start_date).toLocaleDateString('ru')}</td>
                                                    <td>{new Date(reservation.end_date).toLocaleDateString('ru')}</td>
                                                    <td>${reservation.price}</td>
                                                    <td>{reservation.peoples}</td>
                                                    <td>{reservation.user}</td>
                                                    <td>{reservation.type}</td>
                                                    <td>
                                                        <button onClick={() =>
                                                            dispatch(deleteReservationById
                                                                (reservation.id,
                                                                    reservation.user))} title="Удалить бронь">✖</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <Warning>
                                        Забронированные номера отсутствуют
                                    </Warning>
                                )}
                            </div>
                        )}
                    </div>
                    <ToastContainer />
                </>
            ) : (
                <Warning style={{ color: "red" }}>
                    Ошибка 403. У гостей нет доступа к этой странице, пожалуйста, авторизуйтесь
                </Warning>
            )}
        </>
    );
};

