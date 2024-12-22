import greetingStyle from "./greeting.module.css";
import { Link } from "react-router-dom";
import gettingArrow from "../../assets/getting-arrow/icons8-двойная-стрелка-влево-100.png";
export const Greeting = () => {
    return (
        <div className={greetingStyle["greetingContainer"]}>
            <h1>Добро пожаловать на EasyReservation, мы рады видеть вас!
            </h1>
            <Link to="/login"><button> <img src={gettingArrow} alt="logo" /> Давайте начнем!   </button></Link>
        </div>
    );
};
