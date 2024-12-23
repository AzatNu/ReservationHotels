import { useEffect } from "react";
import hotelIdStyle from "./hotel-id.module.css";
import { PageTitle } from "../components/page-title";
import { useDispatch, useSelector } from "react-redux";
import { Warning, LoadingSpinner, Search } from "../components";
import { getHotelById } from "../../requests";
import { Link, useParams } from "react-router-dom";
import { userRoleSelector, getHotelByIdSelector, isLoadingSelector } from "../../selectors"
export const HotelId = () => {
    const dispatch = useDispatch();
    const hotel = useSelector(getHotelByIdSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userRole = useSelector(userRoleSelector);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getHotelById(id))
    }, []);
    console.log(hotel.hotel?.rooms?.resevation);
    return (
        userRole !== "3" ? (
            isLoading ? (
                <LoadingSpinner />
            ) : (<>
                <div className={hotelIdStyle["hotelIdHeader"]}>
                    <PageTitle > "{hotel.hotel.name}" </PageTitle>
                </div>
                <img className={hotelIdStyle["hotelIdImage"]} src={hotel.hotel.profileImage} alt="logo" />
                <div className={hotelIdStyle["hotelIdRoomsInfo"]}>
                    <div title="Класс отеля" className={hotelIdStyle["hotelIdStars"]}>
                        {Array.from({ length: hotel.hotel.stars }).map((_, i) => (
                            <span key={i}>&#9733;</span>
                        ))}
                    </div>
                </div>
                <div className={hotelIdStyle["hotelIdContainer"]}>
                    <div className={hotelIdStyle["hotelIdDescription"]}>
                        <h2>Отель расположен по адресу: {hotel.hotel.address}</h2>
                        <p>{hotel.hotel.description}</p>
                        <h2>Средняя стоимость номера: ${hotel.hotel.rooms.reduce((sum, room) => sum + +room.price, 0) / hotel.hotel.rooms.length}</h2>
                    </div>
                    <div className={hotelIdStyle["hotelIdRoomsContainer"]}>
                        <div className={hotelIdStyle["hotelIdRooms"]}>
                        </div>
                        <button className={hotelIdStyle["hotelIdButton"]}>Просмотреть доступные номера данного отеля </button>
                    </div>
                </div>
            </>
            )
        ) : (
            <Warning style={{ color: "red" }}>
                Ошибка 403. У гостей нет доступа к данной странице, пожалуйста, зарегистрируйтесь или войдите
            </Warning>
        )
    );
};
