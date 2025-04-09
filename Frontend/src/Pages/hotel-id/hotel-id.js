import { useEffect } from "react";
import hotelIdStyle from "./hotel-id.module.css";
import { PageTitle } from "../components/page-title";
import { useDispatch, useSelector } from "react-redux";
import {  ErrorNotAvailable, LoadingSpinner, ErrorToast } from "../components";
import { getHotelById } from "../../requests";
import { Link, useParams } from "react-router-dom";
import { userRoleSelector, getHotelByIdSelector, isLoadingSelector, errorsSelector } from "../../selectors"
export const HotelId = () => {
    const dispatch = useDispatch();
    const hotel = useSelector(getHotelByIdSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userRole = useSelector(userRoleSelector);
    const errors = useSelector(errorsSelector);
    const { id } = useParams();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("userData"));
        if (storedUser) {
            dispatch({ type: "SET_USER", payload: storedUser });
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(getHotelById(id))
    }, []);

    if (errors) {
        ErrorToast(errors);
            dispatch({ type: "SET_ERROR", error: null });
    }
    return (
        userRole !== "3" ? (
            isLoading ? (
                <LoadingSpinner />
            ) : (<>
                <div className={hotelIdStyle["hotelIdHeader"]}>
                    <PageTitle > "{hotel?.name}" </PageTitle>
                </div>
                <img className={hotelIdStyle["hotelIdImage"]} src={hotel?.profileImage} alt="logo" />
                <div className={hotelIdStyle["hotelIdRoomsInfo"]}>
                    <div title="Класс отеля" className={hotelIdStyle["hotelIdStars"]}>
                        {Array.from({ length: hotel?.stars }).map((_, i) => (
                            <span key={i}>&#9733;</span>
                        ))}
                    </div>
                </div>
                <div className={hotelIdStyle["hotelIdContainer"]}>
                    <div className={hotelIdStyle["hotelIdDescription"]}>
                        <h2>Отель расположен по адресу: {hotel?.address}</h2>
                        <p>{hotel?.description}</p>
                    </div>
                    <div className={hotelIdStyle["hotelIdRoomsContainer"]}>
                        <Link to={`/hotels/${hotel?._id}/rooms`}>
                            <button className={hotelIdStyle["hotelIdButton"]}>Номера </button>
                        </Link>
                    </div>
                </div>
            </>
            )
        ) : (
            <ErrorNotAvailable style={{ color: 'red'}} />
        )
    );
};
