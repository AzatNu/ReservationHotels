import allRoomsStatusStyle from "./all-rooms-status.module.css";
import { getAllReservationSelector, isLoadingSelector, userRoleSelector, refreshPageSelector, errorsSelector, deleteReservationByIdSuccessSelector } from "../../selectors";
import { useEffect } from "react";
import { ErrorNotAvailable, Warning, LoadingSpinner, PageTitle, ErrorToast, SuccessToast } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getAllReservation, deleteReservationById } from "../../requests";
import { ToastContainer } from 'react-toastify';

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
    console.log(refreshPage.refreshPage)
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
                                {reservations?.length > 0 ? (
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
                                            {reservations?.map((reservation, index) => (
                                                <tr key={index}>
                                                    <td>{reservation?.number}</td>
                                                    <td>{reservation?.hotel_name}</td>
                                                    <td>{reservation?.start_date ? new Date(reservation?.start_date).toLocaleDateString('ru') : ""}</td>
                                                    <td>{reservation?.end_date ? new Date(reservation?.end_date).toLocaleDateString('ru') : ""}</td>
                                                    <td>${reservation?.price}</td>
                                                    <td>{reservation?.peoples}</td>
                                                    <td>{reservation?.user}</td>
                                                    <td>{reservation?.type }</td>
                                                    <td>
                                                        <button onClick={() =>
                                                            dispatch(deleteReservationById(reservation?._id))} title="Удалить бронь">✖</button>
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
                <ErrorNotAvailable style={{ color: 'red' }} />
            )}
        </>
    );
};

