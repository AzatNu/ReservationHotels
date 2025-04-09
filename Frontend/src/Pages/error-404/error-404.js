import error404Style from "./error-404.module.css";
import { Warning } from "../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export const Error404 = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("userData"));
        if (storedUser) {
            dispatch({ type: "SET_USER", payload: storedUser });
        }
    }, [dispatch]);
    return (
        <div className={error404Style["error404Container"]}> <Warning>Ошибка 404. Страница не найдена</Warning>
        </div>
    )
}
