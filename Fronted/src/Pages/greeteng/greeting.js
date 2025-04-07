import greetingStyle from "./greeting.module.css";
import { Link } from "react-router-dom";
import gettingArrow from "../../assets/getting-arrow/icons8-двойная-стрелка-влево-100.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export const Greeting = () => {
    const dispatch = useDispatch();
   useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("userData"));
        if (storedUser) {
            dispatch({ type: "SET_USER", payload: storedUser });
        }
    }, [dispatch]);
    return (
        <div className={greetingStyle["greetingContainer"]}>
            <h1>Добро пожаловать на EasyReservation, мы рады что вы с нами! Данные для входа пользователя с ролью админ: admin/123456
            </h1>
            <Link to="/login"><button> <img src={gettingArrow} alt="logo" /> Давайте начнем!   </button></Link>
        </div>
    );
};
