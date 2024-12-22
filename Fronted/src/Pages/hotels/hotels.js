import { useEffect } from "react";
import hotelsStyle from "./hotels.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../requests";
import { Warning, LoadingSpinner, Search, PageTitle} from "../components"
import { userRoleSelector, getAllHotelsSelector, isLoadingSelector } from "../../selectors";

export const Hotels = () => {
    const dispatch = useDispatch();
    const hotels = useSelector(getAllHotelsSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userRole = useSelector(userRoleSelector);
    useEffect(() => {
        dispatch(getAllHotels())
    }, [dispatch]);
    return (
        userRole !== "3" ? (
            isLoading === true ? (
                <LoadingSpinner />
            ) : (
                <>
                <div className={hotelsStyle["hotelsHeader"]}>
                <PageTitle>Доступные отели</PageTitle>
                <Search placeholder="Поиск отеля" buttonTitle="Сбросить поиск" />
                </div>
                <div className={hotelsStyle["hotelsContainer"]}>
                    {hotels.hotels.length > 0 ? (
                        hotels.hotels.map((hotel) => (
                            <div key={hotel.id} className={hotelsStyle["hotelCard"]}>
                            </div>
                        ))
                    ) : (
                        <Warning>На данный момент доступные отели отсутствуют</Warning>
                    )}
                </div>
                </>
            )
        ) : (
            <Warning style={{color: "red"}}>Ошибка 403. У гостей нет доступа к данный странцие, пожалуйста, зарегистрируйтесь или войдите</Warning>
        )
    );
};

