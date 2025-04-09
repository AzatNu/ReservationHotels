import { useEffect, useState } from "react";
import hotelsStyle from "./hotels.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../requests";
import { Warning, ErrorNotAvailable, LoadingSpinner, Search, PageTitle, ErrorToast, CustomSelect } from "../components";
import { userRoleSelector, getAllHotelsSelector, isLoadingSelector, errorsSelector } from "../../selectors";
import { Link } from "react-router-dom";

export const Hotels = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const dispatch = useDispatch();
    const hotels = useSelector(getAllHotelsSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userRole = useSelector(userRoleSelector);
    const errors = useSelector(errorsSelector);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("userData"));
        if (storedUser) {
            dispatch({ type: "SET_USER", payload: storedUser });
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllHotels());
    }, [dispatch]);

    const filterHotels = (query, city) => {
        return hotels?.filter(hotel =>
            hotel.name.toLowerCase().includes(query.toLowerCase()) &&
            (city === "" || hotel.city === city)
        );
    };

    const filteredHotels = filterHotels(searchQuery, cityFilter);

    if (errors) {
        ErrorToast(errors);
        dispatch({ type: "SET_ERROR", error: null });
    }

    return (
        userRole !== "3" ? (
            isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={hotelsStyle["hotelsHeader"]}>
                        <PageTitle>Доступные отели</PageTitle>
                        <CustomSelect
                            options={[
                                { value: "", label: "Все  города" },
                                { value: "Москва", label: "Москва" },
                                { value: "Нью-Йорк", label: "Нью-Йорк" },
                                { value: "Варшава", label: "Варшава" },
                            ]}
                            onChange={(option) => setCityFilter(option.value)}
                            value={{ value: cityFilter, label: cityFilter ? cityFilter : "Все города" }}
                        />
                        <Search
                            placeholder="Поиск отеля"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClickButton={() => setSearchQuery("")}
                            buttonTitle="Сбросить поиск"
                        />
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

