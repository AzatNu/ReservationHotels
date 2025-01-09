import { useEffect, useState } from "react";
import hotelsStyle from "./hotels.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../requests";
import { Warning, ErrorNotAvailable, LoadingSpinner, Search, PageTitle, ErrorToast } from "../components"
import { userRoleSelector, getAllHotelsSelector, isLoadingSelector, errorsSelector } from "../../selectors";
import { Link } from "react-router-dom";

export const Hotels = () => {
    const [serchQuery, setSerchQuery] = useState("");
    const dispatch = useDispatch();
    const hotels = useSelector(getAllHotelsSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userRole = useSelector(userRoleSelector);
    const errors = useSelector(errorsSelector);
    useEffect(() => {
        dispatch(getAllHotels())
    }, []);
    const searchHotel = (query) => {
        return hotels?.filter(hotel => hotel.name.toLowerCase().includes(query.toLowerCase()));
    }
    const filteredHotels = searchHotel(serchQuery);
    if (errors) {
        ErrorToast(errors);
        dispatch({ type: "SET_ERROR", error: null });
    }

    return (
        userRole !== "3" ? (
            isLoading === true ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={hotelsStyle["hotelsHeader"]}>
                        <PageTitle>Доступные отели</PageTitle>
                        <Search placeholder="Поиск отеля" value={serchQuery} onChange={(e) => setSerchQuery(e.target.value)} onClickButton={() => setSerchQuery("")} buttonTitle="Сбросить поиск" />
                    </div>
                    <div className={hotelsStyle["hotelsContainer"]}>
                        {filteredHotels?.length > 0 ? (
                            filteredHotels.map((hotel, index) => (
                                <Link key={index} to={`/hotels/${hotel._id}`}>
                                    <div style={{ backgroundImage: `url(${hotel.images})` }} className={hotelsStyle["hotelCard"]}>
                                        <h2>"{hotel.name}"</h2>
                                        <div title="Класс отеля" className={hotelsStyle["hotelStars"]}>
                                            {Array.from({ length: hotel.stars }).map((_, i) => (
                                                <span key={i}>&#9733;</span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <Warning>На данный момент доступные отели отсутствуют</Warning>
                        )}
                    </div>
                </>
            )
        ) : (
            <ErrorNotAvailable style={{ color: 'red' }} />
            )
    );
};

